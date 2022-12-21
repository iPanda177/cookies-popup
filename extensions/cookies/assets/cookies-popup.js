// const cookies = document.getElementById('cookies-container');
// const shadow = cookies.attachShadow({mode: 'open'}); 
// const styleNode = document.createElement("style");

// styleNode.textContent = ``;

// shadow.appendChild(styleNode);

// const contentNode = document.createElement('div');
// contentNode.innerHTML = ``
// shadow.appendChild(contentNode);

const countriesList = ['Ukraine', 'Poland', 'Germany'];

if (!document.cookie.split(';').filter((item) => item.trim().startsWith('authtoken=')).length) {
// fetch('https://api.ipregistry.co/?key=6xgeit6tvag1ptqw')
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (payload) {
//     if (countriesList.includes(payload.location.country.name)) {
//       showPopup();
//     }
//   });
}

function showPopup() {
  console.log('worked')
  const cookies = document.getElementById('cookies');
  cookies.style.bottom = '10px';
}

function setCookies() {
  document.cookie = "authtoken=someId";
  hidePopup();
}

function hidePopup() {
  const cookies = document.getElementById('cookies');
  cookies.style.bottom = '-600px';

  setTimeout(() => {
    cookies.style.display = 'none'
  }, 2000, cookies)
}