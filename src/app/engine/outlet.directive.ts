import { Directive, Input, ViewContainerRef } from '@angular/core';
import { FacadeService } from './facade.service';
import { Subject, takeUntil } from 'rxjs';
import { ComponentRegistry } from './component.registry';
import { ComponentStructure } from './types/structure';

@Directive({
  selector: '[appOutlet]',
})
export class OutletDirective {
  destroy$ = new Subject<void>();

  constructor(
    private vcr: ViewContainerRef,
    private facade: FacadeService,
    private componentRegistry: ComponentRegistry,
  ) { }

  @Input('appOutlet') set idOrAlias(idOrAlias: number | string) {
    this.facade.watchStructure(idOrAlias)
      .pipe(takeUntil(this.destroy$))
      .subscribe(schema => this.render(schema));
  }

  private render(schema: ComponentStructure): void {
    this.vcr.clear();

    if (schema.hidden) {
      return;
    }

    const component = this.componentRegistry.get(schema.name);
    const componentRef = this.vcr.createComponent(component);
    const instance = componentRef.instance;
    for (const [key, prop] of Object.entries(schema)) {
      instance[key] = prop;
    }

    this.facade.watchState(schema.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        for (const [key, value] of Object.entries(state)) {
          instance[key] = value;
        }
      });

    this.facade.watchValue(schema.valuePath)
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => instance.value = value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
