import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineModule } from '../../engine/engine.module';

@Component({
  selector: 'app-ordered-list',
  standalone: true,
  imports: [CommonModule, EngineModule],
  templateUrl: './ordered-list.component.html',
  styleUrls: ['./ordered-list.component.scss']
})
export class OrderedListComponent {
  id!: number;
  path!: string;
  valuePath!: string;

  label!: string;
  addLabel!: string;
  emptyMessage!: string;

  children!: { index: number; id: number }[]; // TODO: connect this field to schema and value to get the actual list of items

  dirty!: boolean;
  touched!: boolean;
  valid!: boolean;
}
