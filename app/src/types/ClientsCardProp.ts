import { Client } from './Client';

export interface ClientsCardProp extends Client {
  icon?: string;
  iconColor: string;
  navigation?: any;
  screen?: string;
  patientId?: number;
  buttons?: Button[];
  date?: string;
  time?: string;
}
