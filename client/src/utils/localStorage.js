
//storage for Travel
export const getSavedTravelIds = () => {
  const savedTravelIds = localStorage.getItem('saved_travels')
    ? JSON.parse(localStorage.getItem('saved_travels'))
    : [];

  return savedTravelIds;
};

export const saveTravelIds = (travelIDArr) => {
  if (travelIDArr.length) {
    localStorage.setItem('saved_travels', JSON.stringify(travelIDArr));
  } else {
    localStorage.removeItem('saved_travels');
  }
};

export const removeTravelId = (travelID) => {
  const savedTravelIds = localStorage.getItem('saved_travels')
    ? JSON.parse(localStorage.getItem('saved_travels'))
    : null;

  if (!savedTravelIds) {
    return false;
  }

  const updatedSavedTravelIds = savedTravelIds?.filter((savedTravelId) => savedTravelId !== travelID);
  localStorage.setItem('saved_travels', JSON.stringify(updatedSavedTravelIds));

  return true;
};

//storage for products
export const getSavedProductIds = () => {
  const savedProductIds = localStorage.getItem('saved_products')
    ? JSON.parse(localStorage.getItem('saved_products'))
    : [];

  return savedProductIds;
};

export const saveProductIds = (productIDArr) => {
  if (productIDArr.length) {
    localStorage.setItem('saved_products', JSON.stringify(productIDArr));
  } else {
    localStorage.removeItem('saved_products');
  }
};

export const removeProductId = (productID) => {
  const savedProductIds = localStorage.getItem('saved_products')
    ? JSON.parse(localStorage.getItem('saved_products'))
    : null;

  if (!savedProductIds) {
    return false;
  }

  const updatedSavedProductIds = savedProductIds?.filter((savedproductID) => savedproductID !== productID);
  localStorage.setItem('saved_products', JSON.stringify(updatedSavedProductIds));

  return true;
};

