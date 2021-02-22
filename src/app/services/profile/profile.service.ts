import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


private _name: string;
private _email: string;
private _phone: string;
private _address: string;
private _age: number;
private _gender: string;

get name() {
  return this._name;
}

set name(name: string) {
  this._name = name;
}

get email() {
  return this._email;
}

set email(email: string) {
  this._email = email;
}

get phone() {
  return this._phone;
}

set phone(phone: string) {
  this._phone = phone;
}


get address() {
  return this._address;
}

set address(address: string) {
  this._address = address;
}

get gender() {
  return this._gender;
}

set gender(gender: string) {
  this._gender = gender;
}
get age() {
  return this._age;
}

set age(age: number) {
  this._age = age;
}
}