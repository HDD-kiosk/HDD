import React from "react";
import styled, { keyframes } from "styled-components";
import micImg from "../../../img/mic.png";

const modalShow = keyframes`
    from{
        opacity: 0;
        margin-top: -50px;
    }cc
    to{
        opacity: 1;
        margin-top: 0;
    }
`;

const modalBgShow = keyframes`
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
`;

const OpenModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  animation: ${modalBgShow} 0.3s;
  
`;

const Section = styled.div`
  width: 90%;
  max-width: 346px;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #FFFFFF;   /* hdd로가서 글로벌로바꾸기*/
  animation: ${modalShow} 0.3s;
  overflow: hidden;
  border: 6px solid #FFCC00;    /* hdd로가서 글로벌로바꾸기*/
`;
const Header = styled.div`
  position: relative;
  padding: 16px 64px 16px 16px;
  background-color: #FFFFFF; /* hdd로가서 글로벌로바꾸기*/
  font-weight: 700;
  text-align: center;
  padding-left: 50px;

`;
const CloseBtn = styled.button`
  outline: none;
  cursor: pointer;
  border: 0;
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  font-size: 21px;
  font-weight: 700;
  text-align: center;
  color: #999;
  background-color: transparent;
`;

const Main = styled.div`
  font-size: 21px; 
  font-weight: bold;
  padding: 16px;
  text-align: center;
`;

const MicImg = styled.img`
  
`

const Footer = styled.div`
  padding: 12px 16px;
  text-align: center;
`;



const YesBtn = styled.button`
  font-weight: bold;
  font-family: 'Noto Sans';
  background-color: #FFCC00;   /* hdd로가서 글로벌로바꾸기*/
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 70px;
  height: 45px;
  margin-right: 20px;
`;
const NoBtn = styled.button`
  font-weight: bold;
  font-family: 'Noto Sans';
  background-color: #FFCC00;    /* hdd로가서 글로벌로바꾸기*/
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 70px;
  height: 45px;

`;

const Modal = (props) => { // chooseMode 일단 나중에..
  const { open, close, chooseMode } = props;


  const yesBtnClick = () => {
     alert(chooseMode);
     close();

  }
  const noBtnClick = () => {
    close();
  }
  return (        
    <>
      {open ? (
        <OpenModal>
          <Section>
            <Header>
              <CloseBtn onClick={close}>&times;</CloseBtn>
              <MicImg src={micImg} ></MicImg>
            </Header>
            <Main>
              {props.children}
            </Main>
            <Footer>
              <YesBtn onClick={yesBtnClick}>네</YesBtn>
              <NoBtn onClick={noBtnClick}>아니오</NoBtn>
            </Footer>
          </Section>
        </OpenModal>
      ) : null}
    </>
  );
};

export default Modal;