import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Colors from "../styles/Colors";
import CalTable from "./CalTable";
import Menu from "./Menu";
import OrderList from "./OrderList";
const FirstNav = styled.div`
  cursor: pointer;
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
  border: 9px solid ${Colors.MainYellow};
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
  left: 80.12%;
  right: 5.49%;
  top: 3.71%;
  bottom: 89.55%;
  border: 9px solid ${Colors.MainYellow};
  background: ${Colors.MainYellow};
  border-radius: 11px;
  color: ${Colors.White};
`;
const SetContainer = styled.div`
  position: absolute;
  left: 10.12%;
  right: 5.49%;
  top: 13.71%;
  bottom: 49.55%;
`;
function Navigation({ userObj }) {
  const [color, setColor] = useState({
    firstColor: Colors.MainYellow,
    secondColor: Colors.White,
    thirdColor: Colors.White,
    firstTextColor: Colors.White,
    secondTextColor: Colors.Black,
    thirdTextColor: Colors.Black,
  });

  const onFirstclick = () => {
    setFirstCheck(true);
    setColor({
      firstColor: Colors.MainYellow,
      secondColor: Colors.White,
      thirdColor: Colors.White,
      firstTextColor: Colors.White,
      secondTextColor: Colors.Black,
      thirdTextColor: Colors.Black,
    });
  };

  const onSecondclick = () => {
    setFirstCheck(false);
    setSecondCheck(true);
    setColor({
      firstColor: Colors.White,
      secondColor: Colors.MainYellow,
      thirdColor: Colors.White,
      firstTextColor: Colors.Black,
      secondTextColor: Colors.White,
      thirdTextColor: Colors.Black,
    });
  };

  const onThirdclick = () => {
    setFirstCheck(false);
    setSecondCheck(false);
    setColor({
      firstColor: Colors.White,
      secondColor: Colors.White,
      thirdColor: Colors.MainYellow,
      firstTextColor: Colors.Black,
      secondTextColor: Colors.Black,
      thirdTextColor: Colors.White,
    });
  };

  const [firstCheck, setFirstCheck] = useState(true);
  const [secondCheck, setSecondCheck] = useState(false);

  return (
    <div>
      <FirstNav
        backgroundColor={color.firstColor}
        color={color.firstTextColor}
        onClick={onFirstclick}
      >
        주문<br></br>
        확인
      </FirstNav>
      <SecondNav
        backgroundColor={color.secondColor}
        color={color.secondTextColor}
        onClick={onSecondclick}
      >
        메뉴<br></br>
        관리
      </SecondNav>
      <ThirdNav
        backgroundColor={color.thirdColor}
        color={color.thirdTextColor}
        onClick={onThirdclick}
      >
        정산
      </ThirdNav>
      <Button>{userObj.email}</Button>

      {firstCheck === true ? (
        <SetContainer>
          <OrderList userObj={userObj}></OrderList>
        </SetContainer>
      ) : secondCheck == true ? (
        <Menu userObj={userObj}></Menu>
      ) : (
        <SetContainer>
          <CalTable></CalTable>
        </SetContainer>
      )}
    </div>

    /* Rectangle 326 */
  );
}
export default Navigation;
