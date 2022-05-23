import React, { useState } from "react";
import styled from "styled-components";
import Colors from "../../../styles/Colors";
import cardTypeImg from "../../../img/creditCard.png";
import cashTypeImg from "../../../img/cash.png";
import payTypeImg from "../../../img/pay.png";
import { Link, useNavigate } from "react-router-dom";

const Section = styled.div`
  margin-top: 70px;
  margin-bottom: 80px;
  text-align: center;
`;
const Nav = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  margin-bottom: 50px;
`;

const PaymentTypeBtn = styled.div`
  width: 195px;
  height: 170px;
  border-radius: 15px;
  background-color: ${Colors.MainYellow};
  margin-right: 25px;
  cursor: pointer;
`;

const PaymentTypeImg = styled.img`
  margin-top: 20px;
`;
const PaymentTypeTitle = styled.h5`
  font-family: "Noto Sans"; /*나중 글로벌스타일 확인*/
  color: ${Colors.White};
  font-weight: bold;
  margin-top: 30px;
  font-size: 25px;
`;

const SectionTitle = styled.h2`
  font-family: "Noto Sans"; /*나중 글로벌스타일 확인*/
  font-size: 30px;
  font-weight: bold;
`;

const Wrapper = styled.div`
  border: 5px solid ${Colors.MainYellow};
  width: 50vw;
  border-radius: 20px;
`;

function Payment({ payComplete }) {
  const cardBtnClick = (e) => {
    payComplete(true);
  };
  const cashBtnClick = (e) => {
    payComplete(true);
  };
  const payBtnClick = (e) => {
    payComplete(true);
  };
  return (
    <Wrapper>
      <Section>
        <SectionTitle>결제 수단을 선택해주세요.</SectionTitle>
      </Section>

      <Nav>
        <PaymentTypeBtn onClick={cardBtnClick}>
          {" "}
          <PaymentTypeImg src={cardTypeImg} />{" "}
          <PaymentTypeTitle>신용카드</PaymentTypeTitle>{" "}
        </PaymentTypeBtn>
        <PaymentTypeBtn onClick={cashBtnClick}>
          {" "}
          <PaymentTypeImg src={cashTypeImg} />{" "}
          <PaymentTypeTitle>현금</PaymentTypeTitle>
        </PaymentTypeBtn>
        <PaymentTypeBtn onClick={payBtnClick}>
          {" "}
          <PaymentTypeImg src={payTypeImg} />{" "}
          <PaymentTypeTitle>PAY</PaymentTypeTitle>
        </PaymentTypeBtn>
      </Nav>
    </Wrapper>
  );
}

export default Payment;
