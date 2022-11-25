import { OrderedListRawSchema } from '../engine/types/raw-schema';
import { contact } from './contact';

export const contactList: OrderedListRawSchema = {
  name: 'orderedList',
  label: 'Contact list',
  item: contact,
};
