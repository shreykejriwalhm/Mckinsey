import { Subject } from 'rxjs/Subject';

export class LogService {
  processLogs: string[] = [];
  logChanged = new Subject<boolean>();

  addLog(logMessage: string) {
    this.processLogs.push(logMessage);
  }
}
