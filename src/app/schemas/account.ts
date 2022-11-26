import { ComponentSchema } from '../engine/types/schema';
import { contact } from './contact';

export const account: ComponentSchema = {
  name: 'oneOf',
  label: 'Account',
  commonChildren: [
    {
      key: 'country',
      name: 'select',
      label: 'Country',
      placeholder: 'Select country',
      valueOptions: [
        { value: 'DE', label: 'Germany' },
        { value: 'UK', label: 'United Kingdom' },
        { value: 'IT', label: 'Italy' },
      ],
    },
  ],
  branchKey: 'accountType',
  branches: [
    {
      key: 'individual',
      label: 'Individual',
      branchChildren: contact.children,
    },
    {
      key: 'company',
      label: 'Company',
      branchChildren: [
        {
          ...contact,
          key: 'primaryContact',
          label: 'Primary Contact',
        },
        {
          ...contact,
          key: 'secondaryContact',
          label: 'Secondary Contact',
        },
      ],
    },
  ],
};
