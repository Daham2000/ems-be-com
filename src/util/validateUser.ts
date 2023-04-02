import { auth } from "firebase-admin";

const validateUserToken = (token: string): number => {
  auth()
    .verifyIdToken(token)
    .then((res) => {
      console.log(res);
      return 200;
    })
    .catch((error) => {
      console.log(error);
      
      return 401;
    });
    return 200;
};

export default validateUserToken;