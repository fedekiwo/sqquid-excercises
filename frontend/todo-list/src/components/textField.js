import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { color } from "../constants";

export default withStyles({
  root: {
    '& .MuiInput-underline': {
      color
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: color,
    },
    '& label.Mui-focused': {
      color
    },
  },
})(TextField);