import { HttpEvent } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { HttpInterceptor } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from '../services/auth.service';
@Injectable()
//======================================================================



export class AuthInterceptor implements HttpInterceptor {
//======================================================================

  constructor(private AUTH: AuthService) {}

//======================================================================

  intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.AUTH.getToken();
    if (currentUser) {
      request = request.clone({
        setHeaders: { Authorization: "Bearer " + currentUser + "" }
      });
    }
    return next.handle(request);
  }

}//======================================================================

