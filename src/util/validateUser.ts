import { auth } from "firebase-admin";

const validateUserToken = async (token: string): Promise<number> => {
  try {
    await auth()
      .verifyIdToken(token);
    return 200;
  } catch (e: any) {
    return 401;
  }

};

export default validateUserToken;