import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion, onSnapshot, collection, addDoc, deleteDoc, query, orderBy, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Test connection to Firestore
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. The client is offline.");
    }
    // Skip logging for other errors, as this is simply a connection test.
  }
}
testConnection();

// Error handling for Firestore
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Initialize user profile in Firestore if it doesn't exist
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        favorites: [],
        clickHistory: [],
        role: user.email === 'zadhaarif0@gmail.com' ? 'admin' : 'user'
      });
    }
    return user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export const logOut = () => signOut(auth);

export const toggleFavorite = async (userId: string, productId: string, isFavorite: boolean) => {
  const userRef = doc(db, 'users', userId);
  const snap = await getDoc(userRef);
  const favorites = snap.data()?.favorites || [];
  
  if (isFavorite) {
    await updateDoc(userRef, {
      favorites: favorites.filter((id: string) => id !== productId)
    });
  } else {
    await updateDoc(userRef, {
      favorites: arrayUnion(productId)
    });
  }
};

export const recordClick = async (userId: string, productId: string, platform: string) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    clickHistory: arrayUnion({
      productId,
      platform,
      timestamp: new Date().toISOString()
    })
  });
};

// Product CRUD
export const addProduct = async (product: any) => {
  try {
    return await addDoc(collection(db, 'products'), {
      ...product,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'products');
  }
};

export const updateProduct = async (productId: string, product: any) => {
  try {
    const productRef = doc(db, 'products', productId);
    return await updateDoc(productRef, product);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `products/${productId}`);
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const productRef = doc(db, 'products', productId);
    return await deleteDoc(productRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `products/${productId}`);
  }
};
