function showSalary(users, age) {
  let salaryStr = users
    .filter((user) => user.age <= age)
    .map((user) => {
      return user.name + ", " + user.balance;
    })
    .join("\n");

  return salaryStr;
}
