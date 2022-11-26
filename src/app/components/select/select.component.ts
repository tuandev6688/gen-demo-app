import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacadeService } from '../../engine/facade.service';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  id!: number;
  valuePath!: string;

  label!: string;
  placeholder!: string;
  valueOptions!: { value: any; label: string }[];

  value!: number;

  dirty!: boolean;
  touched!: boolean;
  valid!: boolean;

  constructor(private facade: FacadeService) {}

  setValue(value: string): void {
    this.facade.setValue(this.valuePath, value);
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
}
