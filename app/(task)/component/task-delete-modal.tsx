import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { useDelete } from '@/hook';
import { TTask } from '../type';

type TTaskDeleteModal = {
  task: TTask;
  isOpen: boolean;
  onQuery(): void;
  onClose(): void;
  onOpenChange(): void;
};

export function TaskDeleteModal({
  task,
  isOpen,
  onQuery,
  onClose,
  onOpenChange,
}: TTaskDeleteModal) {
  const { isDeleting, onDelete } = useDelete<TTask>({
    url: `/api/task/${task.id}`,
    onSuccess: () => {
      onQuery();
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirmar exlusão
            </ModalHeader>

            <ModalBody>
              <p>
                Deseja realmente excluir a atividade <b>{task.name}</b>?
              </p>
            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onClick={onClose}
                isDisabled={isDeleting}
              >
                Fechar
              </Button>

              <Button color="primary" onClick={onDelete} isLoading={isDeleting}>
                Excluir
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
