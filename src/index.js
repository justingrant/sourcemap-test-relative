import _ from 'lodash';
import { isValidNumber } from 'libphonenumber-js';
import { produce } from 'immer';

function component() {
  let html = '';

  // call lodash
  html += `<div>${_.join(['Hello', 'webpack'])}<div>`;

  // call immer
  html += `<div>${JSON.stringify(produce ( {a: 1}, o => o ))}<div>`;

  // call libphonenumber-js
  html += `<div>${isValidNumber('415-555-1234')}<div>`;

  let element = document.createElement('div');
  element.innerHTML = html;
  return element;
}

document.body.appendChild(component());
