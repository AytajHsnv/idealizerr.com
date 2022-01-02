import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
//======================================================================



export class CookieService {
//======================================================================

  constructor() { }

//======================================================================

  public createCookie(cookieName,cookieValue,minutesToExpire = 0){
    var date = new Date();
    date.setTime(date.getTime()+(minutesToExpire*60*1000));
    if(minutesToExpire == 0){
      document.cookie = cookieName + "=" + cookieValue + "; path=/";
    }
    else{
      document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toUTCString()+ "; path=/";
    }
  }

//======================================================================

  public accessCookie(cookieName){
    var name = cookieName + "=";
    var allCookieArray = document.cookie.split(';');
    for(var i=0; i<allCookieArray.length; i++)
    {
      var temp = allCookieArray[i].trim();
      if (temp.indexOf(name)==0)
      return temp.substring(name.length,temp.length);
     }
    return "";
  }

//======================================================================

  public checkCookie(){
    var user = this.accessCookie("testCookie");
    if (user!=""){}
    else
    {
      var user = prompt("Please enter your name");
      if (user!="" && user!=null)
      {
      this.createCookie("testCookie", user);
      }
    }
  }

//======================================================================

  public deleteCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

}//======================================================================