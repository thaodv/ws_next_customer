import { createStyles, makeStyles, Theme, Grid, Typography } from '@material-ui/core';
import React, { FC, Fragment } from 'react';
import CardWrapperItem from '../CardWrapperItem';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';
import _ from 'lodash';
interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    wrapperContent: {
      marginBottom: 16,
    },
    margin: {
      marginBottom: 8,
    },
    name: {
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848'
    },
    image: {
      maxWidth: 71
    },
    area: {
      minWidth: 120
    },
    wrapperValue: {
      display: 'flex',
      alignItems: 'flex-end',
      
    }
  })
);

const BedRooms: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);

  return (
    <Fragment>
      {!!listing ? (
        <CardWrapperItem title={`Phòng ngủ (${listing.bedrooms.number_bedroom})`}>
          {_.times(listing.bedrooms.number_bedroom, (i) => (
            <Fragment key={i}>
              <Grid item xs={12} className={listing.bedrooms.number_bedroom !== (i+1) ? classes.wrapperContent : ''}>
                <Grid item xs={12} className={classes.margin}>
                  <Typography variant="subtitle2" className={classes.name}>
                    Phòng ngủ {i + 1}
                  </Typography>
                </Grid>
                <Grid container className={classes.wrapperValue}>
                  <Grid item xs={4} className={classes.area}>
                    Diện tích:{' '}
                    <span className={classes.name}>
                      {listing.bedrooms[`bedroom_${i + 1}`].area} m<sup>2</sup>
                    </span>
                  </Grid>
                  <Grid item xs={4} className={classes.nameIcon}>
                    Số giường: <span className={classes.name}>{listing.bedrooms[`bedroom_${i + 1}`].number_bed}</span>
                  </Grid>
                  <Grid item xs={4} className={classes.image}>
                    Số ảnh: <span className={classes.name}>{listing.bedrooms[`bedroom_${i + 1}`].images.length}</span>
                  </Grid>
                </Grid>
              </Grid>
            </Fragment>
          ))}
        </CardWrapperItem>
      ) : (
        ''
      )}
    </Fragment>
  );
};
export default BedRooms;