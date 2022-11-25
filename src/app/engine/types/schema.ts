import { OrderedListRawSchema } from './raw-schema';

interface BaseSchema {
  id: number;
  name: string;
  disabled?: boolean;
  hidden?: boolean;
  path: string;
  valuePath: string;
}

export interface GroupSchema extends BaseSchema {
  name: 'group';
  label: string;
  children: { key: string; id: number }[];
}

export interface OneOfSchema extends BaseSchema {
  name: 'oneOf';
  label: string;
  commonChildren: { key: string; id: number }[];
  branchKey: string;
  branches: {
    key: string;
    label: string;
    branchChildren: { key: string; id: number }[];
  }[];
}

export interface OrderedListSchema extends BaseSchema {
  name: 'orderedList';
  label: string;
}

export interface TextInputSchema extends BaseSchema {
  name: 'textInput';
  label: string;
  placeholder: string;
}

export interface SelectSchema extends BaseSchema {
  name: 'select';
  label: string;
  placeholder: string;
  valueOptions: { value: any; label: string }[];
}

export type ComponentSchema =
  GroupSchema |
  OneOfSchema |
  OrderedListSchema |
  TextInputSchema |
  SelectSchema;
