import React, {useState, useEffect, useCallback} from "react";
import "./styles/index.css";
import {showAllCars} from "../http/API";
import DropDownBtn from "../DropDownBtn/DropDownBtn";
import Pagination from "../Pagination/Pagination";
import {Button} from "react-bootstrap";

const Table = () => {
  const [initialDB, setInitialDB] = useState([]);
  const [localDB, setLocalDB] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPageTable, setCurrentPageTable] = useState(1);
  const [valueSearch, setValueSearch] = useState("");

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

  const getValueInput = useCallback((value) => {
    setValueSearch(value);
  });

  const countCarsPerPage = 10;
  const currentPage = currentPageTable;
  const lastPostIndex = currentPage * countCarsPerPage;
  const firstPostIndex = lastPostIndex - countCarsPerPage;
  const currentFilterCars = localDB.slice(firstPostIndex, lastPostIndex);


  const paginate = (pageNumbers) => {
    setCurrentPageTable(pageNumbers);
    console.log(currentFilterCars);
  }

  const nextPage = () => {
    const addCurrentPage = currentPage + 1 > localStorage.getItem("countPages") ? 1 : currentPage + 1;
    setCurrentPageTable(addCurrentPage);
    console.log("First: " + firstPostIndex + "\nLast: " + lastPostIndex);
  }

  const prevPage = () => {
    const addCurrentPage = currentPage - 1 < 1 ? localStorage.getItem("countPages") : currentPage - 1;
    setCurrentPageTable(Number(addCurrentPage));
  }

  return (
    <>
      <DropDownBtn db={localDB} setDB={showFilteredDB} getInput={getValueInput}/>
      <Button className={"mb-2"} onClick={() => resetFilterDB()} variant={"danger"}>Сбросить фильтры</Button>
      <table className={"table"}>
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
          currentFilterCars.map((item) => {
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
      <Pagination
        postPerPage={countCarsPerPage}
        totalPosts={valueSearch === "" ? localDB.length : localDB.length}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
        currentPage={currentPage}
      />
    </>
  );
}

export default Table;