import React, {useState} from "react";
import "./styles/index.css";

const DropDownBtn = (item) => {
  const { db, setDB } = item;
  const [isShowBtn, setShowBtn] = useState("hide");
  const enterColumn = [
    {title: "name", content: "Название"},
    {title: "count", content: "Количество"},
    {title: "distance", content: "Расстояние"}
  ];
  const condition = [
    {title: "equal", content: "Равно"},
    {title: "contain", content: "Содержит"},
    {title: "more", content: "Больше"},
    {title: "less", content: "Меньше"}
  ]
  const [isColumn, setColumn] = useState("");
  const [isCondition, setCondition] = useState("");
  const [isValueInput, setValueInput] = useState("");

  const showBtn = () => {
    if (isShowBtn === "hide") {
      setShowBtn("show");
    } else {
      setShowBtn("hide");
    }
  };

  const filter = () => {
    const valueInputFilter = isValueInput.target.value;
    // console.log(isColumn);
    // console.log(isCondition);
    // console.log(valueInputFilter);

    db.map((item) => {
      // const {name, count, distance} = item;
      const key = Object.keys(item);
      let countKeys = key.length;

      for (let i = 0; i < countKeys; i++) {
        if (key[i] === isColumn) { //obj[keys[i]]
          if (isCondition === "contain") {
            if (item[key[i]] === valueInputFilter)
              setDB(item);
          }
        }
      }
    })
  };

  return (
    <>
      <button onClick={showBtn}>Фильтры</button>
      <div id={"btn-dropdown"} className={isShowBtn}>
        <p>Выберите столбец</p>
        <ul>
          {
            enterColumn.map((item, key) => {
              const {title, content} = item;
              return (
                <li key={key}><button onClick={() => setColumn(title)}>{content}</button></li>
              )
            })
          }
        </ul>
        <hr />
        <p>Выберите условие</p>
        <ul>
          {
            condition.map((item, key) => {
              const {title, content} = item;
              return (
                <li key={key}><button onClick={() => setCondition(title)}>{content}</button></li>
              )
            })
          }
        </ul>
        <hr />
        <div>
          <input placeholder={"Введите значение для фильтрации.."} onChange={(e) => setValueInput(e)}/>
          <button onClick={() => filter()}>Search</button>
        </div>
      </div>
    </>
  );
}

export default DropDownBtn;