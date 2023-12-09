import React, { useEffect, useState } from "react";
import { TiThList } from "react-icons/ti";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { selectData } from "../../../Actions/DataAction";

const getLocalStorageItem = (key, defaultValue) => {
  return localStorage.getItem(key) || defaultValue;
};

const Header = () => {
  const [displayOnClick, setDisplayOnClick] = useState(false);
  const dispatch = useDispatch();
  const { allTickets, allUser } = useSelector((state) => state.DataReducer);
  const [groupValue, setGroupValue] = useState(() => getLocalStorageItem("group", "status"));
  const [orderValue, setOrderValue] = useState(() => getLocalStorageItem("order", "priority"));

  const handleSelectChange = (e, isGroup) => {
    const value = e.target.value;
    if (isGroup) {
      setGroupValue(value);
      localStorage.setItem("group", value);
    } else {
      setOrderValue(value);
      localStorage.setItem("order", value);
    }
    setDisplayOnClick(false);
  };

  useEffect(() => {
    const selectedDataParams = groupValue === "user"
      ? { allTickets, allUser }
      : { allTickets, allUser: null };

    dispatch(selectData(groupValue, selectedDataParams, orderValue));
  }, [allTickets, allUser, dispatch, groupValue, orderValue]);

  return (
    <div className="topheader">
      <div className="displayButton">
        <button
          className="headerButton"
          onClick={() => setDisplayOnClick(!displayOnClick)}
        >
          <TiThList /> Display
        </button>
        {displayOnClick && (
          <div className="dropOnClick">
            <div className="selectGroup">
              <span>Grouping</span>
              <select
                value={groupValue}
                onChange={(e) => handleSelectChange(e, true)}
                className="selectStyle"
                name="group"
                id="group"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="selectGroup">
              <span>Ordering</span>
              <select
                value={orderValue}
                onChange={(e) => handleSelectChange(e, false)}
                className="selectStyle"
                name="order"
                id="order"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;