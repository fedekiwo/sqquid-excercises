import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Typography, Box, TextareaAutosize } from "@material-ui/core";
import { color, background } from "../constants";
import MD from "./md";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  "MuiTab-textColorPrimary": {
    color
  },
  backgroundDefault: {
    background
  }
}));

export default function DescriptionEditMenu(props) {
  const { onChangeDescription, description } = props
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.backgroundDefault}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Edit" {...a11yProps(0)} className={classes["MuiTab-textColorPrimary"]} />
          <Tab label="Preview" {...a11yProps(1)} className={classes["MuiTab-textColorPrimary"]} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className={classes.backgroundDefault}>
        <TextareaAutosize
          placeholder="Complete with a description of your task..."
          rowsMin={10}
          value={description}
          onChange={onChangeDescription}
          style={{ background: "#4b515f", color, width: "100%" }}
        />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.backgroundDefault}>
        <MD description={description} />
      </TabPanel>
    </div>
  );
}
