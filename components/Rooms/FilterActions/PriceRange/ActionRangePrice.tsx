import FormControl from '@material-ui/core/FormControl/FormControl';
import Grid from '@material-ui/core/Grid/Grid';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import InputBase from '@material-ui/core/InputBase/InputBase';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import React, {
  useState,
  useContext,
  useEffect,
  Dispatch,
  Fragment,
  ChangeEvent,
  SetStateAction,
  FC
} from 'react';
import InputRange, { Range } from 'react-input-range';
import _ from 'lodash';
import { Theme } from '@material-ui/core';
import {
  RoomIndexContext,
  MIN_PRICE,
  MAX_PRICE,
  STEP_PRICE,
  RoomIndexState
} from '@/store/Context/Room/RoomListContext';
import { WithStyles } from '@material-ui/styles';
import ButtonGlobal from '@/components/ButtonGlobal';
import { useTranslation } from 'react-i18next';
import numeral from 'numeral';
import { RoomFilterContext } from '@/store/Context/Room/RoomFilterContext';
import { updateRouter } from '@/store/Context/utility';

interface IProps extends WithStyles<typeof styles> {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

// export const usePriceEffect = (price: Range, setPrice: Dispatch<Range>, state: RoomIndexState) => {
//   const { price_day_from, price_day_to } = state;

//   useEffect(() => {
//     if (!_.isEqual(state.price, price)) {
//       setPrice({ max: price_day_to, min: price_day_from });
//     }
//   }, [price_day_from, price_day_to]);
// };

const styles = (theme: Theme) =>
  createStyles({
    marginPriceRange: {
      paddingLeft: '20px !important'
    },
    bootstrapRoot: {
      'label + &': {
        marginTop: theme.spacing(2)
      }
    },
    bootstrapInput: {
      borderRadius: 4,
      backgroundColor: theme!.palette!.common!.white!,
      border: '1px solid #ced4da',
      fontSize: 14,
      padding: '0.25rem 1.35rem',
      transition: theme!.transitions!.create!(['border-color', 'box-shadow']),
      '&:focus': {
        borderColor: '#80bdff'
      }
    },
    adornment: {
      position: 'absolute',
      left: '0.4rem',
      zIndex: 2
    },
    applyButton: {
      background: 'transparent',
      boxShadow: 'none',
      color: '#ff9800',
      fontWeight: 700,
      textTransform: 'initial',
      fontSize: '16px',
      padding: '2px 11px'
    }
  });

const ActionRangePrice: FC<IProps> = (props) => {
  const { classes, setOpen } = props;
  const { t } = useTranslation();
  const { state, dispatch } = useContext(RoomFilterContext);
  const { price_day_from, price_day_to } = state;

  const [price, setPrice] = useState<Range>({
    min: price_day_from ? price_day_from : MIN_PRICE,
    max: price_day_to ? price_day_to : MAX_PRICE
  });

  const setPriceEnhancement = (value: Range) => {
    if (value.min < MIN_PRICE) {
      value.min = MIN_PRICE;
    } else if (value.max > MAX_PRICE) {
      value.max = MAX_PRICE;
    }
    setPrice(value);
  };

  const handleChange = (name: keyof Range) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);

    if (isNaN(value) || event.target.value === '') {
      setPrice({ ...price, [name]: 0 });
    } else {
      if (name === 'max') {
        if (value > MAX_PRICE) {
          setPrice({ ...price, [name]: MAX_PRICE });
        } else {
          setPrice({ ...price, [name]: value });
        }
      } else {
        if (value < MIN_PRICE) {
          setPrice({ ...price, [name]: MIN_PRICE });
        } else {
          setPrice({ ...price, [name]: value });
        }
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setPrice({ max: price_day_to, min: price_day_from });
  };

  const hanldeSubmit = () => {
    setOpen(false);
    dispatch({ type: 'setPrices', price_day_from: price.min, price_day_to: price.max });
    updateRouter(true, 'price_day_from', price.min, 'price_day_to', price.max, 'page', 1);
  };

  // usePriceEffect(price, setPrice, state);

  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid container item xs={12} className={classes.marginPriceRange}>
          <InputRange
            allowSameValues={false}
            // onChangeComplete={afterChange}
            minValue={MIN_PRICE}
            maxValue={MAX_PRICE}
            step={STEP_PRICE}
            onChange={setPriceEnhancement}
            value={price}
          />
        </Grid>
        <Grid container item lg={6} sm={6}>
          <FormControl>
            <InputLabel shrink htmlFor="min-price-filter">
              Tối thiểu
            </InputLabel>
            <InputBase
              readOnly
              id="min-price-filter"
              value={numeral(price.min).format('0,0')}
              onChange={handleChange('min')}
              fullWidth
              classes={{
                root: classes.bootstrapRoot,
                input: classes.bootstrapInput
              }}
              startAdornment={
                <InputAdornment position="start" className={classes.adornment}>
                  đ
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid container item lg={6} sm={6}>
          <FormControl>
            <InputLabel shrink htmlFor="max-price-filter">
              Tối đa
            </InputLabel>
            <InputBase
              readOnly
              id="max-price-filter"
              value={numeral(price.max).format('0,0')}
              onChange={handleChange('max')}
              fullWidth
              classes={{
                root: classes.bootstrapRoot,
                input: classes.bootstrapInput
              }}
              startAdornment={
                <InputAdornment position="start" className={classes.adornment}>
                  đ
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: '15px' }}>
        <Grid item xs={6}>
          <ButtonGlobal
            height="35px"
            fontSize="14px"
            background="white"
            textColor="#000"
            onClick={handleClose}>
            {t('home:chooseGuestRoom:close')}
          </ButtonGlobal>
        </Grid>
        <Grid item xs={6}>
          <ButtonGlobal onClick={hanldeSubmit} height="35px" fontSize="14px" color="primary">
            {t('home:chooseGuestRoom:apply')}
          </ButtonGlobal>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(ActionRangePrice);
