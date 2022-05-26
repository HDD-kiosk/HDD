import React from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from 'axios';
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
const KAKAO_TTS_URL = 'https://kakaoi-newtone-openapi.kakao.com/v1/synthesize';
const REST_API_KEY = '9063332fecca3b9e512ce29c057add84';

const VoiceOrderWrap = styled.div`
`;

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
  let STT_TEXT = null;


  function voicePlay(responseAudioData) {
    const context = new AudioContext();

    context.decodeAudioData(responseAudioData, buffer => {
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(0);
    });
  }

  const sttBtnClick = (soundFile, audioBlobData) => {
    console.log('보이스오더js에서사운드파일은?', soundFile);
    console.log('보이스오더js에서블랍데이터:', audioBlobData);
     const audioURL = URL.createObjectURL(audioBlobData);
     console.log('보이스오더js에서URL:', audioURL);
    // "soundFile"을 디비로 보낸다
    // 서버에서 STT API를 호출한다 
    //  STT API 결과 값을 가져온다
    //STT_TEXT = 서버에서 뿌려주는 텍스트 값;
    // STT_TEXT를 orderText[0] 에 넣어줘야함
    const orderText = [
      '치즈와퍼 한 세트 스테커와퍼 하나 와악와퍼 2개 불와퍼 아홉세트 줘', userObj
    ];

    let arr = new Array(FindAlgo(orderText));
    setList(arr[0][0]);

    try {
      const docRef = addDoc(collection(dbService, "audio"), {
        audioURL,
      });
    } catch (error) {
      console.error("Error adding document:", error);
    }


  };

  const ttsBtnClick = (e) => {
    const xmlData = `<speak>${STT_TEXT}</speak>`; // 여기에 STT를 넣으면 성공

    axios.post(KAKAO_TTS_URL, xmlData, {

      headers: {
        'Content-Type': 'application/xml',
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
      responseType: 'arraybuffer'

    }).then((response) => {
      voicePlay(response.data);
    });
    
  };

  const sendOrder = () => {
    console.log("sendOrder():", list);
    try {
      const docRef = addDoc(collection(dbService, "orders"), {
        list,
      });
    } catch (error) {
      console.error("Error adding document:", error);
    }
  }

  return (
    <VoiceOrderWrap>
      <AudioRecord setAudioData={setAudioData} ttsBtnClick={ttsBtnClick} sttBtnClick={sttBtnClick} sendOrder={sendOrder}></AudioRecord>
    </VoiceOrderWrap>
  );
}
export default VoiceOrder;