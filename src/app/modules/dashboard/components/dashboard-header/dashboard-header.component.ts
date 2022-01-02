import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/modules/shared/services/dashboard.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { IUser } from 'src/app/modules/shared/models/models';
import { objectIsNull } from 'src/app/modules/shared/services/utils.service';
//======================================================================
@Component({
  selector: 'dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})//======================================================================


export class DashboardHeaderComponent implements OnInit {
//======================================================================

  constructor(
    private DASHBOARD: DashboardService,
    private AUTH: AuthService
  ) { 
    this.subsTitle();
    this.subsUser();
  }

//======================================================================

  ngOnInit() {}

//======================================================================

  ngOnDestroy(): void {
    this.subs_title.unsubscribe();
    this.subs_user.unsubscribe();
  }

//======================================================================

  private subs_title:Subscription;
  public title:string;
  private subsTitle():void {
    this.subs_title = this.DASHBOARD.title.subscribe( title => {
      this.title = title;
    });
  }

//======================================================================

  private subs_user:Subscription;
  public user:IUser;
  private subsUser():void {
    this.subs_user = this.AUTH.user.subscribe( user => {
      if(!objectIsNull(user)){
        this.user = user;
      }
      else{
        this.user = null
      }
    });
  }

}//======================================================================
