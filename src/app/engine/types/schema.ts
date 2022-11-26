interface BaseComponentSchema {
  name: string;
  disabled?: boolean;
  hidden?: boolean;
  defaultValue?: any;
}

export interface GroupComponentSchema extends BaseComponentSchema {
  name: 'group';
  label: string;
  children: (ComponentSchema & { key: string })[];
}

export interface OneOfComponentSchema extends BaseComponentSchema {
  name: 'oneOf';
  label: string;
  commonChildren: (ComponentSchema & { key: string })[];
  branchKey: string;
  branches: {
    key: string;
    label: string;
    branchChildren: (ComponentSchema & { key: string })[];
  }[];
}

export interface OrderedListComponentSchema extends BaseComponentSchema {
  name: 'orderedList';
  label: string;
  addLabel: string;
  emptyMessage: string;
  item: ComponentSchema;
  defaultValue?: any[];
}

export interface TextInputComponentSchema extends BaseComponentSchema {
  name: 'textInput';
  label: string;
  placeholder: string;
  defaultValue?: string;
}

export interface SelectComponentSchema extends BaseComponentSchema {
  name: 'select';
  label: string;
  placeholder: string;
  valueOptions: { value: any; label: string }[];
}

export type ComponentSchema =
  GroupComponentSchema |
  OneOfComponentSchema |
  OrderedListComponentSchema |
  TextInputComponentSchema |
  SelectComponentSchema;
