import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { withRouter } from "react-router-dom";
import { Map, TileLayer, Marker } from "react-leaflet";
import { WhiteCircularProgress } from "./utils/WhiteComponents";
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
  }
}));

const TheGame = ({ history, gate, gameState, ...props }) => {
  const classes = useStyles();
  const { departureAirportGeography, arrivalAirportGeography } = gameState;

  if (!gameState) {
    return (
      <div className={clsx([classes.main, classes.load])}>
        <WhiteCircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.main}>
      <Typography variant="h3" className={classes.titleText}>
        TheGame2
      </Typography>
      <div className={classes.mapContainer}>
        <Map className={classes.map} center={[41.3828939, 2.1774322]} zoom={5}>
          <TileLayer url="https://api.mapbox.com/styles/v1/alextorre98/ck1n5yfjz0l4m1cmzjvxg4c11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxleHRvcnJlOTgiLCJhIjoiY2sxbjV4eG4yMDdoazNtbzYyN241dzJxcSJ9.bU2z_rn5C-uJbISiCs6MEQ" />
          <Marker
            position={[
              departureAirportGeography.latitude,
              departureAirportGeography.longitude
            ]}
          />
          <Marker
            position={[
              arrivalAirportGeography.latitude,
              arrivalAirportGeography.longitude
            ]}
          />
        </Map>
      </div>
    </div>
  );
};

export default withRouter(TheGame);
