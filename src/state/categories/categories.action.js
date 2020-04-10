export const CATEGORIES_LIST = 'CATEGORIES_LIST'
export const categoriesRequest = payload => ({
    type: CATEGORIES_LIST,
    payload
  });

  export const CATEGORIE_SELECTED = 'CATEGORIE_SELECTED'
  export const categorieSelect = payload =>({
    type: CATEGORIE_SELECTED,
    payload
  })

  export const CATEGORIE_PRODUCTS = 'CATEGORIE_PRODUCTS'
  export const categorieProducts = payload =>({
    type: CATEGORIE_PRODUCTS,
    payload
  })

  export const PRODUCT_SELECTED = 'PRODUCT_SELECTED'
  export const productRequest = payload =>({
    type: PRODUCT_SELECTED,
    payload
  })

  export const PREMIUM_SELECTED = 'PREMIUM_SELECTED'
  export const premiumSelected = payload =>({
    type: PREMIUM_SELECTED,
    payload
  })
