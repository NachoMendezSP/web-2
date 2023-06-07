function fetchBooks() {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const books = data.books;
        const authors = data.authors;
        displayPopularBooks(books, authors);
        displayLatestBooks(books, authors);
      })
      .catch(error => {
        console.log('Error fetching books:', error);
      });
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
      const card = `
        <div class="col-md-3">
          <a href="#" class="card-link">
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
      return card;
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
      const card = `
        <div class="col-md-3">
          <a href="#" class="card-link">
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
      return card;
    });
  
    // Append the book cards to the container
    latestBooksContainer.innerHTML = bookCards.join('');
  }
  
  // Fetch books and display them on the page
  fetchBooks();
  