import React from "react";
import { withStyles } from "@material-ui/styles";
import { CircularProgress, LinearProgress } from "@material-ui/core";

export const WhiteCircularProgress = withStyles({
  root: {
    color: "#FFF"
  }
})(CircularProgress);

export const WhiteLinearProgress = withStyles({
  bar1Indeterminate: {
    backgroundColor: "#FFF"
  },
  bar2Indeterminate: {
    backgroundColor: "#FFF"
  }
})(LinearProgress);
