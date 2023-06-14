async function handleLogin(event) {
  event.preventDefault();

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');

  // Reset error messages
  emailError.textContent = '';
  passwordError.textContent = '';

  // Get the values from the input fields
  const email = emailInput.value;
  const password = passwordInput.value;

  // Validate email
  if (email.trim() === '') {
    emailError.textContent = 'Please enter your email.';
    emailError.classList.add('text-danger');
    return;
  }

  // Validate password
  if (password.trim() === '') {
    passwordError.textContent = 'Please enter your password.';
    passwordError.classList.add('text-danger');
    return;
  }

  try {
    // Fetch the users data from the JSON server
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();

    // Find the user with the matching email and password
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      // User found
  
      // Save the logged-in user information to localStorage
      const currentUser = {
        email: user.email,
        isAdmin: user.admin === 1,
      };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
      if (user.admin === 1) {
        // Redirect to admin page for admin users
        window.location.href = 'admin.html';
      } else {
        // Redirect to index page for regular users
        window.location.href = 'index.html';
      }
    } else {
      // User not found, display an error message
      emailError.textContent = 'Invalid email or password';
      emailError.classList.add('text-danger');
    }
  }   catch (error) {
    console.log('Error fetching users:', error);
  }
}

// Attach event listener to the login button
const loginBtn = document.querySelector('.login-container button');
loginBtn.addEventListener('click', handleLogin);
