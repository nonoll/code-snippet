import App from './App.svelte';
import { IntersectionObserver } from '@nonoll/code-snippet/observer';

const observer = new IntersectionObserver({
	target: document.querySelector('body')
});

observer.attach();

console.log('observer', observer);

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;