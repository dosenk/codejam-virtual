export default class Keybord {

  defaultButtonClass = 'key';
  keybordCount = 0; // количество раскладок клавиатуры
  clickedButton = [];
  capsLock = 'button';
  // static keybordLang = 'ru';
  constructor(lang, keys, keyCode, noRepeatKeys) {
    console.log(localStorage);
    this.keys = keys;
    this.keyCode = keyCode;
    this.language = lang;
    this.noRepeatKeys = noRepeatKeys;
    this.drowKeybord();
    this.input = document.querySelector('textarea');
  }

  // this.language = this.checkLocalstorage(localStorage);

  static createButton(tagName, ...classes) {
    let element = document.createElement(tagName);
    classes.forEach((className) => {
      element.classList.add(className);
    });
    return element;
  }


  drowKeybord() {
    const mainDiv = document.querySelector('.keydbord-wrapper');
    console.log(mainDiv);
    // массив для хранения HTML
    let keyMap = [];
    // массив для хранения cимволов
    let buttonsArray = [];
    // класс ru - en
    let langClass = '';
    // div для клавиш
    let buttonDiv;
    // let buttonClass;
    // class button - это обычное сосояние ------- class button_up - это при нажатии shift или caps lock
    let flag = true;
    // console.log(this.keys)
    let i = 0;
    for (const key in this.keys) {
      console.log(key);
      switch (key) {
        case 'KEYS_EN':
          this.buttonClass = 'button';
          langClass = 'en';
          break;
        case 'KEYS_EN_CAPS':
          langClass = 'en';
          this.buttonClass = 'buttonUp';
          break;
        case 'KEYS_RUS':
          this.buttonClass = 'button';
          langClass = 'ru';
          break;
        case 'KEYS_RUS_CAPS':
          langClass = 'ru';
          this.buttonClass = 'buttonUp';
          break;
        default:
          throw new Error('no keys in CONST.js');
      }
      
      this.keys[key].forEach((elem, index) => {
       
        if (this.keybordCount === 0) {
          buttonsArray[index] = [];
          keyMap[index] = [];
          buttonDiv = Keybord.createButton('div', `${this.defaultButtonClass}`, `${this.keyCode[index]}`);
          this.buttonSpanRu = Keybord.createButton('span', 'lang', 'ru');
          this.buttonSpanEn = Keybord.createButton('span', 'lang', 'en');
          let buttonSpanUpEn = Keybord.createButton('span', 'buttonUp');
          let buttonSpanDownEn = Keybord.createButton('span', 'button');
          let buttonSpanUpRu = Keybord.createButton('span', 'buttonUp');
          let buttonSpanDownRu = Keybord.createButton('span', 'button');
          this.buttonSpanEn.append(buttonSpanDownEn, buttonSpanUpEn);
          this.buttonSpanRu.append(buttonSpanDownRu, buttonSpanUpRu);
          if (this.language === 'ru') {
            this.buttonSpanRu.classList.add('active');
          } else if (this.language === 'en') {
            this.buttonSpanEn.classList.add('active');
          }
          buttonDiv.append(this.buttonSpanRu, this.buttonSpanEn);
          keyMap[index] = buttonDiv;
        }
        // обрезаем одинаковые клавиши
        // if (buttonsArray[index].indexOf(elem) >= 0 && index > 12 ) return; 

        buttonDiv = keyMap[index];

        let div = buttonDiv.querySelector(`.${langClass}`);
        div.childNodes.forEach((span) => {
          if (span.classList.contains(this.buttonClass)) {
            span.innerText = elem;
            if (div.classList.contains('active') && this.buttonClass === 'button') {
              span.classList.add('active-button');
            }
          }
        });
        // cоздаем массив клавиш
        buttonsArray[index].push(elem);
        if (this.keybordCount === 3) { // равно ли KEYS
          mainDiv.append(buttonDiv);
        }
      });

      this.keybordCount ++;
    }
  }

  static capsLockChange(button) {
    let allactiveButton = document.querySelectorAll(`.active`);
      allactiveButton.forEach(elem => {
        elem.childNodes.forEach(item => {
          item.classList.toggle('active-button');
        })
      })
      button.classList.toggle('clicked-button');
  }


// ####################################################### keydown #############################################################
keyDownHandler = () => {
  document.addEventListener('keydown', (e) => {

      
      let key = e.code;
      if (this.keyCode.indexOf(key) >= 0) {
      // smena shrifta
      if (e.altKey && e.shiftKey && key === 'ShiftLeft') {
      if (e.repeat) return;
        this.language = localStorage.lang = localStorage.lang === 'ru' ? 'en' : 'ru';
        document.querySelectorAll('.lang').forEach(span => {
          span.classList.toggle('active');
          span.childNodes.forEach(span => {
            span.classList.remove('active-button');
          })
        })
        this.renderActiveButton(this.language);
      }
      if (key === 'AltRight') {
        if (e.repeat) return;
        event.preventDefault(); 
        // return;
      }
      if (key === 'Tab') {
        event.preventDefault(); 
        this.input.value += '    ';
        console.log(this.input.value);
        return;
      }
      if (key === 'ArrowLeft') {
        event.preventDefault(); 
        this.input.value += '←';
        return;
      }
      if (key === 'ArrowRight') {
        event.preventDefault(); 
        this.input.value += '→';
        return;
      }
      if (key === 'ArrowUp') {
        event.preventDefault(); 
        this.input.value += '↑';
        return;
      }
      if (key === 'ArrowDown') {
        event.preventDefault(); 
        this.input.value += '↓';
        return;
      }
      if (key === 'CapsLock') {
      if (e.repeat) return;
        this.capsLock = this.capsLock === 'button' ? 'buttonUp' : 'button';
        this.renderActiveButton(this.language);
        document.querySelector(`.${key}`).classList.toggle('clicked-button');
        return;
      }
      if (key === 'ShiftLeft' || key === 'ShiftRight' ) {
      if (e.repeat) return;
          this.capsLock = this.capsLock === 'button' ? 'buttonUp' : 'button';
          this.renderActiveButton(this.language);
          // document.querySelector(`.${key}`).classList.toggle('clicked-button');
        } 


      console.log(this.clickedButton);

      if (!this.clickedButton.includes(key)) {
        this.clickedButton.push(key);
        document.querySelector(`.${key}`).classList.add('clicked-button');
        // this.input.textContent += key;
      }
    
    }

  });
};

// ######################################################### keyup #############################################################
keyUpHandler = () => {
  document.addEventListener('keyup', (e) => {
    let key = e.code;
    // console.log(key)
    event.preventDefault();
    
    // this.repeatFlag = true;
    if (key === 'CapsLock') return;
    if (key === 'ShiftLeft' || key === 'ShiftRight') {
      this.capsLock = this.capsLock === 'button' ? 'buttonUp' : 'button';
      this.renderActiveButton(this.language);
    } 
    if (this.clickedButton.includes(key)) {
      this.clickedButton.splice(this.clickedButton.indexOf(key), 1);
      document.querySelector(`.${key}`).classList.remove('clicked-button');
    }

  });
 
};

static checkLocalstorage(localstrg) {
  console.log(localstrg.lang);
  if (typeof localstrg.lang === 'undefined') {
    localStorage.lang = 'ru';
  } else if (localstrg.lang === 'ru') {
    localStorage.lang = 'ru';
  } else if (localstrg.lang === 'en') {
    localStorage.lang = 'en';
  }
  this.capsLock = localStorage.capsLock = 'button';
  return localstrg;
};

renderActiveButton(language) {
  let activeLangSpan = document.querySelectorAll(`.${language}`);
  // console.log(this.capsLock);  
  activeLangSpan.forEach((span) => {
    span.childNodes.forEach(span => {
      span.classList.remove('active-button');
      if (span.classList.contains(this.capsLock)) span.classList.add('active-button');
    })
    });
}
}
