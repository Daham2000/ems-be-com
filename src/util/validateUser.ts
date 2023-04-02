import { auth } from "firebase-admin";

const validateUserToken = (token: string): number => {
  auth()
    .verifyIdToken(token)
    .then((res) => {
      return 200;
    })
    .catch((error) => {
      return 401;
    });
    return 401;
};

export default validateUserToken;