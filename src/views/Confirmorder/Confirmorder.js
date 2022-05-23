import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Hddlogo from "../../img/hddLogo.png";
import Loopy from "../../img/loopy.png";

const Container = styled.div`
  position: relative;
`;
const TopBar = styled.div``;

const Imglogo = styled.img.attrs((props) => ({
  src: Hddlogo,
  size: props.size || "50px",
}))`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

const TextArea = styled.div`
  width: 50%;
  height: 15%;
  margin-left: 25%;
  text-align: center;
  margin-top: 50px;
  border: 1px solid black;
  border-radius: 10px;
`;

const ConfirmText = styled.h3``;

const OrdernumberText = styled.h1`
  margin-top: 50px;
  font-size: 32px;
  color: red;
`;

const Advertise = styled.div`
  margin-top: 80px;
`;

const Imgloopy = styled.img.attrs((props) => ({
  src: Loopy,
  wsize: props.size || "100%",
  hsize: props.size || "100%",
}))`
  width: ${(props) => props.wsize};
  height: ${(props) => props.hsize};
`;

const Confirmorder = (props) => {
  return (
    <Container>
      <TopBar>
        <Imglogo></Imglogo>
      </TopBar>
      <TextArea>
        <ConfirmText>주문이 완료되었습니다.</ConfirmText>
        <OrdernumberText>주문번호 : </OrdernumberText>
      </TextArea>
      <Advertise>
        <Imgloopy></Imgloopy>
      </Advertise>
    </Container>
  );
};

export default Confirmorder;
