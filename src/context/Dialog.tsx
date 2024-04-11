"use client"
import { createContext, useRef } from 'react'
import styles from '@/components/FindYourPetModal/FindYourPet.module.scss'
import FindYourPet from '@/components/FindYourPetModal/FindYourPet'
type DialogContextType = {
    openDialog: () => void;
    closeDialog: () => void;
  };
  
  const DialogContext = createContext<DialogContextType>({} as DialogContextType);

function DialogProvider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const dialogRef = useRef<HTMLDialogElement>(null);

    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    };

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    return (
        <DialogContext.Provider value={{ openDialog, closeDialog }}>
            <dialog className={`${styles.primaryModal}`} ref={dialogRef}>
                <FindYourPet />
            </dialog>
            {children}
        </DialogContext.Provider>
    )
}

export {DialogContext,DialogProvider}