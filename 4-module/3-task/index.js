function highlight(table) {
  let rows = table.querySelectorAll("tr");

  Array.from(table.rows).forEach((row) => {
    if (row.cells[1].innerHTML < 18) {
      row.style = "text-decoration: line-through";
    }

    if (row.cells[2].innerHTML === "m") {
      row.classList.add("male");
    }
    if (row.cells[2].innerHTML === "f") {
      row.classList.add("female");
    }

    if (row.cells[3].dataset.available === "true") {
      row.classList.add("available");
    }

    if (row.cells[3].dataset.available === "false") {
      row.classList.add("unavailable");
    }

    if (!row.cells[3].hasAttributes()) {
      row.setAttribute("hidden", "");
    }
  });
}
