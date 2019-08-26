import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, { Fragment, FunctionComponent, useState, useRef, useContext, Dispatch, useEffect } from 'react';
import { compose } from 'recompose';
import {
  MenuItem,
  AppBar,
  Avatar,
  Button,
  Divider,
  Grow,
  MenuList,
  Paper,
  Popper,
  Toolbar,
  Hidden,
  SwipeableDrawer,
  ListItemIcon,
  Popover,
  ClickAwayListener,
  Theme,
  Badge,
  Typography
} from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import Orange from '@material-ui/core/colors/orange';
import { withCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import Logo from '@/components/Toolbar/Logo';
import People from '@material-ui/icons/PersonRounded';
import PowerSettingsNewRounded from '@material-ui/icons/PowerSettingsNewRounded';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import IconMenu from '@material-ui/icons/Menu';
import SwitchLanguage from '@/components/Toolbar/SwitchLanguage';
import { UseTranslationResponse, useTranslation } from 'react-i18next';
import GridContainer from '../Layout/Grid/Container';
import ButtonGlobal from '@/components/ButtonGlobal';
import SideDrawer from '@/components/Toolbar/SideDrawer';
import { GlobalContext } from '@/store/Context/GlobalContext';
import { useDispatch, useSelector } from 'react-redux';
import { CountUnreadRes } from '@/types/Requests/Notification/CountUnread';
import { ReducersList } from '@/store/Redux/Reducers';
import { NotificationReducerAction } from '@/store/Redux/Reducers/Notification/notification';
import { setMarkAllRead } from '@/store/Redux/Reducers/Notification/notification';
import MailIcon from '@material-ui/icons/Mail';
interface IProps {
  classes?: any;
  hiddenListCitySearch?: boolean;
  cookies: Cookies;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    containter: {
      zIndex: 4,
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    },
    grow: {
      flexGrow: 1,
      marginLeft: '20px',
      [theme.breakpoints.only('xs')]: {
        marginLeft: 0
      }
    },
    centerLogo: {
      justifyContent: 'center'
    },
    button: {
      fontSize: '.875rem',
      letterSpacing: '.2px',
      borderRadius: 8,
      textTransform: 'inherit',
      padding: '8px 20px',
      '&:hover': {
        color: Orange[500],
        backgroundColor: '#f9f9f9',
        borderRadius: '8px'
      },
      '&:focus': {
        color: Orange[500],
        backgroundColor: '#f9f9f9',
        borderRadius: '8px'
      }
    },
    buttonMerchantSite: {
      height: '40px',
      textTransform: 'capitalize',
      color: 'white',
      borderRadius: 8,
      fontFamily: 'Montserrat Alternates, Quicksand, sans-serif',
      fontWeight: 600,
      marginRight: 16,
      MozTransition: 'all 0.5s',
      WebkitTransition: 'all 0.5s',
      transition: 'all 0.5s',
      '&:hover': {
        backgroundColor: '#f9f9f9',
        boxShadow: 'none'
      }
    },
    link: {
      textTransform: 'inherit',
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0)',
        color: blue[500]
      }
    },
    menuButton: {
      marginLeft: -28,
      marginRight: 20
    },
    drawer: {
      [theme.breakpoints.only('xs')]: {
        width: '80%'
      },
      width: '60%'
    },
    Popper: {
      zIndex: 999999
    },
    support: {
      top: '3em'
    },
    listSupport: {
      listStyle: 'none'
    },
    roomType: {
      color: 'rgb(118, 118, 118)',
      overflow: 'hidden',
      fontSize: '1em',
      padding: '0.3em 0.5em',
      borderRadius: '4px',
      border: '1px solid #ffa726',
      whiteSpace: 'normal',
      textOverflow: 'ellipsis',
      letterSpacing: 'normal',
      textAlign: 'center'
    },
    fab: {
      margin: 8
    },
    rightIcon: {
      marginLeft: 8
    },
    textSpan: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    margin: {
      color: 'white',
      backgroundColor: 'red',
    },
    padding: {
      padding: theme.spacing(0, 1),
    },
    MuiBadge: {
      color: 'red'
    }
  });

const NavHeader: FunctionComponent<IProps> = (props) => {
  const { classes, cookies, hiddenListCitySearch } = props;

  const { t }: UseTranslationResponse = useTranslation();
  const [menuStatus, setMenuStatus] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const userRefButton = useRef(null);
  const { router } = useContext(GlobalContext);
  const count_unread = useSelector<ReducersList, CountUnreadRes>(
    (state) => state.notifications.count_unread
  );
  useEffect(() => {
    if (count_unread) {
      console.log(count_unread);
    }
  }, [count_unread]);
  const dispatch = useDispatch<Dispatch<NotificationReducerAction>>();
  const Hotline = (contact: string) => {
    window.location.href = `${contact}`;
  };

  const toProfile = () => {
    router.push('/profile');
  };

  const logoutTrigger = () => {
    window.location.reload();
    cookies.remove('_token', { path: '/' });
  };

  const loginButtonClick = () => {
    router.push('/auth/signin');
  };

  const signUpButtonClick = () => {
    router.push('/auth/signup');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openNotification = () => {
    setMarkAllRead().then(() => {
      dispatch({ type: 'setMarkAllRead', payload: { count: 0 } });
    });
    router.push('/profile');
  };

  // @ts-ignore
  return (
    <Fragment>
      <GridContainer xs={12} xl={12} classNameItem={classes.containter}>
        <AppBar
          elevation={0}
          position="static"
          color="secondary"
          style={{ backgroundColor: '#fffffff0' }}>
          <Toolbar className={hiddenListCitySearch ? classes.centerLogo : null}>
            <Hidden smDown>
              <Logo />
              <div className={classes.grow} />
              <ButtonGlobal
                href="https://merchant.westay.vn"
                // color = 'inherit'
                padding="0px 20px"
                className={classes.buttonMerchantSite}
                name="merchant-site"
                size="large">
                {t('home:merchantChannel')}
              </ButtonGlobal>

              {cookies.get('_token') && 
                <Button
                  onClick={openNotification}
                  buttonRef={userRefButton}
                  name="notification"
                  color="inherit"
                  className={classes.button}
                  size="large">
                  {count_unread ? (<Badge classes={{badge:classes.margin}} max={99} badgeContent={count_unread.count}>
                  <Typography className={classes.padding}>{t('home:notification')}</Typography>
                  </Badge>):t('home:notification')}
                </Button>
              }

              <Button
                onClick={() => setOpen(!open)}
                buttonRef={userRefButton}
                name="support"
                color="inherit"
                className={classes.button}
                size="large">
                {t('home:contact')}
              </Button>

              <Popover
                open={open}
                anchorEl={userRefButton.current}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center'
                }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <Paper>
                    <MenuList>
                      <MenuItem onClick={() => Hotline('tel:0916374057')} component="li">
                        <ListItemIcon>
                          <PhoneIcon />
                        </ListItemIcon>
                        Hotline 1: 0916 374 057
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={() => Hotline('tel:0946746417')} component={'li'}>
                        <ListItemIcon>
                          <PhoneIcon />
                        </ListItemIcon>
                        Hotline 2: 0946 746 417
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={() => Hotline('tel:0917041849')}>
                        <ListItemIcon>
                          <PhoneIcon />
                        </ListItemIcon>
                        {t('home:supportHost')}: 0917 041 849
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={() => Hotline('mailto:info@westay.org')}>
                        <ListItemIcon>
                          <EmailIcon />
                        </ListItemIcon>
                        Email: info@westay.org
                      </MenuItem>
                    </MenuList>
                  </Paper>
                </ClickAwayListener>
              </Popover>
              {cookies.get('_token') ? (
                <Fragment>
                  <SwitchLanguage />

                  <Button
                    buttonRef={userRefButton}
                    color="inherit"
                    className={classes.button}
                    onClick={() => setMenuStatus(!menuStatus)}
                    style={{ backgroundColor: 'transparent' }}
                    size="large">
                    <Avatar>
                      <People />
                    </Avatar>
                  </Button>
                  <Popper
                    open={menuStatus}
                    anchorEl={userRefButton.current}
                    transition
                    className={classes.Popper}>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                          minWidth: 300
                        }}>
                        <Paper elevation={1}>
                          <ClickAwayListener onClickAway={() => setMenuStatus(false)}>
                            <MenuList>
                              <MenuItem onClick={toProfile} component="li">
                                <ListItemIcon>
                                  <AccountCircleOutlined />
                                </ListItemIcon>
                                {t('home:profile')}
                              </MenuItem>
                              <Divider />
                              <MenuItem onClick={logoutTrigger} component="li">
                                <ListItemIcon>
                                  <PowerSettingsNewRounded />
                                </ListItemIcon>
                                {t('home:logout')}
                              </MenuItem>
                              {/*<Divider />*/}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </Fragment>
              ) : (
                <Fragment>
                  <Button
                    name="sign-in"
                    color="inherit"
                    className={classes.button}
                    onClick={loginButtonClick}
                    size="large"
                    // onMouseOver={() => LoginForm.preload()}
                  >
                    {t('home:signIn')}
                  </Button>

                  {/* <Link href="/auth/signup"> */}
                  <Button
                    href="/auth/signup"
                    name="sign-up"
                    color="inherit"
                    className={classes.button}
                    onClick={signUpButtonClick}
                    size="large"
                    // onMouseOver={() => SignUpForm.preload()}
                  >
                    {t('home:signUp')}
                  </Button>
                  {/* </Link> */}

                  <SwitchLanguage />
                </Fragment>
              )}
            </Hidden>
            <Hidden mdUp>
              <Logo />
              <div className={classes.grow} />
              <IconMenu onClick={() => setOpenDrawer(true)} />

              <Fragment>
                <div>
                  <SwipeableDrawer
                    disableSwipeToOpen
                    open={openDrawer}
                    onOpen={() => setOpenDrawer(true)}
                    onClose={() => setOpenDrawer(false)}
                    ModalProps={{
                      keepMounted: true // Better open performance on mobile.
                    }}
                    classes={{
                      paper: classes.drawer
                    }}>
                    <SideDrawer setOpen={setOpenDrawer} />
                  </SwipeableDrawer>
                </div>
              </Fragment>
            </Hidden>
          </Toolbar>
        </AppBar>
        {/*{props.animation.isLoginFormOpen && <LoginForm />}*/}
        {/*{props.animation.isSignUpFormOpen && <SignUpForm />}*/}
        {/*{props.animation.isForgetPasswordFormOpen && <ForgetPasswordForm />}*/}
      </GridContainer>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withCookies,
  withStyles(styles)
)(NavHeader);
