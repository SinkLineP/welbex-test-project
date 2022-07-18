import React from "react";
import "./styles/index.css";

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
        <li className={"page-item pos-prev"}>
          <button onClick={prevPage}>Назад</button>
        </li>
        {
          pageNumbers.map((number) => (
            <li className={"page-item"} key={number}>
              <a onClick={() => paginate(number)}>
                {number}
              </a>
            </li>
          ))
        }
        <li className={"page-item pos-next"}>
          <button onClick={nextPage}>Далее</button>
        </li>
      </ul>
    </div>
  )
}

export default Pagination;