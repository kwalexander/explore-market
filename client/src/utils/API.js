import data from './data'
// route to get logged in user's info (needs the token)
export const getMe = token => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
}

export const createUser = userData => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
}

export const loginUser = userData => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
}

// save product data for a logged in user
export const saveProduct = (productData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  })
}

// remove saved product data for a logged in user
export const deleteProduct = (productID, token) => {
  return fetch(`/api/users/products/${productID}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`
    }
  })
}

// save travel data for a logged in user
export const saveTravel = (travelData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(travelData)
  })
}

// remove saved travel data for a logged in user
export const deleteTravel = (travelID, token) => {
  return fetch(`/api/users/travels/${travelID}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`
    }
  })
}

// make a search to  products api
export const searchProduct = (query) => {
  return data;
  //fetch(`https://www.googleapis.com/products/v1/volumes?q=${query}`)
  //return fetch(`TO-DO`);
}

// make a search to  products api
export const searchTravel = query => {
  return fetch(`https://www.googleapis.com/products/v1/volumes?q=${query}`)
  //return fetch(`TO-DO`);
}
