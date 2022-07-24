import UserInfoApi from "../api/userInfoApiCall";
import store from "../store/store";

export function loadUserInfoSuccess(users) {
  return { type: "LOAD_USER_INFO_SUCCESS", users };
}

export function SetSearchCriteriaSuccess(searchCriteria) {
  return { type: "SET_SEARCH_FILTERS_SUCCESS", searchCriteria };
}

export function loadDataOnSortingChange(users) {
  return { type: "LOAD_DATA_ON_SORTING", users };
}

export function setFilteredData(users) {
  return { type: "SET_FILTERED_DATA", users };
}

export function setSortKeyOrder(sortKey, sortOrder) {
  return {
    type: "SET_SORT_KEY_ORDER",
    payload: {
      sortKey: sortKey,
      sortOrder: sortOrder,
    },
  };
}

export function setUpdatedData(data, id, columnKey) {
  return {
    type: "SET_UPDATED_DATA",
    payload: {
      newData: data,
      id: id,
      columnKey: columnKey,
    },
  };
}

export function callLoadUserInfo() {
  return function (dispatch) {
    return UserInfoApi.getAllUserInfo()
      .then((users) => {
        let tableInfo = store.getState().tableInfo;
        let sortedData = users.sort((a, b) => {
          return a[tableInfo.sortKey] > b[tableInfo.sortKey] ? 1 : -1;
        });
        dispatch(loadUserInfoSuccess(sortedData));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function callSetSortKeyOrder(sortKey, sortOrder) {
  return function (dispatch) {
    dispatch(setSortKeyOrder(sortKey, sortOrder));
  };
}

export function callSortData(data, sortKey, sortOrder) {
  return function (dispatch) {
    const sortedData = data.sort((a, b) => {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    });
    if (sortOrder === "desc") {
      dispatch(setFilteredData(sortedData.reverse()));
    } else {
      dispatch(setFilteredData(sortedData));
    }
  };
}

export function callFilterData(filterValue, filterKey, sortKey, sortOrder) {
  return function (dispatch) {
    let storeData = store.getState().tableInfo;
    const newFilterObj = {
      ...storeData.searchCriteria,
      [filterKey]: filterValue,
    };
    //call dispatch for updating criteria
    dispatch(SetSearchCriteriaSuccess(newFilterObj));

    let data = [...storeData.userInfoList];
    let sortedData = data.sort((a, b) => {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    });

    if (sortOrder === "desc") {
      sortedData = sortedData.reverse();
    }

    sortedData = sortedData.filter((props) =>
      Object.entries(newFilterObj).every(
        ([key, val]) =>
          !val.length ||
          props[key].toString().toLowerCase().includes(val.toLowerCase())
      )
    );

    //call dispatch to update data
    dispatch(setFilteredData(sortedData));
  };
}
