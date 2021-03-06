import * as constants from "./../commons/constants";
var initState = [];

var findIndex = (products, id) => {
  var result = -1;
  if (result !== -1) {
    products.forEach((product, index) => {
      if (product.id === id) {
        result = index;
      }
    });
  }
  return result;
};

const products = (state = initState, action) => {
  var index = -1;
  var { id, product } = action;
  switch (action.type) {
    case constants.FETCH_PRODUCTS: {
      const { products } = action.payload;
      state = products;
      return [...state];
    }

    case constants.ADD_PRODUCT:
      state.push(action.product);
      return [...state];
    case constants.UPDATE_PRODUCT:
      index = findIndex(state, product.id);
      state[index] = product;
      return [...state];
    case constants.DELETE_PRODUCT:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];

    default:
      return [...state];
  }
};

export default products;
