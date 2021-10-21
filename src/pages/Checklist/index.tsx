import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ChecklistScreenRouteProp } from '~/models/checklist.model';

// import { Container } from './styles';

const Checklist: React.FC = () => {
  const route = useRoute<ChecklistScreenRouteProp>();

  const { descType } = route.params;

  return (
    <View>
      <Text>{descType}</Text>
    </View>
  );
};

export default Checklist;
