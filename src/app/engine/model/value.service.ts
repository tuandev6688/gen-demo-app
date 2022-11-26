import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import produce from 'immer';
import { splitPath } from '../util/split-path';

@Injectable({ providedIn: 'root' })
export class ValueService {
  root$ = new BehaviorSubject<any>({});

  constructor() { }

  set(path: string, value: any) {
    this.process(path, (parent: any, key: string | number) => parent[key] = value);
  }

  get(path: string): any {
    const value = this.findNodeByPath(this.root$.getValue(), path);
    console.log('get', path, value);
    return value;
  }

  watch(path: string): Observable<any> {
    return this.root$.pipe(
      map(root => this.findNodeByPath(root, path)),
      distinctUntilChanged(),
    );
  }

  remove(path: string): void {
    this.process(path, (parent: any, key: string | number) => {
      if (Array.isArray(parent)) {
        const index = key as number;
        parent.splice(index, 1);
      } else {
        delete parent[key];
      }
    });
  }

  private findNodeByPath(root: any, path: string) {
    let result = root;
    const segments = splitPath(path);
    for (const segment of segments) {
      if (!result) {
        result = null;
        break;
      }
      result = result[segment];
    }

    return result;
  }

  private process(path: string, func: (parent: any, key: string | number) => void): any {
    const root = produce<any>(this.root$.getValue(), (draft) => {
      const segments = path.split('/');
      const parentSegments = segments.slice(0, -1);
      const last = segments[segments.length - 1];

      let nearestParent = draft;
      for (const segment of parentSegments) {
        nearestParent[segment] = nearestParent[segment] || {};
        nearestParent = nearestParent[segment];
      }

      func(nearestParent, last);
    });
    this.root$.next(root);
  }
}
