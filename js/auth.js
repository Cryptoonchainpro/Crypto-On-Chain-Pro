function generateUserId(){
  return "UID" + Date.now();
}

function loginUser(){
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let users = getUsers();
  let user = users.find(u => u.email === email && u.password === password);

  if(user){
    localStorage.setItem("sessionUser", user.userId);
    window.location.href = "index.html";
  } else {
    alert("Invalid Email or Password");
  }
}

// Optional: Register User
function registerUser(){
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let users = getUsers();
  if(users.find(u => u.email === email)){
    alert("User already exists");
    return;
  }

  let newUser = {
    userId: generateUserId(),
    email,
    password,
    portfolio: [],
    transactions: [],
    balance: 0
  };

  users.push(newUser);
  saveUsers(users);
  alert("User created successfully!");
}
