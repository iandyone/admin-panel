export const getOrderItemsFromProductsIds = (productsIds: string[] = []) =>
  productsIds.reduce((acc, id) => [...acc, { productId: id }], []);
