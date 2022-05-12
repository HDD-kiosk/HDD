import React, { useState, useEffect } from "react";
import styled from "styled-components";
import inputBtnImg from '../img/inputmenubtn.png';

const InputMenuWarp = styled.div`
`;
const Section = styled.div`
`;
const SectionTitle = styled.h3`
`;
const SectionContext = styled.input.attrs(props => ({
  // 고정적인 Props를 전달할 수 있습니다.
  type: "text",
}))`
`;
const SelectBoxWrap = styled.div`
`;
const SectionCategory = styled.select`
`;
const MenuImgInputWrap = styled.div`
`;
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

  useEffect(() => {
    props.setMenuTitle(inputTitleValue);
  }, [inputTitleValue])

  useEffect(() => {
    props.setMenuPrice(inputPriceValue);
  }, [inputPriceValue])

  useEffect(() => {
    props.setMenuImg(myImage);
  }, [myImage])

  //   inputTitleValue, inputPriceValue , myImage ,   객체보내야함

  const CATEGORY_OPTIONS = [
    { value: "special", name: "스페셜할인팩" },
    { value: "burger", name: "와퍼" },
    { value: "junior", name: "주니어" },
    { value: "side", name: "사이드" },
    { value: "dessert", name: "디저트" },
  ];

  const getMenuTitle = (e) => {
    const val = e.target.value;
    setMenuTitle(val);
  }
  const getPriceTitle = (e) => {
    const val = e.target.value;
    setPrice(val);
  }

  const menuObj= [{ value: "apple", name: "사과" }];

  const CategorySelectBox = (props) => {

    const handleChange = (e) => {
      console.log("카테고리", e.target.value);
    };

    return (
      <SelectBoxWrap>
        <SectionCategory onChange={handleChange}>

          {props.options.map((option) => (
            <option key={option.value} value={option.value} defaultValue={props.defaultValue === option.value}>
              {option.name}
            </option>
          ))}

        </SectionCategory>
      </SelectBoxWrap>
    );
  }

  const MenuImgInput = (props) => {

    const handleImageChange = (e) => {
      const nowSelectImageList = e.target.files;
      const nowImageURLList = [...myImage];

      const nowImageUrl = URL.createObjectURL(nowSelectImageList[0]);
      console.log(nowImageUrl);
      setMyImage(nowImageUrl);
    };

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
  }

  return (
    <InputMenuWarp>

      <MenuImgInput></MenuImgInput>

      <Section>
        <SectionTitle>메뉴명</SectionTitle>
        <SectionContext onChange={getMenuTitle} value={inputTitleValue} ></SectionContext>
      </Section>

      <Section>
        <SectionTitle>가격</SectionTitle>
        <SectionContext onChange={getPriceTitle} value={inputPriceValue}></SectionContext>
      </Section>

      <Section>
        <SectionTitle>카테고리</SectionTitle>
        <CategorySelectBox options={CATEGORY_OPTIONS} defaultValue="banana"></CategorySelectBox>
      </Section>

    </InputMenuWarp>

  );
}

export default InputMenu;