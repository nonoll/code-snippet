# @nonoll/code-snippet

![TRAVIS](https://img.shields.io/travis/com/nonoll/code-snippet/master.svg?style=for-the-badge)
![NPM version](https://img.shields.io/npm/v/@nonoll/code-snippet.svg?style=for-the-badge)
![NPM download](https://img.shields.io/npm/dt/@nonoll/code-snippet?style=for-the-badge)
![NPM license](https://img.shields.io/npm/l/@nonoll/code-snippet?style=for-the-badge)
![NPM bundle size](https://img.shields.io/bundlephobia/min/@nonoll/code-snippet?style=for-the-badge)

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14. 

## example
 
### @nonoll/code-snippet/observer

#### MutationObserver

[![Edit @nonoll/code-snippet](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/wonderful-johnson-9gko8?expanddevtools=1&fontsize=14&hidenavigation=1&initialpath=%2Fobserver-MutationObserver.html&module=%2Fobserver-MutationObserver.html&theme=dark)

```javascript
import { MutationObserver, MUTATION_EVENTS } from '@nonoll/my-lib/observer';

const createElement = ({ tag = 'div', id = '', style = '', value = '', text = '' }) => {
 const doc = window.document;
 const target = doc.createElement(tag);
 target.setAttribute('id', id);
 target.setAttribute('style', style);
 target.setAttribute('value', value);
 if (text) {
   target.textContent = text;
 }
 return target;
}

const forExample = () => {
 const doc = window.document;

 const attachButton = createElement({ tag: 'button', text: 'observer attach' });
 const detachButton = createElement({ tag: 'button', text: 'observer detach' });
 const appendButton = createElement({ tag: 'button', text: 'append' });

 doc.body.appendChild(attachButton);
 doc.body.appendChild(detachButton);
 doc.body.appendChild(appendButton);

 attachButton.addEventListener('click', e => {
   e.preventDefault();
   console.log('attachButton clicked');
   if (!observer) {
     return;
   }
   observer.attach();
 });

 detachButton.addEventListener('click', e => {
   e.preventDefault();
   console.log('detachButton clicked');
   if (!observer) {
     return;
   }
   observer.detach();
 });

 appendButton.addEventListener('click', e => {
   e.preventDefault();
   console.log('appendButton clicked');
   if (!observer) {
     return;
   }
   const input = createElement({ tag: 'input', value: `${+new Date()}` });
   target.appendChild(input);
 });
}

const target = createElement({ id: 'example_target', style: 'border: 1px solid red' });
window.document.body.appendChild(target);

const options = {
 childList: true,
 subtree: true
};

const observer = new MutationObserver({ target, options });
observer.on(MUTATION_EVENTS.WILD_CARD, (type, values) => {
 console.log('wildCard', type, values);
}).on(MUTATION_EVENTS.CHANGE_CHILD_LIST, values => {
 console.log('childList', values);
});
observer.attach();

forExample();
```
