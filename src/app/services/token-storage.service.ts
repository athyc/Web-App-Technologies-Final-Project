import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public isLoggedInUser(): boolean {
    return this.getUser()?.roles.includes(Roles.User);
  }

  public isLoggedInAndApprovedHost(): boolean {
    return this.getUser()?.roles.includes(Roles.Host) && this.getUser().hostApproved;
  }
  public isLoggedInHost(): boolean {
    return this.getUser()?.roles.includes(Roles.Host) 
  }
  public isLoggedIn():boolean{
    return this.isLoggedInAdmin() || this.isLoggedInAndApprovedHost() || this.isLoggedInUser() ||this.isLoggedInHost()
  }
  public isLoggedInAdmin(): boolean {
    return this.getUser()?.roles.includes(Roles.Admin);
  }
}

export enum  Roles {
  User = "ROLE_USER",
  Host = "ROLE_HOST",
  Admin = "ROLE_ADMIN",
}
