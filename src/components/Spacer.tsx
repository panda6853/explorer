import React from 'react';
import styled from 'styled-components';

const spacing = (multiplier = 1) => {
  const unit = 5;
  return `${unit * multiplier}px`;
};

interface Props {
  units: number;
}

const VerticalSpace = styled.div<Props>`
  flex-shrink: 0;
  height: ${({ units }) => spacing(units)};
`;

const HorizontalSpace = styled.div<Props>`
  flex-shrink: 0;
  width: ${({ units }) => spacing(units)};
`;

export const VerticalSpacer = ({ units }: Props) => <VerticalSpace units={units} />;

export const HorizontalSpacer = ({ units }: Props) => <HorizontalSpace units={units} />;
