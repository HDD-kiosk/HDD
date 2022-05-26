import React from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import AudioRecord from "../../../components/AudioRecord";
const KAKAO_TTS_URL = 'https://kakaoi-newtone-openapi.kakao.com/v1/synthesize';
const REST_API_KEY = '9063332fecca3b9e512ce29c057add84';

const cors = require('cors')({ origin: true });
const fs = require('fs').promise;
const request = require('request');

const clientId = '5dpql0ebdi';
const clientSecret = 'BUEsuC0pd1keyIrw8it3KQzYwhnamuAx5qwaoc7R';

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


function VoiceOrder() {
  const [audioData, setAudioData] = useState(null);
  //STT_TEXT = 서버에서 뿌려주는 텍스트 값;
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

  const sttBtnClick = (soundFile,e) => {
    console.log('사운드파일은?', soundFile);
    // soundFile을 파베로 보낸다
    axios
      .post('http://localhost:5000/hdd-client/us-central1/apicall', soundFile, {
        headers: {
          'Content-Type': 'audio/mpeg'
        }
      })
      .then((response) => {
        if(response.data){
          console.log('Success: ' + response.data);
        } else {
          console.log('Failed...');
        }
        
      });
    // 파베에서 받아서 res로 보내면 여기서 그걸 받는다
    // 콘솔에 찍는다
    

    // STT API를 호출
    fetch('http://localhost:5000/hdd-client/us-central1/apicall')
      .then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
      })
      .then(function(data) {
        // `data` is the parsed version of the JSON returned from the above endpoint.
        console.log(data); // { "userId": 1, "id": 1, "title": "...", "body": "..." }
        console.log(data.body);
      });
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

  return (
    <VoiceOrderWrap>
      <AudioRecord setAudioData={setAudioData} ttsBtnClick={ttsBtnClick} sttBtnClick={sttBtnClick}></AudioRecord>
    </VoiceOrderWrap>
  );
}
export default VoiceOrder;