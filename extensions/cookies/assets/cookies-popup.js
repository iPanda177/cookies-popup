function hidePopup() {
  const cookies = document.getElementById('cookies');
  cookies.style.bottom = '-200px';

  setTimeout(() => {
    cookies.style.display = 'none'
  }, 2000, cookies)
}