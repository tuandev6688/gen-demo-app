import { OrderedListComponentSchema } from '../engine/types/schema';
import { contact } from './contact';

export const contactList: OrderedListComponentSchema = {
  name: 'orderedList',
  label: 'Contact list',
  addLabel: '+ Add contact',
  emptyMessage: 'No contacts found.',
  item: contact,
};
