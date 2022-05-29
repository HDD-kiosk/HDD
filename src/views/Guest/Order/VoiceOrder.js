import React from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import AudioRecord from "../../../components/AudioRecord";
import FindAlgo from "../../../components/FindAlgo";
import {
  addDoc,
  collection,
  getDocs,
  query,
  onSnapshot,
  orderBy,
  doc,
  deleteDoc,
  where,
  getFirestore,
} from "firebase/firestore";
import { dbService } from "../../../firebase";
import { updatePassword } from "firebase/auth";
const KAKAO_TTS_URL = "https://kakaoi-newtone-openapi.kakao.com/v1/synthesize";
const KAKAO_STT_URL = "https://kakaoi-newtone-openapi.kakao.com/v1/recognize";
const REST_API_KEY = "9063332fecca3b9e512ce29c057add84";

const clientId = "5dpql0ebdi";
const clientSecret = "BUEsuC0pd1keyIrw8it3KQzYwhnamuAx5qwaoc7R";

const VoiceOrderWrap = styled.div``;

const SttBtn = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background-color: yellow;
  margin-right: 25px;
  cursor: pointer;
`;

const TtsBtn = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background-color: yellow;
  margin-right: 25px;
  cursor: pointer;
`;

function VoiceOrder({ userObj }) {
  const [audioData, setAudioData] = useState(null);
  const [list, setList] = useState(null);
  const [STT_TEXT, setSttText] = useState("");
  //const [tempStr, setTempStr] = useState('');
  let startIndex = "";
  let lastIndex = "";

  function voicePlay(responseAudioData) {
    const context = new AudioContext();

    context.decodeAudioData(responseAudioData, (buffer) => {
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(0);
    });
  }

  const sttBtnClick = (soundFile, originText) => {
    console.log("보이스오더js에서사운드파일은?", soundFile);
    console.log("오리진텍스트는?", originText);

    if (originText != undefined) {
      const str = originText;
      console.log(str);
      let startIndex = str.indexOf('"', 7) + 1;
      let lastIndex = str.lastIndexOf('"') - 1;
      let parsingText = str.substring(startIndex, lastIndex + 1);
      console.log(parsingText);

      // parsingText 를 orderText[0] 에 넣어줘야함

      const orderText = [parsingText, userObj];

      let arr = FindAlgo(orderText); // return [orderList,replacementText] or [orderList,errorMsgText,1];
      console.log("arr이다", arr);
      setList(arr[0][0]);

      if (arr[2] == undefined) {
        ttsBtnClick(arr, 0);
      } else {
        ttsBtnClick(arr[1], 1);
      }
    } else {
      ttsBtnClick("죄송해요 잘 알아듣지 못했어요", 1);
    }
  };
  // option 0: 상품메시지 1: 안내메시지
  const ttsBtnClick = (text, option) => {
    let sttText = "";
    let tempText = "";
    if (text === "죄송해요 잘 알아듣지 못했어요") {
      sttText = text;
    } else if (text === "주문이 접수되었습니다.") {
      sttText = text;
    } else {
      const temp = text[0][0].menuTitle;
      console.log(temp);
      temp.map((v) => {
        tempText += v.name + v.am + "개 ";
      });
      sttText = tempText;
      if (option == 0) {
        sttText = sttText + " 가 맞나요? 맞으면 주문확인을 눌러주세요.";
      }
    }

    const xmlData = `<speak>${sttText}</speak>`; // 여기에 STT를 넣으면 성공

    axios
      .post(KAKAO_TTS_URL, xmlData, {
        headers: {
          "Content-Type": "application/xml",
          Authorization: `KakaoAK ${REST_API_KEY}`,
        },
        responseType: "arraybuffer",
      })
      .then((response) => {
        voicePlay(response.data);
      });
  };

  const sendOrder = () => {
    console.log("sendOrder():", list);
    try {
      const docRef = addDoc(collection(dbService, "orders"), {
        menuTitle: list.menuTitle,
        menuPrice: list.menuPrice,
        menuCount: list.menuCount,
        orderNumber: list.orderNumber,
        creatorId: list.creatorId,
      });
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  return (
    <VoiceOrderWrap>
      <AudioRecord
        setAudioData={setAudioData}
        ttsBtnClick={ttsBtnClick}
        sttBtnClick={sttBtnClick}
        sendOrder={sendOrder}
      ></AudioRecord>
    </VoiceOrderWrap>
  );
}

export default VoiceOrder;
