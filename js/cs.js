
function sendMail() {
  var params = {
    name: document.getElementById("your name").value,
    email: document.getElementById("your email").value,
    phone: document.getElementById("your phone").value,
    project: document.getElementById("your project").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_dpfzegq";
  const templateID = "template_cc5wrxa";

    emailjs.send(serviceID, templateID, params)
    .then(res=>{
        document.getElementById("your name").value = "";
        document.getElementById("your email").value = "";
        document.getElementById("your phone").value = "";
        document.getElementById("your project").value = "";
        document.getElementById("subject").value = "";
        document.getElementById("message").value = "";
        console.log(res);
        alert("Your message sent successfully!!")

    })
    .catch(err=>console.log(err));

}



















