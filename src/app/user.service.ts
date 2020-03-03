import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  serverUrl: String = 'http://localhost:3000/users';

  signUp(email){
    return this.http.post(`${this.serverUrl}/signup`, email);
  }

  referralSignUp(email, uniqueId){
    return this.http.post(`${this.serverUrl}/share/${uniqueId}`, email);
  }

  signIn(email){
    return this.http.get(`${this.serverUrl}/details?email=${email}`);
  }

  profile(email){
    return this.http.get(`${this.serverUrl}/details?email=${email}`);
  }

}
