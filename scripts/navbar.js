document.addEventListener('DOMContentLoaded', () => {
  // Function to update the navigation bar based on login status
  function updateNavigationBar() {
    const loginButton = document.getElementById('nav-bar-login-btn');
    const adminButtonContainer = document.getElementById('admin-button-container');
  
    // Check if a user is logged in by retrieving the currentUser from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
    // Check if the user is logged in
    if (currentUser) {
      // User is logged in, update the button text and functionality
      loginButton.textContent = 'Log out';
      loginButton.href = '#';
      loginButton.addEventListener('click', handleLogout);
  
      // Show the Admin button if the user is an admin
      if (currentUser.isAdmin) {
        adminButtonContainer.style.display = 'block';
      } else {
        adminButtonContainer.style.display = 'none';
      }
    } else {
      // User is not logged in, reset the button text and functionality
      loginButton.textContent = 'Log in';
      loginButton.href = 'login.html';
      loginButton.removeEventListener('click', handleLogout);
  
      // Hide the Admin button if the user is not logged in
      adminButtonContainer.style.display = 'none';
    }
  
    // Add a click event listener to the login button
    loginButton.addEventListener('click', () => {
      // If the user is not logged in, save the current page's URL to local storage
      if (!currentUser) {
        localStorage.setItem('returnToUrl', window.location.href);
      }
    });
  }
  

  // Function to handle the logout process
  function handleLogout() {
    // Clear the stored user information from localStorage
    localStorage.removeItem('currentUser');

    // Redirect the user to the index page or the saved return URL if available
    const returnToUrl = localStorage.getItem('returnToUrl');
    if (returnToUrl) {
      localStorage.removeItem('returnToUrl');
      window.location.href = returnToUrl;
    } else {
      window.location.href = 'index.html';
    }
  }

  // Call the updateNavigationBar function to set the initial state
  updateNavigationBar();
});
