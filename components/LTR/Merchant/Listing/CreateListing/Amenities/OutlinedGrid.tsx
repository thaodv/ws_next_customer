import React, { FC } from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

interface IProps {
  classes?: any;
  children: any;
  label: string;

}
const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    wrapper: {
      marginBottom: theme.spacing(6)
    },
    inputLabel: {
      fontSize: "24px",
      fontWeight: 800,
      color: '#484848',
    }
  })
);
const InputComponent = ({ inputRef, ...other }) => <div {...other} />;

const OutlinedDiv: FC<IProps> = (props) => {
  const classes = useStyles(props);
  const {children, label} = props;
  return (
    <TextField
      className={classes.wrapper}
      variant="outlined"
      label={label}
      multiline
      InputLabelProps={{
        shrink: true,
        classes: {
          root: classes.inputLabel,
        }
      }}
      InputProps={{
        inputComponent: InputComponent
      }}
      inputProps={{ children: children }}
    />
  );
};
export default OutlinedDiv;
