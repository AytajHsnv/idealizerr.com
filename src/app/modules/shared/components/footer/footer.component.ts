import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../services/core.service';
import { Subscription } from 'rxjs';
import { ICoreSettings } from '../../models/models';
//======================================================================
@Component({
  selector: 'website-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})//======================================================================



export class FooterComponent implements OnInit {
//======================================================================

  constructor(
    private CORE: CoreService
  ) { 
    this.subsCoreSettings();
  }

//======================================================================

  ngOnInit() {}

//======================================================================

  ngOnDestroy(): void {
    this.subs_core_settings.unsubscribe();
  }

//======================================================================

  public core_settings:ICoreSettings;
  private subs_core_settings:Subscription
  private subsCoreSettings():void {
    this.subs_core_settings =  this.CORE.settings.subscribe( settings =>{
      this.core_settings = settings;
    })
  }


}//======================================================================
