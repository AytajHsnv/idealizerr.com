import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IStartup } from "../../models/models";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { CoreService } from "../../services/core.service";
//======================================================================
@Component({
  selector: "startup-card",
  templateUrl: "./startup-card.component.html",
  styleUrls: ["./startup-card.component.scss"]
}) //======================================================================
export class StartupCardComponent implements OnInit {
  //======================================================================

  //======================================================================

  @Input("startup")
  public startup: IStartup;

  @Input("class")
  public class: string;

  @Output()
  public followed: EventEmitter<any> = new EventEmitter<any>();

  redirection;

  //======================================================================

  ngOnInit() {
    this.redirection = ["/dashboard/new/startup", this.startup.id];
  }

  constructor(
    private AUTH: AuthService,
    private ROUTER: Router,
    private CORE: CoreService
  ) {}
} //======================================================================
