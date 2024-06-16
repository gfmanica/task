'use client';

import {
  Button,
  Chip,
  Tooltip,
  getKeyValue,
  useDisclosure,
} from '@nextui-org/react';

import { Eye, Trash, UserRoundCog } from 'lucide-react';
import { TUser } from '../type';
import { UserDeleteModal } from './user-delete-modal';
import { UserRoleModal } from './user-role-modal';
import { roleColorMap } from '@/util/enum';

type TUserTableCell = {
  item: TUser;
  columnKey: string | number;
  onQuery(): void;
};

export function UserTableCell({ item, columnKey, onQuery }: TUserTableCell) {
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure();

  const {
    isOpen: isOpenRole,
    onOpen: onOpenRole,
    onClose: onCloseRole,
    onOpenChange: onOpenChangeRole,
  } = useDisclosure();

  switch (columnKey) {
    case 'role': {
      return (
        <Chip color={roleColorMap[item.role.id]} size="sm" variant="flat">
          {item.role.role}
        </Chip>
      );
    }

    case 'action': {
      return (
        <>
          <UserDeleteModal
            user={item}
            onQuery={onQuery}
            onClose={onCloseDelete}
            isOpen={isOpenDelete}
            onOpenChange={onOpenChangeDelete}
          />

          <UserRoleModal
            user={item}
            onQuery={onQuery}
            onClose={onCloseRole}
            isOpen={isOpenRole}
            onOpenChange={onOpenChangeRole}
          />

          <div className="flex gap-2">
            <Tooltip content="Editar papel">
              <Button
                isIconOnly
                size="sm"
                color="primary"
                variant="light"
                onClick={onOpenRole}
              >
                <UserRoundCog size={20} />
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
