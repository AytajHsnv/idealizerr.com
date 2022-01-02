import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IStartup } from "../../models/models";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { CoreService } from "../../services/core.service";
//======================================================================
@Component({
  selector: "startup-card-home",
  templateUrl: "./startup-card-home.component.html",
  styleUrls: ["./startup-card-home.component.scss"]
}) //======================================================================
export class StartupCardHomeComponent implements OnInit {
  //======================================================================

  //======================================================================

  @Input("startup")
  public startup: IStartup;

  @Output()
  public followed: EventEmitter<any> = new EventEmitter<any>();

  redirection;

  //======================================================================

  ngOnInit() {
    this.redirection = ["/startup", this.startup.id];
  }

  constructor(
    private AUTH: AuthService,
    private ROUTER: Router,
    private CORE: CoreService
  ) {}

  public subscribe(id): void {
    const isLoggedIn = this.AUTH.getUser();

    if (isLoggedIn) {
      this.CORE.followStartUp(id).subscribe(data => {
        this.startup.followed = data.body.follow;
        this.followed.emit(data);
      });
    } else {
      this.ROUTER.navigate(["/auth/login"]);
    }
  }
} //======================================================================
