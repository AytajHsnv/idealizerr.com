import { Component, OnInit } from "@angular/core";
import { CoreService } from "src/app/modules/shared/services/core.service";
import {
  ISingleElementCoverSlider,
  IStartup,
} from "src/app/modules/shared/models/models";
import { TranslateService } from "@ngx-translate/core";
import { Title } from "@angular/platform-browser";
import { AuthService } from "../../../shared/services/auth.service";
//======================================================================
@Component({
  selector: "app-core-startups-page",
  templateUrl: "./core-startups-page.component.html",
  styleUrls: ["./core-startups-page.component.scss"],
}) //======================================================================
export class CoreStartupsPageComponent implements OnInit {
  //======================================================================

  constructor(
    private CORE: CoreService,
    private _: TranslateService,
    private title: Title,
    private user: AuthService
  ) {
    this._getStartupsSlider_API();
    this._getStartups_API();
    title.setTitle(`Idealizerr - ${_.instant("home.startups")}`);
  }
  //======================================================================

  public slider_items: ISingleElementCoverSlider[];
  public startups: IStartup[] = [];

  //======================================================================

  ngOnInit() {}

  //======================================================================

  private _getStartupsSlider_API(): void {
    this.CORE.getStartupsSlider().subscribe(
      (RESPONSE) => {
        this.slider_items = RESPONSE.body;
      },
      (ERROR) => {}
    );
  }

  //======================================================================
  private _getStartups_API(): void {
    // this.CORE.getStartups().subscribe(
    //   RESPONSE => {
    //     if (!this.preloadedFilter) {
    //     this.startups = RESPONSE.body;
    //     }
    //   },
    //   ERROR => {}
    // );
  }

  //======================================================================

  public loadMoreStartup(): void {}
  preloadedFilter;

  onFilter($event: any) {
    let filter = {
      ...$event,
    };
    if (filter.sectors) {
      if (filter.sectors.length === 0) {
        delete filter.sectors;
      } else {
        filter.sectors = filter.sectors.toString();
      }
    }
    if (filter.category) {
      if (filter.category.length === 0) {
        delete filter.category;
      } else {
        filter.category = filter.category.toString();
      }
    }
    this.CORE.filterStartups(filter).subscribe((data) => {
      this.preloadedFilter = true;
      this.startups = data.body;
    });
  }
} //======================================================================
