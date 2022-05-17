import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Colors from "../styles/Colors";
import Imgsrc from "../img/shopping_cart.png";
import { Link } from "react-router-dom";
import Order from "../views/Guest/Order/Order";
import { dbService } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
const Wrapper = styled.div`
  background-color: ${Colors.MainYellow};
  border: 5px solid ${Colors.MainYellow};
  border-radius: 30px;
  max-width: 1297px;
  max-height: 287px;
  margin: 1vh auto;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 10vw 70vw;
  grid-column-gap: 16px;
`;

const GridRightContainer = styled.div`
  padding: 15px;
  grid-column-gap: 15px;
  background-color: white;
  border-radius: 30px;
  display: grid;
  grid-template-columns: 10vw 10vw 10vw 10vw 10vw 14vw;
`;

const ShoppingList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ShoppingItem = styled.div`
  border-radius: 5px;
  background-color: ${Colors.Gray};
  text-align: center;
`;

const ShoppingResultContainer = styled.div`
  display: grid;
  grid-template-rows: 76px 76px 76px;
  grid-row-gap: 5px;
  border: 5px solid white;
  border-radius: 5px;
`;
const ResultBtn = styled.div`
  cursor: pointer;
  background-color: ${Colors.MainYellow};
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10vh;
`;

const ResultNoneBtn = styled.div`
  cursor: pointer;
  background-color: ${Colors.MainYellow};
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10vh;
`;

const ShoppingResult = styled.div`
  background-color: ${Colors.LightYellow};
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Text = styled.h3`
  color: white;
`;

const RedText = styled(Text)`
  color: ${Colors.Red};
  margin-top: 10px;
`;

const ShoppingImg = styled.img`
  object-fit: cover;
  width: 60%;
  margin-bottom: 15px;
`;

const ArrowLeft = styled.div`
  cursor: pointer;
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-right: 20px solid ${Colors.DarkGray};
  position: absolute;
  top: 40%;
`;

const ArrowRight = styled.div`
  cursor: pointer;
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 20px solid ${Colors.DarkGray};
  position: absolute;
  top: 40%;
  right: 20%;
`;

const RightContainer = styled.div`
  position: relative;
`;

const BasketImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 15px;
  margin-top: 15px;
`;

const OrderItem = styled.div`
  background-color: ${Colors.White};
  width: 10vw;
  border-radius: 10px;
  border: ${Colors.DarkGray} 1px solid;
  height: 245px;
`;

const OrderMenuText = styled.h3``;

const OrderPriceText = styled.h3`
  color: ${Colors.Red};
  margin-top: 50px;
`;

const ShoppingBasket = (props) => {
  const [addMenu, setAddMenu] = useState([]);
  const [count, setCount] = useState(0);
  const [sum, setSum] = useState(0);
  const [index, setIndex] = useState(0);
  const [clear, setClear] = useState(false);

  useEffect(() => {
    let newArray = [];
    if (props.orderList != "undefined" && props.orderList != null) {
      if (clear == false) {
        newArray = addMenu;
        newArray.push(props.orderList);
        setAddMenu(newArray);
        setSum(sum + addMenu[count].price);
        setCount(count + 1);
        if (count > 4) {
          setIndex(index + 1);
        }
      }
      setClear(false);
    }
  }, [props.orderList, addMenu]);

  const leftOnClick = () => {
    if (count > 5 && index > 0) {
      setIndex(index - 1);
    }
  };
  const rightOnClick = () => {
    if (count > 5 && count - index > 5) {
      setIndex(index + 1);
    }
  };

  const clearOnClick = () => {
    setClear(true);
    setCount(0);
    setIndex(0);
    setSum(0);
    setAddMenu([]);
  };

  const addBtnOnClick = async () => {
    // 모달안에 있는 "추가버튼"
    //setSig(true);
    const orderNumber = Math.floor(Math.random() * 9000) + 1000;
    try {
      const docRef = await addDoc(collection(dbService, "orders"), {
        //image: menuImg, //Same useState
        menuTitle: addMenu,
        menuPrice: sum,
        menuCount: count,
        orderNumber: orderNumber,
        creatorId: props.userObj.uid,
        //menuCategory: category,
        //createdAt: Date.now(),
        //creatorId: userObj.uid,
      });
    } catch (error) {
      console.error("Error adding document:", error);
    }
    //setNweet("");
    //const menuObj = { imageUrl: menuImg, name: menuTitle, price: menuPrice };
    //menuData.push(menuObj);
    //closeModal();
  };

  return (
    <Wrapper>
      <GridContainer>
        <ShoppingList>
          <ShoppingImg src={Imgsrc} />
          <Text>장바구니</Text>
        </ShoppingList>
        <RightContainer>
          <ArrowLeft onClick={leftOnClick} />
          <ArrowRight onClick={rightOnClick} />
          <GridRightContainer>
            <ShoppingItem>
              {(function() {
                if (count >= 1) {
                  return (
                    <OrderItem>
                      <BasketImage src={addMenu[index].imageUrl} />
                      <OrderMenuText>{addMenu[index].name}</OrderMenuText>
                      <OrderMenuText>
                        수량 : {addMenu[index].am}개
                      </OrderMenuText>
                      <OrderPriceText>{addMenu[index].price}원</OrderPriceText>
                    </OrderItem>
                  );
                }
              })()}
            </ShoppingItem>
            <ShoppingItem>
              {(function() {
                if (count >= 2) {
                  return (
                    <OrderItem>
                      <BasketImage src={addMenu[index + 1].imageUrl} />
                      <OrderMenuText>{addMenu[index + 1].name}</OrderMenuText>
                      <OrderMenuText>
                        수량 : {addMenu[index + 1].am}개
                      </OrderMenuText>
                      <OrderPriceText>
                        {addMenu[index + 1].price}원
                      </OrderPriceText>
                    </OrderItem>
                  );
                }
              })()}
            </ShoppingItem>
            <ShoppingItem>
              {(function() {
                if (count >= 3) {
                  return (
                    <OrderItem>
                      <BasketImage src={addMenu[index + 2].imageUrl} />
                      <OrderMenuText>{addMenu[index + 2].name}</OrderMenuText>
                      <OrderMenuText>
                        수량 : {addMenu[index + 2].am}개
                      </OrderMenuText>
                      <OrderPriceText>
                        {addMenu[index + 2].price}원
                      </OrderPriceText>
                    </OrderItem>
                  );
                }
              })()}
            </ShoppingItem>
            <ShoppingItem>
              {(function() {
                if (count >= 4) {
                  return (
                    <OrderItem>
                      <BasketImage src={addMenu[index + 3].imageUrl} />
                      <OrderMenuText>{addMenu[index + 3].name}</OrderMenuText>
                      <OrderMenuText>
                        수량 : {addMenu[index + 3].am}개
                      </OrderMenuText>
                      <OrderPriceText>
                        {addMenu[index + 3].price}원
                      </OrderPriceText>
                    </OrderItem>
                  );
                }
              })()}
            </ShoppingItem>
            <ShoppingItem>
              {(function() {
                if (count >= 5) {
                  return (
                    <OrderItem>
                      <BasketImage src={addMenu[index + 4].imageUrl} />
                      <OrderMenuText>{addMenu[index + 4].name}</OrderMenuText>
                      <OrderMenuText>
                        수량 : {addMenu[index + 4].am}개
                      </OrderMenuText>
                      <OrderPriceText>
                        {addMenu[index + 4].price}원
                      </OrderPriceText>
                    </OrderItem>
                  );
                }
              })()}
            </ShoppingItem>
            <ShoppingResultContainer>
              <ShoppingResult>
                <RedText>총 결제 금액</RedText>
                <RedText>{sum}원</RedText>
              </ShoppingResult>
              <ResultBtn onClick={clearOnClick}>
                <Text>모두 비우기</Text>
              </ResultBtn>
              {count ? (
                <Link to="/payment">
                  <ResultBtn onClick={addBtnOnClick}>
                    <Text>주문하기</Text>
                  </ResultBtn>
                </Link>
              ) : (
                <ResultNoneBtn>
                  <Text>메뉴를 담아주세요</Text>
                </ResultNoneBtn>
              )}
            </ShoppingResultContainer>
          </GridRightContainer>
        </RightContainer>
      </GridContainer>
    </Wrapper>
  );
};

export default ShoppingBasket;
