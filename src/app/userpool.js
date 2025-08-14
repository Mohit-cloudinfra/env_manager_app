import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData ={
    UserPoolId:"eu-north-1_hFm0Yn4yf", 
    ClientId:"7e8g6819e5nbsqcu2q91kcuhei" 
}

export default new CognitoUserPool(poolData);