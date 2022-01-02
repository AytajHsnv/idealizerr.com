import { ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable()
//======================================================================|||||||||||

export class NonAuthGuard implements CanActivate {
//======================================================================|||||||||||

    constructor (
        private AUTH: AuthService,
        private ROUTER: Router,
        private NG_ZONE: NgZone,
    ) {}

//======================================================================|||||||||||

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        if (!(this.AUTH.getToken())) {
            return true;
        }
        // this.ROUTER.navigate(['/']);
        this.NG_ZONE.run(() => this.ROUTER.navigate(['/'])).then();
        return false;
    }

}//======================================================================|||||||||||