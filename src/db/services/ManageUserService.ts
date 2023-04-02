import { auth } from "firebase-admin";

const addAdminUser = (email: string, orgId: string, pasword: string) => {
    const user = {
        email: email,
        emailVerified: false,
        password: pasword,
        disabled: false,
        customClaims: {
            isAdmin: true,
            orgId
        }
    };
    auth().createUser(user).then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        auth().setCustomUserClaims(userRecord.uid, { admin: true, orgId })
        .then(() => {
          // The new custom claims will propagate to the user's ID token the
          // next time a new one is issued.
        });
        console.log('Successfully created new user:', userRecord.uid);
    }).catch((error) => {
        console.log('Error creating new user:', error);
    });
};

export { addAdminUser };