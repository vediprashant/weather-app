
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const firstMessage  = document.querySelector('#first-message');
const secondMessage = document.querySelector('#second-message');

weatherForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const location = search.value;
      firstMessage.textContent='Loading the result';
      secondMessage.textContent='';
      fetch(`http://localhost:3000/weather?address=${location}`).then( (response) => {
    response.json().then( (data) => {
       if(data.error)
         return firstMessage.textContent=data.error;
       firstMessage.textContent=data.location;
       secondMessage.textContent=`${data.description}, Temperature is ${data.temperature} and it feels like ${data.feelslike}`;
    })
})
})