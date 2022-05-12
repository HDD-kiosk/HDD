import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Hddlogo from "../../img/hddlogo.png";
import Colors from "../../styles/Colors";
import { authService } from "../../firebase";
import { dbService } from "../../firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

const Container = styled.body`
  position: relative;
`;

const TopBar = styled.div``;

const Imglogo = styled.img.attrs((props) => ({
  src: Hddlogo,
  size: props.size || "50px",
}))`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

const Logout = styled.div`
  float: right;
`;
const LogoutButton = styled.button`
  width: 200px;
  height: 30px;
  background: ${Colors.MainYellow};
  font-size: 15px;
  border: none;
  border-radius: 10px;
  color: ${Colors.White};
  margin-top: 10px;
  margin-right: 5px;
`;

const TitleArea = styled.div`
  text-align: center;
`;
const SelectText = styled.h3``;

const SelectTextF = styled.h5`
  margin-bottom: 20px;
`;

const LbtnArea = styled.div``;

const RbtnArea = styled.div``;

const Lbtn = styled.button.attrs({
  type: "submit",
})`
  position: absolute;
  width: 300px;
  height: 200px;
  background: ${Colors.MainYellow};
  font-size: 20px;
  color: white;
  border: none;
  border-radius: 25px;
  left: 300px;
  top: 300px;
`;

const Rbtn = styled.button.attrs({
  type: "submit",
})`
  position: absolute;
  width: 300px;
  height: 200px;
  background: ${Colors.MainYellow};
  font-size: 20px;
  color: white;
  border: none;
  border-radius: 25px;
  right: 300px;
  top: 300px;
`;

function Mode({ userObj }) {
  const onLogOutClick = () => authService.signOut();
  //새로추가 함수

  return (
    <Container>
      <TopBar>
        <Imglogo></Imglogo>
        <Logout>
          <LogoutButton onClick={onLogOutClick}>로그아웃</LogoutButton>
        </Logout>
      </TopBar>
      <TitleArea>
        <SelectText>선택해주세요</SelectText>
      </TitleArea>
      <LbtnArea>
        <Link to="/mainguest">
          <Lbtn>
            <SelectTextF>손님이에요!</SelectTextF>
            <SelectText>주문하기</SelectText>
          </Lbtn>
        </Link>
      </LbtnArea>
      <RbtnArea>
        <Link to="/manage">
          <Rbtn>
            <SelectTextF>가게 사장님이에요!</SelectTextF>
            <SelectText>매장관리</SelectText>
          </Rbtn>
        </Link>
      </RbtnArea>
    </Container>
  );
}

export default Mode;
