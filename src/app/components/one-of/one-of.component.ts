import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineModule } from '../../engine/engine.module';
import { FacadeService } from '../../engine/facade.service';

@Component({
  selector: 'app-one-of',
  standalone: true,
  imports: [CommonModule, EngineModule],
  templateUrl: './one-of.component.html',
  styleUrls: ['./one-of.component.scss'],
})
export class OneOfComponent implements OnInit {
  id!: number;
  path!: string;
  valuePath!: string;

  label!: string;
  commonChildren!: { key: string; id: number }[];
  branchKey!: string;
  branches!: {
    key: string;
    label: string;
    branchChildren: { key: string; id: number }[];
  }[];

  value: any;

  dirty!: boolean;
  touched!: boolean;
  valid!: boolean;

  options!: { value: string; label: string }[];
  children!: { key: string; id: number }[];

  constructor(private facade: FacadeService) {}

  ngOnInit(): void {
    this.options = this.branches.map(branch => ({ value: branch.key, label: branch.label }));

    let branchChildren: { key: string; id: number }[] = [];
    if (this.value[this.branchKey]) {
      branchChildren = this.branches.find(branch => branch.key === this.branchKey)!.branchChildren;
    }
    this.children = [...this.commonChildren, ...branchChildren];
  }

  setValue(value: any): void {
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

  selectBranch(branchKey: string): void {
    const oldValue = this.facade.getValue(this.valuePath);
    console.log(oldValue);

    const newValue: any = {
      [this.branchKey]: branchKey,
    };

    const commonChildrenKeys = this.commonChildren.map(child => child.key);
    console.log(oldValue);
    for (const key of commonChildrenKeys) {
      newValue[key] = oldValue[key];
    }

    if (branchKey) {
      const branchChildrenKeys = this.branches.find(branch => branch.key === branchKey)!
        .branchChildren.map(child => child.key);
      for (const key of branchChildrenKeys) {
        newValue[key] = null;
      }
    }

    this.setValue(newValue);
  }
}
