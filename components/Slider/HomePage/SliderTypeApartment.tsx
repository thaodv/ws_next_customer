import React, { Fragment, FC, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, Grid, Hidden } from '@material-ui/core';
import CardIntro from '@/components/Cards/CardIntro';
import { RoomHomepageContext, IRoomHomepageContext } from '@/store/Context/Room/RoomHomepageContext';
import _ from 'lodash';
import { IGlobalContext, GlobalContext } from '@/store/Context/GlobalContext';
import numeral from "numeral";
import Slider, { Settings } from 'react-slick';
import NextArrow from '@/components/ListRoom/NextArrow';
import PrevArrow from '@/components/ListRoom/PrevArrow';

interface IProps {
  classes?: any
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    root:{
      marginTop: theme.spacing(8)
    },
    paddingGrid:{
      padding:4,
    }
  })
);

const SliderTypeApartment: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {} = props;
  const {state}= useContext<IRoomHomepageContext>(RoomHomepageContext);
  const {width}= useContext<IGlobalContext>(GlobalContext);

  const {apartments} =state;

  const setting: Settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    speed: 800,
    lazyLoad: 'ondemand',
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    touchThreshold: 10,
    mobileFirst: true,
    centerPadding: "20%",
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1.9,
          touchThreshold: 5000,
          arrows: false,
          lazyLoad: false,
          centerMode: true,
          initialSlide: 0,
          centerPadding: "24%",
          slidesToScroll: 1,
          infinite: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          touchThreshold: 5000,
          slidesToShow: 1.2,
          centerPadding: "12%",
          arrows: false,
          lazyLoad: false,
          centerMode: true,
          initialSlide: 0,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return apartments && (
    <Fragment>
      <Hidden xsDown>
        <Grid container spacing={2} justify='flex-start' className={classes.root}>

          {_.map(apartments,(obj,i)=> (
            obj.status === 1 ? (
              <Grid item xs={4} sm={4} md={4} lg={3} key={i}>
                <CardIntro imgHeight={width === 'xl' ? 250 : 200} imgSrc={obj.image} title={obj.value}/>
              </Grid>
            ) : ''
          ))}
        </Grid>
      </Hidden>

      <Hidden smUp>
        <div  className={classes.root}>
          <Slider {...setting}>
            {_.map(apartments,(obj,i)=> (
              obj.status === 1 ? (
                <div key={i} className={classes.paddingGrid}>
                  <CardIntro imgHeight={width === 'xl' ? 250 : 200} imgSrc={obj.image} title={obj.value}/>
                </div>
              ) : ''
            ))}
          </Slider>
        </div>
      </Hidden>
    </Fragment>
  );
};

export default SliderTypeApartment;