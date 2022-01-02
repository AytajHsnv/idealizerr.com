import { Component, OnInit } from "@angular/core";
import { IStartup } from "src/app/modules/shared/models/models";
import { CoreService } from "src/app/modules/shared/services/core.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import {Title} from '@angular/platform-browser';
//======================================================================
@Component({
  selector: "app-core-startup-detail",
  templateUrl: "./core-startup-detail.component.html",
  styleUrls: ["./core-startup-detail.component.scss"]
}) //======================================================================
export class CoreStartupDetailComponent {
  //======================================================================

  constructor(private CORE: CoreService, private ROUTE: ActivatedRoute, private title: Title) {}

  _route: Subscription;
  detailId: string;

  //======================================================================

  ngOnInit() {
    this._route = this.ROUTE.params.subscribe(data => {
      this.detailId = data.id;
    });
    this.CORE.getStartupDetail(this.detailId).subscribe(data => {
      this.startup = data.body.startup;
      this.title.setTitle(`Idealizerr - ${this.startup.title}`);
    });
  }
  ngOnDestroy() {
    this._route.unsubscribe();
  }

  //======================================================================

  public startup: IStartup;
} //======================================================================
