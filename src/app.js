import Keybord from './moduls/class.js';
import {
  noRepeatKeys, lang, KEY_CODE, KEYS,
} from './moduls/CONST.js';

const addMainConteiner = () => {
  const mainDiv = Keybord.createButton('div', 'wrapper');
  const textAreaDiv = Keybord.createButton('div', 'textArea');
  let textArea = Keybord.createButton('textarea');
  textArea.setAttribute('autofocus', '');
  textArea.setAttribute('cols', '30');
  textArea.setAttribute('rows', '10');
  textArea.onblur = () => textArea.focus();
  const keydbord = Keybord.createButton('div', 'keydbord-wrapper');
  const infoDiv = Keybord.createButton('div', 'info');
  const infoDivText = Keybord.createButton('p', 'infoText');
  infoDivText.innerText = 'Клавиатура создана в операционной системе Windows \t\n Для переключения языка комбинация: левыe Shift + Alt';
  infoDiv.append(infoDivText);
  textAreaDiv.append(textArea);
  mainDiv.append(textAreaDiv, keydbord, infoDiv);
  document.body.append(mainDiv);
};

window.onload = () => {
  addMainConteiner();
  let lang1 = Keybord.checkLocalstorage(localStorage);
  const keybord = new Keybord(lang1.lang, KEYS, KEY_CODE, noRepeatKeys);
  keybord.addListenersOnKeys();
};
