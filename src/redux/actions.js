export const fetchAll = () => ({
  type: "FETCH_ALL",
});

export const fetchAllSuccess = (data) => ({
  type: "FETCH_ALL_SUCCESS",
  payload: data,
});

export const fetchAllFailure = (errors) => ({
  type: "FETCH_ALL_FAILURE",
  payload: errors,
});

export const setActive = (item) => ({
  type: "SET_ACTIVE",
  payload: item,
});
