function factorial(n) {
  let factorial = 1;
  if (n === 0) return factorial;

  for (let i = 1; i <= n; i++) {
    factorial *= i;
  }
  return factorial;
}
