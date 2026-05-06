function checkSession(){
  let userId = localStorage.getItem("sessionUser");
  if(!userId){
    window.location.href = "login.html";
  }
}

function logout(){
  localStorage.removeItem("sessionUser");
  window.location.href = "login.html";
}
