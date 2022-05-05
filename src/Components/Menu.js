import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Colors from "../styles/Colors";

import whopperImage from '../img/image-whopper.png'
import bulgogiWhopperImage from '../img/image-Bulgogi-whopper.png';
import whopperIcon from '../img/icon-burger.png';
import QCWhopperImage from '../img/image-QuattroCheeze-whopper.png';
const AddMenu = styled.button`

position: absolute;
left: 64.12%;
right: 21.49%;
top: 3.71%;
bottom: 89.55%;

background: #ffcc00;
border: 9px solid  ${Colors.MainYellow};
border-radius: 11px;
color : ${Colors.White}`;
const Special = styled.div`


  box-sizing: border-box;
 
  display: flex;
  align-items: center;
  position: absolute;
  left: 20.12%;
  right: 5.49%;
  top: 2.71%;
  bottom: 49.55%;

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

const Styled = {
    menuWrap: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: ${Colors.White};
    margin: 0px 71px;
    border-radius: 9px;
    border-style: solid;
    border-width: 5px;
    border-color: ${Colors.MainYellow};
   
    position : absolute;
    left:7.5%;
    right: 0.9%;
    top:25.71%;
    
  `,
  menuBox: styled.div`
    width: 269px;
    height: 298px;
    border-radius: 9px;
    border-style: solid;
    border-width: 1px;
    margin: 20px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  menuImage: styled.img`
    width: 156px;
    height: 129px;
    background-repeat: no-repeat;
    background-size: cover;
  `,
  menuName: styled.div`
    font-size: 25px;
    font-weight: bold;
    margin-top: 32px;
  `,
  menuPrice: styled.div`
    font-size: 25px;
    font-weight: bold;
    color: ${Colors.Red};
    margin-top: 26px;
    margin-bottom: 22px;
    display: flex;
    justify-content: flex-end;
    padding-left: 160px;
  `,
};
const menuData = [
    { imageUrl: whopperImage, name: "와퍼", price: 5000 },
    { imageUrl: bulgogiWhopperImage, name: "불고기 와퍼", price: 6000 },
    { imageUrl: QCWhopperImage, name: "콰트로치즈 와퍼", price: 7000 },
  
    { imageUrl: whopperIcon, name: "와퍼퍼", price: 100 },
  ];
const MenuBox = ({ imageUrl, name, price }) => {
    return (
      <Styled.menuBox>
        <Styled.menuImage src={imageUrl} />
        <Styled.menuName>{name}</Styled.menuName>
        <Styled.menuPrice>{price}원</Styled.menuPrice>
      </Styled.menuBox>
    );
};
function Menu(){
    const[navColor, setNavColor] = useState({
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
    return(
        <div>
         
             
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
            
        <Styled.menuWrap>
            {menuData &&
              menuData.map((v) => {
                  return (
                  <MenuBox imageUrl={v.imageUrl} name={v.name} price={v.price} />
                  );
            })}
        </Styled.menuWrap>
        <AddMenu>메뉴추가</AddMenu>
        </div>
    );


}
export default Menu;