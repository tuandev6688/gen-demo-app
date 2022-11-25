import { Injectable } from '@angular/core';
import { SchemaService } from './schema.service';
import { ComponentState } from './types';
import { Observable } from 'rxjs';
import { ComponentRawSchema } from './types/raw-schema';
import { ComponentSchema } from './types/schema';
import { StateService } from './state.service';
import { ValueService } from './value.service';
import { RawSchemaParser } from './util/raw-schema-parser';

@Injectable({ providedIn: 'root' })
export class FacadeService {

  constructor(
    private parser: RawSchemaParser,
    private schemaService: SchemaService,
    private stateService: StateService,
    private valueService: ValueService,
  ) { }

  registerSchema(alias: string, rawSchema: ComponentRawSchema): void {
    const { rootComponentId, componentSchemas, componentStates, defaultValue } = this.parser.parse(alias, rawSchema);

    this.schemaService.setAll(componentSchemas);
    this.schemaService.setAlias(alias, rootComponentId);
    this.stateService.setAll(componentStates);
    this.valueService.set(alias, defaultValue);
  }

  watchSchema(idOrAlias: number | string): Observable<ComponentSchema> {
    const id = typeof idOrAlias === 'number' ? idOrAlias : this.schemaService.getIdByAlias(idOrAlias);
    return this.schemaService.watch(id);
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
    console.log('reset', id);
    this.stateService.set(id, { dirty: false, touched: false, valid: true });
    const valuePath = this.schemaService.get(id).valuePath;
    this.setValue(valuePath, null);
  }
}
