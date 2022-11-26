interface BaseComponentStructure {
  id: number;
  name: string;
  disabled?: boolean;
  hidden?: boolean;
  path: string;
  valuePath: string;
}

export interface GroupComponentStructure extends BaseComponentStructure {
  name: 'group';
  label: string;
  children: { key: string; id: number }[];
}

export interface OneOfComponentStructure extends BaseComponentStructure {
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

export interface OrderedListComponentStructure extends BaseComponentStructure {
  name: 'orderedList';
  label: string;
  addLabel: string;
  emptyMessage: string;
}

export interface TextInputComponentStructure extends BaseComponentStructure {
  name: 'textInput';
  label: string;
  placeholder: string;
}

export interface SelectComponentStructure extends BaseComponentStructure {
  name: 'select';
  label: string;
  placeholder: string;
  valueOptions: { value: any; label: string }[];
}

export type ComponentStructure =
  GroupComponentStructure |
  OneOfComponentStructure |
  OrderedListComponentStructure |
  TextInputComponentStructure |
  SelectComponentStructure;
