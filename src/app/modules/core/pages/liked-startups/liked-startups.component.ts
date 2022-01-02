import { Component, OnInit } from "@angular/core";
import { CoreService } from "src/app/modules/shared/services/core.service";
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: "app-liked-startups",
  templateUrl: "./liked-startups.component.html",
  styleUrls: ["./liked-startups.component.scss"]
})
export class LikedStartupsComponent implements OnInit {
  constructor(private CORE: CoreService, private title: Title, private _: TranslateService) {}
  startups: any;

  ngOnInit() {
    this.title.setTitle(`Idealizerr - ${this._.instant('home.following-startups')}`);
    this.getStartups();
  }
  getStartups() {
    this.CORE.getLikedStartups().subscribe(data => {
      this.startups = data.body;
    });
  }
}
