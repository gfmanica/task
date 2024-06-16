import {
  Button,
  Chip,
  Tooltip,
  getKeyValue,
  useDisclosure,
} from '@nextui-org/react';

import { Eye, Pencil, Trash, UserRoundPlus } from 'lucide-react';
import { TTask } from '../type';
import { useRouter } from 'next/navigation';
import { TaskDeleteModal } from './task-delete-modal';
import { statusColorMap } from '@/util/enum';
import { TaskUserModal } from './task-user-modal';

type TTaskTableCell = {
  item: TTask;
  columnKey: string | number;
  onQuery(): void;
};

export function TaskTableCell({ item, columnKey, onQuery }: TTaskTableCell) {
  const { push } = useRouter();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure();

  const {
    isOpen: isOpenUser,
    onOpen: onOpenUser,
    onClose: onCloseUser,
    onOpenChange: onOpenChangeUser,
  } = useDisclosure();

  switch (columnKey) {
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
        <>
          <TaskDeleteModal
            task={item}
            onQuery={onQuery}
            onClose={onCloseDelete}
            isOpen={isOpenDelete}
            onOpenChange={onOpenChangeDelete}
          />

          <TaskUserModal
            task={item}
            onQuery={onQuery}
            onClose={onCloseUser}
            isOpen={isOpenUser}
            onOpenChange={onOpenChangeUser}
          />

          <div className="flex gap-2">
            <Tooltip content="Visualizar">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                color="primary"
                onClick={() => push(`/view/${item.id}`)}
              >
                <Eye size={20} />
              </Button>
            </Tooltip>

            <Tooltip content="Atribuir a um usuário">
              <Button
                isIconOnly
                size="sm"
                color="primary"
                variant="light"
                onClick={onOpenUser}
              >
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
              <Button
                isIconOnly
                size="sm"
                color="danger"
                variant="light"
                onClick={onOpenDelete}
              >
                <Trash size={20} />
              </Button>
            </Tooltip>
          </div>
        </>
      );
    }

    default: {
      return getKeyValue(item, columnKey);
    }
  }
}
