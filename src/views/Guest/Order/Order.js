import React, { useState } from 'react';
import styled from 'styled-components';
import Colors from '../../../styles/Colors'

const Styled = {
  wrap: styled.div`
    width: 400px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-contents: flex-start;
    align-items: center;
    background-color: ${Colors.LightYellow};
  `,
  menuBox: styled.div`
    width: 140px;
    height: 129px;
    background-color: '${Colors.MainYellow}';
    border-style: 'solid',
  `,
  greenBox: styled.div`
    width: 100px;
    height: 100px;
    background-color: green;
  `,
};


function Order() {
  return (
    <Styled.wrap>
      <div> 폰트 적용 완료 </div>
      <Styled.menuBox>zzffzz</Styled.menuBox>
    </Styled.wrap>
  );
}

export default Order;
