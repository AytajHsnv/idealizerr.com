import { Component, OnInit, Input } from '@angular/core';
//======================================================================
@Component({
  selector: 'core-competition-rules-section',
  templateUrl: './core-competition-rules-section.component.html',
  styleUrls: ['./core-competition-rules-section.component.scss']
})//======================================================================


export class CoreCompetitionRulesSectionComponent implements OnInit {
//======================================================================

  constructor() { }

//======================================================================

  @Input("rules")
  public rules:string;

//======================================================================

  ngOnInit() {}

}//======================================================================