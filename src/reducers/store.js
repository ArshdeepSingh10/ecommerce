
import {configureStore} from '@reduxjs/toolkit';

import {cartReducer, product_list} from './State'


const store = configureStore({
   reducer: {
        products: product_list ,
    cart :cartReducer
      }
  })
  

export default store;