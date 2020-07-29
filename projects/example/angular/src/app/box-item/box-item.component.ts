import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy
} from '@angular/core';

import { IntersectionObserver } from 'projects/code-snippet/public-api.observer';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'box-item',
  templateUrl: './box-item.component.html',
  styleUrls: ['./box-item.component.scss']
})
export class BoxItemComponent implements OnInit, OnDestroy {
  constructor(private elRef: ElementRef) {}

  @Input()
  item: any;

  @Input()
  testCase = 'base-actor';

  // tslint:disable-next-line: no-output-rename
  @Output('testEvent')
  eventEmitter: EventEmitter<any> = new EventEmitter<any>();

  @HostBinding('class.is-appear')
  get isAppear() {
    return false;
  }

  appearEvent$: Subscription | any;

  ngOnInit() {
    const { nativeElement } = this.elRef;

    console.log(this.testCase, nativeElement);

    // switch (this.testCase) {
    //   case 'once-actor':
    //     this.actor = new OnceActor(nativeElement);
    //     break;
    //   case 'lazy-actor':
    //     this.actor = new LazyActor(nativeElement);
    //     (this.actor as LazyActor).setCheckoutDelay(1000);
    //     (this.actor as LazyActor).setAppearDelay(100);
    //     // (this.actor as LazyActor).setCheckoutDelay(0);
    //     // (this.actor as LazyActor).setAppearDelay(100);
    //     break;
    //   default:
    //     this.actor = new BaseActor(nativeElement);
    //     break;
    // }

    // this.appearEvent$ = this.actor.events.subscribe(
    //   this.onAppearEvent.bind(this)
    // );

    // this.eventEmitter.emit({
    //   type: 'init',
    //   actor: this.actor
    // });
  }

  // onAppearEvent(evt: AppearEvent) {
  //   switch (evt.type) {
  //     case AppearEvent.APPEAR:
  //       switch (this.testCase) {
  //         case 'once-actor':
  //         case 'lazy-actor':
  //           this.appearEvent$.unsubscribe();
  //           this.actor.dispose();
  //           break;
  //       }

  //       break;
  //     case AppearEvent.DISAPPEAR:
  //       break;
  //   }
  // }

  ngOnDestroy() {}
}
