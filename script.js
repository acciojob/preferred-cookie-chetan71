//your JS code here. If required.
// Function to set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

// Function to get a cookie
function getCookie(name) {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName)) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return '';
}

// Function to apply preferences from cookies
function applyPreferences() {
  const fontSize = getCookie('fontsize');
  const fontColor = getCookie('fontcolor');

  if (fontSize) {
    document.documentElement.style.setProperty('--fontsize', `${fontSize}px`);
    document.getElementById('fontsize').value = fontSize;
  }

  if (fontColor) {
    document.documentElement.style.setProperty('--fontcolor', fontColor);
    document.getElementById('fontcolor').value = fontColor;
  }
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const fontSize = document.getElementById('fontsize').value;
  const fontColor = document.getElementById('fontcolor').value;

  // Set cookies for font size and color
  setCookie('fontsize', fontSize, 30); // Expires in 30 days
  setCookie('fontcolor', fontColor, 30); // Expires in 30 days

  // Apply the new preferences
  document.documentElement.style.setProperty('--fontsize', `${fontSize}px`);
  document.documentElement.style.setProperty('--fontcolor', fontColor);
}

// Attach event listener to the form
document.getElementById('preferencesForm').addEventListener('submit', handleFormSubmit);

// Apply preferences when the page loads
applyPreferences();