import React from "react";
import Modal from "~/components/modal";

type ModalProps = Partial<Omit<React.ComponentProps<typeof Modal>, "isOpen" | "children">>;

// properties exposed by the context
interface ModalContextProps {
  content: React.ReactNode;
  isOpen: boolean;
  show: (content: React.ReactNode, options?: ModalProps) => void;
  hide: () => void;
  options: ModalProps;
}

/**
 * ModalContext internals
 *
 * THIS SHOULD NOT BE EXPORTED, THE API FOR THIS IS BELOW
 */
const ModalContext = React.createContext<ModalContextProps>({
  content: null,
  isOpen: false,
  // we can safely ignore because we set the initial values instantly on initialisation of the provider
  // @ts-ignore
  show: () => {},
  hide: () => {},
  options: {},
});

/**
 * the context provider responsible for passing down the props into the React tree
 * rendered on top of the React Tree, inside _app.tsx
 */
export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalOptions, setModalOptions] = React.useState<ModalProps>({});
  const [content, setContent] = React.useState<React.ReactNode>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  function show(content: React.ReactNode, options?: ModalProps) {
    setContent(content);
    setIsOpen(true);
    options && setModalOptions(options);
  }

  function hide() {
    setContent(null);
    setIsOpen(false);
    modalOptions.onClose?.();
    setModalOptions({});
  }

  return (
    <ModalContext.Provider value={{ content, isOpen, show, hide, options: modalOptions }}>
      {children}
    </ModalContext.Provider>
  );
}

/**
 * the container responsible for showing modal content
 * rendered on top of the React Tree, inside _app.tsx
 */
export function ModalContainer() {
  const { content, isOpen, hide, options } = React.useContext(ModalContext);

  return (
    <Modal onClose={hide} isOpen={isOpen} {...options}>
      {content}
    </Modal>
  );
}

/**
 * the API for showing the modal, only thing needed is the showModal function that accepts
 * content as the first parameter, that'HeaderSearchResultsDropdown all it takes to render a modal
 */
export default function useModal() {
  const { show, hide, isOpen } = React.useContext(ModalContext);

  return { show, hide, isOpen };
}
