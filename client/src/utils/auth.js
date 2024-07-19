import decode from 'jwt-decode';

class AuthService {
  // Retrieves the profile information from the stored token
  getProfile() {
    // Decode the token stored in local storage to get the user's profile information
    return decode(this.getToken());
  }
  // Checks if the user is logged in
  loggedIn() {
    // Get the token from local storage
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }
  // Checks if the token has expired
  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }
  // Retrieves the token from local storage
  getToken() {
    // Get the token from local storage
    return localStorage.getItem('id_token');
  }
  // Logs the user in by storing the token in local storage and redirecting to the homepage
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // Logs the user out by removing the token from local storage and reloading the page
  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

// Export a new instance of AuthService to be used throughout the application
export default new AuthService();
