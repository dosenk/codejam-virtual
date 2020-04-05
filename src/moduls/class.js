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
    let langClass = '';
    // div для клавиш
    let buttonDiv;
    // let buttonClass;
    // class button - это обычное сосояние ------- class button_up - это при нажатии shift или caps lock
    let flag = true;
    // console.log(this.keys)
    let i = 0;
    for (const key in this.keys) {
      switch (key) {
        case 'KEYS_EN':
          this.buttonClass = 'button';
          langClass = 'en';
          break;
        case 'KEYS_EN_CAPS':
          langClass = 'en';
          this.buttonClass = 'buttonUp';
          break;
        case 'KEYS_RU':
          this.buttonClass = 'button';
          langClass = 'ru';
          break;
        case 'KEYS_RU_CAPS':
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
keyDownHandler = () => {
  document.addEventListener('keydown', (e) => {
    event.preventDefault(); 
    let key = e.code;
    let defaultKeyValue = e.key;
    // console.log(key);
    if (this.keyCode.indexOf(key) >= 0) {
      if (key === 'CapsLock') {
        if (e.repeat) return;
          this.capsLock = this.capsLock === 'button' ? 'buttonUp' : 'button';
          this.renderActiveButton(this.language);
          document.querySelector(`.${key}`).classList.toggle('clicked-button-capslock');
          return;
      }
      // добавляем в массив нажатых клавиш кроме CapsLock, чтобы при buttonUp их отдуда удалить
      if (!this.clickedButton.includes(key)) this.clickedButton.push(key); 
      if (e.altKey && e.shiftKey) {
        if (e.repeat) return;
          this.language = localStorage.lang = localStorage.lang === 'ru' ? 'en' : 'ru';
          document.querySelectorAll('.lang').forEach(span => {
            span.classList.toggle('active');
            span.childNodes.forEach(span => span.classList.remove('active-button'))
          })
          this.renderActiveButton(this.language);
      }
      if (defaultKeyValue === 'Alt' || defaultKeyValue === 'Control' || defaultKeyValue === 'Meta' || defaultKeyValue === 'AltGraph') {
        document.querySelector(`.${key}`).classList.add('clicked-button');
        if (e.repeat) return;
        return;
      }
      if (key === 'ShiftLeft' || key === 'ShiftRight' ) {
        // if (this.clickedButton.indexOf('ShiftLeft') >= 0 && this.clickedButton.indexOf('ShiftRight') >= 0) return; // при двух нажатых Shift
        if (e.repeat) return;
            this.capsLock = this.capsLock === 'button' ? 'buttonUp' : 'button';
            this.renderActiveButton(this.language);
            document.querySelector(`.${key}`).classList.add('clicked-button-capslock');
            return
      } 

      let nowClickedButton = document.querySelector(`.${key}`);
      nowClickedButton.classList.add('clicked-button');
      let keyValue = this.getLetter(key); // get letter
      // console.log(keyValue);
      let selectionStart = this.input.selectionStart;
      let selectionEnd = this.input.selectionEnd;

      if (defaultKeyValue === 'Backspace' || defaultKeyValue === 'Delete') {
        if (defaultKeyValue === 'Backspace') {
          if (selectionEnd === 0) return;
          if (selectionEnd === selectionStart)  selectionStart --;
        }
        if (defaultKeyValue === 'Delete') {
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

  });
};

// ######################################################### keyup #############################################################
  keyUpHandler = () => {
    document.addEventListener('keyup', (e) => {
      let key = e.code;
      event.preventDefault();
      if (key === 'CapsLock') return;

      if (key === 'ShiftLeft' || key === 'ShiftRight') {
        this.capsLock = this.capsLock === 'button' ? 'buttonUp' : 'button';
        this.renderActiveButton(this.language);
        document.querySelector(`.${key}`).classList.remove('clicked-button-capslock');
        // console.log(key);
        return;
      } 

      // все клавиши за исключением capsLock и Shift
      if (this.clickedButton.includes(key)) {
        this.clickedButton.splice(this.clickedButton.indexOf(key), 1);
        document.querySelector(`.${key}`).classList.remove('clicked-button');
      }

    });
  
  };

  static checkLocalstorage(localstrg) {
    if (typeof localstrg.lang === 'undefined') localStorage.lang = 'ru';
    else if (localstrg.lang === 'ru') localStorage.lang = 'ru';
    else if (localstrg.lang === 'en') localStorage.lang = 'en';
    this.capsLock = localStorage.capsLock = 'button';
    return localstrg;
  };

  renderActiveButton(language) {
    let activeLangSpan = document.querySelectorAll(`.${language}`);
    activeLangSpan.forEach((span) => {
      span.childNodes.forEach(span => {
        span.classList.remove('active-button');
        if (span.classList.contains(this.capsLock)) span.classList.add('active-button');
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
}
