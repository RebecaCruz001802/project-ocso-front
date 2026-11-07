"use client";

import { Button } from "@nextui-org/button";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import { LuPlus } from "react-icons/lu";
import { ReactNode, createContext } from "react";

export const CloseModalContext = createContext<() => void>(() => {});

export default function CreateProvider({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button className="w-fit" color="primary" onPress={onOpen}>
        <LuPlus size="20" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <CloseModalContext.Provider value={onClose}>
              {children}
            </CloseModalContext.Provider>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}