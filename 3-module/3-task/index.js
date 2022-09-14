function camelize(str) {
  str = str.split("-");
  const camelCase = str.map((val, ind) => {
    if (ind === 0) return val;
    return val[0].toUpperCase() + val.slice(1);
  });
  return camelCase.join("");
}
