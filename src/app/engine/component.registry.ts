import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ComponentRegistry {
  registry: Record<string, Type<any>> = {};

  set(name: string, component: Type<any>): void {
    this.registry[name] = component;
  }

  setAll(map: Record<string, Type<any>>): void {
    for (let [name, component] of Object.entries(map)) {
      this.registry[name] = component;
    }
  }

  get(name: string): Type<any> {
    const result = this.registry[name];

    if (!result) {
      throw new Error(`Component with name "${name}" is not registered.`);
    }

    return result;
  }
}
