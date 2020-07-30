import { IntersectionObserver } from '@nonoll/code-snippet/observer';

class App {
  private readonly UID = 'APP_UID';
  private observer: IntersectionObserver;

  constructor() {
    this.observer = new IntersectionObserver({
      target: document.querySelector('body')
    });

    this.observer.attach();
    console.log('App', this.UID, this.observer);
  }
}

const app = new App();
console.log('app', app);
