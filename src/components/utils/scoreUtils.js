// haversine :: (Num, Num) -> (Num, Num) -> Num
const haversine = ([lat1, lon1], [lat2, lon2]) => {
  // Math lib function names
  const [pi, asin, sin, cos, sqrt, pow, round] = [
      "PI",
      "asin",
      "sin",
      "cos",
      "sqrt",
      "pow",
      "round"
    ].map(k => Math[k]),
    // degrees as radians
    [rlat1, rlat2, rlon1, rlon2] = [lat1, lat2, lon1, lon2].map(
      x => (x / 180) * pi
    ),
    dLat = rlat2 - rlat1,
    dLon = rlon2 - rlon1,
    radius = 6372.8; // km
  // km
  return (
    round(
      radius *
        2 *
        asin(
          sqrt(
            pow(sin(dLat / 2), 2) +
              pow(sin(dLon / 2), 2) * cos(rlat1) * cos(rlat2)
          )
        ) *
        100
    ) / 100
  );
};

export const computeScore = ([lat1, lon1], [lat2, lon2]) => {
  const params = { a: 3000 * 3000, b: 100 * 100, m: 1000 };
  const x = haversine([lat1, lon1], [lat2, lon2]);
  let score =
    params.m * Math.exp((-x * x) / params.a) +
    0.5 * params.m * Math.exp((-x * x) / params.b);
  score = score > 0 ? score : 0;
  return Math.floor(score);
};
