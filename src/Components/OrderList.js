import { useEffect, useState } from "react";
import styled from "styled-components";
import Colors from "../styles/Colors";

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
  height: 47px;
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

function OrderList() {
  const [list, setList] = useState(null);
  const [empty, setEmpty] = useState(true);

  const confirmBtnOnClick = (event) => {
    const value = event.currentTarget.getAttribute("value");
    const arr = list.filter((item) => item.number !== value);
    setList(arr);
    if (arr.length == 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  };

  const OrderBox = ({ number, name, amount }) => {
    return (
      <MenuBox>
        <MenuNumber>{number}</MenuNumber>
        <MenuItemWrapper>
          <MenuItem>
            <MenuName>{name}</MenuName>
            <MenuAmount>{amount}</MenuAmount>
            <hr></hr>
          </MenuItem>
        </MenuItemWrapper>
        <ConfirmBtn value={number} onClick={confirmBtnOnClick}>
          확인
        </ConfirmBtn>
      </MenuBox>
    );
  };

  useEffect(() => {
    const orderData = [
      { number: "111", name: "와퍼", amount: "2" },
      { number: "222", name: "치즈와퍼", amount: "3" },
      { number: "333", name: "치즈와퍼", amount: "3" },
      { number: "444", name: "치즈와퍼", amount: "3" },
      { number: "555", name: "치즈와퍼", amount: "3" },
    ];
    setList(orderData);
    if (orderData.length == 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
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
                key={v.number}
                number={v.number}
                name={v.name}
                amount={v.amount}
              ></OrderBox>
            );
          })
        )}
      </MenuWrap>
    </>
  );
}

export default OrderList;