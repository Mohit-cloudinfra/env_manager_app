import AWS from 'aws-sdk';
import axios from 'axios';

class Api {

  constructor(successCallBack, failureCallBack) {
    this.successCallBack = successCallBack;
    this.failureCallBack = failureCallBack;
  }

  // POST API method
  postAPI = (requestData, path) => {
    try {
      const endpoint = process.env.AWS_ENDPOINT;
      const region = process.env.AWS_REGION;
      
      // Validate environment variables
      if (!endpoint || !region) {
        throw new Error("AWS endpoint or region is not defined");
      }
  
      // Create a new AWS HttpRequest
      const request = new AWS.HttpRequest(endpoint, region);
      request.method = 'POST';
      request.path = path;
      request.headers = {
        host: request.endpoint.host,
      };
      request.body = JSON.stringify(requestData);
  
      // Using the default AWS credentials provider chain for credentials
      const credentials = AWS.config.credentials || new AWS.Credentials({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,   
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
      });
  
      // Sign the request with AWS Signature Version 4
      const signer = new AWS.Signers.V4(request, 'execute-api');
      signer.addAuthorization(credentials, new Date());
      const headers = request.headers;
      delete headers.host;  // Remove the host header as it's already included in the AWS signature
  
      // Make the API call using Axios with the signed headers
      return axios({
        url: endpoint + request.path,
        headers: { ...headers, 'Content-Type': 'application/json' },
        data: JSON.stringify(requestData),
        method: 'POST',
      })
      .then((response) => {
        console.log('API response:', response);
        if (this.successCallBack) this.successCallBack(response); 
        return response;  
      })
      .catch((error) => {
        console.error('Error in POST API:', error);
        if (this.failureCallBack) this.failureCallBack(error); 
        throw error;  
      });
    } catch (error) {
      console.error('Error in POST API request:', error);
      if (this.failureCallBack) this.failureCallBack(error); 
      throw error;  
    }
  }
  

  // GET API method
  getAPI = async (endPoint) => {
    try {
      AWS.config.update({
        region: process.env.AWS_REGION, 
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
      });

      // Create an Axios instance with AWS Signature Version 4 interceptor
      const axiosWithAuth = axios.create();
      axiosWithAuth.interceptors.request.use(async (config) => {
        const endpoint = endPoint;
        const region = process.env.AWS_REGION;

        // Create an AWS HttpRequest object
        const request = new AWS.HttpRequest(endpoint, region);
        request.method = 'GET';
        request.headers = {
          host: request.endpoint.host,
        };

        // Sign the request using AWS Signature Version 4
        const signer = new AWS.Signers.V4(request, 'execute-api');
        signer.addAuthorization(AWS.config.credentials, new Date());
        const headers = request.headers;
        delete headers.host;

        // Set AWS headers in the Axios request
        config.headers = {
          ...config.headers,
          ...headers,
        };

        return config;
      });

      // Fetch data using Axios with AWS headers
      const response = await axiosWithAuth.get(endPoint);
      if (this.successCallBack) this.successCallBack(response); 
      return response;
    } catch (error) {
      console.error('Error in GET API:', error);
      if (this.failureCallBack) this.failureCallBack(error); 
      return error;  
    }
  }
}

export default Api;