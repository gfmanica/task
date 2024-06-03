export type TRole = {
  id: 'ADMINISTRATOR' | 'USER';
  role: string;
};

export type TUser = {
  id: number;
  name: string;
  role: TRole;
};
