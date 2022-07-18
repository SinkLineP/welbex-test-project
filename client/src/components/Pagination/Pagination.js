import React from "react";
import "./styles/index.css";
import {Button} from "react-bootstrap";

const Pagination = (
  {
    postPerPage,
    totalPosts,
    paginate,
    prevPage,
    nextPage
  }
) => {

  const pageNumbers = [];
  localStorage.removeItem("countPages");

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++ ) {
    pageNumbers.push(i);
  }

  localStorage.setItem("countPages", pageNumbers.length);

  return (
    <div className={"centerPagination"}>
      <ul className={"pagination"}>
        <li className={"page-item pos-prev pagination-btn"}>
          <Button variant={"success"} onClick={prevPage}>Назад</Button>
        </li>
        {
          pageNumbers.map((number) => (
            <li key={number} className={"pagination-btn"}>
              <Button variant={"dark"} onClick={() => paginate(number)}>
                {number}
              </Button>
            </li>
          ))
        }
        <li className={"page-item pos-next"}>
          <Button variant={"success"} onClick={nextPage}>Далее</Button>
        </li>
      </ul>
    </div>
  )
}

export default Pagination;