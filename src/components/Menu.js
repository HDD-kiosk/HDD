import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Colors from "../styles/Colors";
import { dbService } from "../firebase";
import Modal from "../views/Guest/Order/Modal";
import InputMenu from "./InputMenu";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

const AddMenu = styled.button`
  position: absolute;
  left: 64.12%;
  right: 21.49%;
  top: 3.71%;
  bottom: 89.55%;

  background: ${Colors.MainYellow};
  border: 9px solid ${Colors.MainYellow};
  border-radius: 11px;
  color: ${Colors.White};
  cursor: pointer;
`;
const Special = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: absolute;
  left: 20.12%;
  right: 5.49%;
  top: 2.71%;
  bottom: 49.55%;

  width: 82px;
  height: 264px;

  color: ${(props) => props.color || Colors.Black};
  background: ${(props) => props.backgroundColor || Colors.White};
  border: 9px solid ${Colors.MainYellow};
  box-sizing: border-box;
  border-radius: 0px 63px 63px 0px;
  transform: rotate(-90deg);
`;
const Burger = styled(Special)`
  left: 35.12%;
  right: 20.49%;
`;
const Junior = styled(Special)`
  left: 50.12%;
  right: 25.49%;
`;

const Side = styled(Special)`
  left: 65.12%;
  right: 30.49%;
`;

const Dessert = styled(Special)`
  left: 80.12%;
  right: 35.49%;
`;

const Text = styled.span`
  transform: rotate(90deg);
`;

const DeleteBtn = styled.span`
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
`;
const Styled = {
  menuWrap: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background-color: ${Colors.White};
    margin: 0px 71px;
    border-radius: 9px;
    border-style: solid;
    border-width: 5px;
    border-color: ${Colors.MainYellow};

    position: absolute;
    left: 7.5%;
    right: 0.9%;
    top: 25.71%;
  `,
  menuBox: styled.div`
    width: 269px;
    height: 298px;
    border-radius: 9px;
    border-style: solid;
    border-width: 1px;
    margin: 20px 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  menuImage: styled.img`
    width: 156px;
    height: 129px;
    background-repeat: no-repeat;
    background-size: cover;
  `,
  menuName: styled.div`
    font-size: 25px;
    font-weight: bold;
    margin-top: 32px;
  `,
  menuPrice: styled.div`
    font-size: 25px;
    font-weight: bold;
    color: ${Colors.Red};
    margin-top: 26px;
    margin-bottom: 22px;
    display: flex;
    justify-content: flex-end;
    padding-left: 160px;
  `,
};
/*const menuData = [
  { imageUrl: whopperImage, name: "와퍼", price: 5000 },
  { imageUrl: bulgogiWhopperImage, name: "불고기 와퍼", price: 6000 },
  { imageUrl: QCWhopperImage, name: "콰트로치즈 와퍼", price: 7000 },
  { imageUrl: whopperIcon, name: "와퍼퍼", price: 100 },
];*/
//const [close, setClose] = useState(false);

const MenuBox = ({ imageUrl, name, price, menuData }) => {
  const deleteBtnClick = async () => {
    console.log(name);
    console.log(menuData);
    const newList = menuData.filter((member) => {
      return member.menuTitle === name;
    });
    const docRef = doc(dbService, "menus", newList[0].id);

    await deleteDoc(docRef);
  };

  return (
    <Styled.menuBox>
      <DeleteBtn onClick={deleteBtnClick}>❌</DeleteBtn>
      <Styled.menuImage src={imageUrl} />
      <Styled.menuName>{name}</Styled.menuName>
      <Styled.menuPrice>{price}원</Styled.menuPrice>
    </Styled.menuBox>
  );
};
function Menu({ userObj }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuTitle, setMenuTitle] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [menuImg, setMenuImg] = useState(null);
  const [category, setCategory] = useState("");
  const [menuData, setMenuData] = useState([]); // 바꿀 데이터
  const [menuUserData, setMenuUserData] = useState([]); // 전체 유지

  const [index, setIndex] = useState(1);
  const [sig, setSig] = useState(1);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const addMenuBtnClick = (e) => {
    openModal();
  };

  useEffect(() => {
    let newMenuArr;
    const q = query(
      collection(dbService, "menus")
      //orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const menuArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      newMenuArr = menuArr.filter((member) => {
        return member.creatorId === userObj.uid;
      });
      setMenuUserData(newMenuArr);

      switch (index) {
        case 1:
          const specialMenu = newMenuArr.filter((member) => {
            return member.menuCategory === "스페셜할인팩";
          });
          setMenuData(specialMenu);
          break;
        case 2:
          const wapperMenu = newMenuArr.filter((member) => {
            return member.menuCategory === "와퍼";
          });
          setMenuData(wapperMenu);
          break;
        case 3:
          const juniorMenu = newMenuArr.filter((member) => {
            return member.menuCategory === "주니어";
          });
          setMenuData(juniorMenu);
          break;
        case 4:
          const sideMenu = newMenuArr.filter((member) => {
            return member.menuCategory === "사이드";
          });
          setMenuData(sideMenu);
          break;
        case 5:
          const dessertMenu = newMenuArr.filter((member) => {
            return member.menuCategory === "디저트";
          });
          setMenuData(dessertMenu);
          break;
      }
    });
  }, [sig]);

  const addBtnOnClick = async () => {
    // 모달안에 있는 "추가버튼"
    setSig(sig * -1);

    try {
      const docRef = await addDoc(collection(dbService, "menus"), {
        image: menuImg, //Same useState
        menuTitle: menuTitle,
        menuPrice: menuPrice,
        menuCategory: category,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
    } catch (error) {
      console.error("Error adding document:", error);
    }
    //setNweet("");
    const menuObj = { imageUrl: menuImg, name: menuTitle, price: menuPrice };
    menuData.push(menuObj);
    closeModal();
  };

  const cancleBtnOnClick = () => {
    closeModal();
  };

  const [navColor, setNavColor] = useState({
    specialColor: Colors.MainYellow,
    burgerColor: Colors.White,
    juniorColor: Colors.White,
    sideColor: Colors.White,
    dessertColor: Colors.White,
    specialtextColor: Colors.White,
    burgertextColor: Colors.Black,
    juniortextColor: Colors.Black,
    sidetextColor: Colors.Black,
    desserttextColor: Colors.Black,
  });
  const onSpecialClick = () => {
    setNavColor({
      specialColor: Colors.MainYellow,
      burgerColor: Colors.White,
      juniorColor: Colors.White,
      sideColor: Colors.White,
      dessertColor: Colors.White,
      specialtextColor: Colors.White,
      burgertextColor: Colors.Black,
      juniortextColor: Colors.Black,
      sidetextColor: Colors.Black,
      desserttextColor: Colors.Black,
    });
    setIndex(1);
    const specialMenu = menuUserData.filter((member) => {
      return member.menuCategory === "스페셜할인팩";
    });
    setMenuData(specialMenu);
  };

  const onBurgerClick = () => {
    setNavColor({
      specialColor: Colors.White,
      burgerColor: Colors.MainYellow,
      juniorColor: Colors.White,
      sideColor: Colors.White,
      dessertColor: Colors.White,
      specialtextColor: Colors.Black,
      burgertextColor: Colors.White,
      juniortextColor: Colors.Black,
      sidetextColor: Colors.Black,
      desserttextColor: Colors.Black,
    });
    setIndex(2);
    const wapperMenu = menuUserData.filter((member) => {
      return member.menuCategory === "와퍼";
    });
    setMenuData(wapperMenu);
  };

  const onJuniorClick = () => {
    setNavColor({
      specialColor: Colors.White,
      burgerColor: Colors.White,
      juniorColor: Colors.MainYellow,
      sideColor: Colors.White,
      dessertColor: Colors.White,
      specialtextColor: Colors.Black,
      burgertextColor: Colors.Black,
      juniortextColor: Colors.White,
      sidetextColor: Colors.Black,
      desserttextColor: Colors.Black,
    });
    setIndex(3);
    const juniorMenu = menuUserData.filter((member) => {
      return member.menuCategory === "주니어";
    });
    setMenuData(juniorMenu);
  };

  const onSideClick = () => {
    setNavColor({
      specialColor: Colors.White,
      burgerColor: Colors.White,
      juniorColor: Colors.White,
      sideColor: Colors.MainYellow,
      dessertColor: Colors.White,
      specialtextColor: Colors.Black,
      burgertextColor: Colors.Black,
      juniortextColor: Colors.Black,
      sidetextColor: Colors.White,
      desserttextColor: Colors.Black,
    });
    setIndex(4);
    const sideMenu = menuUserData.filter((member) => {
      return member.menuCategory === "사이드";
    });
    setMenuData(sideMenu);
  };

  const onDessertClick = () => {
    setNavColor({
      specialColor: Colors.White,
      burgerColor: Colors.White,
      juniorColor: Colors.White,
      sideColor: Colors.White,
      dessertColor: Colors.MainYellow,
      specialtextColor: Colors.Black,
      burgertextColor: Colors.Black,
      juniortextColor: Colors.Black,
      sidetextColor: Colors.Black,
      desserttextColor: Colors.White,
    });
    const dessertMenu = menuUserData.filter((member) => {
      return member.menuCategory === "디저트";
    });
    setMenuData(dessertMenu);
    setIndex(5);
  };

  const onAddMenuClick = () => {
    // 모달을 실행하기 위한 버튼
    addMenuBtnClick();
  };

  return (
    <div>
      <Special
        backgroundColor={navColor.specialColor}
        color={navColor.specialtextColor}
        onClick={onSpecialClick}
      >
        <Text>스페셜 할인팩</Text>
      </Special>
      <Burger
        backgroundColor={navColor.burgerColor}
        color={navColor.burgertextColor}
        onClick={onBurgerClick}
      >
        <Text>와퍼　</Text>
      </Burger>
      <Junior
        backgroundColor={navColor.juniorColor}
        color={navColor.juniortextColor}
        onClick={onJuniorClick}
      >
        <Text>주니어</Text>
      </Junior>
      <Side
        backgroundColor={navColor.sideColor}
        color={navColor.sidetextColor}
        onClick={onSideClick}
      >
        <Text>사이드</Text>
      </Side>
      <Dessert
        backgroundColor={navColor.dessertColor}
        color={navColor.desserttextColor}
        onClick={onDessertClick}
      >
        <Text>디저트</Text>
      </Dessert>

      <Styled.menuWrap>
        {menuData &&
          menuData.map((v) => {
            return (
              <MenuBox
                key={v.menuTitle}
                imageUrl={v.image}
                name={v.menuTitle}
                price={v.menuPrice}
                menuData={menuUserData}
              />
            );
          })}
      </Styled.menuWrap>
      <AddMenu onClick={onAddMenuClick}>메뉴추가</AddMenu>

      <Modal
        open={modalOpen}
        close={closeModal}
        first="취소"
        second="추가"
        setWidth={400}
        img={null}
        btnEvent1={cancleBtnOnClick}
        btnEvent2={addBtnOnClick}
        movePage={""}
      >
        <InputMenu
          setMenuTitle={setMenuTitle}
          setMenuPrice={setMenuPrice}
          setMenuImg={setMenuImg}
          setCategory={setCategory}
        ></InputMenu>
      </Modal>
    </div>
  );
}
export default Menu;
