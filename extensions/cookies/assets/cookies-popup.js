const cookies = document.getElementById('cookies-container');
console.log(cookies)
const shadow = cookies.attachShadow({mode: 'open'}); 
const styleNode = document.createElement("style");
console.log(styleNode)

styleNode.textContent = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap');

.cookies {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  max-width: 1272px;
  min-height: 164px; 

  font-family: 'DM Sans', sans-serif;

  position: fixed;
  bottom: 10px; 
  left: 0;
  right: 0;
  margin: 0 auto; 
  padding: 52px 48px;

  background-color: #fff;
  border: 1px solid #D9DBE9;
  box-shadow: 0px 14px 42px rgba(8, 15, 52, 0.06);
  border-radius: 2px;

  z-index: 1000;

  animation: move 1s linear 1;
  transition: bottom 1s linear;
}

.cookies:focus {
  animation: hide 1s linear 1;
}

@keyframes move {
  from {
    bottom: -200px;
  }

  to {
    bottom: 10px;
  }
}

@keyframes hide {
  from {
    bottom: 10px;
  }

  to {
    bottom: -200px;
  }
}

.cookies__img {
  margin-right: 22px;
  width: 70px;
}

.cookies__info {
  font-weight: 400;
  font-size: 18px;
  line-height: 30px;
  color: #6F6C90;

  margin-right: 106px;
}

.cookies__info a {
  color: #FFC611;
}

.cookies__accept {
  background: #FFC611;
  box-shadow: 0px 3px 12px rgba(74, 58, 255, 0.18);
  border-radius: 56px;
  border: 0;

  cursor: pointer;

  width: 280px;
  height: 54px;

  margin-right: 20px;

  color: #fff;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
}

.cookies__accept:hover {
  background: #f09f36;
}

.cookies__decline {
  background: #fff;
  border: 1px solid #EFF0F7;
  box-shadow: 0px 4px 8px rgba(74, 58, 255, 0.08);
  border-radius: 56px;

  cursor: pointer;

  margin-right: 26px;
  width: 140px;
  height: 54px;
}

.cookies__decline:hover {
  background: rgb(233, 231, 231);
}

.cookies__cross {
  width: 14px;
  transition: transform 0.5s;

  cursor: pointer;
}

.cookies__cross:hover {
  transform: scale(1.5);
}

@media (max-width: 1200px) {
  .cookies {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 640px;
    gap: 10px;
    padding: 20px;
  }

  .cookies__img,
  .cookies__info,
  .cookies__accept,
  .cookies__decline {
    margin: 0;
  }
}
`;

shadow.appendChild(styleNode);

const bg = "{{ 'cookies.png' | asset_url | img_tag: 'logo', 'cookies__img' }}"
console.log(bg)

const contentNode = document.createElement('div');
contentNode.innerHTML = `<div 
class="cookies" 
style="background-color: {{ block.settings.background }}" 
id="cookies">
{{ 'cookies.png' | asset_url | img_tag: 'logo', 'cookies__img' }} 

<div class="cookies__info">
  {{ block.settings.policy_text }}
</div>

<button 
  onclick="hidePopup();"
  class="cookies__accept" 
  style="background-color: {{ block.settings.primary-btn-background }}; color: {{ block.settings.primary-btn-text-color }}"
>
  {{ 'cookie-button.svg' | asset_url | img_tag: 'accept' }}
  {{ block.settings.primary-btn-text }}
</button>

<button 
  onclick="hidePopup();"
  class="cookies__decline"
  style="background-color: {{ block.settings.secondary-btn-background }}; color: {{ block.settings.secondary-btn-text-color }}"
>
  {{ block.settings.secondary-btn-text }}
</button>

<div onclick="hidePopup();">
  {{ 'cross.svg' | asset_url | img_tag: 'cross', 'cookies__cross' }}
</div>
</div>`;
shadow.appendChild(contentNode);

function hidePopup() {
  const cookies = document.getElementById('cookies');
  cookies.style.bottom = '-200px';

  setTimeout(() => {
    cookies.style.display = 'none'
  }, 2000, cookies)
}