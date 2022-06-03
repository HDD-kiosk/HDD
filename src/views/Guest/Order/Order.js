import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Colors from "../../../styles/Colors";

import ShoppingBasket from "../../../components/ShoppingBasket";
import Modal from "./Modal";
import { dbService } from "../../../firebase";

import {
  addDoc,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import Payment from "./Payment";
import Confirmorder from "../../Confirmorder/Confirmorder";

// ${(props) =>
//   props.isSelected && //primary 가 존재할 경우
//   css`
//     background-color: ${Colors.Red};
//     color: black;
//   `}

const Special = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  margin-top: 4%;

  display: flex;
  align-items: center;
  position: absolute;
  left: 20.12%;
  right: 2.49%;
  top: 20.71%;
  bottom: 12.55%;

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

// 여기 추가
const Styled = {
  categoryWrap: styled.div`
    display: flex;
    margin-bottom: 5%;
  `,
  categoryBox: styled.div`
    width: 292px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.backgroundColor || Colors.MainYellow};
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

    setImg(imageUrl);
    setMenuName(name);
    setMenuPrice(price);
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
      <Styled.menuBox
        name={name}
        price={price}
        img={imageUrl}
        onClick={menuClick}
      >
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

const PaymentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

function Order({ userObj }) {
  const [isSelected, setIsSelected] = useState(false);
  const [orderList, setOrderList] = useState(null);
  const [index, setIndex] = useState(1);
  const [menuData, setMenuData] = useState([]); // 바꿀 데이터
  const [menuUserData, setMenuUserData] = useState([]); // 전체 유지
  const [sig, setSig] = useState(1);
  const [ordering, setOrdering] = useState(false);
  const [payComplete, setPayComplete] = useState(false);
  const [list, setList] = useState(null);

  useEffect(() => {
    if (payComplete) {
      try {
        const docRef = addDoc(collection(dbService, "orders"), {
          menuTitle: list.menuTitle,
          menuPrice: list.menuPrice,
          menuCount: list.menuCount,
          orderNumber: list.orderNumber,
          creatorId: list.creatorId,
        });
        //setOrn(orderNumber);
      } catch (error) {
        console.error("Error adding document:", error);
      }
    }
  }, [payComplete]);
  useEffect(() => {
    let newMenuArr;
    const q = query(
      collection(dbService, "menus")
      //orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const menuArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      newMenuArr = menuArr.filter((member) => {
        return member.creatorId === userObj.uid;
      });
      setMenuUserData(newMenuArr);
      switch (index) {
        case 1:
          const specialMenu = newMenuArr.filter((member) => {
            return member.menuCategory === "스페셜할인팩";
          });
          setMenuData(specialMenu);
          break;
        case 2:
          const wapperMenu = newMenuArr.filter((member) => {
            return member.menuCategory === "와퍼";
          });
          setMenuData(wapperMenu);
          break;
        case 3:
          const juniorMenu = newMenuArr.filter((member) => {
            return member.menuCategory === "주니어";
          });
          setMenuData(juniorMenu);
          break;
        case 4:
          const sideMenu = newMenuArr.filter((member) => {
            return member.menuCategory === "사이드";
          });
          setMenuData(sideMenu);
          break;
        case 5:
          const dessertMenu = newMenuArr.filter((member) => {
            return member.menuCategory === "디저트";
          });
          setMenuData(dessertMenu);
          break;
      }
    });
  }, [sig]);

  const [navColor, setNavColor] = useState({
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
  const onSpecialClick = () => {
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
    setIndex(1);
    const specialMenu = menuUserData.filter((member) => {
      return member.menuCategory === "스페셜할인팩";
    });
    setMenuData(specialMenu);
  };

  const onBurgerClick = () => {
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
    setIndex(2);
    const wapperMenu = menuUserData.filter((member) => {
      return member.menuCategory === "와퍼";
    });
    setMenuData(wapperMenu);
  };

  const onJuniorClick = () => {
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
    setIndex(3);
    const juniorMenu = menuUserData.filter((member) => {
      return member.menuCategory === "주니어";
    });
    setMenuData(juniorMenu);
  };

  const onSideClick = () => {
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
    setIndex(4);
    const sideMenu = menuUserData.filter((member) => {
      return member.menuCategory === "사이드";
    });
    setMenuData(sideMenu);
  };

  const onDessertClick = () => {
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
    const dessertMenu = menuUserData.filter((member) => {
      return member.menuCategory === "디저트";
    });
    setMenuData(dessertMenu);
    setIndex(5);
  };

  return (
    <div>
      {payComplete ? (
        <Confirmorder listNumber={list.orderNumber}></Confirmorder>
      ) : (
        <div>
          <ShoppingBasketWrap>
            <ShoppingBasket
              userObj={userObj}
              orderList={orderList}
              ordering={setOrdering}
              list={setList}
            />
          </ShoppingBasketWrap>
          {ordering ? (
            <PaymentWrapper>
              <Payment payComplete={setPayComplete}></Payment>
            </PaymentWrapper>
          ) : (
            <ContentWrap>
              <Styled.categoryWrap>
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
              </Styled.categoryWrap>

              <Styled.menuWrap>
                {menuData &&
                  menuData.map((v) => {
                    return (
                      <MenuBox
                        key={v.menuTitle}
                        imageUrl={v.image}
                        name={v.menuTitle}
                        price={v.menuPrice}
                        order={setOrderList}
                      />
                    );
                  })}
              </Styled.menuWrap>
            </ContentWrap>
          )}
        </div>
      )}
    </div>
  );
}

export default Order;
