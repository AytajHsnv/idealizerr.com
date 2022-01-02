import { Component, OnInit, Input } from '@angular/core';
//======================================================================
@Component({
  selector: 'core-competition-about-section',
  templateUrl: './core-competition-about-section.component.html',
  styleUrls: ['./core-competition-about-section.component.scss']
})//======================================================================


export class CoreCompetitionAboutSectionComponent implements OnInit {
//======================================================================

  constructor() { }

//======================================================================

  @Input("about")
  public about:string;

//======================================================================

  ngOnInit() {}

}//======================================================================