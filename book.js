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
    updateDownloadButton(book);
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

async function updateDownloadButton(book) {
  const downloadButton = document.getElementById('download-button');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    // User is not logged in, make the download button inactive
    downloadButton.classList.add('disabled');
    downloadButton.textContent = 'Log in to download';
  } else {
    // User is logged in, enable the download button and handle the download action
    downloadButton.classList.remove('disabled');
    downloadButton.textContent = 'Download';

    downloadButton.addEventListener('click', async () => {
      try {
        // Increment the downloads count in the book object
        const updatedBook = { ...book, downloads: book.downloads + 1 };
        await fetch(`http://localhost:3000/books/${book.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedBook),
        });
        window.location.href = '#';
        
        // If I had uploaded the different pdf files, would replace 'book-file.pdf' with the actual file name
        // window.location.href = 'path/to/book-file.pdf';
      } catch (error) {
        console.log('Error updating downloads:', error);
      }
    });
  }
}

// Fetch book details and display them on the page
fetchBookDetails();
