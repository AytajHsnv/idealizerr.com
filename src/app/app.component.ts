import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { scrollToTop } from "./modules/shared/services/utils.service";
import { AuthService } from "./modules/shared/services/auth.service";
import { CoreService } from "./modules/shared/services/core.service";
import { LoaderService } from "./modules/shared/services/loader.service";
//======================================================================
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
}) //======================================================================
export class AppComponent {
  //======================================================================

  constructor(
    private ROUTER: Router,
    private AUTH: AuthService,
    private CORE: CoreService,
    private LOADER: LoaderService
  ) {
    this.LOADER.show();
    this._rootChange();
    this.getCoreSettings();
    this.getCompetition();
    this.getAllCountries();
    if (this.AUTH.hasToken()) {
      this._getUser();
    }
  }

  //======================================================================

  private _rootChange(): void {
    this.ROUTER.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        scrollToTop();
      }
    });
  }

  //======================================================================

  private _getUser(): void {
    this.AUTH.getUserInfo().subscribe(
      RESPONSE => {
        this.AUTH.setUser(RESPONSE.body);
      },
      ERROR => {
        this.AUTH.logoutApp();
      }
    );
  }

  //======================================================================

  private getCoreSettings(): void {
    this.CORE.getCoreSettings().subscribe(
      RESPONSE => {
        this.CORE.settings.next(RESPONSE.body);
      },
      ERROR => {}
    );
  }

  //======================================================================

  private getCompetition(): void {
    this.CORE.getCompetition().subscribe(
      RESPONSE => {
        this.CORE.competition.next(RESPONSE.body);
        this.LOADER.hide(500);
      },
      ERROR => {}
    );
  }
  private getAllCountries(): void {
    this.CORE.getAllCountries().subscribe(
      RESPONSE => {
        this.CORE.countries.next(RESPONSE.body);
        this.LOADER.hide(500);
      },
      ERROR => {}
    );
  }
} //======================================================================
