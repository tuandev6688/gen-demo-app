import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacadeService } from '../../engine/facade.service';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
  id!: number;

  label!: string;
  removable!: boolean;

  value!: string;

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
