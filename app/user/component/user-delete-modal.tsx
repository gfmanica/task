import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { TUser } from '../type';
import { useDelete } from '@/hook';

type TUserRoleModal = {
  user: TUser;
  isOpen: boolean;
  onQuery(): void;
  onClose(): void;
  onOpenChange(): void;
};

export function UserDeleteModal({
  user,
  isOpen,
  onQuery,
  onClose,
  onOpenChange,
}: TUserRoleModal) {
  const { isDeleting, onDelete } = useDelete<TUser>({
    url: `/api/user/${user.id}`,
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
                Deseja realmente excluir o usuário <b>{user.name}</b>?
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
