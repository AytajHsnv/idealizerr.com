import { Component, OnInit } from "@angular/core";
import {
  IPageNavigationSection,
  IPlan
} from "src/app/modules/shared/models/models";
import { CoreService } from "src/app/modules/shared/services/core.service";
import { Subscription } from "rxjs";
import { objectIsNull } from "src/app/modules/shared/services/utils.service";
import { LoaderService } from "src/app/modules/shared/services/loader.service";
import { TranslateService } from "@ngx-translate/core";
import {Title} from '@angular/platform-browser';
//======================================================================
@Component({
  selector: "app-core-competition-page",
  templateUrl: "./core-competition-page.component.html",
  styleUrls: ["./core-competition-page.component.scss"]
}) //======================================================================
export class CoreCompetitionPageComponent implements OnInit {
  //======================================================================

  constructor(
    private CORE: CoreService,
    private LOADER: LoaderService,
    private _: TranslateService,
    private title: Title
  ) {
    this.LOADER.show();
    this.subsCompetition();
  }

  //======================================================================

  public youtube_video_id: string = "6c7_TpPUpL0";
  public navigation_sections: IPageNavigationSection[] = [
    { section_id: "about", title: this._.instant("home.information") },
    { section_id: "rules", title: this._.instant("home.partterm") },
    { section_id: "plans", title: this._.instant("home.actionplan") },
    { section_id: "jury", title: this._.instant("home.jury") }
    // { section_id:"participants", title:"Iştirakçılar"},
  ];

  //======================================================================

  ngOnInit() {
    this.title.setTitle(`Idealizerr - ${this._.instant('home.competition')}`);
  }

  //======================================================================

  ngOnDestroy(): void {
    this.subs_competition.unsubscribe();
  }

  //======================================================================

  public cover_image: string;
  public about: string;
  public rules: string;
  public plans: IPlan[];
  private subs_competition: Subscription;
  private subsCompetition(): void {
    this.subs_competition = this.CORE.competition.subscribe(competition => {
      if (!objectIsNull(competition)) {
        this.cover_image = competition.konkurs[0].konkurs_image;
        this.about = competition.konkurs[0].konkurs_description;
        this.rules = competition.konkurs[0].konkurs_terms_of_participation;
        this.plans = competition.action_plans;
        this.LOADER.hide(500);
      }
    });
  }
} //======================================================================
