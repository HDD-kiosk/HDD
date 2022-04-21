import styled from "styled-components";
import comingsoonImg from '../../../img/comingsoon.png';
import forhereImg from '../../../img/forhere.png';
import takeoutImg from '../../../img/takeout.png';
import './MainGuest.css';
import { useState } from 'react';
import Modal from './Modal.js';


const MainGuestWrap = styled.div`
  text-align: center;
`;

function Header() { // comingsoon banner
  return (
    <header>
      <img src={comingsoonImg} className="main_guest-bannerImg" />
    </header>
  );
}

function Nav() {  // 1: 매장  2: 테이크아웃

  //const [mode, setChooseMode] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const chooseMode = (e) => {
    //setChooseMode(e.target.id);
  };
  const modeBtnClick = (e) => {
    //chooseMode(e.target.id);
    openModal();
  }
  return (
    //<button type="button" className='modeButton'  > <img src={forhereImg} className="modeBtn-img" />매장에서 식사</button>

    <nav>
      <div>
        <button id={1} type="button" className='modeButton' onClick={modeBtnClick} >
          <img src={forhereImg} className='modeBtnImg' />
          <h3>매장에서 식사</h3>
        </button>

        <button id={2} type="button" className='modeButton' onClick={modeBtnClick}>
          <img src={takeoutImg} className='modeBtnImg' />
          <h3>테이크 아웃</h3>
        </button>
      </div>


      <Modal open={modalOpen} close={closeModal} /*mode={mode}*/ >
        음성 주문으로 도와드릴까요?
      </Modal>
    </nav>

  );
}

function MainGuest() {

  return (
    <MainGuestWrap>
      <Header></Header>
      <Nav></Nav>
    </MainGuestWrap>
  );
}

export default MainGuest;