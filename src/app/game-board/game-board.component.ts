import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Block } from 'app/utils/block';
import { WeightedGrid } from 'app/utils/weighted-grid';

import {
  GameBoardAddTimeAction,
  GameBoardInitializeAction,
  GameBoardShowHintAction,
  GameBoardSelectBlockAction
} from './store/game-board.actions';
import { selectGameBoardGrid } from './store/game-board.selectors';
import { IGameBoardState } from './store/game-board.state';

@Component({
  selector: 'nz-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent implements OnInit {
  score$: Observable<number>;
  hintCount$: Observable<number>;
  addTimeCount$: Observable<number>;
  timeRemaining$: Observable<number>;
  grid$: Observable<WeightedGrid>;

  constructor(private _router: Router, private _store: Store<IGameBoardState>) {
    _store.dispatch(new GameBoardInitializeAction());
  }

  ngOnInit(): void {
    this.grid$ = this._store.select(selectGameBoardGrid);
  }

  selectBlock(block: Block): void {
    this._store.dispatch(new GameBoardSelectBlockAction(block.coord));
  }

  addTime(): void {
    this._store.dispatch(new GameBoardAddTimeAction());
  }

  showHint(): void {
    this._store.dispatch(new GameBoardShowHintAction());
  }

  quit(): void {
    this._router.navigate(['/']);
  }
}
