import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/modules/shared/models/models';
//======================================================================
@Component({
  selector: 'dashboard-settings-profile-email-form',
  templateUrl: './profile-email-form.component.html',
  styleUrls: ['./profile-email-form.component.scss']
})//======================================================================


export class ProfileEmailFormComponent implements OnInit {
//======================================================================

  constructor(
    private FORM: FormBuilder
  ) { 
    this.buildForm();
  }

//======================================================================

  ngOnInit() {}

//======================================================================

  @Input("user")
  public user:IUser;

//======================================================================

  ngOnChanges(changes: SimpleChanges): void {
    if(this.user){
      this.form.controls["email"].setValue(this.user.email);
    }
  }

//======================================================================

  public form: FormGroup;
  private buildForm():void {
    this.form = this.FORM.group({
      email: [null, [ Validators.required,Validators.email ]]
    });
  }

//======================================================================

  public submitForm():void {
    
  }

}//======================================================================