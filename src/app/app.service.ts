import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Cell } from './cell/cell.model';
import { LogService } from './logs/log.service';

@Injectable()
export class AppService {
  private cells: Cell[] = [];
  limit = 10;
  started = false;
  processStarted = new Subject<boolean>();

  stateChanged = false;

  constructor(private logService: LogService) {}

  generateCells() {
    for (let y = 1; y <= this.limit; y++) {
      for (let x = 1; x <= this.limit; x++) {
        this.cells.push({
          xPos: x,
          yPos: y,
          state: true
        });
      }
    }
  }

  getCells() {
    // returning the array immutably
    return [...this.cells];
  }

  getLimit() {
    return this.limit;
  }

  setState(cell: Cell, state: boolean) {
    const prevCell = this.cells.find(function(c) {
      return c.xPos === cell.xPos && c.yPos === cell.yPos;
    });

    if (prevCell) {
      prevCell.state = state;
    }
  }

  startProcess() {
    this.started = true;
    this.processStarted.next(true);

    let iterationNo = 0;

    do {
      this.logService.addLog('Iteration No ' + iterationNo++);

      this.stateChanged = false;
      this.cells.forEach(cell => {
        let liveCellCount = 0;
        let deadCellCount = 0;

        const { xPos, yPos } = cell;

        this.logService.addLog('Processing for cell ' + JSON.stringify(cell));

        // Checking 8 sides
        const firstSide = this.cells.find(c => {
          return c.xPos === cell.xPos - 1 && c.yPos === cell.yPos + 1;
        });

        if (firstSide) {
          firstSide.state ? liveCellCount++ : deadCellCount++;
        }

        const secondSide = this.cells.find(c => {
          return c.xPos === cell.xPos && c.yPos === cell.yPos + 1;
        });

        if (secondSide) {
          secondSide.state ? liveCellCount++ : deadCellCount++;
        }

        const thirdSide = this.cells.find(c => {
          return c.xPos === cell.xPos + 1 && c.yPos === cell.yPos + 1;
        });

        if (thirdSide) {
          thirdSide.state ? liveCellCount++ : deadCellCount++;
        }

        const fourthSide = this.cells.find(c => {
          return c.xPos === cell.xPos + 1 && c.yPos === cell.yPos;
        });

        if (fourthSide) {
          fourthSide.state ? liveCellCount++ : deadCellCount++;
        }

        const fifthSide = this.cells.find(c => {
          return c.xPos === cell.xPos + 1 && c.yPos === cell.yPos - 1;
        });

        if (fifthSide) {
          fifthSide.state ? liveCellCount++ : deadCellCount++;
        }

        const sixthSide = this.cells.find(c => {
          return c.xPos === cell.xPos && c.yPos === cell.yPos - 1;
        });

        if (sixthSide) {
          sixthSide.state ? liveCellCount++ : deadCellCount++;
        }

        const seventhSide = this.cells.find(c => {
          return c.xPos === cell.xPos - 1 && c.yPos === cell.yPos - 1;
        });

        if (seventhSide) {
          seventhSide.state ? liveCellCount++ : deadCellCount++;
        }

        const eigthSide = this.cells.find(c => {
          return c.xPos === cell.xPos - 1 && c.yPos === cell.yPos;
        });

        if (eigthSide) {
          eigthSide.state ? liveCellCount++ : deadCellCount++;
        }

        this.logService.addLog('liveCellCount = ' + liveCellCount);
        this.logService.addLog('deadCellCount = ' + deadCellCount);

        if (cell.state) {
          if (liveCellCount < 2) {
            // Under Population
            this.stateChanged = true;
            cell.state = false;
            this.logService.addLog('Result Under Population');
          } else if (liveCellCount === 2 || liveCellCount === 3) {
            // next generation
            cell.state = true;
            this.logService.addLog('Result Next Generation');
          } else {
            // overcrowding
            this.stateChanged = true;
            cell.state = false;
            this.logService.addLog('Result Over Crowding');
          }
        } else {
          if (liveCellCount === 3) {
            // reproduction
            cell.state = true;
            this.stateChanged = true;
            this.logService.addLog('Result Reproduction');
          }
        }
      });

      this.logService.addLog('Iteration No' + iterationNo + ' finished!');
    } while (this.stateChanged);
  }
}
