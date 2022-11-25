import { Component, OnInit } from '@angular/core';
import { FacadeService } from './engine/facade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  schemaName = 'contact';
  value$!: Observable<any>;

  constructor(private facade: FacadeService) {}

  ngOnInit(): void {
    this.value$ = this.facade.watchValue(this.schemaName);
  }
}
