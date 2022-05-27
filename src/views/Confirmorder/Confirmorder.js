import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Hddlogo from "../../img/hddlogo.png";
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
  padding-top: 20px;
  padding-bottom: 20px;
`;

const TimeArea = styled.div`
  width: 50%;
  height: 15%;
  margin-left: 25%;
  text-align: center;
  margin-top: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const ConfirmText = styled.h3`
  font-size: 32px;
`;

const OrdernumberText = styled.h1`
  margin-top: 50px;
  font-size: 50px;
  color: red;
`;

const Advertise = styled.div`
  margin-top: 80px;
`;

const Imgloopy = styled.img.attrs((props) => ({
  src: Loopy,
  wsize: props.size || "100%",
  hsize: props.size || "280px",
}))`
  width: ${(props) => props.wsize};
  height: ${(props) => props.hsize};
`;

const Confirmorder = (props) => {
  const [time, setTime] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    setInterval(() => {
      setTime(time - 1);
    }, 1000);
    if (time == 0) {
      navigate("/mainguest");
    }
  }, [time]);
  return (
    <Container>
      <TopBar>
        <Imglogo></Imglogo>
      </TopBar>
      <TimeArea>
        <ConfirmText>{time}초 후 화면이 전환됩니다.</ConfirmText>
      </TimeArea>
      <TextArea>
        <ConfirmText>주문이 완료되었습니다.</ConfirmText>
        <OrdernumberText>주문번호 :{props.listNumber} </OrdernumberText>
      </TextArea>
      <Advertise>
        <Imgloopy></Imgloopy>
      </Advertise>
    </Container>
  );
};

export default Confirmorder;
