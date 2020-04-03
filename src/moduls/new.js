export default class Keybord {
  constructor(lang, keys, key_code) {
    this.language = lang;
    this.keys = keys;
    this.key_code = key_code;
    this.drowKeybord();
  }

  drowKeybord() {
    const KEY = this.language === 'ru' ? this.keys.KEYS_RUS : this.keys.KEYS_EN;
    const mainDiv = document.querySelector('.keydbord-wrapper');
    console.log(mainDiv);
    let keyMap = [];
    let langClass = '';
    const defaultButtonClass = 'key';
    let buttonDiv = '';
    let buttonClass;
    // class button - это обычное сосояние
    // class button_up - это при нажатии shift или caps lock
    let flag = true;
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
        case 'KEYS_RUS':
          buttonClass = 'button';
          langClass = 'ru';
          break;
        case 'KEYS_RUS_CAPS':
          langClass = 'ru';
          buttonClass = 'buttonUp';
          break;
        default:
          throw new Error('no keys in CONST.js');
      }

      this.keys[key].forEach((elem, index) => {
        if (flag) {
          keyMap[index] = [];
          buttonDiv = document.createElement('div');
          buttonDiv.classList = `${defaultButtonClass} ${this.key_code[index]}`;
          let buttonSpanRu = document.createElement('span');
          let buttonSpanEn = document.createElement('span');
          buttonSpanRu.classList = 'ru';
          buttonSpanEn.classList = 'en';
          buttonDiv.append(buttonSpanRu, buttonSpanEn);
        }
        if (keyMap[index].indexOf(elem) >= 0) return;

        // buttonDiv.append(document.querySelector)
        mainDiv.append(buttonDiv);
        // console.log(buttonDiv.childNodes[1].classList.contains(langClass));
        let button = document.createElement('span');
        button.classList = buttonClass;

        buttonDiv.childNodes.forEach((span) => {
          // console.log(span);
          if (span.classList.contains(langClass)) span.append(button);
        });
        // keyMap[index].push(elem);
      });
      flag = false;
    }

    console.log(mainDiv);
    // console.log(keyMap);
  }
}
