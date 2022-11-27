import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineModule } from '../../engine/engine.module';
import { FacadeService } from '../../engine/facade.service';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule, EngineModule],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
  id!: number;

  label!: string;
  children!: { key: string; id: number }[];
  removable!: boolean;

  dirty!: boolean;
  touched!: boolean;
  valid!: boolean;

  constructor(private facade: FacadeService) {}

  remove(): void {
    this.facade.removeListItem(this.id);
  }
}
