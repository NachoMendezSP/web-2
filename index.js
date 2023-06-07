async function fetchBooks() {
  try {
    const booksResponse = await fetch('http://localhost:3000/books');
    const books = await booksResponse.json();

    const authorsResponse = await fetch('http://localhost:3000/authors');
    const authors = await authorsResponse.json();

    displayPopularBooks(books, authors);
    displayLatestBooks(books, authors);
  } catch (error) {
    console.log('Error fetching books and authors:', error);
  }
}

function generateBookCard(book, author) {
  return `
    <div class="col-md-3">
      <a href="book.html?id=${book.id}" class="card-link">
        <div class="card">
          <img src="${book.image}" class="card-img-top" alt="${book.name}">
          <div class="card-body">
            <h5 class="card-title">${book.name}</h5>
            <p class="card-text">${author.name}</p>
          </div>
        </div>
      </a>
    </div>
  `;
}

function displayPopularBooks(books, authors) {
  const popularBooksContainer = document.getElementById('popular-books-container');

  // Sort books by downloads in descending order
  const sortedBooks = books.sort((a, b) => b.downloads - a.downloads);

  // Get the top 4 books with the most downloads
  const topBooks = sortedBooks.slice(0, 4);

  // Generate HTML for each book card
  const bookCards = topBooks.map(book => {
    const author = authors.find(author => author.id === book.authorId);
    return generateBookCard(book, author);
  });

  // Append the book cards to the container
  popularBooksContainer.innerHTML = bookCards.join('');
}

function displayLatestBooks(books, authors) {
  const latestBooksContainer = document.getElementById('latest-books-container');

  // Sort books by id in descending order to get the most recent books
  const sortedBooks = books.sort((a, b) => b.id - a.id);

  // Get the top 4 most recent books
  const topBooks = sortedBooks.slice(0, 4);

  // Generate HTML for each book card
  const bookCards = topBooks.map(book => {
    const author = authors.find(author => author.id === book.authorId);
    return generateBookCard(book, author);
  });

  // Append the book cards to the container
  latestBooksContainer.innerHTML = bookCards.join('');
}

// Fetch books and authors, and display them on the page
fetchBooks();
