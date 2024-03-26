
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, query, where, documentId, doc } from "firebase/firestore/lite"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAb28jzkIPcW5DcdEokMtDXeH8NXwwJLfo",
  authDomain: "vanlife-b0630.firebaseapp.com",
  projectId: "vanlife-b0630",
  storageBucket: "vanlife-b0630.appspot.com",
  messagingSenderId: "385893974939",
  appId: "1:385893974939:web:9428db0a04c9cac1ec173e"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const vansCollectionRef = collection(db, "vans")
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();



// Render Vans

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

// Render selected Van

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

// Render Hosted Vans

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}



export async function getHostVan(id) {
    const q = query(
        vansCollectionRef,
        where(documentId(), "==", id),
        where("hostId", "==", "123")
    )
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans[0]
}

// Create Account function

export async function authCreateAccountWithEmail(userEmail, userPassword) {
    const email = userEmail
    const password = userPassword

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        return res;
    } catch (error) {
        throw {
            message: error.message,
            code: error.code
        }
    }
}



// Sign in Function

export async function userLogin(userEmail, userPassword){

    const email = userEmail
    const password = userPassword

 try {   
    const res = await signInWithEmailAndPassword(auth, email, password)
    return res

 } catch(error){

    throw {
        message: error.message,
        code: error.code
    }
 }
}

// Sign in with google function

export async function signInWithGoogle(){


 try {
    const result = await signInWithPopup(auth, provider);
    
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  } catch (error) {
    throw {
        message: error.message,
        code: error.code
    }
  }

}


// Log out function

export async function userLogout(){
    try {
        const res = await signOut(auth)
        return res
    } catch (error) {
        throw {
            message: error.message,
            code: error.code
        }
    }
}
   