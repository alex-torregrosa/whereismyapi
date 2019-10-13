import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {
  WhiteCircularProgress,
  WhiteLinearProgress
} from "./utils/WhiteComponents";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import ClockIcon from "@material-ui/icons/Alarm";
import db from "../lambda/lib/firebase";
import { BarChart } from "./utils/BarChart";

const gameScoresRef = db.ref("/scores");

const useStyles = makeStyles(theme => ({
  main: {
    display: "flex",
    background: "#70C1B3",
    height: "100vh",
    alignItems: "center",
    flexDirection: "column"
  },
  seconds: {
    color: "#FFFFFF"
  },
  linHolder: {
    paddingLeft: theme.spacing(2)
  },
  secondsHolder: {
    flexGrow: 1,
    textAlign: "center"
  },
  load: {
    justifyContent: "center"
  },
  timeCounter: {
    display: "flex",
    width: "100vw",
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    alignItems: "center",
    background: "#247BA0"
  },
  timeIcon: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(-0.5)
  }
}));

const BigClockIcon = withStyles({
  root: {
    color: "#FFF",
    fontSize: "3rem"
  }
})(ClockIcon);

const WaitingRoom = ({ gameState, gate, history, ...props }) => {
  const classes = useStyles();
  const [gameScores, setGameScores] = useState([]);
  const [seconds, setSeconds] = useState(99);
  const [waiting, setWaiting] = useState(true);
  const [queued, setQueued] = useState(false);

  // Registra listener per a gameScores
  useEffect(() => {
    gameScoresRef.on("value", snapshot => {
      const val = snapshot.val();
      setGameScores(val);
    });
    return () => {
      gameScoresRef.off();
    };
  }, []);

  //Registra l'interval de clock
  useEffect(() => {
    //Do not let direct access:
    if (gate === "-") history.push("/");
    const { endTime, startTime } = gameState;
    const intId = setInterval(() => {
      // Prepare times
      let time = Date.now();
      let remTime = 0;
      const nextStart = endTime + 29000;

      // Prepare for start if came before
      if (time < startTime) {
        remTime = startTime - time;
        setQueued(true);
      } else if (time < nextStart) {
        if (queued) {
          // Start game if queued
          setWaiting(true);
          history.push("/play");
          return 0;
        }
        remTime = nextStart - time;
      } else remTime = -1000; // Waiting for update
      // Adjust to seconds
      remTime = Math.floor(remTime / 1000);
      if (remTime === -1) {
        setWaiting(true);
      } else {
        setSeconds(remTime);
        setWaiting(false);
      }
    }, 1000);
    return () => {
      clearInterval(intId);
    };
  }, [gameState, history, queued, waiting]);

  if (!gameState) {
    return (
      <div className={clsx([classes.main, classes.load])}>
        <WhiteCircularProgress />
      </div>
    );
  }

  const Countdown = ({ time, ...props }) => {
    return (
      <Typography variant="h3" component="span" className={classes.seconds}>
        {time}
      </Typography>
    );
  };
  return (
    <div className={classes.main}>
      <div className={classes.timeCounter}>
        <BigClockIcon className={classes.timeIcon} />
        <div className={classes.secondsHolder}>
          {waiting ? (
            <div className={classes.linHolder}>
              <WhiteLinearProgress />
            </div>
          ) : (
            <Countdown time={seconds} />
          )}
        </div>
      </div>
      <div>
        <BarChart data={gameScores} />
      </div>
      <br />
    </div>
  );
};

export default withRouter(WaitingRoom);
