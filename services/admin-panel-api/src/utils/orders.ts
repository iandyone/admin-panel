export const getOrderItemsFromProductsIds = (productsIds: number[] = []) =>
  productsIds.reduce((acc, id) => [...acc, { productId: id }], []);
