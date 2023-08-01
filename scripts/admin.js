// Fetch all books and populate the book list
function fetchBooks() {
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(books => {
        const bookList = document.getElementById('book-list');
        bookList.innerHTML = '';

        books.forEach(book => {
          const listItem = document.createElement('li');
          listItem.classList.add('list-group-item');
          listItem.innerHTML = `<strong>Author:</strong> ${book.authorId}, <strong>Name:</strong> ${book.name}`;

          const deleteButton = document.createElement('button');
          deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'float-right');
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', () => deleteBook(book.id));

          listItem.appendChild(deleteButton);
          bookList.appendChild(listItem);
        });
      });
}

// Delete a book
function deleteBook(bookId) {
    fetch(`http://localhost:3000/books/${bookId}`, { method: 'DELETE' })
      .then(() => {
        // Refresh book list after deletion
        fetchBooks();
      });
}

// Fetch all books and populate the edit book list
function fetchBooksForEditing() {
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(books => {
        const editBookList = document.getElementById('edit-book-list');
        editBookList.innerHTML = '';

        books.forEach(book => {
          const listItem = document.createElement('li');
          listItem.classList.add('list-group-item');
          listItem.innerHTML = `
            <div class="d-flex justify-content-between">
              <div>
                <span><strong>Author:</strong> ${book.authorId}</span>
                <span><strong>Name:</strong> ${book.name}</span>
              </div>
              <button class="btn btn-primary btn-sm" data-toggle="collapse" data-target="#edit-book-${book.id}">Edit</button>
            </div>
            <div id="edit-book-${book.id}" class="collapse">
              <div class="form-group">
                <label for="edit-book-image-${book.id}">Image URL</label>
                <input type="text" id="edit-book-image-${book.id}" class="form-control" value="${book.image}">
              </div>
              <div class="form-group">
                <label for="edit-book-name-${book.id}">Book Name</label>
                <input type="text" id="edit-book-name-${book.id}" class="form-control" value="${book.name}">
              </div>
              <div class="form-group">
                <label for="edit-book-author-${book.id}">Author ID</label>
                <input type="text" id="edit-book-author-${book.id}" class="form-control" value="${book.authorId}">
              </div>
              <div class="form-group">
                <label for="edit-book-description-${book.id}">Description</label>
                <textarea id="edit-book-description-${book.id}" class="form-control">${book.description}</textarea>
              </div>
              <button class="btn btn-primary btn-sm" onclick="saveBookChanges(${book.id})">Save Changes</button>
              <button class="btn btn-secondary btn-sm" data-toggle="collapse" data-target="#edit-book-${book.id}">Cancel</button>
            </div>
          `;

          editBookList.appendChild(listItem);
        });
      });
}

// Save changes for an edited book
function saveBookChanges(bookId) {
    const imageInput = document.getElementById(`edit-book-image-${bookId}`);
    const nameInput = document.getElementById(`edit-book-name-${bookId}`);
    const authorInput = document.getElementById(`edit-book-author-${bookId}`);
    const descriptionInput = document.getElementById(`edit-book-description-${bookId}`);

    const updatedBook = {
      image: imageInput.value,
      name: nameInput.value,
      authorId: authorInput.value,
      description: descriptionInput.value
    };

    fetch(`http://localhost:3000/books/${bookId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedBook)
    })
      .then(() => {
        // Refresh book list after saving changes
        fetchBooksForEditing();
      });
}

// Event listener for the add book form
const addBookForm = document.getElementById('add-book-form');
addBookForm.addEventListener('submit', event => {
    event.preventDefault();

    const nameInput = document.getElementById('add-book-name');
    const authorInput = document.getElementById('add-book-author');
    const imageInput = document.getElementById('add-book-image');
    const descriptionInput = document.getElementById('add-book-description');

    
    const newBook = {
      name: nameInput.value,
      authorId: parseInt(authorInput.value),
      genreId: 1,
      image: imageInput.value,
      description: descriptionInput.value,
      downloads: 0,
      rating: 5,
      ratingsAmount: 0,
      ratings: []
    };

    fetch('http://localhost:3000/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook)
    })
      .then(() => {
        // Clear input fields after adding a book
        nameInput.value = '';
        authorInput.value = '';
        imageInput.value = '';
        descriptionInput.value = '';

        // Refresh book list after adding a book
        fetchBooks();
      });
  });

// Function to fetch all users and populate the user list
function fetchUsers() {
    fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then(users => {
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';
  
        users.forEach(user => {
          const listItem = document.createElement('li');
          listItem.classList.add('list-group-item');
          listItem.innerHTML = `
            <div class="d-flex justify-content-between">
              <div>
                <span><strong>Username:</strong> ${user.username}</span>
                <span><strong>Email:</strong> ${user.email}</span>
              </div>
              <button class="btn ${user.admin === 1 ? 'btn-danger' : 'btn-success'} btn-sm" onclick="toggleAdmin(${user.id})">
                ${user.admin === 1 ? 'Revoke Admin' : 'Grant Admin'}
              </button>
            </div>
          `;
  
          userList.appendChild(listItem);
        });
      });
  }
  
  // Function to toggle admin status for a user
  function toggleAdmin(userId) {
    fetch(`http://localhost:3000/users/${userId}`)
      .then(response => response.json())
      .then(user => {
        const updatedUser = {
          ...user,
          admin: user.admin === 1 ? 0 : 1 // Toggle the admin status (0 to 1 or 1 to 0)
        };
  
        fetch(`http://localhost:3000/users/${userId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser)
        })
          .then(() => {
            // Refresh user list after updating admin status
            fetchUsers();
          });
      });
  }
  
  // Event listener for tab changes
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    const targetTab = $(e.target).attr('href');
  
    if (targetTab === '#delete-book') {
      // Fetch books for deletion
      fetchBooks();
    } else if (targetTab === '#edit-book') {
      // Fetch books for editing
      fetchBooksForEditing();
    } else if (targetTab === '#user-management') {
      // Fetch users for user management
      fetchUsers();
    }
  });
  