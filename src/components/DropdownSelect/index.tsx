import React, { FC } from 'react';
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
}

const DropdownSelect: FC<Omit<Props, 'children'>> = ({
  items,
  selectedValue,
  onValueChange,
  title,
}) => {
  return items && items.length > 0 ? (
    <Container>
      <TextLabel>{title}</TextLabel>
      <RNPickerSelect
        onValueChange={(groupId: number) => onValueChange(groupId)}
        doneText="Fechar"
        useNativeAndroidPickerStyle={false}
        placeholder={{}}
        items={items.map(item => {
          let label = String(`${item.id} - ${item.title}`);
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
