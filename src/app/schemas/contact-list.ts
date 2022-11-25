import { OrderedListRawSchema } from '../engine/types/raw-schema';
import { contact } from './contact';

export const contactList: OrderedListRawSchema = {
  name: 'orderedList',
  label: 'Contact list',
  addLabel: '+ Add contact',
  emptyMessage: 'No contacts found.',
  item: contact,
};
