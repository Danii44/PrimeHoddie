import { db } from './firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export const promoteToAdmin = async (uid: string, email: string) => {
  try {
    const userRef = doc(db, 'users', uid);
    
    await setDoc(userRef, {
      email: email,
      role: 'admin',
      name: 'Prime Admin',
      updatedAt: serverTimestamp(),
    }, { merge: true }); 

    console.log("✅ SUCCESS: Your account is now an ADMIN in the database.");
    return true;
  } catch (error) {
    console.error("❌ Error promoting user:", error);
    return false;
  }
};