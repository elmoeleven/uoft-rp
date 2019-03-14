import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameBoardComponent } from './game-board/game-board.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: 'play',
    component: GameBoardComponent,
    data: { title: 'Welcome Component' }
  },
  {
    path: '',
    component: WelcomeComponent,
    data: { title: 'Welcome Component' }
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
