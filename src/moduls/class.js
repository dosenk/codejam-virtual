export default class Keybord {
  static capsLock = false;
  constructor(lang, keys, keyCode, noRepeatKeys) {
    this.keys = keys;
    this.keyCode = keyCode;
    this.defaultButtonClass = 'key';
    this.language = lang;
    this.noRepeatKeys = noRepeatKeys;
    this.repeatFlag = 'true';
    this.drowKeybord();
  }

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
       
        if (flag) {
          buttonsArray[index] = [];
          keyMap[index] = [];
          buttonDiv = Keybord.createButton('div', `${this.defaultButtonClass}`, `${this.keyCode[index]}`);
          this.buttonSpanRu = Keybord.createButton('span', 'ru');
          this.buttonSpanEn = Keybord.createButton('span', 'en');
          if (this.language === 'ru') {
            this.buttonSpanRu.classList.add('active');
          } else if (this.language === 'en') {
            this.buttonSpanEn.classList.add('active');
          }
          buttonDiv.append(this.buttonSpanRu, this.buttonSpanEn);
          keyMap[index] = buttonDiv;
        }
        console.log(buttonDiv.querySelector(`.${this.language}`).classList.contains('active'));
        // обрезаем одинаковые клавиши
        // if (buttonsArray[index].indexOf(elem) >= 0 && index > 12 ) return; 

        buttonDiv = keyMap[index];
        // создаем span для каждой буквы
        // console.log(typeof this.buttonClass);
        let activeButtonClass;
        if (buttonDiv.querySelector(`.${this.language}`).classList.contains('active') && this.buttonClass === 'button') {
          activeButtonClass = 'active-button';
        } 
        let button = Keybord.createButton('span', this.buttonClass, activeButtonClass);

        // ищем span по классу ru en
        buttonDiv.childNodes.forEach((span) => {
          if (span.classList.contains(langClass)) {
            button.innerText = elem;
            span.append(button);
          }
        });
        // cоздаем массив клавиш
        buttonsArray[index].push(elem);
      });
      flag = false;
    }
    // console.log(keyMap);
    keyMap.forEach((div) => {
      mainDiv.append(div);
    });
    // console.log(keyMap);
    // console.log(buttonsArray);
  }

  static capsLockChange(button) {
    // let selector = this.capsLock ? '.buttonUp' : '.button';
    let allactiveButton = document.querySelectorAll(`.active`);
    console.log(allactiveButton[0].childNodes);
      allactiveButton.forEach(elem => {
        console.log(elem.childNodes);
      elem.childNodes.forEach(item => {
        item.classList.toggle('active-button');
      })
      // elem.classList.remove('active-button');
      // elem.classList.add('active-button');
      })
      // console.log(allactiveButton);
    // return allactiveButton;
  }

  
keyUpHandler = () => {
  document.addEventListener('keydown', (e) => {
    const key = e.code;
    if (this.keyCode.indexOf(key) >= 0) {
      if (this.repeatFlag) {
        console.log(key, '    -----      now click button');
        // drow activ button
        this.clickedButton = document.querySelector(`.${key}`);
        this.clickedButton.classList.add('clicked-button');

        if (key === 'CapsLock') {
          Keybord.capsLockChange('.buttonUp');
        }


        this.repeatFlag = false;
        console.log('key UP -> work')
      }
    }

  });
};

keyDownHandler = () => {
  document.addEventListener('keyup', () => {
    this.clickedButton.classList.remove('clicked-button');



    this.repeatFlag = true;
    console.log('key DOWN -> work')
  });
 
};
}
