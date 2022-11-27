import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ComponentState } from './types';
import { ComponentSchema } from './types/schema';
import { ComponentStructure } from './types/structure';
import { SchemaParser } from './util/schema-parser';
import { StructureService } from './model/structure.service';
import { StateService } from './model/state.service';
import { ValueService } from './model/value.service';
import { SchemaService } from './model/schema.service';
import { HierarchyService } from './model/hierarchy.service';

@Injectable({ providedIn: 'root' })
export class FacadeService {

  constructor(
    private parser: SchemaParser,
    private schemaService: SchemaService,
    private structureService: StructureService,
    private stateService: StateService,
    private valueService: ValueService,
    public hierarchyService: HierarchyService,
  ) { }

  registerSchema(alias: string, schema: ComponentSchema): void {
    const {
      rootComponentId, componentsStructures, componentsStates, defaultValue,
    } = this.parser.parse(schema, alias, null, alias);

    this.schemaService.set(alias, schema);
    this.structureService.setAll(componentsStructures);
    this.structureService.setAlias(alias, rootComponentId);
    this.stateService.setAll(componentsStates);
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

  setValue(id: number, value: any): void {
    const valuePath = this.hierarchyService.getValuePath(id);
    this.valueService.set(valuePath, value);
  }

  getValue(id: number): any {
    const valuePath = this.hierarchyService.getValuePath(id);
    return this.valueService.get(valuePath);
  }

  watchValue(id: number): Observable<any> {
    return this.hierarchyService.watchValuePath(id).pipe(
      switchMap(valuePath => this.valueService.watch(valuePath)),
    );
  }

  getValueByPath(path: string): any {
    return this.valueService.get(path);
  }

  watchValueByPath(path: string): Observable<any> {
    return this.valueService.watch(path);
  }

  reset(id: number): void {
    this.stateService.set(id, { dirty: false, touched: false, valid: true });
    this.setValue(id, null);
  }

  addListItem(listId: number): void {

  }

  removeListItem(itemId: number): void {

  }
}
