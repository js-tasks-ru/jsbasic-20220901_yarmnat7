function sumSalary(salaries) {
  let sumSalaries = 0;
  for (let key in salaries) {
    if (Number.isFinite(salaries[key])) {
      sumSalaries += salaries[key];
    }
  }
  return sumSalaries;
}

// Еще вариант

// function sumSalary(salaries) {
//   let values = Object.values(salaries);
//   let sumSalaries = 0;
//   values.forEach((value) => {
//     if (Number.isFinite(value)) {
//       sumSalaries += value;
//     }
//   });
//   return sumSalaries;
// }
