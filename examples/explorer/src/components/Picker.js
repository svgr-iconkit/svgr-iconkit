import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

const PickerBackdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 11;
`;

const PickerContent = styled.div`
  position: absolute;
  z-index: 12;
`;

export default function Picker({ children, content, isOpen = false, onClose }) {
  return (
    <Wrapper>
      {children}

      {isOpen && (
        <>
          <PickerBackdrop onClick={onClose} />
          <PickerContent>{content} </PickerContent>
        </>
      )}
    </Wrapper>
  );
}
