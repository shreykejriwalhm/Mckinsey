import { Component, OnInit } from '@angular/core';
import { LogService } from './log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: string[] = [];
  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logs = this.logService.processLogs;
  }

}
