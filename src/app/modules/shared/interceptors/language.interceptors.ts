//======================================================================
import { Observable }      from "rxjs/internal/Observable";
import { HttpEvent }       from "@angular/common/http";
import { HttpHandler }     from "@angular/common/http";
import { HttpInterceptor } from "@angular/common/http";
import { HttpRequest }     from "@angular/common/http";
import { Injectable }      from "@angular/core";
import { variables }       from 'src/environments/variables';
@Injectable()
//======================================================================
export class LanguageInterceptor implements HttpInterceptor {
//======================================================================

  constructor() {}

//======================================================================

  //GET CURRENT LANG FROM LOCAL STORAGE
  public setAcceptLanguage(lang: string) {
    lang = localStorage.getItem(variables.local_storage.language) || lang;
    return lang; 
  }
  
//======================================================================
  
  intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: { "Accept-Language": "" + this.setAcceptLanguage("az") + "" }
    });
    return next.handle(request);
  }

}//======================================================================

