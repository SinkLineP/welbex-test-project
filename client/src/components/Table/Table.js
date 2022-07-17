import React, {useState, useEffect, useCallback} from "react";
import "./styles/index.css";
import {showAllCars} from "../http/API";
import DropDownBtn from "../DropDownBtn/DropDownBtn";

const Table = () => {
  const [initialDB, setInitialDB] = useState([]);
  const [localDB, setLocalDB] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const viewCars = async () => {
    const response = await showAllCars();
    setInitialDB(response.data);
    if (filteredData.length === 0) {
      setLocalDB(response.data);
    } else {
      setLocalDB(filteredData);
    }
  }

  useEffect(() => {
    return viewCars;
  });

  const showFilteredDB = useCallback((call) => {
    filteredData.push(call);
  })

  const resetFilterDB = () => {
    setFilteredData([]);
    setLocalDB(initialDB);
  }

  return (
    <>
      <DropDownBtn db={localDB} setDB={showFilteredDB}/>
      <button onClick={() => resetFilterDB()}>Сбросить фильтры</button>
      <table className={"table-cars"}>
        <thead>
          <tr>
            <td>Дата</td>
            <td>Название</td>
            <td>Количество</td>
            <td>Расстояние</td>
          </tr>
        </thead>
        <tbody>
          {
            localDB.map((item) => {
              return (
                <>
                  <tr>
                    <td>{item.date.split('T')[0]}</td>
                    <td>{item.name}</td>
                    <td>{item.count}</td>
                    <td>{item.distance}</td>
                  </tr>
                </>
              );
            })
          }
        </tbody>
      </table>
    </>
  );
}

export default Table;