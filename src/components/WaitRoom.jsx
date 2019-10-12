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
    background: "#c5ecf7",
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
    background: "#0093c4"
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
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [waiting, setWaiting] = useState(false);
  const [queued, setQueued] = useState(false);

  // Registra listener per a gameScores
  useEffect(() => {
    console.log("Running effects");
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
    const intId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => {
      clearInterval(intId);
    };
  }, []);

  // Reseteja waiting al rebre estat nou de firebase
  useEffect(() => {
    setWaiting(Date.now() > gameState.endTime);
  }, [gameState]);

  if (!gameState) {
    return (
      <div className={clsx([classes.main, classes.load])}>
        <WhiteCircularProgress />
      </div>
    );
  }

  const { endTime, startTime } = gameState;

  const Countdown = (...props) => {
    let remTime = 0;
    if (currentTime < startTime) {
      remTime = startTime - currentTime;
      setQueued(true);
    } else if (currentTime < endTime + 30000) {
      if (queued) {
        history.push("/play");
        return 0;
      }
      remTime = endTime - currentTime + 30000;
    } else remTime = -1000;

    remTime = Math.floor(remTime / 1000);
    if (!waiting && remTime === -1) setWaiting(true);
    console.log("rendering");
    return (
      <Typography variant="h3" component="span" className={classes.seconds}>
        {remTime}
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
            <Countdown />
          )}
        </div>
      </div>
      <div>
        {(() => {
          let arr = [];
          for (let team in gameScores)
            arr.push(
              <Typography variant="h5" key={`teamscore_${team}`}>
                {team}: {gameScores[team]}
              </Typography>
            );
          return arr;
        })()}
        <BarChart data={gameScores} />
      </div>
      <br />
    </div>
  );
};

export default withRouter(WaitingRoom);
