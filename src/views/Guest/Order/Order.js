import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Colors from "../../../styles/Colors";
import whopperImage from "../../../img/image-whopper.png";
import bulgogiWhopperImage from "../../../img/image-Bulgogi-whopper.png";
import whopperIcon from "../../../img/icon-burger.png";
import QCWhopperImage from "../../../img/image-QuattroCheeze-whopper.png";
import ShoppingBasket from "../../../components/ShoppingBasket";
import Menu from "../../../components/Menu";
import Modal from "./Modal";

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
    cursor: pointer;
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

const ContentWrap = styled.div``;

const ShoppingBasketWrap = styled.div`
  height: 40vh;
`;

const ModalNameText = styled.h3`
  margin-bottom: 10px;
`;
const ModalPriceText = styled.h3`
  color: ${Colors.Red};
  margin-bottom: 15px;
`;

const MinusBtn = styled.button`
  color: ${Colors.White};
  background-color: ${Colors.DarkGray};
  border: none;
  cursor: pointer;
`;

const PlusBtn = styled.button`
  color: ${Colors.White};
  background-color: ${Colors.DarkGray};
  border: none;
  cursor: pointer;
`;

const AmountText = styled.span`
  margin-left: 20px;
  margin-right: 20px;
`;

const MenuBox = ({ imageUrl, name, price, order }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [img, setImg] = useState("");
  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [amount, setAmount] = useState(1);
  const [orderMenu, setOrderMenu] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const menuClick = (event) => {
    openModal();
    const selectMenu = event.currentTarget.getAttribute("name");
    const selectMenuList = menuData.filter((arr) => arr.name === selectMenu);
    setImg(selectMenuList[0].imageUrl);
    setMenuName(selectMenuList[0].name);
    setMenuPrice(selectMenuList[0].price);
  };
  const cancleOnClick = () => {
    closeModal();
    setAmount(1);
  };
  const okOnClick = () => {
    closeModal();

    const m = [
      { imageUrl: img, name: menuName, price: amount * menuPrice, am: amount }, // am : amount
    ];
    setOrderMenu(m);
    order(m[0]);
    setAmount(1);
  };

  const plusOnClick = () => {
    setAmount(amount + 1);
  };
  const minusOnClick = () => {
    if (amount === 1) {
      setAmount(1);
    } else {
      setAmount(amount - 1);
    }
  };
  return (
    <>
      <Styled.menuBox name={name} onClick={menuClick}>
        <Styled.menuImage src={imageUrl} />
        <Styled.menuName>{name}</Styled.menuName>
        <Styled.menuPrice>{price}원</Styled.menuPrice>
      </Styled.menuBox>
      <Modal
        open={modalOpen}
        close={closeModal}
        first="취소"
        second="완료"
        btnEvent1={cancleOnClick}
        btnEvent2={okOnClick}
        img={img}
        w={200}
        h={200}
      >
        <ModalNameText>{menuName}</ModalNameText>
        <ModalPriceText>{menuPrice}원</ModalPriceText>
        <MinusBtn onClick={minusOnClick}> - </MinusBtn>
        <AmountText>{amount}</AmountText>
        <PlusBtn onClick={plusOnClick}> + </PlusBtn>
      </Modal>
    </>
  );
};

function Order() {
  const [isSelected, setIsSelected] = useState(false);
  const [orderList, setOrderList] = useState(null);

  return (
    <div>
      <ShoppingBasketWrap>
        <ShoppingBasket orderList={orderList} />
      </ShoppingBasketWrap>
      <ContentWrap>
        <Styled.categoryWrap>
          {categoryData &&
            categoryData.map((v, index) => {
              return (
                <Styled.categoryBox key={index} isSelected>
                  <Styled.categoryName>{v}</Styled.categoryName>
                </Styled.categoryBox>
              );
            })}
        </Styled.categoryWrap>

        <Styled.menuWrap>
          {menuData &&
            menuData.map((v, index) => {
              return (
                <MenuBox
                  key={index}
                  imageUrl={v.imageUrl}
                  name={v.name}
                  price={v.price}
                  order={setOrderList}
                />
              );
            })}
        </Styled.menuWrap>
      </ContentWrap>
    </div>
  );
}

export default Order;
