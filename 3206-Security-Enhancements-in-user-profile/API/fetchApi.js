const axios = require('axios');

async function fetchDataFromApi(apiEndpoint, apiToken) {
  try {
    const response = await axios.get(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data.data; // Return the "data" array
    } else {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

async function findUserPassword(apiEndpoint, apiToken, userEmail) {
  try {
    const users = await fetchDataFromApi(apiEndpoint, apiToken);

    // Find the user with the specified email
    const currentUser = users.find(user => user.email === userEmail);

    if (currentUser) {
      // Retrieve the password of the current user
      const userPassword = currentUser.password;
      return userPassword.toString();
    } else {
      throw new Error(`User with email '${userEmail}' not found.`);
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

async function checkAllUserPasswords(apiEndpoint, apiToken) {
  try {
    const users = await fetchDataFromApi(apiEndpoint, apiToken);

    // Check passwords for all users
    const passwords = users.map(user => ({
      email: user.email,
      password: user.password,
    }));

    return passwords;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

module.exports = {
  fetchDataFromApi,
  findUserPassword,
  checkAllUserPasswords,
};
