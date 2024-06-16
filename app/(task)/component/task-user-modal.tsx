import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { useDelete, useMutate } from '@/hook';
import { TTask, TTaskUser } from '../type';
import { useEffect, useState } from 'react';
import { TaskUserModalTable } from './task-user-modal-table';

type TTaskUserModal = {
  task: TTask;
  isOpen: boolean;
  onQuery(): void;
  onClose(): void;
  onOpenChange(): void;
};

export function TaskUserModal({
  task,
  isOpen,
  onQuery,
  onClose,
  onOpenChange,
}: TTaskUserModal) {
  const [users, setUsers] = useState<TTaskUser[]>(task.users);

  const { isMutating, onMutate } = useMutate<TTask>({
    url: '/api/task',
    idName: 'id',
    onSuccess: () => {
      onQuery();
      onClose();
    },
  });

  useEffect(() => {
    setUsers(task.users);
  }, [isOpen && task.users]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Atribuir a um usuário
            </ModalHeader>

            <ModalBody>
              <TaskUserModalTable
                users={users}
                setUsers={setUsers}
                isOpen={isOpen}
              />
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
                onClick={() => onMutate({ ...task, users })}
                isLoading={isMutating}
              >
                Atribuir
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
