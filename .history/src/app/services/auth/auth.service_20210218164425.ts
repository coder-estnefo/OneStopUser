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
  async signInEmail({email, password}) {
      return await this.fireAuth.signInWithEmailAndPassword(email, password);
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
