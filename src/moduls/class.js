export default class Keybord {

  defaultButtonClass = 'key';
  keybordCount = 0; // количество раскладок клавиатуры
  clickedButton = [];
  capsLock = 'button';
  constructor(lang, keys, keyCode, noRepeatKeys) {
    this.keys = keys;
    this.keyCode = keyCode;
    this.language = lang;
    this.noRepeatKeys = noRepeatKeys;
    this.drowKeybord();
    this.input = document.querySelector('textarea');
    this.spanLenght = 0;
    this.capsLockFlag = false;
  }

  static createButton(tagName, ...classes) {
    let element = document.createElement(tagName);
    classes.forEach((className) => element.classList.add(className));
    return element;
  }

  drowKeybord() {
    const mainDiv = document.querySelector('.keydbord-wrapper');
    // массив для хранения HTML
    let keyMap = [];
    // массив для хранения cимволов
    let buttonsArray = [];
    // класс ru - en
    let langClass;
    // div для клавиш
    let buttonDiv;
    let buttonClass;
    // class button - это обычное сосояние ------- class button_up - это при нажатии shift или caps lock
    let flag = true;
    // console.log(this.keys)
    let i = 0;
    for (const key in this.keys) {
      switch (key) {
        case 'KEYS_EN':
          buttonClass = 'button';
          langClass = 'en';
          break;
        case 'KEYS_EN_CAPS':
          langClass = 'en';
          buttonClass = 'buttonUp';
          break;
        case 'KEYS_RU':
          buttonClass = 'button';
          langClass = 'ru';
          break;
        case 'KEYS_RU_CAPS':
          langClass = 'ru';
          buttonClass = 'buttonUp';
          break;
        default:
          throw new Error('no keys in CONST.js');
      }
      
      this.keys[key].forEach((elem, index) => {
       
        if (this.keybordCount === 0) {
          buttonsArray[index] = [];
          keyMap[index] = [];
          buttonDiv = Keybord.createButton('div', `${this.defaultButtonClass}`, `${this.keyCode[index]}`);
          buttonDiv.setAttribute('id', `${index}`);
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
          if (span.classList.contains(buttonClass)) {
            span.innerText = elem;
            if (div.classList.contains('active') && buttonClass === 'button') {
              span.classList.add('active-button');
            }
          }
        });
        // cоздаем массив клавиш
        buttonsArray[index].push(elem);
        if (this.keybordCount === 3) { // равно ли количеству раскладок клавиатуры в KEYS
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
addListenersOnKeys() {
  document.addEventListener('keydown', (event) => this.keyDownHandler(event));
  document.addEventListener('keyup', (event) => this.keyUpHandler(event));
  document.addEventListener('mousedown', (event) => this.mouseDownHundler(event));
  document.addEventListener('mouseup', (event) => this.mouseUpHundler(event));
}

mouseDownHundler(e) {
  if (e.target.classList.contains('active-button')) {
      let id = e.target.parentNode.parentNode.getAttribute('id');
      this.clickedMouseElem = this.keyCode[id];
      // console.log(this.clickedMouseElem);
      this.keyDownHandler(e, this.clickedMouseElem);
  }
}
mouseUpHundler(e) {
  document.querySelectorAll('.clicked-button').forEach(elem => {
    elem.classList.remove('clicked-button');
  })
  this.keyUpHandler(e, this.clickedMouseElem);

}

keyDownHandler(e, keyButton = null) {
    event.preventDefault();
    let key = keyButton === null ? e.code : keyButton;

    if (this.keyCode.indexOf(key) >= 0) {

      if (key === 'CapsLock') {
        if (e.repeat) return;
          this.capsLockFlag = this.capsLockFlag ? false : true;
          let capslock = this.capsLockFlag ? 'buttonUp' : 'button' ;
          this.renderActiveButton(this.language, capslock);
          document.querySelector(`.${key}`).classList.toggle('clicked-button-capslock');
          return;
      }
      // добавляем в массив нажатых клавиш кроме CapsLock, чтобы при buttonUp их отдуда удалить
      if (!this.clickedButton.includes(key)) this.clickedButton.push(key); 

    if (e.shiftKey && e.altKey) {
      if (e.repeat) return;
      if (this.clickedButton.includes('ShiftLeft') && this.clickedButton.includes('AltLeft')) {
        this.language = localStorage.lang = localStorage.lang === 'ru' ? 'en' : 'ru';
        document.querySelectorAll('.lang').forEach(span => {
        span.classList.toggle('active');
        span.childNodes.forEach(span => span.classList.remove('active-button'))
          let capslock = this.capsLockFlag ? 'button' : 'buttonUp' ;
        })  
        let capslock = this.capsLockFlag ? 'button' : 'buttonUp' ;
        this.renderActiveButton(this.language, capslock);
        return       
      }
    }
     
      if (key === 'ShiftLeft' || key === 'ShiftRight') { 
        let capslock = this.capsLockFlag ? 'button' : 'buttonUp' ;
        document.querySelector(`.ShiftLeft`).classList.remove('clicked-button-capslock');
        document.querySelector(`.ShiftRight`).classList.remove('clicked-button-capslock');
        document.querySelector(`.${key}`).classList.add('clicked-button-capslock');
        if (e.repeat) return;
        // if (this.clickedButton.includes('ShiftLeft') && this.clickedButton.includes('ShiftRight')) return;
        this.renderActiveButton(this.language, capslock);
        return
      }
    
      if (key === 'AltLeft' || key === 'AltRight' || key === 'ControlLeft' || key === 'ControlRight' || key === 'MetaLeft') {
        document.querySelector(`.${key}`).classList.add('clicked-button');
        if (e.repeat) return;
        return;
      }
  
      this.changeActiveButton(key, true);

      let keyValue = this.getLetter(key); // get letter
      let selectionStart = this.input.selectionStart;
      let selectionEnd = this.input.selectionEnd;

      if (key === 'Backspace' || key === 'Delete') {
        if (key === 'Backspace') {
          if (selectionEnd === 0) return;
          if (selectionEnd === selectionStart)  selectionStart --;
        }
        if (key === 'Delete') {
          if (this.input.value.length <= 0) return;
        if (selectionEnd === selectionStart)  selectionEnd ++;
        }
        this.input.value = this.input.value.slice(0, selectionStart) + this.input.value.slice(selectionEnd);
        this.input.selectionStart = this.input.selectionEnd = selectionStart;
        return;
      }
      if (key === 'Tab') keyValue = '\t';
      if (key === 'Enter') keyValue = '\n';
      if (key === 'Space') keyValue = ' ';
      if (key === 'ArrowLeft') keyValue = '←';
      if (key === 'ArrowRight') keyValue = '→';
      if (key === 'ArrowUp') keyValue = '↑';
      if (key === 'ArrowDown') keyValue = '↓';
      this.input.value = this.input.value.slice(0, selectionStart) + keyValue + this.input.value.slice(selectionEnd);
      this.input.selectionStart = this.input.selectionEnd = selectionStart + 1; 
    }
};

// ######################################################### keyup #############################################################
  keyUpHandler(e, keyButton = null) {
      e.preventDefault();
      let key = keyButton === null ? e.code : keyButton;
      // console.log(this.capsLock)
      
      if (key === 'CapsLock') return;
      
      if (key === 'ShiftLeft'|| key === 'ShiftRight') {
        document.querySelector(`.ShiftLeft`).classList.remove('clicked-button-capslock');
        document.querySelector(`.ShiftRight`).classList.remove('clicked-button-capslock');
        this.clickedButton.splice(this.clickedButton.indexOf(key), 1);
        
        if (this.clickedButton.indexOf('ShiftLeft') >= 0 && this.clickedButton.indexOf('ShiftRight') >= 0) {
        this.clickedButton.splice(this.clickedButton.indexOf('ShiftLeft'), 1);
        this.clickedButton.splice(this.clickedButton.indexOf('ShiftRight'), 1);
        }
        let capslock = !this.capsLockFlag ? 'button' : 'buttonUp' ;
        this.renderActiveButton(this.language, capslock);
        
        
        return;
      } 
      // все клавиши за исключением capsLock и Shift
      if (this.clickedButton.includes(key)) {
        this.clickedButton.splice(this.clickedButton.indexOf(key), 1);
        this.changeActiveButton(key, false);
      }
  };

  static checkLocalstorage(localstrg) {
    if (typeof localstrg.lang === 'undefined') localStorage.lang = 'ru';
    else if (localstrg.lang === 'ru') localStorage.lang = 'ru';
    else if (localstrg.lang === 'en') localStorage.lang = 'en';
    this.capsLock = localStorage.capsLock = 'button';
    return localstrg;
  };

  renderActiveButton(language, capslock) {
    let activeLangSpan = document.querySelectorAll(`.${language}`);
    activeLangSpan.forEach((span) => {
      span.childNodes.forEach(span => {
        span.classList.remove('active-button');
        if (span.classList.contains(capslock)) span.classList.add('active-button');
      })
      });
  }

  getLetter(key) {
    let keyIndex = this.keyCode.indexOf(key);
    let lang = this.language.toUpperCase();
    let capslock = document.querySelector('.CapsLock').classList.contains('clicked-button-capslock');
    let leftShift = document.querySelector('.ShiftLeft').classList.contains('clicked-button-capslock');
    let rightShift = document.querySelector('.ShiftRight').classList.contains('clicked-button-capslock');
    if (capslock && (leftShift || rightShift)) {
      return this.keys[`KEYS_${lang}`][keyIndex];
    } else if (capslock || (rightShift || leftShift)) {
      return this.keys[`KEYS_${lang}_CAPS`][keyIndex];
    }
    return this.keys[`KEYS_${lang}`][keyIndex];
  }

  changeActiveButton(key, flag) {
    let nowClickedButton = document.querySelector(`.${key}`);
    if (flag) nowClickedButton.classList.add('clicked-button');
    else nowClickedButton.classList.remove('clicked-button');
  }
}
