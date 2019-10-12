import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const gates = ["A1", "A2", "A3", "B1", "B2", "B3", "C1"];

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
    marginTop: "10%"
  },
  gateList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    marginTop: theme.spacing(4)
  },
  gateButton: {
    width: "70vw",
    marginTop: theme.spacing(2)
  }
}));

const WhiteButton = withStyles({
  root: {
    borderColor: "#FFF",
    color: "#FFF"
  }
})(Button);

const GateSelector = ({ setGate, history, ...props }) => {
  const classes = useStyles();

  const selectGate = gate => () => {
    setGate(gate);
    history.push("/waitingroom");
  };
  return (
    <div className={classes.main}>
      <Typography variant="h3" className={classes.titleText}>
        gate selection
      </Typography>
      <div className={classes.gateList}>
        {gates.map((gate, index) => (
          <WhiteButton
            key={`gate${index}`}
            variant="outlined"
            className={classes.gateButton}
            size="large"
            onClick={selectGate(gate)}
          >
            {gate}
          </WhiteButton>
        ))}
      </div>
    </div>
  );
};

export default withRouter(GateSelector);
