import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, interval, combineLatest, Subject } from 'rxjs';
import { mergeMap, take, finalize, withLatestFrom, map, takeUntil, filter } from 'rxjs/operators';

import { Block } from 'app/utils/block';
import { WeightedGrid } from 'app/utils/weighted-grid';

import {
  GameBoardAddTimeAction,
  GameBoardInitializeAction,
  GameBoardShowHintAction,
  GameBoardSelectBlockAction,
  GameBoardEndGameAction
} from './store/game-board.actions';
import {
  selectGameBoardGrid,
  selectGameBoardAllottedTime,
  selectGameBoardGameOver
} from './store/game-board.selectors';
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
  timeRemaining$: Observable<string>;
  grid$: Observable<WeightedGrid>;
  gameOver$: Observable<boolean>;

  private _allottedTime$: Observable<number>;
  private _timeElapsed$: Observable<number>;

  constructor(private _router: Router, private _store: Store<IGameBoardState>) {
    _store.dispatch(new GameBoardInitializeAction());
  }

  ngOnInit(): void {
    this.grid$ = this._store.select(selectGameBoardGrid);

    this._allottedTime$ = this._store.select(selectGameBoardAllottedTime);

    this.gameOver$ = this._store.select(selectGameBoardGameOver).pipe(filter((over) => !!over));

    this._timeElapsed$ = this._store.select(selectGameBoardAllottedTime).pipe(
      mergeMap((time) =>
        interval(1000).pipe(
          take(time),
          finalize(() => this._store.dispatch(new GameBoardEndGameAction()))
        )
      )
    );

    this.timeRemaining$ = combineLatest(this._timeElapsed$, this._allottedTime$).pipe(
      map(([elapsed, total]) => total - elapsed),
      map((remaining) => `${Math.floor(remaining % 60)} left`)
    );

    this.gameOver$.subscribe(() => {
      console.log('over');
    });
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
