import { withStyles } from '@material-ui/core/styles';
import { Dialog } from '@material-ui/core';
import { color, background } from "../constants";

export default withStyles({
  root: {
    '& .MuiDialog-paper': {
      color,
      background
    }
  },
})(Dialog);