import React, { FC, useMemo, Fragment } from 'react';
import { changeDataPriceByDay } from './context';
import { Grid, Typography } from '@material-ui/core';
import { Moment } from 'moment';
import { DEFAULT_DATE_FORMAT } from '@/utils/store/global';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { PriceByDayRes } from '@/types/Requests/Rooms/PriceByDay';

interface Iprops {
  day: Moment;
  priceByDay?: PriceByDayRes[];
}

const RenderDay: FC<Iprops> = (props) => {
  // const priceByDay = useSelector<ReducersList, PriceByDayRes[]>(
  //   (state) => state.roomPage.priceByDay
  // );
  const { priceByDay } = props;

  const { day } = props;
  const dataPriceByDay = priceByDay
    ? useMemo(() => changeDataPriceByDay(priceByDay), [priceByDay])
    : null;

  const date = day.format(DEFAULT_DATE_FORMAT);

  return (
    <Grid className="dayContents">
      <Typography style={{ fontSize: 24, fontWeight: 300 }}>{day.date()}</Typography>

      {dataPriceByDay ? (
        <Fragment>
          <br></br>
          <span className="dayContents__price">{dataPriceByDay[date].price_day / 1000000}TR</span>
        </Fragment>
      ) : (
        ''
      )}
    </Grid>
  );
};

export default RenderDay;
