import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

const celebrations = [
  "🤦",
  "🙄",
  "😐",
  "😅",
  "👍",
  "👏👏",
  "🙌🙌🙌",
  "🎉 🎖 🎉"
];

const useStyles = makeStyles(theme => ({
  main: {
    display: "flex",
    background: "#4fc3f7",
    height: "100vh",
    alignItems: "center",
    flexDirection: "column"
  },
  emojis: {
    color: "#FFFFFF",
    marginTop: theme.spacing(4),
    fontSize: "15vmin"
  },
  pointsBall: {
    marginTop: theme.spacing(4),
    height: "40vmin",
    width: "40vmin",
    borderRadius: "20vmin",
    backgroundColor: "#0093c4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#FFF",
    fontSize: "10vmin"
  }
}));

const aeroport1 = "BCN";
const aeroport2 = "PCI";
const price = 30;

const EndGame = ({ history, points, ...props }) => {
  const classes = useStyles();
  console.log((celebrations.length * points - 1) / 5000);
  useEffect(() => {
    setTimeout(() => {
      history.push("/waitingroom");
    }, 4000);
  });
  return (
    <div className={classes.main}>
      <span className={classes.emojis}>
        {
          celebrations[
            Math.max(0, Math.floor((celebrations.length * points - 1) / 5000))
          ]
        }
      </span>
      <div className={classes.pointsBall}>+{points}</div>
      <div>
        <span>{price} €</span>
        <a href={"https://www.skyscanner.es/transporte/vuelos"+aeroport1+"/"+aeroport2}>
          {/* <img alt="shopCart" src={shopCartImg}/> */}
        </a>
      </div>
    </div>
  );
};

export default withRouter(EndGame);
