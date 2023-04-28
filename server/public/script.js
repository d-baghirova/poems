const fetchAllButton = document.getElementById('fetch-quotes');
const fetchRandomButton = document.getElementById('fetch-random');
const fetchByAuthorButton = document.getElementById('fetch-by-author');

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.querySelector('.quote');
const attributionText = document.querySelector('.attribution');

const submitButton = document.getElementById("submit-quote")

const resetQuotes = () => {
  quoteContainer.innerHTML = '';
}

const renderError = response => {
  quoteContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
}

const renderQuotes = (quotes = []) => {
  resetQuotes();
  if (quotes.length > 0) {
    quotes.forEach(quote => {
      const newQuote = document.createElement('div');
      newQuote.className = 'single-quote';
      newQuote.innerHTML = `<div class="quote-text">
      <h2>${quote.title}</h2>
      <p>${quote.poem}</p>
      <p>${quote.author}</p>
      </div>`;
      quoteContainer.appendChild(newQuote);
    });
  } else {
    quoteContainer.innerHTML = '<p>Your request returned no quotes.</p>';
  }
}

fetchAllButton.addEventListener('click', () => {
  fetch('/poems')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes(response);
  });
});

submitButton.addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const poem = document.getElementById('poem').value;
  const author = document.getElementById('author').value;

  fetch(`/create?title=${title}&poem=${poem}&author=${author}`, {
    method: 'POST',
  })
  .then(response => response.json())
  .then((poem) => {
    const newQuote = document.createElement('div');
    newQuote.innerHTML = `
    <h3>Congrats, your quote was added!</h3>
    <div class="title">${poem.title}</div>
    <div class="quote-text">${poem.poem}</div>
    <div class="attribution">- ${poem.author}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `
    quoteContainer.appendChild(newQuote);
  });
});

//fetchAllButton.addEventListener('click', async() => {
//  try {
//    let response = await fetch('/articles');
//    if (response.ok){
//      let jsonResponse = response.json();
//      renderQuotes(jsonResponse);
//    }
//  } catch (err){
//    console.log(err);
//  }
//})