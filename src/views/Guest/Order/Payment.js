import React from "react";
import styled, { keyframes } from "styled-components";
import Colors from "../../../styles/Colors";
import hddLogoImg from "../../../img/hddlogo.png";
import eventPromotionImg from "../../../img/eventPromotion.png";
import cardTypeImg from "../../../img/creditCard.png";
import cashTypeImg from "../../../img/cash.png";
import payTypeImg from "../../../img/pay.png";

const PaymentWrap = styled.div``;

const Header = styled.div``;

const LogoImg = styled.img`
  width: auto;
  height: auto;
  max-width: 50px;
  max-height: 50px;
  margin-top: 5px;
  margin-left: 23px; /*헤더에 로고이미지 다른사람들과맞춰보기*/
`;

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

const Footer = styled.div`
  text-align: center;
`;

const PaymentBannerImg = styled.img`
  width: 80vw;
  height: 21vh;
`;

const cardBtnClick = (e) => {
  alert(null);
};
const cashBtnClick = (e) => {
  alert(null);
};
const payBtnClick = (e) => {
  alert(null);
};

function Payment() {
  return (
    <PaymentWrap>
      <Header>
        <LogoImg src={hddLogoImg}></LogoImg>
      </Header>

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

      <Footer>
        <PaymentBannerImg src={eventPromotionImg}></PaymentBannerImg>
      </Footer>
    </PaymentWrap>
  );
}

export default Payment;
