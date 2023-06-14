document.getElementById('signup-button').addEventListener('click', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Get error message elements
  const emailError = document.getElementById('email-error');
  const usernameError = document.getElementById('username-error');
  const passwordError = document.getElementById('password-error');
  const confirmPasswordError = document.getElementById('confirm-password-error');

  // Clear previous error messages
  emailError.textContent = '';
  usernameError.textContent = '';
  passwordError.textContent = '';
  confirmPasswordError.textContent = '';

  // Validate form input
  if (!email) {
    emailError.textContent = 'Please enter your email.';
    emailError.classList.add('text-danger');
    return;
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    emailError.textContent = 'Please enter a valid email.';
    emailError.classList.add('text-danger');
    return;
  }

  if (!username) {
    usernameError.textContent = 'Please enter your username.';
    usernameError.classList.add('text-danger');
    return;
  }

  if (!password) {
    passwordError.textContent = 'Please enter your password.';
    passwordError.classList.add('text-danger');
    return;
  }

  if (!confirmPassword) {
    confirmPasswordError.textContent = 'Please confirm your password.';
    confirmPasswordError.classList.add('text-danger');
    return;
  }

  if (password !== confirmPassword) {
    confirmPasswordError.textContent = 'Passwords do not match.';
    confirmPasswordError.classList.add('text-danger');
    return;
  }

  // Create user object
  const newUser = {
    email,
    username,
    password,
    admin: 0 // Set admin to 0 for regular users
  };

  try {
    // Send POST request to JSON Server
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    if (!response.ok) {
      throw new Error('Failed to create user.');
    }

    // Redirect to login.html after successful sign up
    window.location.href = 'login.html';
  } catch (error) {
    console.log('Error creating user:', error);
    alert('Failed to create user. Please try again.');
  }
});
