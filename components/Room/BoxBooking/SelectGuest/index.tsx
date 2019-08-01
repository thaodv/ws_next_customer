import React, { ChangeEvent, useState, useContext, memo, Dispatch } from 'react';
import { BootstrapInput } from '@/components/SelectGlobal';
import { KeyboardArrowDown } from '@material-ui/icons';
import { Select, MenuItem, Grid } from '@material-ui/core';
import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import { useDispatch, useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import { useTranslation } from 'react-i18next';
import { BookingAction } from '@/store/Redux/Reducers/booking';

const SelectGuest = () => {
  const dispatch = useDispatch<Dispatch<BookingAction>>();
  const guestsCount = useSelector<ReducersList, number>((state) => state.booking.numberOfGuest);
  const { state } = useContext(RoomDetailsContext);
  const { room } = state;
  const [value, setValue] = useState<number>(guestsCount !== 0 ? guestsCount : 1);
  const { t } = useTranslation();

  const onChange = (event: ChangeEvent<{ name?: string; value: number }>) => {
    setValue(event.target.value);
    dispatch({ type: 'SET_NUMBER_OF_GUEST', payload: event.target.value });
  };

  const arrMenuItem = (x: number, y: number): any[] => {
    let i = 1;
    let arr = [];
    let z = x + y;
    while (i <= z) {
      arr.push(
        <MenuItem key={i} value={i}>
          <p className="selectGuest__guest">
            {i} {t('room:boxBooking:guest')}
          </p>
        </MenuItem>
      );
      i++;
    }
    return arr;
  };

  return (
    room && (
      <Grid className="selectGuest">
        <Select
          onChange={onChange}
          input={<BootstrapInput fullWidth className="selectGuest__input" />}
          displayEmpty
          value={value}
          IconComponent={KeyboardArrowDown}>
          {arrMenuItem(room.max_additional_guest, room.max_guest)}
        </Select>
      </Grid>
    )
  );
};

export default memo(SelectGuest);
