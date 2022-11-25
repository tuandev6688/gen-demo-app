import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import produce from 'immer';
import { ComponentSchema } from './types/schema';

type Snapshot = Record<number, ComponentSchema>;

@Injectable({ providedIn: 'root' })
export class SchemaService {
  private readonly snapshot$ = new BehaviorSubject<Snapshot>({});
  private aliases: Record<string, number> = {};

  constructor() { }

  set(id: number, schema: ComponentSchema): void {
    this.process(snapshot => {
      snapshot[id] = schema;
    });
  }

  setAll(schemas: Record<number, ComponentSchema>): void {
    this.process(snapshot => {
      for (const entry of Object.entries(schemas)) {
        const [id, schema] = entry as any as [number, ComponentSchema];
        snapshot[id] = schema;
      }
    });
  }

  get(id: number): any {
    return this.snapshot$.getValue()[id];
  }

  watch(id: number): Observable<any> {
    return this.snapshot$.pipe(
      map(snapshot => snapshot[id]),
      distinctUntilChanged(),
    );
  }

  setAlias(alias: string, id: number): void {
    this.aliases[alias] = id;
  }

  getIdByAlias(alias: string): number {
    const id = this.aliases[alias];
    if (!id) {
      throw new Error(`No component registered with alias "${alias}". Registered aliases: ${JSON.stringify(Object.keys(this.aliases))}.`);
    }
    return id;
  }

  private process(func: (snapshot: Snapshot) => void): void {
    const snapshot = produce<Record<string, any>>(this.snapshot$.getValue(), (draft) => func(draft));
    this.snapshot$.next(snapshot);
  }
}
