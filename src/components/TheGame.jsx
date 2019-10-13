import React, { createRef, useState, useEffect } from "react";
import { Typography, LinearProgress, createMuiTheme } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import clsx from "clsx";
import cuid from "cuid";
import { withRouter } from "react-router-dom";
import { Map, TileLayer, Marker } from "react-leaflet";
import { WhiteCircularProgress } from "./utils/WhiteComponents";
import db from "../lambda/lib/firebase";
import { IconArrival, IconDeparture, IconPlane } from "./utils/icons";
import { computeScore } from "./utils/scoreUtils";
import ImgArrival from "../images/arrival.svg";
import ImgDeparture from "../images/departure.svg";

const defaultTheme = createMuiTheme();

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
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  mapContainer: {
    height: "100%",
    width: "100vw",
    margin: "0 auto",
    display: "flex"
  },
  map: {
    flex: 1
  },
  progressHolder: {
    width: "100vw"
  },
  thiccProgressBar: {},
  timeSpan: {
    display: "inline-block",
    padding: "10px"
  },
  timeContainer: {
    display: "inline-block",
    position: "relative",
    padding: "2px",
    paddingLeft: "15px"
  },
  timeImg: {
    height: "50px",
    width: "50px",
    marginBottom: "-10px"
  }
}));

const CustomLinearProgress = withStyles({
  bar1Determinate: {
    backgroundColor: "#FFF"
  },
  bar2Indeterminate: {
    backgroundColor: "#FFF"
  }
})(LinearProgress);

const TheGame = ({ history, gate, gameState, setPoints, ...props }) => {
  const classes = useStyles();
  const {
    departureAirportGeography,
    arrivalAirportGeography,
    endTime,
    startTime
  } = gameState;
  const mapRef = createRef();

  //States
  const [clickPtr, setClickPtr] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);

  // Registra l'interval de clock
  useEffect(() => {
    const intId = setInterval(() => {
      setCurrentTime(Date.now());
      if (Date.now() > gameState.endTime) {
        if (clickPtr.length !== 0) {
          // Submit score
          const dir = db.ref("/users/" + gate + "/" + cuid());
          console.log([clickPtr.lat, clickPtr.lng]);
          let punts = computeScore(
            [clickPtr.lat, clickPtr.lng],
            [gameState.latitude, gameState.longitude]
          );
          dir.set(punts);
          setPoints(punts);
          //history.push("/endGame");
        } else {
          setPoints(0);
          //history.push("/endGame");
        }
      }
    }, 1000);
    return () => {
      clearInterval(intId);
    };
  }, [gameState, clickPtr, gate, history, setPoints]);

  //Map click handler
  const handleClick = e => {
    setClickPtr(e.latlng);
  };

  function timeConverter(t) {
    var a = new Date(t + 60 * 60000); //Hardcoded timezone
    var year = a.getFullYear();
    var month = a.getMonth() + 1; // Return number between 0 and 11
    var date = a.getDate();
    var hour = a.getHours() < 10 ? "0" + a.getHours() : a.getHours();
    var min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds();
    var time =
      hour + ":" + min + ":" + sec + " " + date + "/" + month + "/" + year;
    return time;
  }

  // Loader
  if (!gameState) {
    return (
      <div className={clsx([classes.main, classes.load])}>
        <WhiteCircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.main}>
      <div>
        <span className={classes.timeSpan}>
          <img src={ImgDeparture} alt="Departure" className={classes.timeImg} />
          <div className={classes.timeContainer}>
            <div>{timeConverter(gameState.planeDeparture)}</div>
            <div>{gameState.startAirport}</div>
          </div>
        </span>
        <span className={classes.timeSpan}>
          <img src={ImgArrival} alt="Arrival" className={classes.timeImg} />
          <div className={classes.timeContainer}>
            <div>{timeConverter(gameState.planeArrival)}</div>
            <div>{gameState.endAirport}</div>
          </div>
        </span>
      </div>
      <div className={classes.progressHolder}>
        <ThemeProvider theme={{ ...defaultTheme, direction: "rtl" }}>
          <CustomLinearProgress
            className={classes.thiccProgressBar}
            variant="determinate"
            value={(100 * (endTime - currentTime)) / (endTime - startTime)}
          />
        </ThemeProvider>
      </div>

      <div className={classes.mapContainer}>
        <Map
          className={classes.map}
          center={[
            departureAirportGeography.latitude,
            departureAirportGeography.longitude
          ]}
          zoom={2}
          ref={mapRef}
          onClick={handleClick}
        >
          <TileLayer url="https://api.mapbox.com/styles/v1/alextorre98/ck1n5yfjz0l4m1cmzjvxg4c11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxleHRvcnJlOTgiLCJhIjoiY2sxbjV4eG4yMDdoazNtbzYyN241dzJxcSJ9.bU2z_rn5C-uJbISiCs6MEQ" />
          <Marker
            position={[
              departureAirportGeography.latitude,
              departureAirportGeography.longitude
            ]}
            icon={IconDeparture}
          />
          <Marker
            position={[
              arrivalAirportGeography.latitude,
              arrivalAirportGeography.longitude
            ]}
            icon={IconArrival}
          />
          {clickPtr.length !== 0 && (
            <Marker position={clickPtr} icon={IconPlane} />
          )}
        </Map>
      </div>
    </div>
  );
};

export default withRouter(TheGame);
