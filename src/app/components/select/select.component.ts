import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacadeService } from '../../engine/facade.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  id!: number;

  label!: string;
  valueOptions!: { value: any; label: string }[];
  listItem!: boolean;

  value!: number;

  dirty!: boolean;
  touched!: boolean;
  valid!: boolean;

  constructor(private facade: FacadeService) {}

  setValue(value: string): void {
    this.facade.setValue(this.id, value);
  }

  reset(): void {
    this.facade.reset(this.id);
  }

  setValid(valid: boolean): void {
    this.facade.patchState(this.id, { valid });
  }

  markAsTouched(): void {
    this.facade.patchState(this.id, { touched: true });
  }

  remove(): void {
    this.facade.removeListItem(this.id);
  }
}
