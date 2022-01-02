import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
//======================================================================
@Component({
  selector: 'app-auth-recovery-success',
  templateUrl: './auth-recovery-success.component.html',
  styleUrls: ['./auth-recovery-success.component.scss']
})
//======================================================================


export class AuthRecoverySuccessComponent implements OnInit {
//======================================================================

  constructor(
    private ACTIVATED_ROUTE: ActivatedRoute,
    private AUTH: AuthService
  ) { 
    this.AUTH.auth_page_location.next("recovery_success");
    this._spanshootSuccessType();
  }

//======================================================================

  ngOnInit() {}

//======================================================================

  public success_type:string;
  private _spanshootSuccessType(){
    this.success_type = this.ACTIVATED_ROUTE.snapshot.params.type;
  }

}//======================================================================
