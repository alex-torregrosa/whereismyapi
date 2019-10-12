import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
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
    marginTop: theme.spacing(4),
    zIndex: 1
  },
  playButtonContainer: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  },
  sunImage: {
    color: "#FFFFFF",
    maxHeight: "200px",
    maxWidth: "200px",
    height: "50vmin",
    width: "50vmin",
    animationName: "$sunGrow",
    animationDuration: "1s",
    animationIterationCount: "infinite",
    animationDirection: "alternate",
    animationTimingFunction: "linear"
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
    padding: "0px",
    maxHeight: "300px",
    pointerEvents: "none"
  },
  groundImg: {
    width: "100%",
    margin: "0px",
    padding: "0px",
    marginBottom: "-20px",
    pointerEvents: "none"
  },
  cloudContainer: {
    position: "fixed",
    top: 0,
    right: 0
  },
  titleContainer: {
    position: "fixed",
    left: "50%",
    top: "15vmin",
    transform: "translate(-50%,0%)",
    textAlign: "center",
    width: "80vw"
  },
  cloudImage: {
    height: "40vmin",
    width: "80vmin"
  },
  "@media screen and (max-width:824px) and (orientation:landscape) ": {
    groundContainer: {
      bottom: "-15vw"
    },
    playButtonContainer: {
      transform: "translate(-50%,-30%)"
    },
    titleContainer: {
      top: "0vmin"
    }
  },
  "@keyframes sunGrow": {
    from: { transform: "scale(1)" },
    to: { transform: "scale(1.1)" }
  }
}));

const MainPage = ({ history, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.cloudContainer}>
        <img src={Cloud} className={classes.cloudImage} alt="Cloud" />
      </div>
      <div className={classes.titleContainer}>
        <Typography variant="h3" className={classes.titleText}>
          Where's my <b>API</b>?
        </Typography>
      </div>
      <div className={classes.playButtonContainer}>
        <IconButton
          aria-label="play"
          onClick={() => history.push("/gateselection")}
        >
          <img src={Sun} className={classes.sunImage} alt="Sun" />
        </IconButton>
      </div>
      <div className={classes.groundContainer}>
        <img className={classes.groundImg} src={Ground} alt="Mountain" />
      </div>
    </div>
  );
};

export default withRouter(MainPage);
