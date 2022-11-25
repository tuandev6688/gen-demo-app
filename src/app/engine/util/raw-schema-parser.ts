import { Injectable } from '@angular/core';
import { ComponentRawSchema } from '../types/raw-schema';
import { ComponentSchema } from '../types/schema';
import { ComponentState } from '../types';

export interface ParseResult {
  rootComponentId: number;
  componentSchemas: Record<number, ComponentSchema>;
  componentStates: Record<number, ComponentState>;
  defaultValue: any;
}

@Injectable({ providedIn: 'root' })
export class RawSchemaParser {
  private increment = 1;

  parse(alias: string, rawSchema: ComponentRawSchema): ParseResult {
    const componentSchemas: Record<number, ComponentSchema> = {};
    const rootComponentId = this.flattenNode(rawSchema, componentSchemas, alias, alias);

    const componentsIds: number[] = Object.keys(componentSchemas) as any;
    const componentStates: Record<number, ComponentState> = {};
    for (const id of componentsIds) {
      componentStates[id] = { dirty: false, touched: false, valid: true };
    }

    const defaultValue: any = this.getDefaultValue(rawSchema);

    return { rootComponentId, componentSchemas, componentStates, defaultValue };
  }

  private flattenNode(rawSchema: ComponentRawSchema, components: Record<number, ComponentSchema>, path: string, valuePath: string): any {
    const id = this.increment++;
    let schema: ComponentSchema;

    if (rawSchema.name === 'group') {
      const { children, ...props } = rawSchema;
      schema = {
        id,
        path,
        valuePath,
        ...props,
        children: children.map(child => {
          const childId = this.flattenNode(child, components, `${path}/children/${child.key}`, `${valuePath}/${child.key}`);
          return { id: childId, key: child.key };
        }),
      };
    } else if (rawSchema.name === 'oneOf') {
      const { commonChildren, branches, ...props } = rawSchema;
      schema = {
        id,
        path,
        valuePath,
        ...props,
        commonChildren: commonChildren.map(child => {
          const childId = this.flattenNode(child, components, `${path}/commonChildren/${child.key}`, `${valuePath}/${child.key}`);
          return { id: childId, key: child.key };
        }),
        branches: branches.map(branch => {
          return {
            ...branch,
            branchChildren: branch.branchChildren.map(child => {
              const childId = this.flattenNode(child, components, `${path}/branches/${branch.key}/branchChildren/${child.key}`, `${valuePath}/${child.key}`);
              return { id: childId, key: child.key };
            }),
          };
        }),
      };
    } else if (rawSchema.name === 'orderedList') {
      const { item, ...props } = rawSchema;
      schema = {
        id,
        path,
        valuePath,
        ...props,
      };
    } else {
      schema = { id, path, valuePath, ...rawSchema };
    }

    components[id] = schema;

    return id;
  }

  private getDefaultValue(rawSchema: ComponentRawSchema): any {
    let result: any;

    if (rawSchema.name === 'group') {
      result = {};
      for (const child of rawSchema.children) {
        result[child.key] = this.getDefaultValue(child);
      }
    } else if (rawSchema.name === 'oneOf') {
      result = {
        [rawSchema.branchKey]: null,
      };
      for (const child of rawSchema.commonChildren) {
        result[child.key] = this.getDefaultValue(child);
      }
    } else if (rawSchema.name === 'orderedList') {
      result = [];
    } else if (rawSchema.name === 'textInput') {
      result = '';
    } else {
      result = null;
    }

    return result;
  }
}
