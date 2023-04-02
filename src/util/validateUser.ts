import { auth } from "firebase-admin";

const validateUserToken = (token: string): number => {
  try {
    auth()
      .verifyIdToken(token);
    return 200;
  } catch (e: any) {
    return 401;
  }
};

export default validateUserToken;