
//PURPOSE OF FILE: This file helps the REACT talk to the Backend 


//address of the backend server
const API_URL = 'http://localhost:5000/api';


// generic function to make API requests to the backend
// takes 4 things for the request: endpoint (referring to the route), method, body (data being sent), and token
export const apiRequest = async (endpoint, method = 'GET', body = null, token = null) => {
  
  //sends request
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : null,
  });

  //converts response to JSON
  const data = await response.json();

  //if response is not ok, throw an error with the message from the backend or a default message
  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};
