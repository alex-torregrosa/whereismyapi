import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Sun from "../images/sun.svg";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  main: {
    display: "flex",
    background: "#4fc3f7",
    height: "100vh",
    alignItems: "center",
    flexDirection: "column"
  },
  titleText: {
    color: "#FFFFFF",
    marginTop: theme.spacing(4)
  },
  playButtonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  playIcon: {
    color: "#FFFFFF"
  },
  bigFont: {
    fontSize: "10rem"
  }
}));

const MainPage = ({ history, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Typography variant="h3" className={classes.titleText}>
        Where's my <b>API</b>?
      </Typography>
      <div className={classes.playButtonContainer}>
        <IconButton
          aria-label="play"
          onClick={() => history.push("/gateselection")}
        >
          <img src={Sun} height="250px" width="250px" alt="Sun" />
          {/* <PlayArrowIcon
            fontSize="large"
            className={classes.playIcon}
            classes={{ fontSizeLarge: classes.bigFont }}
          /> */}
        </IconButton>
      </div>
    </div>
  );
};

export default withRouter(MainPage);
