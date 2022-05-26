function isEmptyArr(arr) {
  if (Array.isArray(arr) && arr.length === 0) {
    return true;
  }
  return false;
}

function replaceText(text, caseList) {
  let replacementText = text;

  for (let i = 0; i < caseList.length; i++) {
    for (let j = 0; j < caseList[i].length; j++) {
      let myRe = new RegExp(caseList[i][j], 'gi');
      if (i == (caseList.length) - 1) {
        replacementText = replacementText.replace(myRe, ``);
      } else {
        replacementText = replacementText.replace(myRe, `${i + 1}개`);
      }
    }
  }
  return replacementText;
}

function findProduct(arr, start, tempList) {
  let productName = '';
  let productAmount = 0;

  for (let numberIndex = 0; numberIndex < arr.length; numberIndex++) {
    if ((productAmount = parseInt(arr[numberIndex]))) {
      start = numberIndex + 3;
      tempList.push({ meunTitle: productName, menuCount: productAmount, });
      break;
    } else {
      if (arr[numberIndex] != " ") {
        productName = productName.concat(arr[numberIndex].toString());
      }
    }
  }
  return [start];
}

const FindAlgo = (props) => {
  let replacementText = props[0];
  let userObj= props[1];
  let tempList = [];
  let tempList2 = [];
  let orderList = [];
  let startIndex = 0;
  const orderNumber = Math.floor(Math.random() * 9000) + 1000;
  const numCaseList = [    //  "치즈버거랑 불고기버거 한개씩 주세요"  "한잔" 생각해보기   콜라 한잔 주세요 
    ['한 개', '한개', '하나', '한 세트', '한세트', '한잔','한 잔'],
    ['두 개', '두개', '둘', '두 세트', '두세트', '두잔','두 잔'],
    ['세 개', '세개	셋', '셋', '세 세트', '세세트', '세잔','세 잔'],
    ['네 개', '네개	넷', '넷', '네 세트', '네세트', '네잔','네 잔'],
    ['다섯 개', '다섯개', '다섯', '다섯 세트', '다섯세트', '다섯잔','다섯 잔'],
    ['여섯 개', '여섯개', '여섯', '여섯 세트', '여섯세트', '여섯잔','여섯 잔'],
    ['일곱 개', '일곱개', '일곱', '일곱 세트', '일곱세트', '일곱잔','일곱 잔'],
    ['여덟 개', '여덟개', '여덟', '여덟 세트', '여덟세트', '여덟잔','여덟 잔'],
    ['아홉 개', '아홉개', '아홉', '아홉 세트', '아홉세트', '아홉잔','아홉 잔'],
    ['랑', '세트'], // 마지막 이 해당 배열은 바뀌지 못한 단위를 통일 시키기위함
  ];

  replacementText = replaceText(replacementText, numCaseList);
  console.log("리플텍스트:", replacementText);

  let orderTextToArray = Array.from(replacementText);
  do {
    [startIndex] = findProduct(orderTextToArray, startIndex, tempList);
    orderTextToArray = orderTextToArray.slice(startIndex, orderTextToArray.length);
  } while (!isEmptyArr(orderTextToArray))


  for(let i = 0; i < tempList.length; i++){
    tempList2.push(
      { 
        am: tempList[i].menuCount,
        imageUrl: null, 
        name: tempList[i].meunTitle,
        price:0,
      }
    );
  }
    orderList.push(
      {
        meunTitle: tempList2,
        menuPrice: 0,
        menuCount: tempList2.length,
        orderNumber: orderNumber,
        creatorId: userObj.uid,
      }
    );

  return orderList;
}

export default FindAlgo;