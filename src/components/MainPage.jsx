import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Sun from "../images/sun.svg";
import Ground from "../images/ground.svg";
import { withRouter } from "react-router-dom";
import Cloud from "../images/cloud.svg";

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
  },
  groundContainer: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    padding: "0px"
  },
  groundImg: {
    width: "100%",
    margin: "0px",
    padding: "0px",
    marginBottom: "-20px"
  },
  cloudContainer: {
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: 1
  }
}));

const MainPage = ({ history, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.cloudContainer}>
        <img src={Cloud} alt="Cloud" />
      </div>
      <Typography variant="h3" className={classes.titleText}>
        Where's my <b>API</b>?
      </Typography>
      <div className={classes.playButtonContainer}>
        <IconButton
          aria-label="play"
          onClick={() => history.push("/gateselection")}
        >
          <img src={Sun} height="250px" width="250px" alt="Sun" />
        </IconButton>
      </div>
      <div className={classes.groundContainer}>
        <img className={classes.groundImg} src={Ground} alt="Mountain"/>
      </div>
    </div>
  );
};

export default withRouter(MainPage);
