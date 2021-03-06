import React, { Fragment, FC, memo, Dispatch, useContext, SetStateAction } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme, ListItemText, ListItem, Divider, List } from '@material-ui/core';
import { compose } from 'recompose';
import { withCookies, Cookies } from 'react-cookie';
import { GlobalContext } from '@/store/Context/GlobalContext';
import to from '@/utils/to';
import { useTranslation } from 'react-i18next';
import SwitchLanguage from '@/components/Toolbar/SwitchLanguage';

interface IProps {
  classes?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  cookies: Cookies;
}

const useStyles = makeStyles<Theme, IProps>((theme: Theme) =>
  createStyles({
    list: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%'
    },
    img: {
      width: '100%',
      backgroundPosition: 'center',
      maxHeight: 200,
      backgroundSize: 'cover',
      objectFit: 'cover',
      backgroundRepeat: 'no-repeat'
    },
    signOut: {
      color: '#FFA712',
      fontSize: 16,
      lineHeight: '22px',
      letterSpacing: 'normal',
      fontWeight: 600,
      display: 'block',
      position: 'relative',
      textDecoration: 'none'
    },
    listItem: {
      padding: 0
    },
    listItemGutters: {
      paddingLeft: 24,
      paddingRight: 24
    },
    text: {
      fontSize: 16,
      lineHeight: '22px',
      letterSpacing: 'normal',
      fontWeight: 600,
      display: 'block',
      position: 'relative',
      textDecoration: 'none'
    },
    hotline: {
      fontWeight: 800
    },
    becomeHost: {
      textAlign: 'center',
      padding: '12px 20px',
      color: ' #FFFFFF',
      background: 'linear-gradient(to right, #FFC54D, #FFA712)',
      boxShadow: 'none',
      fontWeight: 800,
      borderRadius: '100px !important'
    }
  })
);

const SideDrawer: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { setOpen, cookies } = props;
  const { router } = useContext(GlobalContext);
  const isLogin = !!cookies.get('_token');
  const { t } = useTranslation();

  const logoutTrigger = () => {
    cookies.remove('_token', { path: '/' });
    setOpen(false);
    router.push('/');
  };

  return (
    <Fragment>
      <List className={classes.list}>
        <div className="top">
          <ListItem
            classes={{
              gutters: classes.listItemGutters
            }}
            component="a"
            href="https://merchant.westay.vn"
            button
            onClick={() => setOpen(false)}>
            <ListItemText
              primary={t('home:becomeAHost')}
              classes={{
                primary: classes.becomeHost,
                root: classes.listItem
              }}
            />
          </ListItem>

          {/* <ListItem button {...to("/")} onClick={() => setOpen(false)}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText
            primary="Trang chủ"
            classes={{
              primary: classes.text
            }}
          />
        </ListItem> */}

          {isLogin ? (
            <Fragment>
              <ListItem
                classes={{
                  gutters: classes.listItemGutters
                }}
                component="a"
                href="/"
                button
                onClick={() => setOpen(false)}>
                <ListItemText
                  primary={t('home:home')}
                  classes={{
                    primary: classes.text
                  }}
                />
              </ListItem>
              <ListItem
                classes={{
                  gutters: classes.listItemGutters
                }}
                button
                onClick={() => setOpen(false)}
                href="/profile">
                {/* <ListItemIcon>
                <AccountCircle />
              </ListItemIcon> */}
                <ListItemText
                  primary={t('home:profile')}
                  classes={{
                    primary: classes.text
                  }}
                />
              </ListItem>
            </Fragment>
          ) : (
            <Fragment>
              <ListItem
                classes={{
                  gutters: classes.listItemGutters
                }}
                button
                onClick={() => {
                  router.push('/auth/signin');
                }}>
                {/* <ListItemIcon>
              <AccountCircle />
            </ListItemIcon> */}
                <ListItemText
                  primary={t('home:signIn')}
                  classes={{
                    primary: classes.text
                  }}
                />
              </ListItem>
              <ListItem
                classes={{
                  gutters: classes.listItemGutters
                }}
                button
                onClick={() => {
                  router.push('/auth/signup');
                }}>
                {/* <ListItemIcon>
              <AccountCircle />
            </ListItemIcon> */}
                <ListItemText
                  primary={t('home:signUp')}
                  classes={{
                    primary: classes.text
                  }}
                />
              </ListItem>

            </Fragment>
          )}
        </div>

        <div className="bottom">
          <ListItem
            classes={{
              gutters: classes.listItemGutters
            }}
            button>
            <SwitchLanguage/>
          </ListItem>
          <ListItem
            button
            onClick={() => setOpen(false)}
            component="a"
            href="https://blog.westay.vn/"
            classes={{
              gutters: classes.listItemGutters
            }}>
            <ListItemText
              primary={t('home:blogContainer:blog')}
              classes={{
                primary: classes.text
              }}
            />
          </ListItem>

          <ListItem
            button
            component="a"
            onClick={() => setOpen(false)}
            href="/terms-and-conditions"
            classes={{
              gutters: classes.listItemGutters
            }}>
            <ListItemText
              primary={t('home:policyTerms')}
              classes={{
                primary: classes.text
              }}
            />
          </ListItem>

          <Divider />

          <ListItem
            classes={{
              gutters: classes.listItemGutters
            }}>
            <ListItemText
              primary={
                <span>
                  Hotline <br />
                  <span className={classes.hotline}>0916 374 057 - 0946 746 417</span>
                </span>
              }
              classes={{
                primary: classes.text
              }}
            />
          </ListItem>
          <ListItem
            classes={{
              gutters: classes.listItemGutters
            }}>
            <ListItemText
              primary={
                <span>
                  {t('home:supportHost')} <br />
                  <span className={classes.hotline}>0917 041 849</span>
                </span>
              }
              classes={{
                primary: classes.text
              }}
            />
          </ListItem>

          {isLogin ? (
            <ListItem
              classes={{
                gutters: classes.listItemGutters
              }}>
              <ListItemText
                primary={t('home:logout')}
                onClick={logoutTrigger}
                classes={{
                  primary: classes.signOut
                }}
              />
            </ListItem>
          ) : (
            ''
          )}
        </div>
      </List>
    </Fragment>
  );
};

export default compose<IProps, any>(
  withCookies,
  memo
)(SideDrawer);
