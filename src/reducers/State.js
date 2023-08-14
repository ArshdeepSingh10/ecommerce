const initialState = {
  products: []
}


 console.log(initialState);
 const product_list = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_PRODUCTS_SUCCESS":
        return {...state, products: action.payload};
      case "FETCH_PRODUCTS_FAILURE":
        // Handle failure state, e.g., show an error message
        return state;
      default:
        return state;
    }
  };
  const initialStateCart = {
    items: [] ,
    cartExpiration :0
  };
  
  const cartReducer = (state = initialStateCart, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingItemIndex >= 0) {
        // If the product is already in the cart, increase the quantity
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        // Save the updated cart data to session storage
        sessionStorage.setItem('cartItems', JSON.stringify(updatedItems));

        return { ...state, items: updatedItems };
      } else {
        const newItems = [...state.items, { ...action.payload, quantity: action.payload.quantity }];

        // Save the updated cart data to session storage
         sessionStorage.setItem('cartItems', JSON.stringify(newItems));

        // Set the expiration time to 1 hour (3600 seconds) from the current time
        const cartExpiration = Date.now() + 3600 * 1000;

        return { ...state, items: newItems, cartExpiration };
      }
      case "REMOVE_FROM_CART":
        const cartdata = sessionStorage.getItem('cartItems');
        const cart = JSON.parse(cartdata);
      
        // Filter the items array in the cart to remove the item with the specified ID
        const updatedItems = cart.filter(item => item._id !== action.payload);
      
        // Save the updated cart data to session storage
        sessionStorage.setItem('cartItems', JSON.stringify(updatedItems));
      
        return { ...state, items: updatedItems };
      
      default:
        return state;
      
  }
};

export  {product_list, cartReducer};

