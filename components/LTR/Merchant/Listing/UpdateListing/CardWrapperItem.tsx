import {
  createStyles,
  makeStyles,
  Theme,
  Grid,
  Button,
  Typography,
  Divider
} from '@material-ui/core';
import React, { FC, Fragment } from 'react';

interface IProps {
  classes?: any;
  children?: any;
  title: string;
  isShowModal?: boolean;
}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    wrapper: {
      margin: theme.spacing(2, 0)
    },
    divider: {
      margin: theme.spacing(4, 0)
    },
    title: {
      fontWeight: 600
    },
    wrapperBtn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    button: {
      color: '#1d8df7',
      textTransform: 'initial',
      backgroundColor: '#ffffff',
      border: '1px solid #1d8df7',
      '&:hover': {
        color: '#1d8df7',
        backgroundColor: '#ffffff',
        border: '1px solid #1d8df7'
      }
    }
  })
);

const CardWrapperItem: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const { children, title } = props;
  return (
    <Fragment>
      <Grid container className={classes.wrapper}>
        <Grid item xs={8} sm={9}>
          <Typography variant="subtitle1" className={classes.title}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={4} sm={3} className={classes.wrapperBtn}>
          <Button size="small" variant="outlined" color="primary" className={classes.button}>
            Cập nhật
          </Button>
        </Grid>
      </Grid>
      {children ? <Grid container>{children}</Grid> : ''}
      <Divider className={classes.divider} />
    </Fragment>
  );
};
export default CardWrapperItem;