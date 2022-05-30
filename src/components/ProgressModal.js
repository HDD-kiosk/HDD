import React from "react";
import styled, { keyframes } from "styled-components";
import Colors from "../styles/Colors";

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
  background-color: ${Colors.White};
  animation: ${modalShow} 0.3s;
  overflow: hidden;
  border: 6px solid ${Colors.MainYellow};
`;
const Header = styled.div`
  position: relative;
  padding: 16px 64px 16px 16px;
  background-color: ${Colors.White};
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
const HeaderImg = styled.img``;
const Footer = styled.div`
  padding: 12px 16px;
  text-align: center;
`;

const ProgressModal = (props) => {
  const { open, close, setWidth, img } = props;

  return (
    <>
      {open ? (
        <OpenModal>
          <Section sectionWidth={setWidth}>
            <Header>
              <CloseBtn onClick={close}>&times;</CloseBtn>
              <HeaderImg src={img}></HeaderImg>
            </Header>
            <Main>{props.children[0]}</Main>
            <Footer>{props.children[1]}</Footer>
          </Section>
        </OpenModal>
      ) : null}
    </>
  );
};

export default ProgressModal;
