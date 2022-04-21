import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Colors from "../styles/Colors";

const FirstNav = styled.div`
  position: absolute;
  left: 2.64%;
  right: 91.88%;
  top: 22.85%;
  bottom: 54.49%;
  display: flex;
  align-items: center;
  color: ${(props) => props.color || Colors.Black};
  background: ${(props) => props.backgroundColor || Colors.MainYellow};
  vertical-align: center;
  border: 9px solid #ffcc00;
  box-sizing: border-box;
  border-radius: 0px 63px 63px 0px;
`;
/*const FirstSpan = styled.p`
display:inline-block;
`*/
const SecondNav = styled(FirstNav)`
  top: 43.46%;
  bottom: 33.89%;
`;

const ThirdNav = styled(FirstNav)`
  top: 61.43%;
  bottom: 15.92%;
`;

const Button = styled.button`
  /* Rectangle 319 */

  position: absolute;
  left: 78.12%;
  right: 5.49%;
  top: 3.71%;
  bottom: 89.55%;

  background: #ffcc00;
  border-radius: 11px;
`;
const Nav = styled.div``;
const Special = styled.div`
  /* Rectangle 5 */
  display: flex;
  align-items: center;
  position: absolute;
  left: 20.12%;
  right: 5.49%;
  top: 2.71%;
  bottom: 49.55%;

  background: #ffffff;
  border: 9px solid #ffcc00;
  box-sizing: border-box;
  border-radius: 0px 63px 63px 0px;
  transform: rotate(-90deg);

  width: 82px;
  height: 264px;

  color: ${(props) => props.color || Colors.Black};
  background: ${(props) => props.backgroundColor || Colors.White};
  border: 9px solid #ffcc00;
  box-sizing: border-box;
  border-radius: 0px 63px 63px 0px;
  transform: rotate(-90deg);
`;
const Burger = styled(Special)`
  /* Rectangle 5 */

  left: 35.12%;
  right: 20.49%;
`;
const Junior = styled(Special)`
  left: 50.12%;
  right: 25.49%;
`;

const Side = styled(Special)`
  left: 65.12%;
  right: 30.49%;
`;

const Dessert = styled(Special)`
  left: 80.12%;
  right: 35.49%;
`;

const Text = styled.span`
  transform: rotate(90deg);
`;

function Navigation() {
  const [color, setColor] = useState({
    firstColor: Colors.White,
    secondColor: Colors.White,
    thirdColor: Colors.White,
    firstTextColor: Colors.Black,
    secondTextColor: Colors.Black,
    thirdTextColor: Colors.Black,
  });

  const [navColor, setNavColor] = useState({
    specialColor: Colors.White,
    burgerColor: Colors.White,
    juniorColor: Colors.White,
    sideColor: Colors.White,
    dessertColor: Colors.White,
    specialtextColor: Colors.Black,
    burgertextColor: Colors.Black,
    juniortextColor: Colors.Black,
    sidetextColor: Colors.Black,
    desserttextColor: Colors.Black,
  });

  const onFirstclick = () =>
    setColor({
      firstColor: Colors.MainYellow,
      secondColor: Colors.White,
      thirdColor: Colors.White,
      firstTextColor: Colors.White,
      secondTextColor: Colors.Black,
      thirdTextColor: Colors.Black,
    });
  const onSecondclick = () =>
    setColor({
      firstColor: Colors.White,
      secondColor: Colors.MainYellow,
      thirdColor: Colors.White,
      firstTextColor: Colors.Black,
      secondTextColor: Colors.White,
      thirdTextColor: Colors.Black,
    });
  const onThirdclick = () =>
    setColor({
      firstColor: Colors.White,
      secondColor: Colors.White,
      thirdColor: Colors.MainYellow,
      firstTextColor: Colors.Black,
      secondTextColor: Colors.Black,
      thirdTextColor: Colors.White,
    });

  const onSpecialClick = () =>
    setNavColor({
      specialColor: Colors.MainYellow,
      burgerColor: Colors.White,
      juniorColor: Colors.White,
      sideColor: Colors.White,
      dessertColor: Colors.White,
      specialtextColor: Colors.White,
      burgertextColor: Colors.Black,
      juniortextColor: Colors.Black,
      sidetextColor: Colors.Black,
      desserttextColor: Colors.Black,
    });
  const onBurgerClick = () =>
    setNavColor({
      specialColor: Colors.White,
      burgerColor: Colors.MainYellow,
      juniorColor: Colors.White,
      sideColor: Colors.White,
      dessertColor: Colors.White,
      specialtextColor: Colors.Black,
      burgertextColor: Colors.White,
      juniortextColor: Colors.Black,
      sidetextColor: Colors.Black,
      desserttextColor: Colors.Black,
    });
  const onJuniorClick = () =>
    setNavColor({
      specialColor: Colors.White,
      burgerColor: Colors.White,
      juniorColor: Colors.MainYellow,
      sideColor: Colors.White,
      dessertColor: Colors.White,
      specialtextColor: Colors.Black,
      burgertextColor: Colors.Black,
      juniortextColor: Colors.White,
      sidetextColor: Colors.Black,
      desserttextColor: Colors.Black,
    });
  const onSideClick = () =>
    setNavColor({
      specialColor: Colors.White,
      burgerColor: Colors.White,
      juniorColor: Colors.White,
      sideColor: Colors.MainYellow,
      dessertColor: Colors.White,
      specialtextColor: Colors.Black,
      burgertextColor: Colors.Black,
      juniortextColor: Colors.Black,
      sidetextColor: Colors.White,
      desserttextColor: Colors.Black,
    });
  const onDessertClick = () =>
    setNavColor({
      specialColor: Colors.White,
      burgerColor: Colors.White,
      juniorColor: Colors.White,
      sideColor: Colors.White,
      dessertColor: Colors.MainYellow,
      specialtextColor: Colors.Black,
      burgertextColor: Colors.Black,
      juniortextColor: Colors.Black,
      sidetextColor: Colors.Black,
      desserttextColor: Colors.White,
    });

  return (
    <div>
      <FirstNav
        backgroundColor={color.firstColor}
        color={color.firstTextColor}
        onClick={onFirstclick}
      >
        주문확인
      </FirstNav>
      <SecondNav
        backgroundColor={color.secondColor}
        color={color.secondTextColor}
        onClick={onSecondclick}
      >
        메뉴관리
      </SecondNav>
      <ThirdNav
        backgroundColor={color.thirdColor}
        color={color.thirdTextColor}
        onClick={onThirdclick}
      >
        정산
      </ThirdNav>
      <Button></Button>

      <Nav>
        <Special
          backgroundColor={navColor.specialColor}
          color={navColor.specialtextColor}
          onClick={onSpecialClick}
        >
          <Text>스페셜 할인팩</Text>
        </Special>
        <Burger
          backgroundColor={navColor.burgerColor}
          color={navColor.burgertextColor}
          onClick={onBurgerClick}
        >
          <Text>와퍼　</Text>
        </Burger>
        <Junior
          backgroundColor={navColor.juniorColor}
          color={navColor.juniortextColor}
          onClick={onJuniorClick}
        >
          <Text>주니어</Text>
        </Junior>
        <Side
          backgroundColor={navColor.sideColor}
          color={navColor.sidetextColor}
          onClick={onSideClick}
        >
          <Text>사이드</Text>
        </Side>
        <Dessert
          backgroundColor={navColor.dessertColor}
          color={navColor.desserttextColor}
          onClick={onDessertClick}
        >
          <Text>디저트</Text>
        </Dessert>
      </Nav>
    </div>

    /* Rectangle 326 */
  );
}
export default Navigation;
