import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ShopCart from "../images/cart.svg";

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

const getData = async (aeroport1, aeroport2) => {
  const url = `https://www.skyscanner.net/g/chiron/api/v1/flights/browse/browsequotes/v1.0/ES/EUR/en-GB/${aeroport1}/${aeroport2}/anytime`;
  const response = await axios.get(url, {
    headers: { "api-key": "skyscanner-hackupc2019", Accept: "application/json" }
  });
  const data = response.data;
  return data["Quotes"][0]["MinPrice"];
};

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
  },
  priceContainer: {
    display: "flex",
    backgroundColor: "#0093c4",
    borderRadius: theme.spacing(1),
    fontSize: "50px",
    padding: theme.spacing(1),
    alignItems: "center",
    marginTop: theme.spacing(4),
    color: '#FFF'
  },
  cartContainer: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(1)
  },
  cartImg: {
    height: "15vmin",
    width: "15vmin"
  }
}));

const EndGame = ({ gameState, history, points, ...props }) => {
  const aeroport1 = gameState.startIata;
  const aeroport2 = gameState.endIata;

  const classes = useStyles();
  const [price, setPrice] = useState(-1);

  useEffect(() => {
    setTimeout(() => {
      // history.push("/waitingroom");
    }, 10000);
  });

  useEffect(() => {
    let aero1 = gameState.startIata;
    let aero2 = gameState.endIata;
    if (aero1 && aero2) getData(aero1, aero2).then(p => setPrice(p));
  }, [gameState]);

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
      {price !== -1 && <div className={classes.priceContainer}>
        <div>{price} €</div>           
        <a target="_blank" className={classes.cartContainer} href={"https://www.skyscanner.es/transporte/vuelos/" + aeroport1 + "/" + aeroport2}>
          <img alt="shopCart" src={ShopCart} className={classes.cartImg} />
        </a>
        
      </div>}

    </div>
  );
};

export default withRouter(EndGame);
