import { ThemeCustom } from '@/components/Theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, { Fragment, FunctionComponent, MouseEvent, useState, useRef } from 'react';
import { compose } from 'recompose';
import GridContainer from '@/components/Layout/GridContainer';
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
  ClickAwayListener
} from '@material-ui/core';
import to from '@/utils/to';
import * as animation from '@/store/Redux/Actions/animationTypes';
import { ReducersList } from '@/store/Redux/Reducers';
import {
  AnimationState,
  AnimationAction
} from '@/store/Redux/Reducers/global-animation';
import blue from '@material-ui/core/colors/blue';
import Orange from '@material-ui/core/colors/orange';
import { withCookies } from 'react-cookie';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Cookies from 'universal-cookie';
import Logo from '@/components/Toolbar/Logo';
import People from '@material-ui/icons/PersonRounded';
import PowerSettingsNewRounded from '@material-ui/icons/PowerSettingsNewRounded';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import IconMenu from '@material-ui/icons/Menu';
import * as types from '@/store/Redux/Actions/types';
import { SearchNavAction, SearchNavState } from '@/store/Redux/Reducers/searchNav';
import { SearchFilterState } from '@/store/Redux/Reducers/searchFilter';
import SwitchLanguage from '@/components/Toolbar/SwitchLanguage';
import { UseTranslationResponse, useTranslation } from 'react-i18next';
// import { ISideDrawerProps } from "@/components/ToolBar/SideDrawer";
// import { SearchFilterState } from "@/store/reducers/searchFilter";
// import { SearchNavAction, SearchNavState } from "@/store/reducers/searchNav";
// import ListCitySearch, { TransitionCustom } from "@/views/Rooms/Filter/ListCitySearch";
// import ForgetPasswordForm from "../Forms/ForgetPasswordForm";

interface IProps {
  classes?: any;
  hiddenListCitySearch?: boolean;
}

interface ILocalProps extends IProps {
  animation: AnimationState;
  cookies: Cookies;
  filter: SearchFilterState;
  searchNavMobile: SearchNavState;

  handleLoginButton(status: boolean): void;
  handleSignUpAnimation(status: boolean): void;
  handleOpenSearchMobile(openSearch: boolean): void;
  handleToggleDrawer(openDrawer: boolean): void;
}

const styles: any = (theme: ThemeCustom) => createStyles({
  root: {
    flexGrow: 1
  },
  containter: {
    zIndex: 1100,
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  grow: {
    flexGrow: 1,
    marginLeft: "20px",
    [theme.breakpoints.only("xs")]: {
      marginLeft: 0
    }
  },
  centerLogo: {
    justifyContent: "center"
  },
  button: {
    // height: theme!.palette!.button.nav,
    fontSize: '.875rem',
    letterSpacing: '.2px',
    borderRadius: 8,
    textTransform: "inherit",
    padding: '8px 20px',
    "&:hover": {
      color: Orange[500],
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
    },
    "&:focus": {
      color: Orange[500],
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
    }
  },
  buttonMerchantSite: {
    height: "unset",
    textTransform: "capitalize",
    color: Orange[500],
    borderRadius: 8,
    fontWeight: 700,
    boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)",
    marginRight: 16,
    MozTransition: "all 0.5s",
    WebkitTransition: "all 0.5s",
    transition: "all 0.5s",
    "&:hover": {
      color: Orange[500],
      backgroundColor: "#f9f9f9",
      boxShadow: "none"
    }
  },
  link: {
    textTransform: "inherit",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0)",
      color: blue[500]
    }
  },
  menuButton: {
    marginLeft: -28,
    marginRight: 20
  },
  drawer: {
    [theme.breakpoints.only("xs")]: {
      width: "80%"
    },
    width: "60%"
  },
  Popper: {
    zIndex: 999999
  },
  support: {
    top: "3em"
  },
  listSupport: {
    listStyle: "none"
  },
  roomType: {
    color: "rgb(118, 118, 118)",
    overflow: "hidden",
    fontSize: "1em",
    padding: "0.3em 0.5em",
    borderRadius: "4px",
    border: "1px solid #ffa726",
    whiteSpace: "normal",
    textOverflow: "ellipsis",
    letterSpacing: "normal",
    textAlign: "center"
  },
  fab: {
    margin: 8
  },
  rightIcon: {
    // marginLeft: theme.spacing
    marginLeft: 8
  },
  textSpan: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

const NavHeader: FunctionComponent<IProps> = (props: ILocalProps) => {
  const {
          classes,
          cookies,
          filter,
          handleOpenSearchMobile,
          searchNavMobile,
          handleToggleDrawer,
          hiddenListCitySearch
        } = props;

  const { t }: UseTranslationResponse = useTranslation();
  const [menuStatus, setMenuStatus] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openSearchMobile, setOpenSearchMobile] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const userRefButton = useRef(null);

  const closeMenu = () => {
    setMenuStatus(false);
  };

  const Hotline = (contact: string) => {
    window.location.href = `${contact}`;
  };

  const logoutTrigger = () => {
    window.location.reload();
    cookies.remove('_token', {
      path: '/'
    });
  };

  const loginButtonClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    props.handleLoginButton(true);
  };

  const signUpButtonClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    props.handleSignUpAnimation(true);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSearchMobile = () => {
    handleOpenSearchMobile(false);
  };

  return (
    <Fragment>
      <GridContainer
        xs = {12}
        sm = {12}
        md = {12}
        lg = {12}
        xl = {10}
        classNameItem = {classes.containter}
      >
        <AppBar
          elevation = {0}
          position = 'static'
          color = 'secondary'
          style = {{ backgroundColor: '#fffffff0' }}
        >
          <Toolbar className = {hiddenListCitySearch ? classes.centerLogo : null}>
            <Hidden smDown>
              <Logo />
              <div className = {classes.grow} />
              <Button
                href = 'https://merchant.westay.vn'
                // color = 'inherit'
                className = {classes.buttonMerchantSite}
                name = 'merchant-site'
                size = 'large'
              >
                {t('home:beComeHost')}
              </Button>

              <Button
                onClick = {() => setOpen(!open)}
                buttonRef = {userRefButton}
                name = 'support'
                color = 'inherit'
                className = {classes.button}
                size = 'large'
              >
                {t('home:contact')}
              </Button>

              <Popover
                open = {open}
                anchorEl = {userRefButton.current}
                anchorOrigin = {{
                  vertical: 'bottom',
                  horizontal: 'center'
                }}
                transformOrigin = {{
                  vertical: 'top',
                  horizontal: 'center'
                }}
              >
                <ClickAwayListener onClickAway = {handleClose}>
                  <Paper>
                    <MenuList>
                      <MenuItem
                        onClick = {() => Hotline('tel:0916374057')}
                        component = 'li'>
                        <ListItemIcon>
                          <PhoneIcon />
                        </ListItemIcon>
                        Hotline 1: 0916 374 057
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        onClick = {() => Hotline('tel:0946746417')}
                        component = {'li'}>
                        <ListItemIcon>
                          <PhoneIcon />
                        </ListItemIcon>
                        Hotline 2: 0946 746 417
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        onClick = {() => Hotline('tel:0917041849')}
                      >
                        <ListItemIcon>
                          <PhoneIcon />
                        </ListItemIcon>
                        {t('home:supportMerchant')}: 0917 041 849
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        onClick = {() => Hotline('mailto:info@westay.org')}
                      >
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
                  <Button
                    buttonRef = {userRefButton}
                    color = 'inherit'
                    className = {classes.button}
                    onClick = {() => setMenuStatus(!menuStatus)}
                    style = {{ backgroundColor: 'transparent' }}
                    size = 'large'
                  >
                    <Avatar>
                      <People />
                    </Avatar>
                  </Button>
                  <Popper
                    open = {menuStatus}
                    anchorEl = {userRefButton.current}
                    transition
                    className = {classes.Popper}
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style = {{
                          transformOrigin:
                            placement === 'bottom'
                              ? 'center top'
                              : 'center bottom',
                          minWidth: 300
                        }}
                      >
                        <Paper elevation = {1}>
                          <ClickAwayListener onClickAway = {closeMenu}>
                            <MenuList>
                              <MenuItem
                                name = 'profile'
                                onClick = {closeMenu}
                                {...to('/profile')}
                              >
                                <ListItemIcon>
                                  <AccountCircleOutlined />
                                </ListItemIcon>
                                Thông tin cá nhân
                              </MenuItem>
                              <Divider />
                              <MenuItem onClick = {logoutTrigger} component='li'>
                                <ListItemIcon>
                                  <PowerSettingsNewRounded />
                                </ListItemIcon>
                                {t('home:signUp')}
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
                    name = 'sign-in'
                    color = 'inherit'
                    className = {classes.button}
                    onClick = {loginButtonClick}
                    size = 'large'
                    // onMouseOver={() => LoginForm.preload()}
                  >
                    {t('home:signIn')}
                  </Button>
                  <Button
                    name = 'sign-up'
                    color = 'inherit'
                    className = {classes.button}
                    onClick = {signUpButtonClick}
                    size = 'large'
                    // onMouseOver={() => SignUpForm.preload()}
                  >
                    {t('home:signUp')}
                  </Button>

                  <SwitchLanguage/>
                </Fragment>
              )}
            </Hidden>
            <Hidden mdUp>
              <Logo />
              <div className = {classes.grow} />
              <IconMenu onClick = {() => handleToggleDrawer(true)} />

              <Fragment>
                <div>
                  <SwipeableDrawer
                    disableSwipeToOpen
                    open = {searchNavMobile.openDrawer}
                    onOpen = {() => handleToggleDrawer(true)}
                    onClose = {() => handleToggleDrawer(false)}
                    ModalProps = {{
                      keepMounted: true // Better open performance on mobile.
                    }}
                    classes = {{
                      paper: classes.drawer
                    }}
                  >
                    {/*<SideDrawer setOpen={handleToggleDrawer} />*/}
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

const mapStateToProps = (state: ReducersList) => {
  return {
    animation: state.v_animate,
    filter: state.searchFilter,
    searchNavMobile: state.searchNavMobile
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<AnimationAction | SearchNavAction>
) => {
  return {
    handleLoginButton: (status: boolean) =>
      dispatch({
        type: animation.LOGIN_BUTTON_CLICK,
        status: status
      }),
    handleSignUpAnimation: (status: boolean) =>
      dispatch({
        type: animation.SIGN_UP_BUTTON_CLICK,
        status: status
      }),
    handleOpenSearchMobile: (openSearch: boolean) => {
      dispatch({
        type: types.TOGGLE_SEARCH_NAV_MOBILE,
        openSearch: openSearch
      });
    },
    handleToggleDrawer: (openDrawer: boolean) =>
      dispatch({
        type: types.TOGGLE_DRAWER,
        openDrawer
      })
  };
};

export default compose<IProps, any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withCookies,
  withStyles(styles)
)(NavHeader);
