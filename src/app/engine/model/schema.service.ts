import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import produce from 'immer';
import { ComponentSchema } from '../types/schema';
import { splitPath } from '../util/split-path';

type Snapshot = Record<string, ComponentSchema>;

@Injectable({ providedIn: 'root' })
export class SchemaService {
  private snapshot$ = new BehaviorSubject<Snapshot>({});

  set(alias: string, schema: ComponentSchema): void {
    this.process(snapshot => {
      snapshot[alias] = schema;
    });
  }

  findByPath(path: string): ComponentSchema {
    const segments = splitPath(path);
    const alias = segments[0];
    const schema = this.snapshot$.getValue()[alias];
    return this.findNode(schema, segments.slice(1));
  }

  private findNode(schema: any, segments: string[]): ComponentSchema {
    if (segments.length == 0) {
      return schema;
    }

    const current = schema[segments[0]];
    return this.findNode(current, segments.slice(1));
  }

  private process(func: (snapshot: Snapshot) => void): void {
    const snapshot = produce<Snapshot>(this.snapshot$.getValue(), (draft) => func(draft));
    this.snapshot$.next(snapshot);
  }
}
