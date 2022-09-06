function truncate(str, maxlength) {
  if (str.length <= maxlength) return str;

  if (str.length > maxlength) {
    str = str.slice(0, maxlength - 1);
    return str + "…";
  }
}

console.log(truncate("Hi everyone!", 20));
