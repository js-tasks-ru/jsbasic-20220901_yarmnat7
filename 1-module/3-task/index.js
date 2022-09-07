function ucFirst(str) {
  if (!str) return "";
  return str[0].toUpperCase() + str.toLowerCase().slice(1);
}
