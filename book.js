async function fetchBookDetails() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const bookId = urlParams.get('id');
      const bookResponse = await fetch(`http://localhost:3000/books/${bookId}`);
      const book = await bookResponse.json();

      // Fetch the author details for the book
      const authorResponse = await fetch(`http://localhost:3000/authors/${book.authorId}`);
      const author = await authorResponse.json();

      // Display the book details on the page
      displayBookDetails(book, author);
    } catch (error) {
      console.log('Error fetching book details:', error);
    }
  }

  function displayBookDetails(book, author) {
    // Get the necessary HTML elements to display the book details
    const bookImage = document.getElementById('book-image');
    const bookTitle = document.getElementById('book-title');
    const bookAuthor = document.getElementById('book-author');
    const bookDescription = document.getElementById('book-description');

    // Set the content of the HTML elements with the book details
    bookImage.src = book.image;
    bookTitle.textContent = book.name;
    bookAuthor.textContent = author.name;
    bookDescription.textContent = book.description;
  }

  // Fetch book details and display them on the page
  fetchBookDetails();