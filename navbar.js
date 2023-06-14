document.addEventListener('DOMContentLoaded', () => {
    // Function to update the navigation bar based on login status
    function updateNavigationBar() {
      const loginButton = document.getElementById('nav-bar-login-btn');

      // Check if a user is logged in by retrieving the currentUser from localStorage
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
      // Check if the user is logged in
      if (currentUser) {
        // User is logged in, update the button text and functionality
        loginButton.textContent = 'Log out';
        loginButton.href = '#';
        loginButton.addEventListener('click', handleLogout);
      } else {
        // User is not logged in, reset the button text and functionality
        loginButton.textContent = 'Log in';
        loginButton.href = 'login.html';
        loginButton.removeEventListener('click', handleLogout);
      }
    }
  
    // Function to handle the logout process
    function handleLogout() {
        // Clear the stored user information from localStorage
        localStorage.removeItem('currentUser');
      
        // Redirect the user to the index page
        // Might have to update to redirect to the same page but logged out
        window.location.href = 'index.html';
      }
    // Call the updateNavigationBar function to set the initial state
    updateNavigationBar();
  });
  