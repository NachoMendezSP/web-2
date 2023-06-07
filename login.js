// Function to handle the login process
async function handleLogin(event) {
    event.preventDefault();

    // Get the values from the input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      // Fetch the users data from the JSON server
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();

      // Find the user with the matching email and password
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        // User found
        if (user.admin === 1) {
          // Redirect to admin page for admin users
          window.location.href = 'admin.html';
        } else {
          // Redirect to index page for regular users
          window.location.href = 'index.html';
        }
      } else {
        // User not found, display an error message
        alert('Invalid email or password');
      }
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  }

  // Attach event listener to the login button
  const loginBtn = document.querySelector('.login-container button');
  loginBtn.addEventListener('click', handleLogin);