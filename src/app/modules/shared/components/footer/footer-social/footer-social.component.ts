import { Component, OnInit, Input } from '@angular/core';
import { ICoreSettings } from '../../../models/models';
//======================================================================
@Component({
  selector: 'footer-social',
  templateUrl: './footer-social.component.html',
  styleUrls: ['./footer-social.component.scss']
})//======================================================================


export class FooterSocialComponent implements OnInit {
//======================================================================

  constructor() { }

//======================================================================

  @Input("settings")
  public settings:ICoreSettings;

//======================================================================

  ngOnInit() {}

}//======================================================================
