import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { IAuthSettings, IAuthSetting } from 'src/app/modules/shared/models/models';
//======================================================================
@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})//======================================================================


export class AuthLayoutComponent implements OnInit {

  constructor(
    private AUTH: AuthService
  ) { 
    this.getAuthSettings();
  }

//======================================================================

  ngOnInit() {}

//======================================================================

  ngOnDestroy(): void {
    this.subs_auth_page_location ? this.subs_auth_page_location.unsubscribe() : "" ;
  }

//======================================================================


  private auth_settings:IAuthSettings;
  public current_auth_setting:IAuthSetting;
  private getAuthSettings():void {
    this.AUTH.getAuthSettings().subscribe(
      RESPONSE => {
        this.auth_settings = RESPONSE.body;
        this.subsAuthPageLocation();
      },
      ERROR => {}
    );
  }
  
//======================================================================

  public auth_page_location:string;
  private subs_auth_page_location:Subscription
  private subsAuthPageLocation():void {
    this.subs_auth_page_location = this.AUTH.auth_page_location.subscribe(location => {
      this.auth_page_location = location;
      for (const key in this.auth_settings) {
        if(key == this.auth_page_location){
          this.current_auth_setting = this.auth_settings[key];
        }
      }
    })
  }

}//======================================================================