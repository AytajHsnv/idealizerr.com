import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../../../models/models';
import { AuthService } from '../../../services/auth.service';
import { CoreService } from '../../../services/core.service';
import { Subscription } from 'rxjs';
//======================================================================
@Component({
  selector: 'header-auth',
  templateUrl: './header-auth.component.html',
  styleUrls: ['./header-auth.component.scss']
})//======================================================================


export class HeaderAuthComponent implements OnInit {
//======================================================================

  constructor(
    private AUTH: AuthService,
    private CORE: CoreService
  ) {
    this.subsRoute();
  }

//======================================================================

  ngOnInit() {}

//======================================================================

  ngOnDestroy(): void {
    this.subs_route.unsubscribe();    
  }

//======================================================================

  @Input("user")
  public user:IUser;

//======================================================================

  public user_dropdown:boolean = false;
  public toggleUserDropdown():void {
    this.user_dropdown = !this.user_dropdown;
  }
  public closeUserDropdown(e:any = ""):void {
    this.user_dropdown = false;
  }

//======================================================================

  public logout():void {
    this.AUTH.logoutApi().subscribe(
      RESPONSE => {
        this.AUTH.logoutApp();
      },
      ERROR => {
      }
    );
  }

//======================================================================

  private subs_route:Subscription;
  public route:string;
  private subsRoute():void {
    this.subs_route = this.CORE.route.subscribe( route => {
      this.route = route;
    });
  }

}//======================================================================