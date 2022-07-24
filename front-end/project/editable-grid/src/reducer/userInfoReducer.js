import { headers } from "../data/headers";

const initialState = {
  userInfoList: [],
  searchCriteria: headers.reduce((r) => r, {}),
  filteredData: [],
  sortKey: "last_name",
  sortOrder: "ascn",
};

function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case "LOAD_USER_INFO_SUCCESS":
      return {
        ...state,
        userInfoList: action.users,
        filteredData: action.users,
      };
    case "LOAD_DATA_ON_SORTING":
      return {
        ...state,
        userInfoList: action.users,
      };
    case "SET_FILTERED_DATA":
      return {
        ...state,
        filteredData: action.users,
      };
    case "SET_SEARCH_FILTERS_SUCCESS":
      return {
        ...state,
        searchCriteria: action.searchCriteria,
      };
    case "SET_SORT_KEY_ORDER":
      return {
        ...state,
        sortKey: action.payload.sortKey,
        sortOrder: action.payload.sortOrder,
      };
    case "SET_UPDATED_DATA":
      console.log(action.payload);
      return {
        ...state,
        filteredData: state.filteredData.map((data, i) =>
          data.id === action.payload.id
            ? { ...data, [action.payload.columnKey]: action.payload.newData }
            : data
        ),
        userInfoList: state.userInfoList.map((data, i) =>
          data.id === action.payload.id
            ? { ...data, [action.payload.columnKey]: action.payload.newData }
            : data
        ),
      };
    default:
      return state;
  }
}

export default userInfoReducer;
