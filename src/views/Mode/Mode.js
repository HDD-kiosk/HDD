import React from "react";
import styled from "styled-components";
import Hddlogo from "../../img/hddlogo.png";
import Colors from "../../styles/Colors";

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

function Mode() {
  return (
    <Container>
      <TopBar>
        <Imglogo></Imglogo>
      </TopBar>
      <TitleArea>
        <SelectText>선택해주세요</SelectText>
      </TitleArea>
      <LbtnArea>
        <Lbtn>
          <SelectTextF>손님이에요!</SelectTextF>
          <SelectText>주문하기</SelectText>
        </Lbtn>
      </LbtnArea>
      <RbtnArea>
        <Rbtn>
          <SelectTextF>가게 사장님이에요!</SelectTextF>
          <SelectText>매장관리</SelectText>
        </Rbtn>
      </RbtnArea>
    </Container>
  );
}

export default Mode;
