
//Global
const username = document.querySelector('#name')
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');
const signUpButton = document.querySelector('#signUpButton');
const signInButton = document.querySelector('#signInButton');
const displayMessage = document.querySelector('.displayMessage')
const loginBtnText = document.querySelector('.login-button')
let API_URI = 'http://localhost:3000/api';

// For SignUP
signUpButton?.addEventListener('click', (e) => {
  e.preventDefault();
  signUpUser();
});



const signUpUser = async () => {



const emailValue = email.value;
const passwordValue = password.value;
const usernameValue = username.value
console.log(passwordValue, emailValue,usernameValue )


  const response = await fetch(`${API_URI}/users/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: usernameValue,
      email: emailValue,
      password: passwordValue,
    }),
  });

  const data = await response.json();
  if(data){
    if(data.message.includes('User account has been created successfully')){
      loginBtnText.innerHTML = "Go To Login"
    }
    displayMessage.innerHTML = data.message
  }
};

//For sign In 

signInButton?.addEventListener('click', (e) => {
  e.preventDefault();
  signInUser();
})


const signInUser = async () => {

  const loginEmailValue = loginEmail.value
  const loginPasswordValue = loginPassword.value
  console.log(loginEmailValue, loginPasswordValue)

const response = await fetch(`${API_URI}/users/signIn`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: loginEmailValue,
    password: loginPasswordValue
  })
})

const data = await response.json()
displayMessage.innerHTML = data.message
if(data.message.includes('User Logged In successfully')){
  window.location.href = 'http://127.0.0.1:5500/frontend/products.html'
}
}

// For Home Page


