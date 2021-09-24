import { DocumentData, DocumentReference, QueryDocumentSnapshot } from "@firebase/firestore";
import { User } from "./User";

export interface UsersService {
  post: (user: User) => Promise<string>;
  getByEmail: (email: string) => Promise<{ user: User; userRef: QueryDocumentSnapshot<DocumentData>; } | undefined>;
  addAppointment: (userId: string, userDataUpdated: any, appointmentRef: DocumentReference<DocumentData>) => Promise<void>;
}