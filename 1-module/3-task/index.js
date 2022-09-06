function ucFirst(str) {
  if (str === "") return "";
  const capitalizedStr = str[0].toUpperCase() + str.toLowerCase().slice(1);
  return capitalizedStr;
}
