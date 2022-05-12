import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const modalShow = keyframes`
    from{
        opacity: 0;
        margin-top: -50px;
    }
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
  justify-content: center;
`;
const Section = styled.div`
  width: ${(props) => props.sectionWidth}px;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #ffffff; /* hdd로가서 글로벌로바꾸기*/
  animation: ${modalShow} 0.3s;
  overflow: hidden;
  border: 6px solid #ffcc00; /* hdd로가서 글로벌로바꾸기*/
`;
const Header = styled.div`
  position: relative;
  padding: 16px 64px 16px 16px;
  background-color: #ffffff; /* hdd로가서 글로벌로바꾸기*/
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
const HeaderImg = styled.img`
  width: ${(props) => props.w}px;
  height: ${(props) => props.h}px;
`;
const Footer = styled.div`
  padding: 12px 16px;
  text-align: center;
`;
const FirstBtn = styled.button`
  font-weight: bold;
  font-family: "Noto Sans";
  background-color: #ffcc00; /* hdd로가서 글로벌로바꾸기*/
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 70px;
  height: 45px;
  margin-right: 20px;
`;
const SecondBtn = styled.button`
  font-weight: bold;
  font-family: "Noto Sans";
  background-color: #ffcc00; /* hdd로가서 글로벌로바꾸기*/
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 70px;
  height: 45px;
`;

const Modal = (props) => {
  const {
    open,
    close,
    first,
    second,
    setWidth,
    img,
    btnEvent1,
    btnEvent2,
    movePage,
    w,
    h,
  } = props;

  return (
    <>
      {open ? (
        <OpenModal>
          <Section sectionWidth={setWidth}>
            <Header>
              <CloseBtn onClick={close}>&times;</CloseBtn>
              <HeaderImg src={img} w={props.w} h={props.h}></HeaderImg>
            </Header>
            <Main>{props.children}</Main>
            <Footer>
              <FirstBtn onClick={btnEvent1}>{first}</FirstBtn>
              <Link to={movePage}>
                <SecondBtn onClick={btnEvent2}>{second}</SecondBtn>
              </Link>
            </Footer>
          </Section>
        </OpenModal>
      ) : null}
    </>
  );
};

export default Modal;
