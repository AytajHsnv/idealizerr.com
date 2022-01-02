import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/modules/shared/services/core.service';
import { ITeamMember } from 'src/app/modules/shared/models/models';
//======================================================================
@Component({
  selector: 'core-about-team-section',
  templateUrl: './core-about-team-section.component.html',
  styleUrls: ['./core-about-team-section.component.scss']
})//======================================================================


export class CoreAboutTeamSectionComponent implements OnInit {
//======================================================================

  constructor(
    public CORE:CoreService
  ) { 
    this._getTeam_API();
  }

//======================================================================

  public team:ITeamMember[];

//======================================================================

  ngOnInit() {}

//======================================================================

  private _getTeam_API():void {
    this.CORE.getTeam().subscribe(
      RESPONSE => {
        this.team = RESPONSE.body;
      },
      ERROR => {}
    );
  }

}//======================================================================