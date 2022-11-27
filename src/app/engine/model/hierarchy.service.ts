import { Injectable } from '@angular/core';
import { distinctUntilChanged, expand, map, Observable, of, reduce, takeWhile, tap } from 'rxjs';
import { StructureService } from './structure.service';

@Injectable({ providedIn: 'root' })
export class HierarchyService {

  constructor(private structureService: StructureService) { }

  getValuePath(id: number): string {
    const keys: (string | number)[] = [];

    let currId: number | null = id;
    while (currId) {
      const item = this.structureService.get(currId);
      keys.push(item.key);
      currId = item.parentId;
    }
    keys.reverse();

    return keys.join('/');
  }

  watchValuePath(id: number): Observable<string> {
    return this.structureService.watch(id).pipe(
      expand((structure) => structure.parentId ? this.structureService.watch(structure.parentId) : of(null)),
      takeWhile((structure) => !!structure),
      reduce((acc: any[], segment) => [...acc, segment], []),
      map(hierarchy => hierarchy.reverse().map(item => item.key).join('/')),
      distinctUntilChanged(),
    );
  }
}
