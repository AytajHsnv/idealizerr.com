import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IUser } from "../../models/models";
import { objectIsNull } from "../../services/utils.service";
import { AuthService } from "../../services/auth.service";
import { Router, NavigationEnd } from "@angular/router";
declare var $: any;
//======================================================================
@Component({
  selector: "website-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
}) //======================================================================
export class HeaderComponent implements OnInit {
  //======================================================================

  constructor(private AUTH: AuthService, private router: Router) {
    this.subsUser();
    router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.mobileMenu = false;
      }
    });
  }
  mobileMenu = false;

  toggleMenu(event) {

    if ($(event.target).closest(".toggle-btn").length === 0) {
      this.mobileMenu = false;
    }
  }
  openMenu() {
    this.mobileMenu = !this.mobileMenu;
  }

  //======================================================================

  ngOnInit() {}

  //======================================================================

  ngOnDestroy(): void {
    this.subs_user.unsubscribe();
  }

  //======================================================================

  private subs_user: Subscription;
  public user: IUser;
  private subsUser(): void {
    this.subs_user = this.AUTH.user.subscribe((user) => {
      if (!objectIsNull(user)) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
} //======================================================================
