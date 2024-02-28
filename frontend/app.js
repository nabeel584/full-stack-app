

// For SignUP
const username = document.querySelector('#name')
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const signUpButton = document.querySelector('#signUpButton');
const displayMessage = document.querySelector('.displayMessage')

signUpButton.addEventListener('click', (e) => {
  e.preventDefault();
  signUpUser();
});



const signUpUser = async () => {



const emailValue = email.value;
const passwordValue = password.value;
const usernameValue = username.value
console.log(passwordValue, emailValue,usernameValue )

  let API_URI = 'http://localhost:3000/api';
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
    displayMessage.innerHTML = data.message
  }
};
