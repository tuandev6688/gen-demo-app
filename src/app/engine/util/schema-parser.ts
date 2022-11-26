import { Injectable } from '@angular/core';
import { ComponentSchema } from '../types/schema';
import { ComponentStructure } from '../types/structure';
import { ComponentState } from '../types';

export interface ParseResult {
  rootComponentId: number;
  componentsStructures: Record<number, ComponentStructure>;
  componentsStates: Record<number, ComponentState>;
  defaultValue: any;
}

@Injectable({ providedIn: 'root' })
export class SchemaParser {
  private increment = 1;

  parse(schema: ComponentSchema, schemaPath: string, valuePath: string): ParseResult {
    const componentsStructures: Record<number, ComponentStructure> = {};
    const rootComponentId = this.flattenNode(schema, componentsStructures, schemaPath, valuePath);

    const componentsIds: number[] = Object.keys(componentsStructures) as any;
    const componentsStates: Record<number, ComponentState> = {};
    for (const id of componentsIds) {
      componentsStates[id] = { dirty: false, touched: false, valid: true };
    }

    const defaultValue: any = this.getDefaultValue(schema);

    return { rootComponentId, componentsStructures, componentsStates, defaultValue };
  }

  private flattenNode(schema: ComponentSchema, components: Record<number, ComponentStructure>, schemaPath: string, valuePath: string): any {
    const id = this.increment++;
    let structure: ComponentStructure;

    if (schema.name === 'group') {
      const { children, ...props } = schema;
      structure = {
        id,
        schemaPath: schemaPath,
        valuePath,
        ...props,
        children: children.map(child => {
          const childId = this.flattenNode(child, components, `${schemaPath}/children/${child.key}`, `${valuePath}/${child.key}`);
          return { id: childId, key: child.key };
        }),
      };
    } else if (schema.name === 'oneOf') {
      const { commonChildren, branches, ...props } = schema;
      structure = {
        id,
        schemaPath: schemaPath,
        valuePath,
        ...props,
        commonChildren: commonChildren.map(child => {
          const childId = this.flattenNode(child, components, `${schemaPath}/commonChildren/${child.key}`, `${valuePath}/${child.key}`);
          return { id: childId, key: child.key };
        }),
        branches: branches.map(branch => {
          return {
            ...branch,
            branchChildren: branch.branchChildren.map(child => {
              const childId = this.flattenNode(child, components, `${schemaPath}/branches/${branch.key}/branchChildren/${child.key}`, `${valuePath}/${child.key}`);
              return { id: childId, key: child.key };
            }),
          };
        }),
      };
    } else if (schema.name === 'orderedList') {
      const { item, ...props } = schema;
      structure = {
        id,
        schemaPath,
        valuePath,
        ...props,
        items: [],
      };
    } else {
      structure = { id, schemaPath, valuePath, ...schema };
    }

    components[id] = structure;

    return id;
  }

  private getDefaultValue(schema: ComponentSchema): any {
    let result: any;

    if (schema.name === 'group') {
      result = {};
      for (const child of schema.children) {
        result[child.key] = this.getDefaultValue(child);
      }
    } else if (schema.name === 'oneOf') {
      result = {
        [schema.branchKey]: null,
      };
      for (const child of schema.commonChildren) {
        result[child.key] = this.getDefaultValue(child);
      }
    } else if (schema.name === 'orderedList') {
      result = [];
    } else if (schema.name === 'textInput') {
      result = '';
    } else {
      result = null;
    }

    return result;
  }
}
