import React from 'react';

async function connectToServer(username) {
    const apiUrl = 'https://w8giil48z7.execute-api.eu-west-3.amazonaws.com/staging/lamdba'; // Replace with your API Gateway URL
    console.log("request se")
    const payload = {
      action: 'launch',
      username: username,
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('There was an error connecting to the server:', error);
    }
  }

  export default connectToServer;
