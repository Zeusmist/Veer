import { auth, db } from "../config";

export const loginUser = async (email, password) => {
  await auth.signInWithEmailAndPassword(email, password).catch((error) => {
    alert(error.code + error.message);
  });
  const user = auth.currentUser;
}

export const registerUser = async (username, email, password) => {
  const userExists = await validateUser(username);
  if (!userExists){
    let error = false;
    await auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error.code + error.message);
        error = true;
      });

    if(!error){
      const user = auth.currentUser;
      await user.updateProfile({
        displayName: username
      });
      await db.collection('users').doc(username).set({
        id: user.uid,
        email: user.email,
        username: username,
        slots: []
      });
    } 
    return true;
  } else {
    return false;
  }
};

const validateUser = async username => {
  const allUserNames = [];
  await db.collection("users").get().then(querySnapshot => {
    querySnapshot.forEach(doc => {
        allUserNames.push(doc.id);
    });
  });
  console.log(allUserNames);
  return allUserNames.includes(username);
};