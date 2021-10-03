console.log('Client side JS file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = 'loading!';
  messageTwo.textContent = '';
  messageThree.textContent = '';

  const url = `http://localhost:3000/weather?address=${location}`;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.forecast;
        messageTwo.textContent = data.location;
        messageThree.textContent = data.address;
      }
    });
  });
});
