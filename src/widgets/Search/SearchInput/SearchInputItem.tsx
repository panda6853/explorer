import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Flex from '../../../components/Flex';
import Image from '../../../components/Image';
import { HorizontalSpacer } from '../../../components/Spacer';
import { H6, H7 } from '../../../components/Typography';

const ItemContainer = styled(Flex).attrs({
  expand: true,
  direction: 'row',
  align: 'center',
  justify: 'flex-start',
})`
  padding: 10px 30px;
  transition: ${({ theme }) => theme.animation.defaultTransition}s;
  cursor: pointer;

  &:hover {
    background-color: #292937;
  }
`;

interface SearchInputItemProps {
  image?: string;
  title: string;
  description?: string;
  onClick(): void;
}

export default function SearchInputItem(props: SearchInputItemProps) {
  return (
    <ItemContainer onClick={props.onClick}>
      {props.image && (
        <>
          <Image src={props.image} circle width={25} height={25} />
          <HorizontalSpacer units={3} />
        </>
      )}
      <H6 color="white">{props.title}</H6>
      <HorizontalSpacer units={1} />
      <H7 color="white">
        <FormattedMessage defaultMessage="({description})" values={{ description: props.description }} />
      </H7>
    </ItemContainer>
  );
}
