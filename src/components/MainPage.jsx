import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
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
    marginTop: "20%"
  },
  playButtonContainer: {
    marginTop: "20%"
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
        JocRandom
      </Typography>
      <div className={classes.playButtonContainer}>
        <IconButton aria-label="play">
          <PlayArrowIcon
            fontSize="large"
            className={classes.playIcon}
            classes={{ fontSizeLarge: classes.bigFont }}
            onClick={() => history.push("/gateselection")}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default withRouter(MainPage);
