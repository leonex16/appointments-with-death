import { collection, query, where, getDocs, addDoc, doc, updateDoc, arrayUnion, DocumentReference, DocumentData } from "@firebase/firestore";

import { firestoreDB } from "../shared/firestoreDB";

import { User } from "../models/User";
import { UsersService } from "../models/UsersService";

const userRef = collection(firestoreDB, '/users');

const getByEmail = async (email: string) => {
  const q = query(userRef, where('email', '==', email));
  const querySnap = await getDocs(q);

  if (querySnap.size === 0) return undefined;
  if (querySnap.size >= 2) console.error('RETURN TOO MANY USERS');

  if (querySnap.size === 1) {
    const user = { ...querySnap.docs[ 0 ].data(), id: querySnap.docs[ 0 ].id } as User;
    const userRef = querySnap.docs[ 0 ];

    return { user, userRef };
  };
}

const post = async (user: User) => {
  const userAdded = await addDoc(userRef, user);

  return userAdded.id;
}

const addAppointment = async (userId: string, appointmentRef: DocumentReference<DocumentData>) => {
  const userRef = doc(firestoreDB, 'users', userId);
  await updateDoc(userRef, { appointments: arrayUnion(appointmentRef) });
};

export const usersService: UsersService = { post, getByEmail, addAppointment };

