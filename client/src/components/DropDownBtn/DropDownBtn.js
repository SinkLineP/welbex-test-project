import React, {useState} from "react";
import {Button} from "react-bootstrap";
import "./styles/index.css";

const DropDownBtn = (item) => {
  const { db, setDB, getInput } = item;
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
  const [isVisible, setVisible] = useState();
  const storageShow = localStorage.getItem("show-filters");

  const showBtn = () => {
    if (isShowBtn === "hide") {
      setShowBtn("show");
    } else {
      setShowBtn("hide");
    }
  };

  const filter = () => {
    const valueInputFilter = isValueInput.target.value;
    getInput(valueInputFilter);

    db.map((item) => {
      const key = Object.keys(item);
      let countKeys = key.length;

      for (let i = 0; i < countKeys; i++) {
        if (key[i] === isColumn) {
          if (isCondition === "contain") {
            if (item[key[i]] == valueInputFilter) {
              setDB(item);
            }
          } else if (isCondition === "more") {
            if (item[key[i]] > valueInputFilter) {
              setDB(item);
            }
          } else if (isCondition === "less") {
            if (item[key[i]] < valueInputFilter) {
              setDB(item);
            }
          } else if (isCondition === "equal") {
            if (item[key[i]] == valueInputFilter) {
              setDB(item);
            }
          }
        }
      }
    })
  };

  return (
    <>
      <Button className={"mb-2"} onClick={showBtn} variant="primary">Фильтры</Button>{' '}
        <div id={"btn-dropdown"} className={"" + isShowBtn}>
          {isColumn === "" && isCondition === "" && isValueInput === "" && storageShow === "false" ?
            (
              <p>Тут будут отображены выбранные фильтры...</p>
            )
          :
            (
              <div>
                <span>{storageShow === "true" ? "Вы выбрали:" : "Тут будут отображены выбранные фильтры..."}</span>
                <span class={"style-check-filters"}>
                  {
                    enterColumn.map((e) => {
                      if (e.title === isColumn && storageShow === "true") {
                        return e.content;
                      }
                    })
                  }
                </span>
                <span className={"style-check-filters"}>
                  {
                    condition.map((e) => {
                      if (e.title === isCondition && storageShow === "true") {
                        return e.content;
                      }
                    })
                  }
                </span>
              </div>
            )
          }
          <hr />

          <p>Выберите столбец</p>
          <ul>
            {
              enterColumn.map((item, key) => {
                const {title, content} = item;
                return (
                  <li className={"hide-dote"} key={key}>
                    <Button
                      className={""}
                      variant={"success option-btn"}
                      onClick={(e) => {
                        setColumn(title)
                        localStorage.setItem("show-filters", "true");
                      }}
                    >
                      {content}
                    </Button>
                  </li>
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
                  <li className={"hide-dote"} key={key}>
                    <Button
                      className={""}
                      variant={"success option-btn"}
                      onClick={(e) => {
                        setCondition(title);
                        localStorage.setItem("show-filters", "true");
                      }}
                    >
                      {content}
                    </Button>
                  </li>
                )
              })
            }
          </ul>
          <hr />
          <div className="input-group mb-1">
            <input
              className="form-control"
              placeholder={"Введите значение для фильтрации.."}
              onChange={(e) => setValueInput(e)}
              aria-describedby="button-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => filter()}>Search</button>
            </div>
          </div>
        </div>
    </>
  );
}

export default DropDownBtn;