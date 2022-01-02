import { ActivatedRouteSnapshot } from "@angular/router";
import { CanActivate } from "@angular/router";
import { RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {Observable, of} from 'rxjs';
import {AuthService} from '../../shared/services/auth.service';
import {map} from 'rxjs/operators';
@Injectable()
//======================================================================|||||||||||
export class JuryGuard implements CanActivate {
    //======================================================================|||||||||||

    constructor(private AUTH: AuthService, private ROUTER: Router) {}

    //======================================================================|||||||||||

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise((res, rej) => {
            this.AUTH.user.subscribe(user => {
                if (user.user_role !== 'juri') {
                    res(true);
                }
            });
        });
    }
} //======================================================================|||||||||||
