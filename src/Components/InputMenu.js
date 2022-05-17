import React, { useState, useEffect } from "react";
import styled from "styled-components";
import inputBtnImg from "../img/inputmenubtn.png";

const InputMenuWarp = styled.div``;
const Section = styled.div``;
const SectionTitle = styled.h3``;
const SectionContext = styled.input.attrs((props) => ({
  type: "text",
}))``;
const SelectBoxWrap = styled.div``;
const SectionCategory = styled.select``;
const MenuImgInputWrap = styled.div``;
const MenuImgInput = styled.div`
  margin: 0 8px 0 8px;

  label {
    cursor: pointer;
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
const Wraper = styled.div`
  display: none;
`;

const InputMenu = (props) => {
  const [myImage, setMyImage] = useState(inputBtnImg);
  const [inputTitleValue, setMenuTitle] = useState("");
  const [inputPriceValue, setPrice] = useState("");
  const [inputCategory, setCategory] = useState("스페셜할인팩");
  
  useEffect(() => {
    props.setMenuTitle(inputTitleValue);
  }, [inputTitleValue]);

  useEffect(() => {
    props.setMenuPrice(inputPriceValue);
  }, [inputPriceValue]);

  useEffect(() => {
    props.setMenuImg(myImage);
  }, [myImage]);

  useEffect(() => {
    props.setCategory(inputCategory);
    console.log("값이 바뀜",inputCategory);
  }, [inputCategory]);

  //   inputTitleValue, inputPriceValue , myImage ,   객체보내야함

  const CATEGORY_OPTIONS = [
    { value : "스페셜할인팩" ,name: "스페셜할인팩" },
    { value : "와퍼" ,name: "와퍼" },
    { value : "주니어" ,name: "주니어" },
    { value : "사이드" ,name: "사이드" },
    { value : "디저트" ,name: "디저트" },
  ];

  const getMenuTitle = (e) => {
    const val = e.target.value;
    setMenuTitle(val);
  };
  const getPriceTitle = (e) => {
    const val = e.target.value;
    setPrice(val);
  };

  const CategorySelectBox = (props) => {
    const handleChange = (e) => {
     
      setCategory(e.target.value);
      
    };

    return (
      <SelectBoxWrap>
        <SectionCategory onChange={handleChange} value = {inputCategory}>
          {props.options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              
              
              defaultValue={props.defaultValue === option.value}
            >
              {option.name}
            </option>
          ))}
        </SectionCategory>
      </SelectBoxWrap>
    );
  };

  const MenuImgInput = (props) => {
    const handleImageChange = (e) => {
      //const nowSelectImageList = e.target.files;
      const files = e.target.files;
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setMyImage(result);
      };
      reader.readAsDataURL(theFile);
    };

    //const nowImageUrl = URL.createObjectURL(nowSelectImageList[0]);
    //console.log(nowImageUrl);
    //setMyImage(nowImageUrl);

    return (
      <MenuImgInputWrap>
        <label htmlFor="ex_file">
          <div className="btnStart">
            <img src={myImage} alt="myImage" width="300" height="200" />
          </div>
        </label>
        <Wraper>
          <input
            type="file"
            multiple="multiple"
            id="ex_file"
            accept="image/jpg, image/png, image/jpeg"
            onChange={handleImageChange}
          />
        </Wraper>
      </MenuImgInputWrap>
    );
  };

  return (
    <InputMenuWarp>
      <MenuImgInput></MenuImgInput>

      <Section>
        <SectionTitle>메뉴명</SectionTitle>
        <SectionContext
          onChange={getMenuTitle}
          value={inputTitleValue}
        ></SectionContext>
      </Section>

      <Section>
        <SectionTitle>가격</SectionTitle>
        <SectionContext
          onChange={getPriceTitle}
          value={inputPriceValue}
        ></SectionContext>
      </Section>

      <Section>
        <SectionTitle>카테고리</SectionTitle>
        <CategorySelectBox
          options={CATEGORY_OPTIONS}
          defaultValue = "스페셜할인팩"
        ></CategorySelectBox>
      </Section>
    </InputMenuWarp>
  );
};

export default InputMenu;