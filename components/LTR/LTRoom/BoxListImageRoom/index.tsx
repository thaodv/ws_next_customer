import { ImagesRes } from '@/types/Requests/LTR/Images/ImageResponses';
import { IMAGE_STORAGE_LG } from '@/utils/store/global';
import { ButtonBase, Grid, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/styles';
import React, { FC, Fragment, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DialogFullImage from './DialogFullImage';

interface IProps {
  classes?: any,
  livingrooms: ImagesRes,
  outdoors: ImagesRes,
  furnitures: ImagesRes,
  kitchens: ImagesRes,
  cover_photo: ImagesRes,
  bedrooms: any,
  bathrooms: any,
  roomName: string
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    name: {
      fontWeight: 900,
      margin: '1rem 0 0.35rem 0'
    },
    marginImage: {
      margin: '16px 0 0'
    },
    images: {
      width: '100%',
      borderRadius: 4,
      cursor: 'pointer',
      maxHeight: 150,
      height: 150,
      objectFit: 'cover'
    },
    btnImage: {
      position: 'relative',
      borderRadius: 4,
      overflow: 'hidden',
      verticalAlign: 'initial',
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '4px solid currentColor',
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
      [theme.breakpoints.down('xs')]: {
        fontSize: 16,
        padding: '12px 8px'
      },
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  })
);


const BoxListImageRoom: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { livingrooms, outdoors, furnitures, kitchens, bedrooms, bathrooms, cover_photo, roomName } = props;
  const { t } = useTranslation();
  const [openFullImage, setOpenFullImage] = useState<boolean>(false);

  const toggle = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpenFullImage(!openFullImage);
  };

  return (
    <Fragment>
      <Typography variant='h5' className={classes.name}>
        Khám phá căn hộ
      </Typography>
      <Typography variant='subtitle2' gutterBottom>
        Khám phá chi tiết từng ngóc ngách trong căn nhà !
      </Typography>

      <Grid container spacing={2} alignItems='baseline'>
        {livingrooms && livingrooms.images.length ? (
          <Grid item xs={6} sm={3}>
            <div className={classes.marginImage} onClick={toggle}>
              <img src={IMAGE_STORAGE_LG + livingrooms.images[0].name} alt={livingrooms.images[0].name} className={classes.images} />
              <Typography variant='subtitle2'>
                Phòng khách
              </Typography>
            </div>
          </Grid>
        ) : <Fragment />}

        {bedrooms[`bedroom_1`] && bedrooms[`bedroom_1`].images.length ? (
          <Grid item xs={6} sm={3}>
            <div className={classes.marginImage} onClick={toggle}>
              <img src={IMAGE_STORAGE_LG + bedrooms.bedroom_1.images[0].name} alt={bedrooms.bedroom_1.images[0].caption} className={classes.images} />
              <Typography variant='subtitle2'>
                Phòng ngủ
              </Typography>
            </div>
          </Grid>
        ) : <Fragment />}

        {bathrooms['bathroom_1'] && bathrooms['bathroom_1'].images.length ? (
          <Grid item xs={6} sm={3}>
            <div className={classes.marginImage} onClick={toggle}>
              <img src={IMAGE_STORAGE_LG + bathrooms['bathroom_1'].images[0].name} alt={bathrooms['bathroom_1'].images[0].caption} className={classes.images} />
              <Typography variant='subtitle2'>
                Phòng tắm
              </Typography>
            </div>
          </Grid>
        ) : <Fragment />}

        {kitchens.images.length && kitchens.images ? (
          <Grid item xs={6} sm={3}>
            <div className={classes.marginImage} onClick={toggle}>
              <img src={IMAGE_STORAGE_LG + kitchens.images[0].name} alt={kitchens.images[0].caption} className={classes.images} />
              <Typography variant='subtitle2'>
                Phòng bếp
              </Typography>
            </div>
          </Grid>
        ) : <Fragment />}

        {furnitures.images.length && furnitures.images ? (
          <Grid item xs={6} sm={3}>
            <div className={classes.marginImage} onClick={toggle}>
              <img src={IMAGE_STORAGE_LG + furnitures.images[0].name} alt={furnitures.images[0].caption} className={classes.images} />
              <Typography variant='subtitle2'>
                Nội thất
            </Typography>
            </div>
          </Grid>
        ) : <Fragment />}

        {outdoors.images.length && outdoors.images ? (
          <Grid item xs={6} sm={3}>
            <div className={classes.marginImage} onClick={toggle}>
              <img src={IMAGE_STORAGE_LG + outdoors.images[0].name} alt={outdoors.images[0].caption} className={classes.images} />
              <Typography variant='subtitle2'>
                Ngoài trời
              </Typography>
            </div>
          </Grid>
        ) : <Fragment />}
        {cover_photo.images && cover_photo.images.length ? (
          <Grid item xs={6} sm={3}>
            <ButtonBase
              onClick={toggle}
              focusRipple
              className={classes.btnImage}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: '100%',
              }}
            >
              <img src={IMAGE_STORAGE_LG + cover_photo.images[0].name} alt='cover' className={classes.images} />
              <span
                className={classes.imageSrc}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  Xem tất cả ảnh
              <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          </Grid>
        ) : <Fragment />}
      </Grid>

      <DialogFullImage open={openFullImage} handleClose={() => setOpenFullImage(false)}
        livingrooms={livingrooms}
        kitchens={kitchens}
        cover_photo={cover_photo}
        bathrooms={bathrooms}
        bedrooms={bedrooms}
        outdoors={outdoors}
        furnitures={furnitures}
        roomName={roomName}
      />
    </Fragment>
  );
};

export default BoxListImageRoom;