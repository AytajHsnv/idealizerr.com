import { Component, OnInit, Input } from '@angular/core';
import { IAbout } from 'src/app/modules/shared/models/models';
//======================================================================
@Component({
  selector: 'core-about-main-section',
  templateUrl: './core-about-main-section.component.html',
  styleUrls: ['./core-about-main-section.component.scss']
})//======================================================================


export class CoreAboutMainSectionComponent implements OnInit {
//======================================================================

  constructor() { }

  @Input("about")
  public about:IAbout;

//======================================================================

  ngOnInit() {}

}//======================================================================