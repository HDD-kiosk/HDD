import { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal.js";
import Colors from "../../../styles/Colors";
import comingsoonImg from "../../../img/comingsoon.png";
import forhereImg from "../../../img/forhere.png";
import takeoutImg from "../../../img/takeout.png";
import micImg from "../../../img/mic.png";
import React, { useRef } from "react";
import ProgressVoice from "../../../components/ProgressVoice";
import { useNavigate } from "react-router-dom";

const MainGuestWrap = styled.div`
  text-align: center;
`;
const Header = styled.div``;
const MainGuestBannerImg = styled.img`
  width: 95vw;
  height: 50vh;
`;

const Nav = styled.div`
  display: flex;
  justify-content: center;
`;

const EatingSpaceTypeBtn = styled.div`
  width: 15rem;
  height: 9rem;
  border-radius: 11px;
  background-color: ${Colors.MainYellow};

  cursor: pointer;
  margin-top: 4.5rem;

  & + & {
    margin-left: 15rem;
  }
`;

const EatingSpaceTypeImg = styled.img`
  margin-top: 1rem;
`;

const TakeoutImg = styled.img`
  margin-top: 1.1rem;
  margin-bottom: 0.5rem;
  width: 3.8vw;
  height: 8.8vh;
`;

const EatingSpaceTypeTitle = styled.h3`
  font-family: "Noto Sans"; /*나중 글로벌스타일 확인*/
  font-size: 1.1rem;
  font-weight: bold;
  color: ${Colors.White};
  margin-top: 0.5rem;
`;

const ModalPromptTitle = styled.h3``;

function MainGuest( {userObj} ) {

  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const ProgressVoiceRef = useRef();

  const openModal = () => {
    //음성진행 여부 안내모달
    setModalOpen(true);
  };
  const closeModal = () => {
    //음성진행 여부 안내모달
    setModalOpen(false);
  };
  const modeBtnClick = (e) => {
    openModal();
  };
  const YesBtnClick = () => {
    closeModal();
    ProgressVoiceRef.current.openModal();
  };
  const NoBtnClick = () => {
    closeModal();
    navigate("/order");
  };

  return (
    <MainGuestWrap>
      <Header>
        <MainGuestBannerImg src={comingsoonImg} />
      </Header>

      <Nav>
        <EatingSpaceTypeBtn onClick={modeBtnClick}>
          <EatingSpaceTypeImg src={forhereImg} />
          <EatingSpaceTypeTitle>매장에서 식사 </EatingSpaceTypeTitle>
        </EatingSpaceTypeBtn>

        <EatingSpaceTypeBtn onClick={modeBtnClick}>
          <TakeoutImg src={takeoutImg} />
          <EatingSpaceTypeTitle>테이크 아웃</EatingSpaceTypeTitle>
        </EatingSpaceTypeBtn>

        <Modal
          open={modalOpen}
          close={closeModal}
          first="네"
          second="아니오"
          setWidth={380}
          img={micImg}
          btnEvent1={YesBtnClick}
          btnEvent2={NoBtnClick}
        >
          <ModalPromptTitle>음성 주문으로 도와드릴까요?</ModalPromptTitle>
        </Modal>
        <ProgressVoice ref={ProgressVoiceRef} userObj={userObj} ></ProgressVoice>
      </Nav>
    </MainGuestWrap>
  );
}

export default MainGuest;
