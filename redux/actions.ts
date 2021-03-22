//Action Types
export const ADD_ADDRESS = "ADD_ADDRESS";
export const DELETE_ADDRESS = "DELETE_ADDRESS";


//Action Creator
export const addAdress = (address) => ({
  type: ADD_ADDRESS,
  address
});

export const deleteAddress = (address) => ({
  type: DELETE_ADDRESS,
  address
});
