import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth,
    )
  { }

  // Sign up with email and password
  async signUpEmail(email: string, password: string) {
      return await this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Sign with email and password
  async signInEmail(credentials) {
      return await this.fireAuth.signInWithEmailAndPassword(credentials.email, credentials.password);
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
