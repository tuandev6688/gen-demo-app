import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { ComponentState } from '../types';
import produce from 'immer';

type Snapshot = Record<number, ComponentState>;

@Injectable({ providedIn: 'root' })
export class StateService {
  private snapshot$ = new BehaviorSubject<Snapshot>({});

  set(id: number, state: ComponentState): void {
    this.process(snapshot => {
      snapshot[id] = state;
    });
  }

  setAll(states: Record<number, ComponentState>): void {
    this.process(snapshot => {
      for (const entry of Object.entries(states)) {
        const [id, state] = entry as any as [number, ComponentState];
        snapshot[id] = state;
      }
    });
  }

  patch(id: number, patch: Partial<ComponentState>): void {
    this.process(snapshot => {
      snapshot[id] = { ...snapshot[id], ...patch };
    });
  }

  get(id: number): ComponentState {
    return this.snapshot$.getValue()[id];
  }

  watch(id: number): Observable<ComponentState> {
    return this.snapshot$
      .pipe(
        map(snapshot => snapshot[id]),
        distinctUntilChanged(),
      );
  }

  private process(func: (snapshot: Snapshot) => void): void {
    const snapshot = produce<Snapshot>(this.snapshot$.getValue(), (draft) => func(draft));
    this.snapshot$.next(snapshot);
  }
}
