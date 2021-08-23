import React from 'react';
import { FlatList, TouchableOpacityProps } from 'react-native';

import { Touchable, Img, Title, Subtitle } from './styles';

interface Item {
  img: string;
  title: string;
  subtitle: string;
}

interface Props extends TouchableOpacityProps {
  data: Array<Item>;
}

const List: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <FlatList<Item>
      data={data}
      keyExtractor={() => Math.random().toString()}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <Touchable {...rest}>
          <Img source={{ uri: item.img }} />
          <Title>{item.title}</Title>
          <Subtitle>{item.subtitle}</Subtitle>
        </Touchable>
      )}
    />
  );
};

export default List;
