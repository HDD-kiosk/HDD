import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Colors from '../../../styles/Colors';
import whopperImage from '../../../img/image-whopper.png'
import bulgogiWhopperImage from '../../../img/image-Bulgogi-whopper.png';
import whopperIcon from '../../../img/icon-burger.png';
import QCWhopperImage from '../../../img/image-QuattroCheeze-whopper.png';

// ${(props) =>
//   props.isSelected && //primary 가 존재할 경우
//   css`
//     background-color: ${Colors.Red};
//     color: black;
//   `}

const Styled = {
  categoryWrap: styled.div`
    display: flex;
    margin: 0px 100px;
  `,
  categoryBox: styled.div`
    width: 292px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.MainYellow};
    margin: 0px 0px;
    margin-top: 20px;
    border-radius: 63px 63px 0px 0px;
  `,

  categoryName: styled.div`
    font-size: 25px;
    font-weight: bold;
    color: ${Colors.White};
  `,
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
  `,
  menuBox: styled.div`
    width: 269px;
    height: 298px;
    border-radius: 9px;
    border-style: solid;
    border-width: 1px;
    margin: 20px 25px;
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

const categoryData = [
  "스페셜&할인팩",
  "와퍼",
  "주니어&버거",
  "사이드",
  "음료&디저트",
];
const menulist = [
  "와퍼1",
  "와퍼2",
  "와퍼3",
]
const menuData = [
  { imageUrl: whopperImage, name: menulist, price: 5000 },
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

function Order() {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div>
      <Styled.categoryWrap>
        {categoryData &&
          categoryData.map((v) => {
            return (
              <Styled.categoryBox isSelected>
                <Styled.categoryName>{v}</Styled.categoryName>
              </Styled.categoryBox>
            );
          })}
      </Styled.categoryWrap>

      <Styled.menuWrap>
        {menuData &&
          menuData.map((v) => {
            return (
              <MenuBox imageUrl={v.imageUrl} name={v.name} price={v.price} />
            );
          })}
      </Styled.menuWrap>
    </div>
  );
}

export default Order;
