// For SignUP

const userName = document.querySelector('#username');
const password = document.querySelector('#password');
const signUpButton = document.querySelector('#signUpButton');

signUpButton.addEventListener('click', (e) => {
  e.preventDefault();
  signUpUser();
});

const userNameValue = userName.value;
const passwordValue = password.value;

const signUpUser = async () => {
  let API_URI = 'http://localhost:3000/api';

  const respnnse = await fetch(`${API_URI}/users/signUp`, {
    method: 'POST',
    body: {
      name: userNameValue,
      password: passwordValue,
    },
  });

  const data = respnnse.json();
  console.log(data);

  //   console.log(fetchData);
};
