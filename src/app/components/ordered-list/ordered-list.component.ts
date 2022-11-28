import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineModule } from '../../engine/engine.module';
import { FacadeService } from '../../engine/facade.service';

@Component({
  selector: 'app-ordered-list',
  standalone: true,
  imports: [CommonModule, EngineModule],
  templateUrl: './ordered-list.component.html',
  styleUrls: ['./ordered-list.component.scss'],
})
export class OrderedListComponent {
  id!: number;

  label!: string;
  addLabel!: string;
  emptyMessage!: string;
  listItem!: boolean;

  items!: number[];

  dirty!: boolean;
  touched!: boolean;
  valid!: boolean;

  constructor(private facade: FacadeService) {}

  addListItem(): void {
    this.facade.addListItem(this.id);
  }

  remove(): void {
    this.facade.removeListItem(this.id);
  }
}
