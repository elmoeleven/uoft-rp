import { Component, OnInit } from '@angular/core';

import { SquareGrid } from './utils/square-grid';

@Component({
  selector: 'nz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nazo';

  ngOnInit(): void {
    /* keep */
  }
}
