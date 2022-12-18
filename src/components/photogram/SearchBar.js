// import { unstable_createChainedFunction } from "@mui/utils";
import React from "react";
import "./SearchBar.css";
const SearchBar = (props) => {
  const categories = [
    { name: "Animals", src: "./images/categories/animals.jpg" },
    { name: "Food", src: "./images/categories/food.jpg" },
    { name: "Sport", src: "./images/categories/sport.jpg" },
    { name: "Art", src: "./images/categories/art.jpg" },
    { name: "Nature", src: "./images/categories/nature.jpg" },
  ];
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("Animals");
  const [favoritesActive, setFavoritesActive] = React.useState(false);
  const [searchActive, setSearchActive] = React.useState(false);
  React.useEffect(() => {
    setFavoritesActive(() => props.favoritesActive);
  }, [props.favoritesActive]);
  function clearSearchField() {
    setSearchValue(() => "");
  }
  function onSubmitHandler() {
    if (!isEmptyString(searchValue)) {
      setSearchActive(() => true);
      props.searchByKeywords(searchValue);
    }
  }
  function isEmptyString(input) {
    let isEmpty = true;
    input.split("").forEach((el) => {
      if (el !== " ") isEmpty = false;
      return isEmpty;
    });
    return isEmpty;
  }
  return (
    <div className="search-bar">
      <div className="search-top">
        <div className="search-input">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitHandler();
            }}
          >
            <input
              className="search"
              type="search"
              placeholder="Search"
              maxLength={30}
              value={searchValue}
              onChange={(e) => {
                setSearchValue(() => e.target.value);
              }}
            ></input>
          </form>
          <button
            className="clear-btn"
            type="button"
            onClick={() => {
              console.log(searchActive);
              if (searchActive) {
                props.backToCategories();
                setSearchActive(() => false);
              }
              clearSearchField();
            }}
          >
            <img
              width="15px"
              src="./images/icons/close.png"
              alt="clear"
              style={{ visibility: searchValue ? "visible" : "hidden" }}
            />
          </button>
          <button
            className="search-btn"
            type="button"
            onClick={onSubmitHandler}
          >
            <img src="./images/icons/search-icon.png" alt="search" />
          </button>
        </div>
        <button
          className={
            favoritesActive ? "favorite-filter active" : "favorite-filter"
          }
          onClick={(e) => {
            props.showFavorites("favorites");
            setFavoritesActive((prev) => !prev);
          }}
        >
          <svg
            width="45"
            // height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.31804 2.31804C1.90017 2.7359 1.5687 3.23198 1.34255 3.77795C1.1164 4.32392 1 4.90909 1 5.50004C1 6.09099 1.1164 6.67616 1.34255 7.22213C1.5687 7.7681 1.90017 8.26417 2.31804 8.68204L10 16.364L17.682 8.68204C18.526 7.83812 19.0001 6.69352 19.0001 5.50004C19.0001 4.30656 18.526 3.16196 17.682 2.31804C16.8381 1.47412 15.6935 1.00001 14.5 1.00001C13.3066 1.00001 12.162 1.47412 11.318 2.31804L10 3.63604L8.68204 2.31804C8.26417 1.90017 7.7681 1.5687 7.22213 1.34255C6.67616 1.1164 6.09099 1 5.50004 1C4.90909 1 4.32392 1.1164 3.77795 1.34255C3.23198 1.5687 2.7359 1.90017 2.31804 2.31804V2.31804Z"
              stroke="#ffe4c4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{props.favoritesLength}</span>
        </button>
      </div>
      <div className="search-bottom">
        <ul className="search-categories">
          {categories.map((el, index) => {
            return (
              <li key={index} className="categories-item">
                <button
                  className={el.name === selectedCategory ? "selected" : ""}
                  type="button"
                  value={el.name}
                  onClick={(e) => {
                    setSelectedCategory(() => e.target.value);
                    props.selectCategory(e.target.value);
                    setFavoritesActive(() => false);
                  }}
                >
                  <img src={el.src} alt={el.name} />
                </button>
                <h3 className="categories-title">{el.name}</h3>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
