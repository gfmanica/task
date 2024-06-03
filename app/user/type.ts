export type TRole = {
  id: 'ADMINISTRATOR' | 'USER';
  name: string;
};

export type TUser = {
  id: number;
  name: string;
  role: TRole;
};
