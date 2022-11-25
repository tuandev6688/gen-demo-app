import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineModule } from '../../engine/engine.module';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule, EngineModule],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
  id!: number;
  path!: string;
  valuePath!: string;

  label!: string;
  children!: { key: string; id: number }[];

  dirty!: boolean;
  touched!: boolean;
  valid!: boolean;
}
