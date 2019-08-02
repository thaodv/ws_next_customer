import React, { useContext, useState, FC } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { AppBar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import ContentPlaceHolder from '@/components/PlaceHolder/ContentPlaceHolder';
import { formatMoney } from '@/utils/mixins';
import GridContainer from '@/components/Layout/Grid/Container';
import BoxBooking from '../BoxBooking';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { RoomDetailsContext } from '@/store/Context/Room/RoomDetailContext';
import ButtonGlobal from '@/components/ButtonGlobal';
import numeral from 'numeral';

const Transition = (props: any) => {
  return <Slide direction="up" {...props} />;
};

const NavBottomBook: FC = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { width } = useContext(GlobalContext);
  const { state } = useContext(RoomDetailsContext);
  const { room } = state;

  if (room === null) {
    return <ContentPlaceHolder />;
  }

  const handleClick = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <Grid className="navBottomBook">
      <AppBar position="fixed" color="inherit" className="barSearch">
        <Toolbar className="toolBar">
          <GridContainer xs={12} sm={12} md={11} lg={10}>
            <Grid container spacing={0} className={'container'}>
              <Grid item xs={8} sm={9}>
                <Grid container>
                  <Grid item xs={12} sm={4}>
                    <div>
                      <span className={'price'}>
                        {numeral(room.price_day).format('0,0')} VND / ngày
                      </span>
                    </div>
                  </Grid>
                  {room!.rent_type != 2 && (
                    <Grid item xs={12} sm={4}>
                      <span className={'price'}>
                        {numeral(room.price_hour).format('0,0')} VND / 4 giờ
                      </span>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={4} sm={3}>
                <ButtonGlobal padding="0px" width="100%" onClick={handleClick} className={'btBook'}>
                  Đặt phòng
                </ButtonGlobal>
              </Grid>
            </Grid>
          </GridContainer>
        </Toolbar>
      </AppBar>

      <Dialog
        aria-labelledby="customized-dialog-title"
        TransitionComponent={Transition}
        keepMounted
        scroll="body"
        fullScreen={width === 'xs'}
        maxWidth="xs"
        open={openDialog}
        onClose={handleClick}>
        <DialogTitle className="navBottomBook__dialogTitle">
          <IconButton className={'button'} aria-label="Close" onClick={handleClick}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="navBottomBook__dialogContent">
          <BoxBooking />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default NavBottomBook;