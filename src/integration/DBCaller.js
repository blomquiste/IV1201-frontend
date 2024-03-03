/**
 * Calls backend api to authenticate a user on login. 
 * @param {Object} usernameAndPassword takes argument on the form of: {username: 'username', password:'pw'}
 * @returns a user json object on a succesful authentication, 
 * otherwise returns an int with the http error status.
 */
async function Authenticate(usernameAndPassword){
  const URL = 'login';
  return await callAPI(URL, usernameAndPassword)
}
async function logout(){
  //const URL = 'https://archdes-abbcfaefce39.herokuapp.com/logout'
  const URL = 'http://localhost:8000/logout'
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode:'cors'
    });
    console.log(response)
    if (response.ok){
      console.log("Logged out successful");
    }else{
      console.error('Failed to logout');
    }
  } catch (e) {
    console.error('Error during logout:', e);
  }
}
/**
 * Calls the API to check if account with this email exists and if it is missing username and password.
 * If so, an email will to this email address with a restoration code.
 * @param {String} email User email address as string
 * @returns HTTP response containing {emailSent:true} if the restoration code was sent,
 * 404 response otherwise.
 */
async function restoreAccountByEmail(email){
  const URL = 'restoreAccountByEmail';
  return await callAPI(URL, email);
}

/**
 * Calls the API to set the username and password for the user with this email address if the restoration
 * code is the same as the latest that was sent out.
 * @param {Object} userdata Has username, password, email and resetCode fields.
 * @returns 
 */
async function updateAccountByEmail(userdata){
  const URL = 'updateAccountByEmailCode';
  return await callAPI(URL, userdata);
}

/**
 * This function calls the root api address plus the supplied URL and returns the HTTP response.
 * @param {String} url The API URL that will be called
 * @param {Object} data Will be sent in a POST request to the above address.
 * @returns HTTP response if response status is 200, otherwise returns response status code.
 */
async function callAPI(url, data){
  const URL = 'http://localhost:8000/';
  //const URL = 'https://archdes-abbcfaefce39.herokuapp.com/'
  try{
    const response = await fetch(URL + url, 
      {method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)}
      ,{mode:'cors'},);
    if(response.status !== 200)
      return response.status;
    return await response.json();
  }catch(e) {
    console.log(e);
  }
}

/**
 * Calls backend api to register a new user by making a POST request
 * @param userdata takes the user data as a single object
 * @returns {Promise<boolean>} True if response status is 200 or 201
 */
async function saveRegistrationData(userdata) {
  const URL = 'http://localhost:8000/registration'
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userdata),
      mode:'cors'
    });
    // Check for both 200 and 201 status codes
    if (response.ok) {
      return true;
    }
    else{
      throw new Error('Failed to save registration data');
    }
  } catch (error) {
    console.error('Error saving registration data:', error);
    return false;
  }
}

/**
 * Calls the api function that updates the rows in the table 'person'
 * @param data
 * @returns {Promise<boolean>}
 */
async function saveUpdatedData(data){
  const URL = 'http://localhost:8000/update';
  //const URL = 'https://archdes-abbcfaefce39.herokuapp.com/update'
  try {
    const response = await fetch(URL,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    mode:'cors'
    });
    if (response.status === 201) {
      console.log("Update successful")
      return true;
    }
    if (!response.ok) {
      throw new Error('Failed to update personal information');
    }
  }catch(e){
    console.error(e);
  }
}

/**
 * Calls the api that gets the rows contents from the table 'competences'
 * @returns {Promise<number|any>}
 */
async function fetchTable() {
  const URL = 'http://localhost:8000/fetch';
  //const URL = 'https://archdes-abbcfaefce39.herokuapp.com/fetch'
  try {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    });
    if (response.ok) {
      return await response.json();
    }else{
      console.error('Error:', response.status);
      return null;
    }
  } catch (e) {
    console.error(e);
  }
}

/**
 * Calls the endpoint api that sets the rows contents from the table 'competence_profile'
 * @param competenceData
 * @returns {Promise<number>}
 */
async function setCompetence(competenceData){
  //const URL = 'https://archdes-abbcfaefce39.herokuapp.com/competence';
  const URL = 'http://localhost:8000/setCompetence';
  try {
    const response = await fetch(URL,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(competenceData),
      mode:'cors'
    });
    if (response.ok) {
      console.log("Competence added.")
      return true;
    }
    else {
      return false;
    }
  }catch(e){
    console.error(e);
  }
}
/**
 * Calls the api that sets the rows contents from the table 'availability'
 * @param availabilityData
 * @returns {Promise<void>}
 */
async function setAvailability(availabilityData){
  //const URL = 'https://archdes-abbcfaefce39.herokuapp.com/availability';
  const URL = 'http://localhost:8000/setAvailability';
  try {
    const response = await fetch(URL,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(availabilityData),
      mode:'cors'
    });
    if (response.ok) {
      console.log("Availability added.")
      return true;
    }
    else {
      return false;
    }
  }catch(e){
    console.error(e);
  }
}

/**
 * Calls api to fetch names and status of applicants names from
 * @returns {Promise<number|JSX.Element|any>}
 */
async function fetchApplicants() {
  const URL = 'http://localhost:8000/fetchapplicants';
  //const URL = 'https://archdes-abbcfaefce39.herokuapp.com/fetchapplications'
  try {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    });
    if (!response.status) return <div>Loading</div>
    if (!response.ok) {
      return response.status;
    }
    return await response.json();;
  } catch (e) {
    console.error('Error fetching data', e);
  }
}

async function getCompetences(person_id){
  const URL = `http://localhost:8000/getCompetences/${person_id}`;
  try {
    const response = await fetch(URL,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode:'cors'
    });
    if (response.ok) {
      return await response.json();
    }else{
      console.error('Error:', response.status);
      return null;
    }
  }catch (e) {
    console.error(e)
  }
}
async function getAvailabilities(person_id){
  const URL = `http://localhost:8000/getAvailabilities/${person_id}`;
  try {
    const response = await fetch(URL,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode:'cors'
    });
    if (response.ok) {
      return await response.json();
    }else{
      console.error('Error:', response.status);
      return null;
    }
  }catch (e) {
    console.error(e)
  }
}


export {Authenticate, logout, restoreAccountByEmail, saveRegistrationData,
        updateAccountByEmail, fetchTable, saveUpdatedData, setCompetence,
        setAvailability, fetchApplicants, getCompetences, getAvailabilities}
