import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  // Sign up with email and password
  async signUpEmail(email: string, password: string) {
    return await this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Sign with email and password
  async signInEmail(credentials) {
    // this.firestore
    //   .collection('Owner', (ref) =>
    //     ref.where('email', '==', credentials.email).limit(1)
    //   )
    //   .get()
    //   .subscribe((users) => {
    //     if (users.size > 0) {
    //       alert('This email cannot be used on this account');
    //     } else {
    //     }
    //   });

    return await this.fireAuth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }

  // Reset user password
  async resetPassword(email: string) {
    return await this.fireAuth.sendPasswordResetEmail(email);
  }

  // Logout
  async signOut() {
    return await this.fireAuth.signOut();
  }
}
