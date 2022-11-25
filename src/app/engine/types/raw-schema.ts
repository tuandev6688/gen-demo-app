interface BaseRawSchema {
  name: string;
  disabled?: boolean;
  hidden?: boolean;
  defaultValue?: any;
}

export interface GroupRawSchema extends BaseRawSchema {
  name: 'group';
  label: string;
  children: (ComponentRawSchema & { key: string })[];
}

export interface OneOfRawSchema extends BaseRawSchema {
  name: 'oneOf';
  label: string;
  commonChildren: (ComponentRawSchema & { key: string })[];
  branchKey: string;
  branches: {
    key: string;
    label: string;
    branchChildren: (ComponentRawSchema & { key: string })[];
  }[];
}

export interface OrderedListRawSchema extends BaseRawSchema {
  name: 'orderedList';
  label: string;
  item: ComponentRawSchema;
  defaultValue?: any[];
}

export interface TextInputRawSchema extends BaseRawSchema {
  name: 'textInput';
  label: string;
  placeholder: string;
  defaultValue?: string;
}

export interface SelectRawSchema extends BaseRawSchema {
  name: 'select';
  label: string;
  placeholder: string;
  valueOptions: { value: any; label: string }[];
}

export type ComponentRawSchema =
  GroupRawSchema |
  OneOfRawSchema |
  OrderedListRawSchema |
  TextInputRawSchema |
  SelectRawSchema;
