import { GroupRawSchema } from '../engine/types/raw-schema';

export const contact: GroupRawSchema = {
  name: 'group',
  label: 'Contact',
  children: [
    {
      name: 'select',
      key: 'title',
      label: 'Title',
      placeholder: 'Select title',
      valueOptions: [
        { value: 1, label: 'Mr' },
        { value: 2, label: 'Mrs' },
        { value: 3, label: 'Miss' },
        { value: 4, label: 'Dr' },
      ],
    },
    {
      name: 'textInput',
      key: 'firstName',
      label: 'First name',
      placeholder: 'Enter first name',
    },
    {
      name: 'textInput',
      key: 'lastName',
      label: 'Last name',
      placeholder: 'Enter last name',
    },
    {
      name: 'textInput',
      key: 'email',
      label: 'Email',
      placeholder: 'Enter email',
    },
  ],
};
