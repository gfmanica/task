'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  AutocompleteItem,
  Autocomplete,
} from '@nextui-org/react';
import { TRole, TUser } from '../type';
import { useMutate } from '@/hook';
import { useEffect, useState } from 'react';

type TUserRoleModal = {
  user: TUser;
  isOpen: boolean;
  onQuery(): void;
  onClose(): void;
  onOpenChange(): void;
};

const roles: TRole[] = [
  { id: 'ADMINISTRATOR', role: 'Administrador' },
  { id: 'USER', role: 'Usuário' },
];

export function UserRoleModal({
  user,
  isOpen,
  onQuery,
  onClose,
  onOpenChange,
}: TUserRoleModal) {
  const [role, setRole] = useState<TRole | null>(null);
  const { isMutating, onMutate } = useMutate<TUser>({
    url: '/api/user',
    idName: 'id',
    onSuccess: () => {
      onQuery();
      onClose();
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setRole(null);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Editar papel
            </ModalHeader>

            <ModalBody>
              <p>
                Selecione o novo papel do usuário <b>{user.name}</b>.
              </p>

              <Autocomplete
                defaultItems={roles}
                isClearable={false}
                label="Papel"
                variant="bordered"
                className="w-full"
                isDisabled={isMutating}
                selectedKey={role?.id}
                onSelectionChange={(id) => {
                  const newValue = roles.find((item) => item.id === id);

                  if (newValue) {
                    setRole(newValue);
                  }
                }}
              >
                {(status) => (
                  <AutocompleteItem key={status.id}>
                    {status.role}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onClick={onClose}
                isDisabled={isMutating}
              >
                Fechar
              </Button>

              <Button
                color="primary"
                isLoading={isMutating}
                isDisabled={!role}
                onClick={() => role && onMutate({ ...user, role })}
              >
                Editar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
