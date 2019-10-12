import React from "react";
import { Chart } from "react-google-charts";

export const BarChart = ({ data, ...props }) => {
  let dataPts = [
    [
      "Element",
      "Density",
      { role: "style" },
      {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify"
      }
    ]
  ];
  console.log(data);
  for (let item in data)
    dataPts = [...dataPts, [item, data[item], "red", null]];
  console.log(dataPts);
  return (
    <div>
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        // data={[
        //   [
        //     "Element",
        //     "Density",
        //     { role: "style" },
        //     {
        //       sourceColumn: 0,
        //       role: "annotation",
        //       type: "string",
        //       calc: "stringify"
        //     }
        //   ],
        //   // dataPts
        //   ["Copper", 8.94, "#b87333", null],
        //   ["Silver", 10.49, "silver", null],
        //   ["Gold", 19.3, "gold", null],
        //   ["Platinum", 21.45, "color: #e5e4e2", null]
        // ]}
        data={dataPts}
        options={{
          title: "",
          width: 600,
          height: 400,
          bar: { groupWidth: "95%" },
          legend: { position: "none" }
        }}
        // For tests
        rootProps={{ "data-testid": "6" }}
      />
    </div>
  );
};
