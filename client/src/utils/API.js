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
export async function  searchProduct(query)  {
  //return data;
  var Target_Token="6B433687ADCA40CF867E85CE4A429140" ;
  var queryItem = `https://api.redcircleapi.com/request?api_key=${Target_Token}&search_term=${query}&type=search&rating=five_star&page=1&include_out_of_stock=false`;
 
  const target_search_Results= [];
  console.log(`search product for ${query}`)
  return fetch(queryItem, { method: 'GET' }) //fetching all related area for current location
  .then((response) => response.json()).then((data) => {
        var i =0
       do{
        var target_search_Result={
         productid: (data.search_results[i].tcin),
         product_img: (data.search_results[i].product['main_image']),
         title: (data.search_results[i].product['title']),
         product_Link: (data.search_results[i].product['link']),
         sale_price: (data.search_results[i].offers.primary['symbol']+' '+data.search_results[i].offers.primary['price']),
         product_rating: (data.search_results[i].product['rating'])
       };
        target_search_Results.push(target_search_Result);
         i++;
       }
       while(i<data.search_results.length)
       console.log("API call results ")
      console.log( target_search_Results)
       return target_search_Results;
    })
  .catch((error) => {
      console.log('Error:', error);
      return error;
    });
}

// make a search to  products api
export const searchTravel = query => {
  return fetch(`https://www.googleapis.com/products/v1/volumes?q=${query}`)
  //return fetch(`TO-DO`);
}
