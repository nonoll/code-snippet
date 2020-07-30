import { Component, OnInit } from '@angular/core';

// import { AppearStage } from 'projects/packages/src/public-api';
// import { AppearStage } from "dist/packages";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // testStage: AppearStage;

  testList: any[] = [];
  testCase = 'base-actor';
  testBoxCount = 0;
  testBoxMore = 30;

  ngOnInit() {
    // this.testStage = new AppearStage();
    // this.testStage.init();
    this.addBox();
  }

  // onItemEvent(evt: { type: string; actor: any }) {
  //   if (evt.type === "init") {
  //     this.testStage.observe(evt.actor);
  //   } else if (evt.type === "dispose") {
  //     this.testStage.unobserve(evt.actor);
  //   }
  // }

  handleAddBox() {
    this.addBox();
  }

  handleRemoveBox() {
    this.removeBox();
  }

  handleCaseChange(evt: any) {
    this.redraw();
  }

  redraw() {
    const temp = Object.assign([], this.testList);
    this.testList = [];
    requestAnimationFrame(() => {
      this.testList = temp;
    });
  }

  addBox() {
    this.testList = Object.assign(
      [],
      this.testList.concat(
        Array.from(Array(this.testBoxMore)).map(() => {
          return this.testBoxCount++;
        })
      )
    );
  }

  removeBox() {
    this.testList.splice(0, this.testBoxMore);
    this.testList = Object.assign([], this.testList);
  }

  trackByFn(index, item) {
    return `${index}_${item}`;
  }
}
