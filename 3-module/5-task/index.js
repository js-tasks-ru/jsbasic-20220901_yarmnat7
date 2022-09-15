function getMinMax(str) {
  str = str.split(" ").filter((val) => Number(val));

  let minMax = str.reduce((val) => ({
    min: Math.min(...str),
    max: Math.max(...str),
  }));

  return minMax;
}
