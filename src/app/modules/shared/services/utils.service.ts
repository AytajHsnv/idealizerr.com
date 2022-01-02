import { Injectable } from '@angular/core';
declare var $: any;
@Injectable({ providedIn: 'root' })
//======================================================================



export class UrlsService {
//======================================================================

  constructor() { }

}//======================================================================

//SCROLL TOP
//======================================================================||||||||||||||||||
export const  scrollToTop = (to = 0) => {
    $("html, body").animate({ scrollTop: to + "px" }, 500);
    $(".scrollable").animate({ scrollTop: to + "px" }, 500);
    setTimeout(() => {
    }, 600);
}
//======================================================================||||||||||||||||||
  
//GENERATE RANDOM STRING
//======================================================================||||||||||||||||||
export const generateRandomString = (length:number) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
//======================================================================||||||||||||||||||


//CHECK OBJECT NULLABLE
//======================================================================
export const objectIsNull = (obj:any) =>{
  if(obj === null){
    return true;
  }
  if(typeof obj == "undefined"){
    return true;
  }
  return (Object.entries(obj).length === 0 && obj.constructor === Object);
}
//======================================================================||||||||||||||||||
