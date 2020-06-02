import { auth, db } from "../config";

let newSlot;
let currentSlots = [];

export const createSlot = async user => {
  const currentTime = new Date().toISOString();
  newSlot = (currentTime + user.displayName).replace(/\-/g, '');
  
  await db.doc(`slots/${newSlot}`).set({
      id: newSlot,
      owner: user.displayName
    });
    
  console.log('test test');
};

export const assignSlot = async user => {
  await db.doc(`users/${user.displayName}`)
      .get()
      .then(res => {
        if(res){
          currentSlots = res.data().slots;
          console.log(res.data());
        } else {
          console.log('No such document')
        }
      });

  await db.doc(`users/${user.displayName}`).update({
    slots: [...currentSlots, newSlot]
  });
}

export const selectedSlot = async () => {

}