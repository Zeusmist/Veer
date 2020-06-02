import { auth, db } from "../config";
// const user = auth.currentUser;

export const getUserSlots = async (user) => {
  let userSlots;
  await db.doc(`users/${user.displayName}`)
    .get()
    .then(res => {
      if(res){
        userSlots = res.data().slots;
      } else {
        console.log('No such document')
      }
    });
  return userSlots;
}