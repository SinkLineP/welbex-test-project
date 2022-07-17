import React, {useState, useEffect} from "react";
import "./styles/index.css";
import {showAllCars} from "../http/API";

const Table = () => {
  const [localDB, setLocalDB] = useState([]);

  const viewCars = async () => {
    const response = await showAllCars();
    setLocalDB(response.data);
  }

  useEffect(() => {
    return viewCars;
  });

  return (
    <>
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