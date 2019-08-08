import React, { useReducer, useEffect, useContext } from 'react';
import { NextPage } from 'next';
import GridContainer from '@/components/Layout/Grid/Container';
import BoxBooking from '@/components/Room/BoxBooking';
import {
  RoomDetailsReducer,
  RoomDetailsStateInit,
  RoomDetailsContext,
  getDataRoom
} from '@/store/Context/Room/RoomDetailContext';
import { GlobalContext } from '@/store/Context/GlobalContext';
import NavHeader from '@/components/Toolbar/NavHeader';
import { Grid, Hidden, Paper, Typography } from '@material-ui/core';
import NavBottomBook from '@/components/Room/NavBottomBook';
import NextHead from '@/components/NextHead';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import ContentPlaceHolder from '@/components/PlaceHolder/ContentPlaceHolder';
// import EmptyRoomCalendar from '@/components/Room/BoxRoomDetail/EmptyRoomCalendar';
import BoxRoomDetail from '@/components/Room/BoxRoomDetail/index';
import BoxImage from '@/components/Room/BoxImage';
import BoxSearch from '@/components/Room/BoxSearch';

const Room: NextPage = () => {
  const [state, dispatch] = useReducer(RoomDetailsReducer, RoomDetailsStateInit);
  const { room } = state;
  const { router } = useContext(GlobalContext);

  useEffect(() => {
    getDataRoom(dispatch, router);
  }, []);

  if (room === null) {
    return <ContentPlaceHolder />;
  }

  return (
    <RoomDetailsContext.Provider value={{ state, dispatch }}>
      <NextHead
        title={room.details.data[0].name}
        description={room.details.data[0].description}
        url={`${IMAGE_STORAGE_LG}/${room.media.data[0]}`}
        ogImage={`${IMAGE_STORAGE_LG}/${room.media.data[0]}`}></NextHead>

      <NavHeader></NavHeader>
      {/* <GridContainer xs={11} md={10}>
        <SearchComponent></SearchComponent>
      </GridContainer> */}

      <GridContainer xs={11} lg={10} xl={9}>
        <BoxSearch />
        <BoxImage />
        <Grid container spacing={1}>
          <Grid item xs={12} lg={9}>
            <BoxRoomDetail></BoxRoomDetail>
          </Grid>

          <Hidden mdDown>
            <Grid item sm={12} md={11} lg={3}>
              <BoxBooking></BoxBooking>
            </Grid>
          </Hidden>
        </Grid>
        <Hidden lgUp>
          <Grid container>
            <NavBottomBook />
          </Grid>
        </Hidden>
      </GridContainer>
    </RoomDetailsContext.Provider>
  );
};

Room.getInitialProps = async () => {
  return {};
};

export default Room;
