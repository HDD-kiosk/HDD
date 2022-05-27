import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
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
const KAKAO_STT_URL = 'https://kakaoi-newtone-openapi.kakao.com/v1/recognize';
const REST_API_KEY = '9063332fecca3b9e512ce29c057add84';



const clientId = '5dpql0ebdi';
const clientSecret = 'BUEsuC0pd1keyIrw8it3KQzYwhnamuAx5qwaoc7R';

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
  const [STT_TEXT, setSttText] = useState('');
  //const [tempStr, setTempStr] = useState('');
  let startIndex='';
  let lastIndex ='';

  function voicePlay(responseAudioData) {
    console.log("6");
    const context = new AudioContext();

    context.decodeAudioData(responseAudioData, (buffer) => {
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
    // axios.post(
    //   'http://localhost:5000/hdd-client/us-central1/apicall',
    //   audioURL
    // ).then((res) => {
    //   return res.json();
    // }).then(function (data) {
    //   console.log(data);
    // })
      console.log("1");

    fetch('http://localhost:5000/hdd-client/us-central1/apicall',soundFile)
      .then(function (response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        console.log("2");
        return response.json();
      })
      .then(function (data) {
        console.log("3");
        // `data` is the parsed version of the JSON returned from the above endpoint.
        console.log("보이스오더js STT data: ", data); // { "userId": 1, "id": 1, "title": "...", "body": "..." }
        console.log("보이스오더js STT data.body:", data.body);
       let tempStr = data.body;
        console.log("보이스오더js STT temp:", tempStr);
         startIndex = tempStr.indexOf('\"', 8) + 1;
         lastIndex = tempStr.lastIndexOf('\"') - 1;

        let s = tempStr.substring(startIndex, lastIndex + 1);

        setSttText(s);
        console.log("보이스오더js에서 s:",s);
        console.log("보이스오더js에서 stt_text:",STT_TEXT);
        ttsBtnClick(s);
      });



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
    console.log("4");
    console.log("tts버튼클릭");
    console.log("e:",e);
    //const xmlData = `<speak>${STT_TEXT}</speak>`; // 여기에 STT를 넣으면 성공
    const xmlData = `<speak>${e}</speak>`; // 여기에 STT를 넣으면 성공
  

    axios.post(KAKAO_TTS_URL, xmlData, {

      headers: {
        'Content-Type': 'application/xml',
        Authorization: `KakaoAK ${REST_API_KEY}`,
      },
      responseType: 'arraybuffer'

    }).then((response) => {
      console.log("5");
      voicePlay(response.data);
      console.log("7");

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
