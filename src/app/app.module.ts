import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ErrorComponent } from './error.component';
import { DebugComponent } from './debug/debug.component';

import { AppComponent } from './app.component';
import { ConverterComponent } from './converter.component';
import { TablesComponent } from './tables.component';

import { UnitService } from './unit.service';
import { ConversionService } from './conversion.service';
import { ParseService } from './parse.service';

@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent,
    TablesComponent,
    ErrorComponent,
    DebugComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'tables/:id',
        component: TablesComponent
      },
      {
        path: 'convert',
        component: ConverterComponent
      },
      {
        path: 'tables',
        redirectTo: 'tables/length',
        pathMatch: 'full'
      },
      {
        path: 'tests',
        component: DebugComponent
      },
      {
        path: '',
        redirectTo: 'convert',
        pathMatch: 'full'
      },
      {
        path: '**',
        component: ErrorComponent
      }
    ])
  ],
  providers: [
    UnitService,
    ConversionService,
    ParseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
