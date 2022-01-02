import { Injectable, NgZone } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { variables } from 'src/environments/variables';
import { IUser, ISignup, ILogin } from '../models/models';
import { CookieService } from './cookie.service';
import { UrlsService } from './urls.service';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
//======================================================================



export class AuthService {
//======================================================================

  constructor(
    private COOKIE: CookieService,
    private HTTP: HttpClient,
    private URLS: UrlsService,
    private NG_ZONE: NgZone,
    private ROUTER: Router
  ) {}

//======================================================================

  private _header = new HttpHeaders({'Content-Type':  'application/json; charset=utf-8'});

//======================================================================

  public user = new BehaviorSubject<IUser>({} as any);
  public auth_page_location = new BehaviorSubject<string>("");
  private _user:IUser = null;
  public user_role:string = "user";

//======================================================================

  public login(BODY: ILogin):Observable<any> {
    return this.HTTP.post<ILogin>(
      this.URLS.getApiUrls().Login, 
      BODY, 
      { observe: 'response', headers: this._header, }
    );
  }

//======================================================================

  public getUserInfo():Observable<any> {
    return this.HTTP.get<any>(
      this.URLS.getApiUrls().User, 
      { observe: 'response', headers: this._header, }
    );
  }

//======================================================================

  public recoveryEmail(email:string):Observable<any> {
    return this.HTTP.get<any>(
      this.URLS.getApiUrls("email=" + email).RecoveryEmail, 
      { observe: 'response', headers: this._header, }
    );
  }

//======================================================================

  public logoutApp():void {
    this._removeToken();
    this._removeUser();
    this.NG_ZONE.run(() => this.ROUTER.navigate(['/'])).then();
  }

//======================================================================

  public logoutApi():Observable<any> {
    return this.HTTP.post<any>(
      this.URLS.getApiUrls().Logout, 
      { observe: 'response', headers: this._header, }
    );
  }

//======================================================================

  public setUser(user:IUser):void{
    this.user.next(user);
    this._user = user;
  }

//======================================================================

  private _removeUser():void{
    this.user.next(null);
    this._user = null;
  }

//======================================================================

  public getUser():IUser {
    return this._user;
  }

//======================================================================

  public setToken(token:string):void {
    this.COOKIE.createCookie(variables.cookie.user_token,token);
  }

//======================================================================

  public getToken():string {
    return this.COOKIE.accessCookie(variables.cookie.user_token);
  }

//======================================================================

  public hasToken():boolean {
    if(this.COOKIE.accessCookie(variables.cookie.user_token)){
      return true;
    }
    else{
      return false;
    }
  }

//======================================================================

  private _removeToken():void {
    this.COOKIE.deleteCookie(variables.cookie.user_token);
  }

//======================================================================

  public signup(BODY: ISignup):Observable<any> {
    return this.HTTP.post<ISignup>(
      this.URLS.getApiUrls().Signup, 
      BODY, 
      { observe: 'response', headers: this._header, }
    );
  }

//======================================================================

  public recoveryPassword(password:string, key:string):Observable<any> {
    return this.HTTP.post<any>(
      this.URLS.getApiUrls().RecoveryPassword, 
      {password:password, key:key}, 
      { observe: 'response', headers: this._header, }
    );
  }

//======================================================================

  public getAuthSettings():Observable<any> {
    return this.HTTP.get<any>(
      this.URLS.getApiUrls().AuthSettings, 
      { observe: 'response', headers: this._header, }
    );
  }

//======================================================================

  public upoadUserPhoto(formdata:FormData):Observable<any> {
    return this.HTTP.post<any>(
      this.URLS.getApiUrls().UserPhoto, 
      formdata,
      { observe: 'response' }
    );
  }

//======================================================================

  public updateUserInfo(BODY):Observable<any> {
    return this.HTTP.post<any>(
      this.URLS.getApiUrls().UserInfo, 
      BODY,
      { observe: 'response', headers: this._header, }
    );
  }

//======================================================================

  public updateUserPassword(BODY):Observable<any> {
    return this.HTTP.post<any>(
      this.URLS.getApiUrls().UserPassword, 
      BODY,
      { observe: 'response', headers: this._header, }
    );
  }

//======================================================================

  public updateUserMobileNumber(number):Observable<any> {
    return this.HTTP.get<any>(
      this.URLS.getApiUrls(number).UserMobileNumber, 
      { observe: 'response', headers: this._header, }
    );
  }


}//======================================================================

