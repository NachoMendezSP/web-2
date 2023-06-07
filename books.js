let booksData = []; // Store the original books data
let authorsData = []; // Store the original authors data

async function fetchBooks() {
  try {
    const responseBooks = await fetch('http://localhost:3000/books');
    booksData = await responseBooks.json();
    const responseAuthors = await fetch('http://localhost:3000/authors');
    authorsData = await responseAuthors.json();
    displayBooks(booksData, authorsData);
  } catch (error) {
    console.log('Error fetching books:', error);
  }
}

function displayBooks(books, authors) {
  const booksContainer = document.querySelector('.books-container .row');

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

function applyFilters() {
  const genreFilter = document.getElementById('genre-filter');
  const authorFilter = document.getElementById('author-filter');

  const selectedGenre = genreFilter.value;
  const selectedAuthor = authorFilter.value;

  // Filter books based on genre and author
  let filteredBooks = booksData;

  if (selectedGenre !== '0') {
    filteredBooks = filteredBooks.filter(book => book.genreId === parseInt(selectedGenre));
  }

  if (selectedAuthor !== '0') {
    filteredBooks = filteredBooks.filter(book => book.authorId === parseInt(selectedAuthor));
  }

  // Display the filtered books
  displayBooks(filteredBooks, authorsData);
}

// Event listener for the "Apply Filters" button
const applyFiltersBtn = document.getElementById('apply-filters-btn');
applyFiltersBtn.addEventListener('click', applyFilters);

// Fetch books and display them on the page
fetchBooks();
