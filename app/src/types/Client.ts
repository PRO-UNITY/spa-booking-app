export interface Client {
  id: number;
  first_name: string;
  phone?: string;
  imageUrl: string;
  status: string;
  gender?: string | number;
  user?: any;
  content?: string;
}
