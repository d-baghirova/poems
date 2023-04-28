// Information to reach API
const url = 'https://api.datamuse.com/words?';
const queryParams = 'rel_rhy=';
 
// Selecting page elements
const more = document.getElementById('more');
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');
 
// Asynchronous function
const getSuggestion = async(num) => {
    const wordQuery = inputField.value;
    const endpoint = url+queryParams+wordQuery;
    try {
      const response = await fetch(endpoint, {cache: "no-cache"});
      if (response.ok){
          const jsonResponse = await response.json();
          renderResponse(jsonResponse,num); 
      }
    } catch (error){
      console.log(error);
    }
  }



// More
let n = 20;

const displayMoreSuggestions = (event) => {
  event.preventDefault();
  if (responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  }
  getSuggestion(n);
  n+=10
}



//Starter


// Clear previous results and display results to webpage
const displaySuggestions = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  }
  getSuggestion(10);
}

submit.addEventListener('click', displaySuggestions);
more.addEventListener('click', displayMoreSuggestions);

