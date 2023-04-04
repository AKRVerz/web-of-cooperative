import _ from 'lodash';
import React from 'react';
import Card from './Card';
import { AspectRatio, Grid, GridItem } from '@chakra-ui/react';
import { FaUser, FaCalendarDay, FaListOl } from 'react-icons/fa';
import { RiBook2Fill } from 'react-icons/ri';

const YearCard = () => {
  return (
    <Grid
      templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(6, 1fr)' }}
      my={3}
      gap={4}
    >
      <GridItem colSpan={1}>
        <Card bGround="#4F72D9" title="JANUARI">
          <AspectRatio ratio={1} width={12}>
            <FaUser color="#184ADE" />
          </AspectRatio>
        </Card>
      </GridItem>
      <GridItem colSpan={1}>
        <Card bGround="#E64839" title="FEBUARI">
          <AspectRatio ratio={1} width={12}>
            <RiBook2Fill color="B91D0E" />
          </AspectRatio>
        </Card>
      </GridItem>
      <GridItem colSpan={1}>
        <Card bGround="#F4C33D" title="MARET">
          <AspectRatio ratio={1} width={12}>
            <FaCalendarDay color="D69F08" />
          </AspectRatio>
        </Card>
      </GridItem>
      <GridItem colSpan={1}>
        <Card bGround="#1ECA8B" title="APRIL">
          <AspectRatio ratio={1} width={12}>
            <FaListOl color="00965F" />
          </AspectRatio>
        </Card>
      </GridItem>
      <GridItem colSpan={1}>
        <Card bGround="#4F72D9" title="MEI">
          <AspectRatio ratio={1} width={12}>
            <FaUser color="#184ADE" />
          </AspectRatio>
        </Card>
      </GridItem>
      <GridItem colSpan={1}>
        <Card bGround="#E64839" title="JUNI">
          <AspectRatio ratio={1} width={12}>
            <RiBook2Fill color="B91D0E" />
          </AspectRatio>
        </Card>
      </GridItem>
      <GridItem colSpan={1}>
        <Card bGround="#F4C33D" title="JULI">
          <AspectRatio ratio={1} width={12}>
            <FaCalendarDay color="D69F08" />
          </AspectRatio>
        </Card>
      </GridItem>
      <GridItem colSpan={1}>
        <Card bGround="#1ECA8B" title="AGUSTUS">
          <AspectRatio ratio={1} width={12}>
            <FaListOl color="00965F" />
          </AspectRatio>
        </Card>
      </GridItem>
      <GridItem colSpan={1}>
        <Card bGround="#4F72D9" title="SEPTEMBER">
          <AspectRatio ratio={1} width={12}>
            <FaUser color="#184ADE" />
          </AspectRatio>
        </Card>
      </GridItem>
      <GridItem colSpan={1}>
        <Card bGround="#E64839" title="OKTOBER">
          <AspectRatio ratio={1} width={12}>
            <RiBook2Fill color="B91D0E" />
          </AspectRatio>
        </Card>
      </GridItem>
      <GridItem colSpan={1}>
        <Card bGround="#F4C33D" title="NOVEMBER">
          <AspectRatio ratio={1} width={12}>
            <FaCalendarDay color="D69F08" />
          </AspectRatio>
        </Card>
      </GridItem>
      <GridItem colSpan={1}>
        <Card bGround="#1ECA8B" title="DESEMBER">
          <AspectRatio ratio={1} width={12}>
            <FaListOl color="00965F" />
          </AspectRatio>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default YearCard;
