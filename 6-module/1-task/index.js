/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */

import createElement from "../../assets/lib/create-element.js";

export default class UserTable {
  elem;

  constructor(rows) {
    this.rows = rows;

    this.#renderTable();
  }

  #renderTable() {
    this.elem = createElement(this.#template());

    const btns = this.elem.querySelectorAll("button");

    btns.forEach((btn) =>
      btn.addEventListener("click", () => {
        btn.closest("tr").remove();
      })
    );
    return this.elem;
  }

  #template() {
    return `
  
    <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
          </tr>
        </thead>
      
        <tbody>
         ${this.rows
           .map(
             (row) =>
               `<tr>${row} 
               <td>${row.name}</td>
               <td>${row.age}</td>
               <td>${row.salary}</td>
               <td>${row.city}</td>
               <td><button data-action >X</button></td>
               </tr>`
           )
           .join("\n")}
         
        </tbody>
        <table>
       
    `;
  }
}
