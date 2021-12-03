import React, { FC, ReactElement } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Appointment } from '~/models/appointment.model';
import { Group } from '~/models/groups.model';
import colors from '~/styles/colors';
import fonts from '~/styles/fonts';

import { Container, TextLabel } from './styles';

interface Props {
  items: Array<Group | Appointment> | undefined;
  selectedValue: number | undefined;
  onValueChange: (groupId: number) => void;
  title?: string;
  filterComponent: ReactElement;
}

const DropdownSelect: FC<Omit<Props, 'children'>> = ({
  items,
  selectedValue,
  onValueChange,
  title,
  filterComponent,
}) => {
  return items && items.length > 0 ? (
    <Container>
      <TextLabel>{title}</TextLabel>
      {filterComponent}
      <RNPickerSelect
        onValueChange={(groupId: number) => onValueChange(groupId)}
        doneText="Fechar"
        useNativeAndroidPickerStyle={false}
        placeholder={{}}
        items={items.map(item => {
          const idScreen = title?.includes('apontamento')
            ? item.ideccel
            : item.id;

          let label = String(`${idScreen} - ${item.titulo}`);
          if (label.length > 43) {
            label = `${label.substr(0, 42)}...`;
          }
          return {
            key: item.id,
            label,
            value: item.id,
          };
        })}
        value={selectedValue}
        Icon={() => {
          return (
            <FeatherIcon name="arrow-down" size={20} color={colors.white} />
          );
        }}
        style={{
          inputIOS: {
            paddingVertical: 12,
            paddingHorizontal: 10,
            paddingRight: 35,
            marginTop: 5,
            color: colors.white,
            fontFamily: fonts.text,
            borderRadius: 12,
            backgroundColor: colors.gray,
          },
          inputAndroid: {
            paddingVertical: 8,
            paddingHorizontal: 10,
            paddingRight: 35,
            marginTop: 5,
            color: colors.white,
            fontFamily: fonts.text,
            borderRadius: 12,
            alignItems: 'flex-start',
            backgroundColor: colors.gray,
          },
          iconContainer: {
            top: 15,
            right: 15,
          },
        }}
      />
    </Container>
  ) : null;
};

export default DropdownSelect;
