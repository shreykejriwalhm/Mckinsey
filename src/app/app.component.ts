import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './app.service';
import { Cell } from './cell/cell.model';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  cells: Cell[];
  limit: number;
  disableStart = false;
  subscription: Subscription;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.generateCells();
    // console.log(this.appService.getCells());
    this.cells = this.appService.getCells();
    this.limit = this.appService.getLimit();

    this.subscription = this.appService.processStarted.subscribe(
      () => (this.disableStart = true)
    );
  }

  handleStart() {
    this.appService.startProcess();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
