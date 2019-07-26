import React from 'react';
import { NextPage } from 'next';
import NextHead from '@/components/NextHead';
import SearchAutocomplete from '@/components/SearchAutocomplete';
import { Grid } from '@material-ui/core';
import DateRangeSearch from '@/components/DateRangeSearch';
import ChooseGuestRoom from '@/components/ChooseGuestRoom';
import ButtonGlobal from '@/components/ButtonGlobal';

const Home: NextPage = () => {
  return (
    <div>
      <NextHead
        title="Nextjs Demo"
        description="Welcome to Nextjs"
        url="https://nextjs.org/"></NextHead>

      <Grid container spacing={2} style={{ height: '65px' }}>
        <Grid item xs={12} md={4}>
          <SearchAutocomplete></SearchAutocomplete>
        </Grid>
        <Grid item xs={12} md={4}>
          <DateRangeSearch></DateRangeSearch>
        </Grid>
        <Grid item xs={12} md={2}>
          <ChooseGuestRoom></ChooseGuestRoom>
        </Grid>
        <Grid item xs={12} md={2}>
          <ButtonGlobal width="100%">Tìm kiếm</ButtonGlobal>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
