// CART SELECTORS

import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity * cartItem.price,
      0
    )
);

/// USER SELECTORS

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

// DIRECTORY SELECTORS

const selectDirectory = state => state.directory

export const selectDirectorySections = createSelector(
  [selectDirectory],
  directory => directory.sections
)

// SHOP AND COLLECTIONS SELECTORS

const selectShop = state => state.shop

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
)

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  // get back an array from collections object.
  collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam => createSelector(
  [selectCollections],
  collections => collections ? collections[collectionUrlParam] : null
)

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
)

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections
)