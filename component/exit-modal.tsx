import { useQuery } from '@/hook';
import { deleteSession } from '@/lib/session';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';

type TExitModal = {
  isOpen: boolean;
  onOpenChange(): void;
};

export function ExitModal({ isOpen, onOpenChange }: TExitModal) {
  const { push } = useRouter();
  const { isQuerying, onQuery } = useQuery({
    url: '/api/sign-out',
    enabled: false,
    onSuccess: () => push('/sign-in'),
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirmar saída
            </ModalHeader>

            <ModalBody>
              <p>Deseja realmente sair do sistema?</p>
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onClick={onClose}>
                Fechar
              </Button>

              <Button
                color="primary"
                isLoading={isQuerying}
                onClick={() => {
                  onClose();
                  onQuery();
                }}
              >
                Sair
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
