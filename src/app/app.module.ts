import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CellComponent } from './cell/cell.component';
import { AppService } from './app.service';
import { LogsComponent } from './logs/logs.component';
import { LogService } from './logs/log.service';


@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    LogsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [AppService, LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
