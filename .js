const themeToggleBtn = document.getElementById("toggle-theme");

themeToggleBtn.addEventListener("click", function(){
  document.body.classList.toggle("dark-mode")
});

//Getting the contact me form active

document.getElementById("contact-form").addEventListener("submit", function(e){
  e.preventDefault();
  const nameValue = document.getElementById("name").value;
  const emailValue = document.getElementById("email").value;
  const messageValue = document.getElementById("message").value;
  
  //Steps to store it in backend database
  //JSON is the format of data that most of the servers and APIs expect us to give
  const response = {nameValue, emailValue, messageValue, date:new Date().toISOString()};
  
  //we will create an empty list called responses
  //u can be using the website for the first time or u can be in a repeated session
  //When u send data to backend , u need to send as string
  //When u r getting it to front end u need to convert to JSON in order to display it
  const responses = JSON.parse(localStorage.getItem("responses")) || [ ];
  
  //to store the userResponses in response list
  responses.push(response)
  
  //When u send data to backend u need to send as string
  localStorage.setItem("responses", JSON.stringify(responses));
  console.log(responses);
  alert("Thank you for your message, I will get in touch with you ASAP");
  
  this.reset();
})

//ADMIN LOGIN implementation
function showAdminLogin(){
  document.getElementById("admin-login").style.display = "block";
}

document.getElementById("login-form").addEventListener("submit", function(e){
  
  e.preventDefault();
  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  const storedUsername = "admin";
  const storedPassword = "password";
  
  if(username == storedUsername && password == storedPassword){
    document.getElementById("admin-login").style.display = "none";
    document.getElementById("admin-section").style.display = "block";
    //user responses will now be visible but it will not have the userresponses yet
    alert("Welcome Admin")
    //by calling the function , the div with the ID user responses will be filled with all the user responses submitted by the ens user responses
    displayStoredUserResponses();
  }
  else{
    alert("Invalid credentials, please try again.")
  }
})

//Display all the user responses inside already created div block on HTML.
function displayStoredUserResponses(){
  
  const responseContainer = document.getElementById("user-responses");
  const responses = JSON.parse(localStorage.getItem("responses")) || [ ];
  
  responseContainer.innerHTML = '';
  responses.forEach(response =>{
    const responseElement = document.createElement("div");
    responseElement.innerHTML = `
    <p>Name: ${response.nameValue}</p>
    <p>Email: ${response.emailValue}</p>
    <p>Message: ${response.messageValue}</p>
    <p>Date: ${response.date}</p>
    <hr>
    `;
    responseContainer.appendChild(responseElement);
  })
}

