import { Component, OnInit } from "@angular/core";
import {
  IPageNavigationSection,
  IAbout
} from "src/app/modules/shared/models/models";
import { CoreService } from "src/app/modules/shared/services/core.service";
import { LoaderService } from "src/app/modules/shared/services/loader.service";
import { TranslateService } from "@ngx-translate/core";
import {Title} from '@angular/platform-browser';
//======================================================================
@Component({
  selector: "core-about-page",
  templateUrl: "./core-about-page.component.html",
  styleUrls: ["./core-about-page.component.scss"]
}) //======================================================================
export class CoreAboutPageComponent implements OnInit {
  //======================================================================

  constructor(
    private CORE: CoreService,
    private LOADER: LoaderService,
    private _: TranslateService,
    private title: Title
  ) {
    this.LOADER.show();
    this.getAbout();
    title.setTitle(`Idealizerr - ${_.instant("home.about")}`);
  }

  //======================================================================

  public youtube_video_id: string;
  public navigation_sections: IPageNavigationSection[] = [];

  //======================================================================

  ngOnInit() {
    this.navigation_sections = [
      { section_id: "ideas", title: this._.instant("home.idea") },
      { section_id: "progress", title: this._.instant("home.develop") },
      { section_id: "result", title: this._.instant("home.result") },
      { section_id: "sponsors", title: this._.instant("home.sponsors") },
      { section_id: "team", title: this._.instant("home.team") },
      { section_id: "news", title: this._.instant("home.news") }
    ];
  }

  //======================================================================

  public about: IAbout;
  public getAbout(): void {
    this.CORE.getAbout().subscribe(
      RESPONSE => {
        this.about = RESPONSE.body;
        this.youtube_video_id = RESPONSE.body.about_us[0].video;
        this.LOADER.hide(600);
      },
      ERROR => {}
    );
  }
} //======================================================================
