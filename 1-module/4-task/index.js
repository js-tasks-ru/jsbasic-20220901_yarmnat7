function checkSpam(str) {
  str = str.toLowerCase();
  return str.includes("1xbet") || str.includes("xxx");
}

// Еще вариант
// function checkSpam(str) {
//   let spam = ['1xbet', 'xxx'];
//   return spam.some(word => str.toLowerCase().includes(word));
// }
