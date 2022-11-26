import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentState } from './types';
import { ComponentRawSchema } from './types/raw-schema';
import { ComponentStructure } from './types/schema';
import { StructureService } from './model/structure.service';
import { StateService } from './model/state.service';
import { ValueService } from './model/value.service';
import { RawSchemaParser } from './util/raw-schema-parser';

@Injectable({ providedIn: 'root' })
export class FacadeService {

  constructor(
    private parser: RawSchemaParser,
    private structureService: StructureService,
    private stateService: StateService,
    private valueService: ValueService,
  ) { }

  registerSchema(alias: string, schema: ComponentRawSchema): void {
    const {
      rootComponentId, componentStructures, componentStates, defaultValue,
    } = this.parser.parse(schema, alias, alias);

    this.structureService.setAll(componentStructures);
    this.structureService.setAlias(alias, rootComponentId);
    this.stateService.setAll(componentStates);
    this.valueService.set(alias, defaultValue);
  }

  watchStructure(idOrAlias: number | string): Observable<ComponentStructure> {
    const id = typeof idOrAlias === 'number' ? idOrAlias : this.structureService.getIdByAlias(idOrAlias);
    return this.structureService.watch(id);
  }

  patchState(id: number, patch: Partial<ComponentState>): void {
    this.stateService.patch(id, patch);
  }

  watchState(id: number): Observable<ComponentState> {
    return this.stateService.watch(id);
  }

  setValue(path: string, value: any): void {
    console.log('setValue', path, value);
    this.valueService.set(path, value);
  }

  watchValue(valuePath: string): Observable<any> {
    return this.valueService.watch(valuePath);
  }

  getValue(valuePath: string): any {
    return this.valueService.get(valuePath);
  }

  reset(id: number): void {
    this.stateService.set(id, { dirty: false, touched: false, valid: true });
    const valuePath = this.structureService.get(id).valuePath;
    this.setValue(valuePath, null);
  }

  addListItem(id: number): void {

  }

  removeListItem(id: number): void {

  }
}
