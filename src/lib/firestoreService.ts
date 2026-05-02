import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { db, auth } from './firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const orderService = {
  async createOrder(orderData: any) {
    try {
      return await addDoc(collection(db, 'orders'), {
        ...orderData,
        status: 'pending',
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'orders');
    }
  },

  async getOrders() {
    try {
      const q = query(collection(db, 'orders'), orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'orders');
    }
  },

  async updateOrderStatus(orderId: string, status: string) {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `orders/${orderId}`);
    }
  }
};

export const siteService = {
  async getContent() {
    try {
      const docRef = doc(db, 'siteContent', 'main');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      }
      return null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'siteContent/main');
    }
  },

  async updateContent(content: any) {
    try {
      const docRef = doc(db, 'siteContent', 'main');
      await setDoc(docRef, content, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'siteContent/main');
    }
  }
};

export const productService = {
  async getProducts() {
    try {
      const snapshot = await getDocs(collection(db, 'products'));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
       handleFirestoreError(error, OperationType.LIST, 'products');
    }
  },
  async addProduct(product: any) {
    try {
      await addDoc(collection(db, 'products'), product);
    } catch (error) {
       handleFirestoreError(error, OperationType.WRITE, 'products');
    }
  },
  async deleteProduct(id: string) {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `products/${id}`);
    }
  }
};
