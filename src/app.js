import Keybord from './moduls/class.js';
import {
  noRepeatKeys, lang, KEY_CODE, KEYS,
} from './moduls/CONST.js';


window.onload = () => {
  // console.log(noRepeatKeys);
  addMainConteiner();
  let lang1 = Keybord.checkLocalstorage(localStorage);
  const keybord = new Keybord(lang1.lang, KEYS, KEY_CODE, noRepeatKeys);
  // Keybord.capsLockChange('.button'); // '.buttonUp' : '.button';
  // console.log(keydbord.noRepeatKeys);
  keybord.keyUpHandler();

  keybord.keyDownHandler();
};

const addMainConteiner = () => {
  const mainDiv = Keybord.createButton('div', 'wrapper');
  const textAreaDiv = Keybord.createButton('div', 'textArea');
  const textArea = Keybord.createButton('textarea');
  const keydbord = Keybord.createButton('div', 'keydbord-wrapper');

  textAreaDiv.append(textArea);
  mainDiv.append(textAreaDiv, keydbord);
  document.body.append(mainDiv);
};
