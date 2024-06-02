export type TTask = {
  id: number;
  name: string;
  expirationDate: Date;
  status: 'WAITING' | 'IN_PROGRESS' | 'DONE' | 'CANCELED';
};