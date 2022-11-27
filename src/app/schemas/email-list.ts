import { ComponentSchema } from '../engine/types/schema';
import { email } from './email';

export const emailList: ComponentSchema = {
  name: 'orderedList',
  label: 'Email list',
  addLabel: '+ Add email',
  emptyMessage: 'No emails found.',
  item: email,
};
