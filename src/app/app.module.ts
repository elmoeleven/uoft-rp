import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    GameBoardComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers })
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [PageNotFoundComponent, GameBoardComponent, WelcomeComponent],
  entryComponents: [PageNotFoundComponent, GameBoardComponent, WelcomeComponent]
})
export class AppModule { }
