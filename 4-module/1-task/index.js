// function makeFriendsList(friends) {
//   const fullName = friends.map((friend) => {
//     return [`${friend.firstName} ${friend.lastName}`];
//   });

//   const ul = document.createElement("ul");
//   ul.classList.add("friends-list");
//   for (i = 0; i < friends.length; i++) {
//     const li = document.createElement("li");
//     li.innerHTML = `${fullName[i]}`;
//     ul.appendChild(li);
//   }
//   return ul;
// }

// Another variant
function makeFriendsList(friends) {
  const ul = document.createElement("ul");

  for (obj in friends) {
    let fullName = `${friends[obj].firstName} ${friends[obj].lastName}`;
    const li = document.createElement("li");
    li.innerHTML = fullName;
    ul.appendChild(li);
  }
  return ul;
}
