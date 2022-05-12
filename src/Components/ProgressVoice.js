import React from "react";
import { forwardRef, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import ProgressModal from "./ProgressModal";
import VoiceOrder from "../views/Guest/Order/VoiceOrder";
import micImg from '../img/mic.png';


const ModalPromptTitle = styled.h3`
`;

const ProgressVoice = forwardRef((props, ref) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  useImperativeHandle(ref, () => ({
    openModal
  }));


  return (
    <ProgressModal open={modalOpen} close={closeModal} first="네" second="아니오" setWidth={600} img={micImg} movePage={""}>
      <ModalPromptTitle>주문시작을 누르고 주문을 시작하세요.<br/>주문을 마쳤다면 버튼을 다시 눌러주세요.<br/>다시 하기를 원한다면 똑같이 반복하면 됩니다.</ModalPromptTitle>
       <VoiceOrder></VoiceOrder>
    </ProgressModal>
  );
});
export default ProgressVoice;