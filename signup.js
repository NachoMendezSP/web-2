
  document.getElementById('signup-button').addEventListener('click', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validate form input
    if (!email || !username || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
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

      // Redirect to index.html after successful sign up
      window.location.href = 'index.html';
    } catch (error) {
      console.log('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    }
  });

