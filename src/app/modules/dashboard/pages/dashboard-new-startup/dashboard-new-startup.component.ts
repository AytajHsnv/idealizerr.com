import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/modules/shared/services/dashboard.service";
import { NotifyService } from "src/app/modules/shared/services/notify.service";
import { Subscription } from "rxjs";
import { INewStartup, IStartup } from "src/app/modules/shared/models/models";
import { CoreService } from "src/app/modules/shared/services/core.service";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Title } from "@angular/platform-browser";
//======================================================================
@Component({
  selector: "app-dashboard-new-startup",
  templateUrl: "./dashboard-new-startup.component.html",
  styleUrls: ["./dashboard-new-startup.component.scss"],
}) //======================================================================
export class DashboardNewStartupComponent implements OnInit {
  //======================================================================

  constructor(
    private DASHBOARD: DashboardService,
    private NOTIFY: NotifyService,
    private CORE: CoreService,
    private ROUTER: ActivatedRoute,
    private _: TranslateService,
    private title: Title
  ) {
    this.subsStartup();
  }

  //======================================================================

  private subs_startup: Subscription;
  public startup: INewStartup;
  public startup_show: IStartup;
  private subsStartup(): void {
    this.subs_startup = this.CORE.startup.subscribe((startup) => {
      this.startup = startup;
      this.startup_show = {
        id: this.startup.id || "",
        title: this.startup.title,
        image:
          this.startup.logo ||
          "https://www.idealizerr.com/InnoProject/images/startups/logo/avatar-startup.jpg",
        cover_image:
          this.startup.image ||
          "https://www.idealizerr.com/InnoProject/images/startups/images/cover-avatar.jpg",
        description: this.startup.description,
        country: {
          code: this.startup.country,
          name: "",
        },
        jury_vote: 0,
        startup_vote: 0,
        rank: 0,
      };
    });
  }
  startupNameChange($event) {
    this.startup_show[$event.key] = $event.value;
  }

  //======================================================================

  public sections = {
    new: true,
    form: {
      active: true,
    },
    video: {
      active: false,
    },
    files: {
      active: false,
    },
    program: {
      active: false,
    },
    confirmation: {
      active: false,
    },
  };

  startupDetail: any;
  category: string;
  joined;
  canjoincompetition;

  //======================================================================
  accepted: boolean;

  joinedCompetition(_event) {
    this.canjoincompetition = false;
    this.startupDetail.startup.canjoincompetition = false;
    this.changeSection("form", !this.sections.form.active && this.sections.new);
  }

  ngOnInit() {
    this.ROUTER.params.subscribe((data) => {
      this.sections.new = !("id" in data);
      if (!this.sections.new) {
        this.CORE.getDashboardStartupDetail(data.id).subscribe((data) => {
          this.DASHBOARD.title.next(this._.instant("dashboard.look-startup"));
          this.title.setTitle(`Idealizerr - ${data.body.startup.title}`);
          this.startup_show.image = data.body.startup.logo;
          this.startup_show.cover_image = data.body.startup.image;
          this.startup_show.title = data.body.startup.title;
          this.startup_show.description = data.body.startup.description;
          this.startup_show.admin_check = data.body.startup.startup_check;
          this.startup_show.category = data.body.startup.category;
          this.category = data.body.startup.category;
          this.joined = data.body.startup.joined;
          this.canjoincompetition = data.body.startup.canjoincompetition;
          this.startupDetail = data.body;
          this.accepted = data.body.startup.video_confirmation === 1;
          if (
            this.startupDetail.startup.startup_check === 2 ||
            this.startupDetail.startup.startup_check === 0
          ) {
            this.sections.new = true;
            // this.startup_show.image = "https://www.onsideball.com/InnoProject/images/startups/logo/avatar-startup.jpg";
            // this.startup_show.cover_image = 'https://www.onsideball.com/InnoProject/images/startups/images/cover-avatar.jpg';
          } else {
            if (!this.accepted) {
              this.changeSection("video", false);
            } else if (this.canjoincompetition && this.accepted) {
              this.changeSection("confirmation", false);
            }
          }
        });
      } else {
        this.DASHBOARD.title.next(this._.instant("dashboard.new-startup"));
        this.title.setTitle(
          `Idealizerr - ${this._.instant("dashboard.new-startup")}`
        );
      }
    });
  }

  //======================================================================

  public changeSection(name: string, isDisabled: boolean): void {
    if (this.sections.new && name != "form") {
      this.NOTIFY.setNotification({
        status: "warning",
        text: this._.instant("dashboard.register-validation"),
      });
    } else {
      for (let key in this.sections) {
        if (
          typeof this.sections[key] === "object" &&
          "active" in this.sections[key]
        ) {
          this.sections[key].active = false;
        }
      }
      this.sections[name].active = true;
    }
  }

  //======================================================================
} //======================================================================
