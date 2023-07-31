async function fetchBookDetails() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');
    const bookResponse = await fetch(`http://localhost:3000/books/${bookId}`);
    const book = await bookResponse.json();

    // Fetch the author details for the book
    const authorResponse = await fetch(`http://localhost:3000/authors/${book.authorId}`);
    const author = await authorResponse.json();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Display the book details on the page
    displayBookDetails(book, author);

    updateDownloadButton(book);
    
    updateRatingInput(book, currentUser);

    fetchCommentsForBook(book);

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

function updateRatingInput(book, currentUser) {
  // Get the necessary HTML elements
  const ratingInput = document.getElementById('rating-input');
  const rateButton = document.getElementById('rate-button');
  const currentRating = document.getElementById('current-rating');

  if (!currentUser) {
    // User is not logged in, disable the rating input and button
    ratingInput.disabled = true;
    rateButton.disabled = true;
    currentRating.textContent = 'Please log in to rate this book.';
  } else {
    // User is logged in, enable the rating input and button
    ratingInput.disabled = false;
    rateButton.disabled = false;
    currentRating.textContent = `Current rating: ${book.rating.toFixed(1)}`;
  }

  rateButton.addEventListener('click', async () => {
    try {
      if (!currentUser) {
        alert('Please log in to rate this book.');
        return;
      }

      // Get the new rating value from the input
      const newRating = parseInt(ratingInput.value);

      // Update the book's ratings array with the new rating
      book.ratings.push(newRating);

      // Calculate the new average rating for the book
      const totalRatings = book.ratings.reduce((sum, rating) => sum + rating, 0);
      const averageRating = totalRatings / book.ratings.length;
      book.rating = averageRating;

      // Update the number of ratings for the book
      book.ratingsAmount = book.ratings.length;

      // Send a PUT request to update the book on the JSON Server
      await fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      // Display the updated average rating
      currentRating.textContent = `Current rating: ${book.rating.toFixed(1)}`;

      // Disable the rating input and button after the user submits the rating
      ratingInput.disabled = true;
      rateButton.disabled = true;
    } catch (error) {
      console.log('Error updating rating:', error);
    }
  });
}

async function fetchCommentsForBook(book) {
  try {
    const commentsResponse = await fetch(`http://localhost:3000/comments?bookId=${book.id}`);
    const comments = await commentsResponse.json();

    // Fetch all users to match userId with username
    const usersResponse = await fetch('http://localhost:3000/users');
    const users = await usersResponse.json();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    displayComments(comments, users, currentUser, book);
  } catch (error) {
    console.log('Error fetching comments:', error);
  }
}

function displayComments(comments, users, currentUser, book) {
  const commentsList = document.getElementById('comments-list');
  const commentsMessage = document.getElementById('comments-message');

  // Reset the comments message to an empty string
  commentsMessage.textContent = '';

  if (comments.length === 0) {
    commentsMessage.textContent = 'No comments yet.';
    commentsList.innerHTML = '';
  } else {
    commentsList.innerHTML = '';

    comments.forEach(comment => {
      // Find the user object with matching userId
      const user = users.find(user => user.id === comment.userId);
      if (user) {
        const commentItem = document.createElement('div');
        commentItem.classList.add('comment-item');
        commentItem.innerHTML = `<strong>${user.username}:</strong> ${comment.text}`;
        commentsList.appendChild(commentItem);
      }
    });
  }

  // Set up the comment input and button based on whether the user is logged in or not
  const commentInput = document.getElementById('comment-input');
  const commentButton = document.getElementById('comment-button');

  if (!currentUser) {
    commentInput.disabled = true;
    commentButton.disabled = true;
    commentsMessage.textContent = 'Please log in to post comments.';
  } else {
    commentInput.disabled = false;
    commentButton.disabled = false;

    // Set up the event listener for the comment button to add a new comment
    commentButton.addEventListener('click', async () => {
      try {
        if (!currentUser) {
          alert('Please log in to post a comment.');
          return;
        }

        const commentText = commentInput.value;
        if (!commentText) {
          alert('Please enter a comment.');
          return;
        }

        const newComment = {
          bookId: book.id,
          userId: currentUser.userId, // Set the userId to the current user's id
          text: commentText
        };

        await fetch('http://localhost:3000/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newComment),
        });

        // Clear the input and fetch comments again to refresh the comments list
        commentInput.value = '';
        fetchCommentsForBook(book);
      } catch (error) {
        console.log('Error posting comment:', error);
      }
    });
  }
}

// Fetch book details and display them on the page
fetchBookDetails();
