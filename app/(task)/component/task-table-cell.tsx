import { Button, Chip, Tooltip, getKeyValue } from '@nextui-org/react';

import { Eye, Pencil, Trash, UserRoundPlus } from 'lucide-react';
import { TTask } from '../type';
import { isoToLocalDateString } from '@/util/format';
import { useRouter } from 'next/navigation';

const statusColorMap = {
  WAITING: 'warning',
  IN_PROGRESS: 'primary',
  DONE: 'success',
  CANCELED: 'danger',
} as const;

export function TaskTableCell({
  item,
  columnKey,
}: {
  item: TTask;
  columnKey: string | number;
}) {
  const { push } = useRouter();

  switch (columnKey) {
    case 'expirationDate': {
      return isoToLocalDateString(item.expirationDate);
    }

    case 'status': {
      return (
        <Chip
          color={statusColorMap[item.status.id as keyof typeof statusColorMap]}
          size="sm"
          variant="flat"
        >
          {item.status.status}
        </Chip>
      );
    }

    case 'action': {
      return (
        <div className="flex gap-2">
          <Tooltip content="Visualizar">
            <Button variant="light" color="primary" size="sm" isIconOnly>
              <Eye size={20} />
            </Button>
          </Tooltip>

          <Tooltip content="Atribuir a um usuário">
            <Button variant="light" color="primary" size="sm" isIconOnly>
              <UserRoundPlus size={20} />
            </Button>
          </Tooltip>

          <Tooltip content="Editar">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              color="primary"
              onClick={() => push(`/form/${item.id}`)}
            >
              <Pencil size={20} />
            </Button>
          </Tooltip>

          <Tooltip content="Excluir">
            <Button variant="light" color="danger" size="sm" isIconOnly>
              <Trash size={20} />
            </Button>
          </Tooltip>
        </div>
      );
    }

    default: {
      return getKeyValue(item, columnKey);
    }
  }
}
