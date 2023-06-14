let booksData = []; // Store the original books data
let authorsData = []; // Store the original authors data

async function fetchBooks() {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const searchQuery = searchParams.get('query');
  
      const responseBooks = await fetch('http://localhost:3000/books');
      booksData = await responseBooks.json();
      const responseAuthors = await fetch('http://localhost:3000/authors');
      authorsData = await responseAuthors.json();
  
      if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase().trim();
        searchBooks(lowerCaseQuery);
      } else {
        displayBooks(booksData, authorsData);
      }
    } catch (error) {
      console.log('Error fetching books:', error);
    }
  }
  
function displayBooks(books, authors) {
  const booksContainer = document.getElementById('books-container');

  // Clear the books container
  booksContainer.innerHTML = '';

  // Generate HTML for each book card
  books.forEach(book => {
    const author = authors.find(author => author.id === book.authorId);

    const card = document.createElement('div');
    card.classList.add('col-md-3');
    const link = document.createElement('a');
    link.href = `book.html?id=${book.id}`;
    link.classList.add('card-link');
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    const img = document.createElement('img');
    img.src = book.image;
    img.classList.add('card-img-top');
    img.alt = book.name;
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = book.name;
    const authorName = document.createElement('p');
    authorName.classList.add('card-text');
    authorName.textContent = author.name;

    cardBody.appendChild(title);
    cardBody.appendChild(authorName);
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);
    link.appendChild(cardDiv);
    card.appendChild(link);

    booksContainer.appendChild(card);
  });
}

function applyFilters(genreFilter, authorFilter) {
  // Filter books based on genre and author
  let filteredBooks = booksData;

  if (genreFilter) {
    filteredBooks = filteredBooks.filter(book => book.genre === genreFilter);
  }

  if (authorFilter) {
    filteredBooks = filteredBooks.filter(book => book.author === authorFilter);
  }

  // Display the filtered books
  displayBooks(filteredBooks, authorsData);
}

function searchBooks(searchQuery) {
  const lowerCaseQuery = searchQuery.toLowerCase().trim();

  // Filter books based on search query
  const filteredBooks = booksData.filter(book =>
    book.name.toLowerCase().includes(lowerCaseQuery) ||
    authorsData.find(author => author.id === book.authorId).name.toLowerCase().includes(lowerCaseQuery)
  );

  // Display the search results
  displayBooks(filteredBooks, authorsData);
}

// Event listener for the search button
const searchBtn = document.getElementById('search-button');
searchBtn.addEventListener('click', function () {
  const searchInput = document.getElementById('search-input');
  const searchQuery = searchInput.value;
  searchBooks(searchQuery);
});

// Fetch books and display them on the page
fetchBooks();
