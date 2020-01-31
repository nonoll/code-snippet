# @nonoll/code-snippet

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.14.

## example - test

- MutationObserver

<iframe
  src="https://codesandbox.io/embed/wonderful-johnson-9gko8/observer-MutationObserver.html?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="@nonoll/code-snippet"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

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
