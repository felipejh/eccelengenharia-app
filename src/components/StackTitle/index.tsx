import React, { FC } from 'react';
import { Container, Title, Subtitle } from './styles';

interface Props {
  title: string;
  subtitle?: string;
}

const StackTitle: FC<Props> = ({ title, subtitle }: Props) => {
  return (
    <Container>
      <Title>{title.toUpperCase()}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Container>
  );
};

StackTitle.defaultProps = {
  subtitle: undefined,
};

export default StackTitle;
