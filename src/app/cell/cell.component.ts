import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';
import { Cell } from './cell.model';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input() cell: Cell;
  constructor(private appService: AppService) {}

  ngOnInit() {
    console.log(this.cell);
  }

  handleClick() {
    if (!this.appService.started) {
      this.appService.setState(this.cell, !this.cell.state);
    }
  }
}
