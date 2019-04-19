import _ from 'lodash';
import { isValidNumber } from 'libphonenumber-js';
import { produce } from 'immer';
import Amplify from 'aws-amplify';

function component() {
  let html = '';

  // call lodash
  html += `<div>${_.join(['Hello', 'webpack'])}<div>`;

  // call immer
  html += `<div>${JSON.stringify(produce ( {a: 1}, o => o ))}<div>`;

  // call libphonenumber-js
  html += `<div>${isValidNumber('415-555-1234')}<div>`;

  // pull in AWS Amplify code too
  console.log (Amplify.UI);
  console.log (Amplify.API);

  let element = document.createElement('div');
  element.innerHTML = html;
  return element;
}

document.body.appendChild(component());
