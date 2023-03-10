import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sorted, statusChanged } from "../../features/filter/filterSlice";

export default function Filter() {
  const { status } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const sortHandler = (event) => {
    const sortValue = event.target.value;
    dispatch(sorted(sortValue));
  };

  const statusHandler = (value) => {
    dispatch(statusChanged(value));
  };

  return (
    <aside>
      <div className="sidebar-items">
        <div className="sidebar-content">
          <h4>Sort</h4>
          <select
            name="sort"
            id="lws-sort"
            className="w-full max-w-[150px] border-2 rounded-md text-gray-500"
            onChange={sortHandler}
          >
            <option value="">Default</option>
            <option value="newest">Newest</option>
            <option value="most_liked">Most Liked</option>
          </select>
        </div>
        <div className="sidebar-content">
          <h4>Filter</h4>
          <div className="radio-group">
            <div>
              <input
                type="radio"
                name="filter"
                id="lws-all"
                checked={status === "all" ? true : false}
                onChange={() => statusHandler("all")}
                className="radio"
              />
              <label htmlFor="lws-all">All</label>
            </div>
            <div>
              <input
                type="radio"
                name="filter"
                id="lws-saved"
                checked={status === "saved" ? true : false}
                onChange={() => statusHandler("saved")}
                className="radio"
              />
              <label htmlFor="lws-saved">Saved</label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
