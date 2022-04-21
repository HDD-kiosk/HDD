import React from 'react';
import styled from 'styled-components';
import Colors from '../styles/Colors';
import Imgsrc from '../img/shopping_cart.png';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
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
`;

const ShoppingResultContainer = styled.div`
  display: grid;
  grid-template-rows: 158px 72px;
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
  color: red;
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

function ShoppingBasket() {
  return (
    <Wrapper>
      <GridContainer>
        <ShoppingList>
          <ShoppingImg src={Imgsrc} />
          <Text>장바구니</Text>
        </ShoppingList>
        <RightContainer>
          <ArrowLeft />
          <ArrowRight />
          <GridRightContainer>
            <ShoppingItem></ShoppingItem>
            <ShoppingItem></ShoppingItem>
            <ShoppingItem></ShoppingItem>
            <ShoppingItem></ShoppingItem>
            <ShoppingItem></ShoppingItem>
            <ShoppingResultContainer>
              <ShoppingResult>
                <RedText>총 결제 금액</RedText>
                <RedText>5000 원</RedText>
              </ShoppingResult>
              <ResultBtn>
                <Text>주문하기</Text>
              </ResultBtn>
            </ShoppingResultContainer>
          </GridRightContainer>
        </RightContainer>
      </GridContainer>
    </Wrapper>
  );
}

export default ShoppingBasket;
