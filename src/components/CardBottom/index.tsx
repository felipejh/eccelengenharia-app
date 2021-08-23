import React, { FC } from 'react';

import { Container, Header, TextHeader, Content } from './styles';

interface Props {
  title: string;
}

const CardBottom: FC<Props> = ({ children, title }) => {
  return (
    <Container>
      <Header>
        <TextHeader>{title}</TextHeader>
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};

export default CardBottom;
