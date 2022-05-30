import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Colors from "../styles/Colors";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { dbService } from "../firebase";

const MenuWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: ${Colors.White};

  border-radius: 9px;
  border-style: solid;
  border-width: 5px;
  border-color: ${Colors.MainYellow};
`;
const MenuBox = styled.div`
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
`;

const MenuNumber = styled.div`
  display: flex;
  background-color: ${Colors.MainYellow};
  width: 224px;
  height: 47px;
  color: black;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const MenuItem = styled.div`
  width: 224px;
  height: 30px;
`;

const MenuName = styled.span``;

const MenuAmount = styled.span`
  float: right;
  padding: 2px 6px;
  background-color: ${Colors.MainYellow};
  color: red;
  border-radius: 3px;
`;

const ConfirmBtn = styled.div`
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${Colors.MainYellow};
  width: 120px;
  height: 30px;
  color: red;
`;

const MenuItemWrapper = styled.div`
  height: 190px;
`;

const Wrapper = styled.div`
  height: 338px;
  width: 100vw;
`;

function OrderList({ userObj }) {
  const [list, setList] = useState(null);
  const [empty, setEmpty] = useState(true);

  const confirmBtnOnClick = async (event) => {
    //const value = event.target.value;
    const value = event.currentTarget.getAttribute("value");

    const newList = list.filter((member) => {
      return member.orderNumber == value;
    });

    const docRef = doc(dbService, "orders", newList[0].id);

    await deleteDoc(docRef);

    //await deleteDoc(doc(dbService, "orders", `${list.orderNumber}`));
    //console.log(event.target);
    //doc.orderNumber==value
    // const value = event.currentTarget.getAttribute("value");
    // const arr = list.filter((item) => item.number !== value);
    // setList(arr);
    // if (arr.length == 0) {
    //   setEmpty(true);
    // } else {
    //   setEmpty(false);
    // }

    //const value = event.currentTarget.getAttribute("value");
    //const textRef = doc(dbService, "orders", `${value}`);
    // await deleteDoc(textRef);
  };

  const OrderBox = ({ number, items }) => {
    return (
      <MenuBox>
        <MenuNumber>주문번호 : {number}</MenuNumber>
        <MenuItemWrapper>
          {items.map((v) => {
            return (
              <>
                <MenuItem>
                  <>
                    <MenuName>{v.name}</MenuName>
                    <MenuAmount>{v.am}</MenuAmount>
                  </>
                  <hr></hr>
                </MenuItem>
              </>
            );
          })}
        </MenuItemWrapper>
        <ConfirmBtn value={number} onClick={confirmBtnOnClick}>
          확인
        </ConfirmBtn>
      </MenuBox>
    );
  };

  useEffect(() => {
    const q = query(
      collection(dbService, "orders")
      //orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const orderArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(orderArr);

      const newOrderArr = orderArr.filter((member) => {
        return member.creatorId == userObj.uid;
      });
      //console.log(newOrderArr);

      setList(newOrderArr);

      if (newOrderArr.length == 0) {
        setEmpty(true);
      } else {
        setEmpty(false);
      }
      //console.log(neworderArr);
      //setMenuUserData(newMenuArr);
      //const specialMenu = newMenuArr.filter((member) => {
      //return member.menuCategory == "스페셜할인팩";
      //});
      //setMenuData(specialMenu);
    });
  }, []);

  return (
    <>
      <MenuWrap>
        {empty ? (
          <Wrapper />
        ) : (
          list.map((v) => {
            return (
              <OrderBox
                key={v.orderNumber}
                number={v.orderNumber}
                items={v.menuTitle}
              ></OrderBox>
            );
          })
        )}
      </MenuWrap>
    </>
  );
}

export default OrderList;
