import { Component, OnInit } from '@angular/core';
import { IJury } from 'src/app/modules/shared/models/models';
import { CoreService } from 'src/app/modules/shared/services/core.service';
//======================================================================
@Component({
  selector: 'core-competition-jury-section',
  templateUrl: './core-competition-jury-section.component.html',
  styleUrls: ['./core-competition-jury-section.component.scss']
})//======================================================================


export class CoreCompetitionJurySectionComponent implements OnInit {
//======================================================================

  constructor(
    public CORE: CoreService
  ) { 
    this.getJury();
  }

//======================================================================

  public jury:IJury[];

//======================================================================

  ngOnInit() {}

//======================================================================

  private getJury():void {
    this.CORE.getJury().subscribe(
      RESPONSE => {
        this.jury = RESPONSE.body;
      },
      ERROR => {}
    );
  }

}//======================================================================