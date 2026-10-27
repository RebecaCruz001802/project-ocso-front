'use client';

import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure} from "@nextui-org/react";
import { ReactNode } from "react";
import { LuPencil, LuPenTool } from "react-icons/lu";

export default function UpdateLocation({children, store}: {children: ReactNode, store: string | string[] | undefined}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  if (!store) return null;

  return (
    <>
      <Button onPress={onOpen} color="primary"><LuPencil size="20" /></Button>
      <Modal className="bg-orange-400" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="w-full">
          {() => (
            <>
              
              <ModalBody>
                {children}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}