import "./Pagination.css";
import React from "react";
const Pagination = (props) => {
  const [pages, setPages] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [firstIndexToShow, setFirstIndexToShow] = React.useState(
    props.firstIndexToShow
  );
  React.useEffect(() => {
    let pages = [];
    for (let i = 0; i < props.pagesNumber; i++) {
      pages.push(i + 1);
    }
    setPages(() => pages);
    setCurrentPage(() => props.currentPage);
  }, [props.pagesNumber, props.currentPage]);
  return (
    <div className="pagination">
      <button
        className={
          props.firstIndexToShow === 0 ? "prev-btn disabled" : "prev-btn"
        }
        style={{ visibility: props.pagesNumber <= 1 ? "hidden" : "" }}
        type="button"
        onClick={props.getToThePreviousPage}
      >
        <img src="./images/icons/arrow-icon.svg" alt="prev-arrow" />
      </button>
      <div className="pages">
        {pages.map((el, index) => {
          return (
            <button
              key={index}
              type="button"
              value={el}
              className={el === currentPage ? "active" : ""}
              onClick={props.switchPage}
              style={{ visibility: props.pagesNumber <= 1 ? "hidden" : "" }}
            >
              {el}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className={
          props.currentPage === props.pagesNumber
            ? "next-btn disabled"
            : "next-btn"
        }
        onClick={props.getToTheNextPage}
        style={{ visibility: props.pagesNumber <= 1 ? "hidden" : "" }}
      >
        <img src="./images/icons/arrow-icon.svg" alt="next-arrow" />
      </button>
    </div>
  );
};

export default Pagination;
