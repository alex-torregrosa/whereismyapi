import React from "react";
import { Chart } from "react-google-charts";

export const BarChart = ({ data, ...props }) => {
  let dataPts = [
    [
      "Gate",
      "Points",
      { role: "style" },
      {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify"
      }
    ]
  ];
  for (let item in data)
    dataPts = [...dataPts, [item, data[item], "#FF1654", null]];
  return (
    <div>
      <Chart
        width={"100vw"}
        height={"70vh"}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={dataPts}
        options={{
          title: "",
          width: "80vw",
          height: "70vh",
          bar: { groupWidth: "95%" },
          legend: { position: "none" },
          backgroundColor: "#B2DBBF"
        }}
        // For tests
        rootProps={{ "data-testid": "6" }}
      />
    </div>
  );
};
