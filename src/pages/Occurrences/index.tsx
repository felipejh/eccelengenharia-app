import React, { useState, useEffect } from 'react';
import { View, Dimensions, Image, Alert, Platform } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import { useRoute } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';

import * as Sentry from '@sentry/react-native';

import ImageZoom, { IOnClick, IOnMove } from 'react-native-image-pan-zoom';
import pt from 'date-fns/locale/pt';
import { format, parseISO } from 'date-fns';
import { RootState } from '~/store/modules/rootReducer';
import {
  postOccurrence,
  putPostponedOccurrence,
  putConclusionOccurrence,
  getOccurrenceByPlan,
} from '~/services/occurrencesServices';

import {
  OccurrencesScreenRouteProp,
  Occurrence,
} from '~/models/occurrences.model';
import { Group } from '~/models/groups.model';
import Marker from '~/components/Marker';
import Checkbox from '~/components/Checkbox';
import CardBottom from '~/components/CardBottom';

import {
  Container,
  CardConcluded,
  TextConcluded,
  TextPendingOccurrence,
  TextDetailsPendingOccurrence,
  Line,
  ContentCardPending,
} from './styles';
import Button from '~/components/Button';
import DropdownSelect from '~/components/DropdownSelect';
import ButtonsOccurrence from '~/pages/Occurrences/components/ButtonsOccurrence';
import { Appointment } from '~/models/appointment.model';
import getRealm from '~/services/realm';
import { normalizeRealmData, isConnected } from '~/utils/utils';
import { getGroups } from '~/services/groupsService';
import LoadingModal from '~/components/LoadingModal';
import InputFilter from '~/components/InputFilter';

import { addOccurrenceRequest } from '~/store/modules/occurrences/actions';

interface NormalizedMarker {
  top: string;
  left: string;
  occurrence: Occurrence;
}

export interface ExistsMarkers {
  occurrenceId: number;
  percentageX: number;
  percentageY: number;
  concluded: boolean;
  postponed: boolean;
}

const Occurrences: React.FC = () => {
  const route = useRoute<OccurrencesScreenRouteProp>();
  const {
    obraId: constructionId,
    id: planId,
    imgSystemPath = '',
  } = route.params;

  const dispatch = useDispatch();

  const { userId } = useSelector((state: RootState) => state.auth);

  const [loadingProcess, setLoadingProcess] = useState<boolean>(false);

  const [showConcluded, setShowConcluded] = useState<boolean>(false);
  const [showCardClickMarker, setShowCardClickMarker] =
    useState<boolean>(false);

  const [selectedGroup, setSelectedGroup] = useState<number>();
  const [groups, setGroups] = useState<Array<Group>>();
  const [filteredGroups, setFilteredGroups] = useState<Array<Group>>();

  const [selectedAppointment, setSelectedAppointment] = useState<number>();
  const [appointments, setAppointments] = useState<Array<Appointment>>();
  const [appointmentsPicker, setAppointmentsPicker] =
    useState<Array<Appointment>>();
  const [filteredAppointmentsPicker, setFilteredAppointmentsPicker] =
    useState<Array<Appointment>>();

  const [isNewMarker, setIsNewMarker] = useState<boolean>(false);
  const [percentageXNewMarker, setPercentageXNewMarker] = useState<number>();
  const [percentageYNewMarker, setPercentageYNewMarker] = useState<number>();

  const [markers, setMarkers] = useState<Array<Occurrence>>();
  const [scaleMarkers, setScaleMarkers] = useState<number>(100);
  const [notConcludedMarkers, setNotConcludedMarkers] =
    useState<Array<Occurrence>>();
  const [filteredMarkers, setFilteredMarkers] = useState<Array<Occurrence>>();
  const [selectedMarker, setSelectedMarker] = useState<Occurrence>();

  const headerHeight = useHeaderHeight();
  const dimensions = Dimensions.get('window');

  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const imageWidth = dimensions.width;
  const [imageHeight, setImageHeight] = useState<number>(0);

  const [topNewMarker, setTopNewMarker] = useState<string>();
  const [leftNewMarker, setLeftNewMarker] = useState<string>();

  const [normalizedMarkers, setNormalizedMarkers] = useState<
    Array<NormalizedMarker> | undefined
  >([]);

  useEffect(() => {
    if (width && height) {
      setImageHeight(Math.round(height * (dimensions.width / width)));
    }
  }, [width, height]);

  useEffect(() => {
    const normalizedMarkersList = filteredMarkers?.map(
      filteredMarker =>
        ({
          occurrence: filteredMarker,
          left: `${
            (Number(filteredMarker.coord_x) * (imageWidth + 14)) / 100 - 15
          }px`,
          top: `${(Number(filteredMarker.coord_y) * imageHeight) / 100 - 15}px`,
          occurrenceId: filteredMarker.id,
        } as NormalizedMarker),
    );

    setNormalizedMarkers(normalizedMarkersList);
  }, [filteredMarkers]);

  useEffect(() => {
    if (
      selectedGroup &&
      filteredGroups &&
      groups &&
      appointments &&
      selectedGroup
    ) {
      const filteredAppointments = appointments.filter(
        a => a.gruposapontamentoId === selectedGroup,
      );

      if (filteredAppointments) {
        setAppointmentsPicker(filteredAppointments);
        setFilteredAppointmentsPicker(filteredAppointments);
      }
    }
  }, [selectedGroup, filteredGroups, groups, appointments, selectedGroup]);

  useEffect(() => {
    async function getImageSize() {
      await Image.getSize(
        Platform.OS === 'android'
          ? `file://${imgSystemPath}`
          : `${imgSystemPath}`,
        (widthImg, heightImg) => {
          setWidth(widthImg);
          setHeight(heightImg);
        },
      );
    }

    getImageSize();
  }, []);

  async function loadOccurrencesOnline() {
    if (await isConnected()) {
      try {
        const response = await getOccurrenceByPlan({
          constructionId,
          planId,
        });

        setMarkers(response);

        const newFilteredMarkers = response.filter(m => !m.concluido);
        setNotConcludedMarkers(newFilteredMarkers);
        setFilteredMarkers(newFilteredMarkers);

        const realm = await getRealm();

        realm.write(() => {
          response.forEach(marker => {
            realm.create('Occurrences', marker, Realm.UpdateMode.Modified);
          });
        });
        realm.close();
      } catch (error) {
        Sentry.captureException(error);
        // Alert.alert(
        //   'Ops',
        //   `Ocorreu um erro ao buscar as ocorrências: ${error}`,
        // );
      }
    }
  }

  async function loadGroupsOnline() {
    if (await isConnected()) {
      try {
        const response = await getGroups();
        const groupsFiltered = response
          .filter(g => g.ativo === 1)
          .sort((a, b) => {
            if (a.id < b.id) {
              return -1;
            }
            return 0;
          });

        const realm = await getRealm();

        realm.write(() => {
          response.forEach(group => {
            realm.create('Groups', group, Realm.UpdateMode.Modified);
          });
        });

        realm.close();

        setGroups(groupsFiltered);
        setFilteredGroups(groupsFiltered);
        setSelectedGroup(groupsFiltered ? groupsFiltered[0].id : undefined);
      } catch (error) {
        Sentry.captureException(error);
        Alert.alert('Ops', `Ocorreu um erro ao buscar os grupos: ${error}`);
      }
    }
  }

  useEffect(() => {
    async function loadOccurrences() {
      const realm = await getRealm();
      try {
        // Occurrences
        const dataAllOc = realm
          .objects('Occurrences')
          .filtered(`obraId = ${constructionId} && plantaId = ${planId}`);

        const normalizedAllOc =
          normalizeRealmData<Array<Occurrence>>(dataAllOc);

        setMarkers(normalizedAllOc);

        const notConcludedMarkersRealm = realm
          .objects('Occurrences')
          .filtered(
            `concluido != 1 && obraId = ${constructionId} && plantaId = ${planId}`,
          );
        const normalizedNotConcludedMarkers = normalizeRealmData<
          Array<Occurrence>
        >(notConcludedMarkersRealm);

        setNotConcludedMarkers(normalizedNotConcludedMarkers);
        setFilteredMarkers(normalizedNotConcludedMarkers);

        // Groups
        const realmGroups = realm.objects('Groups').sorted('id');
        const realmGroupsNormalized =
          normalizeRealmData<Array<Group>>(realmGroups);

        setGroups(realmGroupsNormalized);
        setFilteredGroups(realmGroupsNormalized);
        setSelectedGroup(realmGroupsNormalized[0].id);

        // Appointments
        const data = realm.objects('Appointments').sorted('id');
        const normalizedData = normalizeRealmData<Array<Appointment>>(data);

        setAppointments(normalizedData);
      } catch (error) {
        Sentry.captureException(error);
      } finally {
        realm.close();
      }
    }

    if (width > 0 && height > 0) {
      loadOccurrences();
      loadOccurrencesOnline();
      loadGroupsOnline();
    }
  }, [width, height]);

  useEffect(() => {
    if (notConcludedMarkers) {
      if (showConcluded) {
        setFilteredMarkers(markers);
      } else {
        setFilteredMarkers(notConcludedMarkers);
      }
    }
  }, [showConcluded, notConcludedMarkers]);

  const clearAllProcess = async () => {
    if (isNewMarker) setIsNewMarker(false);
    if (selectedMarker) setSelectedMarker(undefined);
    if (selectedAppointment) setSelectedAppointment(undefined);
    if (percentageXNewMarker) setPercentageXNewMarker(undefined);
    if (percentageYNewMarker) setPercentageYNewMarker(undefined);

    await loadOccurrencesOnline();

    setSelectedGroup(groups ? groups[0].id : undefined);
    setLoadingProcess(false);
  };

  const handleNewMarker = (event: IOnClick) => {
    if (!appointments || !filteredGroups) return;

    if (isNewMarker) {
      setSelectedGroup(filteredGroups ? filteredGroups[0].id : undefined);
      setIsNewMarker(false);
      return;
    }
    if (showCardClickMarker) {
      setShowCardClickMarker(false);
      setSelectedMarker(undefined);
      return;
    }

    const defaultGroupId = filteredGroups[0].id;
    const defaultAppointmentId = appointments
      .filter(a => a.gruposapontamentoId === defaultGroupId)
      .shift();

    if (!defaultAppointmentId) return;

    setSelectedGroup(defaultGroupId);
    setSelectedAppointment(defaultAppointmentId.id);

    const top = parseFloat(event.locationY.toFixed(2));
    const left = parseFloat(event.locationX.toFixed(2));

    const percentageX = parseFloat(
      ((left * 100) / (imageWidth + 14)).toFixed(2),
    );
    const percentageY = parseFloat(((top * 100) / imageHeight).toFixed(2));

    setTopNewMarker(`${top - 15}px`);
    setLeftNewMarker(`${left - 15}px`);

    setPercentageXNewMarker(percentageX);
    setPercentageYNewMarker(percentageY);
    setIsNewMarker(true);
    setSelectedAppointment(appointments ? appointments[0].id : undefined);
  };

  const handleClickExistsMarker = (occurrence: Occurrence) => {
    if (isNewMarker) {
      setSelectedGroup(groups ? groups[0].id : undefined);
      setIsNewMarker(false);
    }

    setSelectedMarker(occurrence);
    setShowCardClickMarker(true);
  };

  const handlePostOccurrence = async () => {
    setLoadingProcess(true);

    if (userId) {
      try {
        // await postOccurrence({
        //   coordX: percentageXNewMarker || Number(selectedMarker?.coord_x),
        //   coordY: percentageYNewMarker || Number(selectedMarker?.coord_y),
        //   constructionId,
        //   planId,
        //   userId,
        //   userCreateId: userId,
        //   appointmentId: selectedAppointment || selectedMarker?.apontamentoId,
        // });
        dispatch(
          addOccurrenceRequest({
            coordX: percentageXNewMarker || Number(selectedMarker?.coord_x),
            coordY: percentageYNewMarker || Number(selectedMarker?.coord_y),
            constructionId,
            planId,
            userId,
            userCreateId: userId,
            appointmentId: selectedAppointment || selectedMarker?.apontamentoId,
          }),
        );
      } catch (error) {
        console.tron.log(error);
        Alert.alert('Atenção', 'Ocorreu um erro ao efetuar o processo.');
      }
    }

    clearAllProcess();
  };

  const handlePostponedOccurrence = async () => {
    setLoadingProcess(true);

    if (userId && selectedMarker?.id) {
      try {
        await putPostponedOccurrence({
          id: selectedMarker?.id,
          postponedUserId: userId,
          postponedDate: new Date(),
        });
      } catch {
        Alert.alert('Atenção', 'Ocorreu um erro ao efetuar o processo.');
      }
    }

    clearAllProcess();
  };

  const handleConclusionOccurrence = async () => {
    setLoadingProcess(true);

    if (userId && selectedMarker?.id) {
      try {
        await putConclusionOccurrence({
          id: selectedMarker.id,
          conclusionUserId: userId,
          conclusionDate: new Date(),
        });
      } catch {
        Alert.alert('Atenção', 'Ocorreu um erro ao efetuar o processo.');
      }
    }

    clearAllProcess();
  };

  const handlePressPostponedOccurrence = () => {
    Alert.alert('Atenção', 'Deseja adiar essa ocorrência?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        onPress: () => handlePostponedOccurrence(),
      },
    ]);
  };

  const handlePressConcludedOccurrence = () => {
    Alert.alert(
      'Atenção',
      'Deseja marcar essa ocorrência como resolvida? Não é possível reverter após confirmado.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => handleConclusionOccurrence(),
        },
      ],
    );
  };

  const handleShowConcluded = () => {
    setShowConcluded(oldValue => !oldValue);
  };

  const onZoom = (position: IOnMove) => {
    const { scale } = position;

    setScaleMarkers(oldState => {
      const value = 100 - scale * 13;
      if (oldState - value > 5) {
        return value;
      }
      if (oldState - value <= 5) {
        return value;
      }
      return oldState;
    });
  };

  const handleFilterGroups = (text: string) => {
    if (text) {
      const filtered = groups?.filter(g => String(g.id).includes(text));
      if (filtered?.length) {
        setFilteredGroups(filtered);
      }
    } else {
      setFilteredGroups(groups);
    }
  };

  const handleFilterAppointments = (text: string) => {
    if (text) {
      const filtered = appointmentsPicker?.filter(a =>
        String(a.ideccel).includes(text),
      );
      if (filtered?.length) {
        setFilteredAppointmentsPicker(filtered);
      }
    } else {
      setFilteredAppointmentsPicker(appointmentsPicker);
    }
  };

  return (
    <Container>
      {/* <LoadingModal loading={loadingProcess} text="Carregando..." /> */}

      <ImageZoom
        cropWidth={Dimensions.get('window').width}
        cropHeight={Dimensions.get('window').height - headerHeight}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        onClick={handleNewMarker}
        onMove={onZoom}
      >
        <>
          <Image
            style={{ width: imageWidth, height: imageHeight }}
            source={{
              uri:
                Platform.OS === 'android'
                  ? `file://${imgSystemPath}`
                  : `${imgSystemPath}`,
            }}
          />
          {topNewMarker && leftNewMarker && isNewMarker ? (
            <Marker
              key={String(Math.random())}
              top={topNewMarker}
              left={leftNewMarker}
            />
          ) : null}

          {normalizedMarkers?.map(m => (
            <Marker
              scale={scaleMarkers}
              key={String(Math.random())}
              top={m.top}
              left={m.left}
              occurrence={m.occurrence}
              showConcluded={showConcluded}
              onClickMarker={(o: Occurrence) => handleClickExistsMarker(o)}
            />
          ))}
        </>
      </ImageZoom>

      {!isNewMarker && !showCardClickMarker && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
            paddingBottom: 20,
          }}
        >
          <CardConcluded>
            <Checkbox onPress={handleShowConcluded} checked={showConcluded} />
            <TextConcluded>EXIBIR CONCLUÍDOS</TextConcluded>
          </CardConcluded>
        </View>
      )}

      {isNewMarker && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
            paddingBottom: 20,
            width: '100%',
          }}
        >
          <CardBottom title="NOVA OCORRÊNCIA">
            <DropdownSelect
              title="Selecionar grupo"
              items={filteredGroups}
              selectedValue={selectedGroup}
              onValueChange={(groupId: number) => setSelectedGroup(groupId)}
              filterComponent={
                <InputFilter
                  placeholder="Pesquisar grupo..."
                  onChangeText={handleFilterGroups}
                />
              }
            />

            <DropdownSelect
              title="Selecionar apontamento"
              items={filteredAppointmentsPicker}
              selectedValue={selectedAppointment}
              onValueChange={(appointmentId: number) =>
                setSelectedAppointment(appointmentId)
              }
              filterComponent={
                <InputFilter
                  placeholder="Pesquisar apontamento..."
                  onChangeText={handleFilterAppointments}
                />
              }
            />

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}
            >
              <Button
                onPress={() => handlePostOccurrence()}
                // loading={loadingProcess}
              >
                CRIAR OCORRÊNCIA
              </Button>
            </View>
          </CardBottom>
        </View>
      )}

      {showCardClickMarker && selectedMarker && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
            paddingBottom: 20,
            width: '95%',
          }}
        >
          <CardBottom
            title={`${selectedMarker.apontamentoId} - ${selectedMarker.apontamento?.titulo}`}
          >
            <ContentCardPending>
              <View>
                <TextPendingOccurrence>
                  OCORRÊNCIA PENDENTE
                </TextPendingOccurrence>
                <TextDetailsPendingOccurrence>
                  {`Por ${selectedMarker.usuario?.nome} - ${format(
                    parseISO(selectedMarker.createdAt),
                    'dd.MM.yyyy',
                    { locale: pt },
                  )}`}
                </TextDetailsPendingOccurrence>
              </View>

              {/* <CheckboxCircle onPress={handlePressConcludedOccurrence} /> */}
            </ContentCardPending>
            <Line />
            <ButtonsOccurrence
              data={selectedMarker}
              onPressPostponed={handlePressPostponedOccurrence}
              onPressConcluded={handlePressConcludedOccurrence}
            />
            <Line />
          </CardBottom>
        </View>
      )}
    </Container>
  );
};

export default Occurrences;
