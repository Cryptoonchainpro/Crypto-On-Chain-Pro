function getCurrentUser(){
  let userId = localStorage.getItem("sessionUser");
  let users = getUsers();
  return users.find(u => u.userId === userId);
}

function updateUserData(updatedUser){
  let users = getUsers();
  let index = users.findIndex(u => u.userId === updatedUser.userId);
  users[index] = updatedUser;
  saveUsers(users);
}
