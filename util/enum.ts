export const statusNameMap = {
  WAITING: 'Aguardando',
  IN_PROGRESS: 'Em andamento',
  DONE: 'Concluído',
  CANCELED: 'Cancelado',
} as const;

export const statusColorMap = {
  WAITING: 'warning',
  IN_PROGRESS: 'primary',
  DONE: 'success',
  CANCELED: 'danger',
} as const;

export const roleColorMap = {
  ADMINISTRATOR: 'primary',
  USER: 'success',
} as const;
