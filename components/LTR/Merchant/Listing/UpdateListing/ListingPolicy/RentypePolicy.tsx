import { createStyles, makeStyles, Theme, Typography, Grid } from '@material-ui/core';
import React, { FC, Fragment } from 'react';
import CardWrapperItem from '../CardWrapperItem';
import { useSelector } from 'react-redux';
import { ReducersList } from '@/store/Redux/Reducers';

interface IProps {
  classes?: any;
}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    name: {
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848',
      marginBottom: theme.spacing(1)
    },
    marginBottom: {
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(1)
      }
    },
    rentType: {
      fontWeight: theme.typography.fontWeightBold,
      color: '#484848'
    }
  })
);

const RentTypePolicy: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const listing = useSelector<ReducersList, any>((state) => state.listingdetails.listing);
  return (
    <Fragment>
      {listing ? (
        <CardWrapperItem title="Chính sách đặt phòng">
          <Typography variant="subtitle1" className={classes.name}>
            {listing.short_term_rent_type.rent_type_txt}
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={6} className={classes.marginBottom}>
              Giờ nhận phòng: <span className={classes.rentType}>14:00 PM</span>
            </Grid>
            <Grid item xs={12} sm={6}>
              Giờ trả phòng: <span className={classes.rentType}>12:00 PM</span>
            </Grid>
          </Grid>
        </CardWrapperItem>
      ) : (
        ''
      )}
    </Fragment>
  );
};
export default RentTypePolicy;
