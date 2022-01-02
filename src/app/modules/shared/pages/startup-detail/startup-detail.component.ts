import { Component, OnInit, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { CoreService } from "../../services/core.service";
//======================================================================
@Component({
  selector: "startup-detail",
  templateUrl: "./startup-detail.component.html",
  styleUrls: ["./startup-detail.component.scss"],
}) //======================================================================
export class StartupDetailComponent implements OnInit {
  //======================================================================

  constructor(
    private SANITIZE: DomSanitizer,
    private AUTH: AuthService,
    private ROUTER: Router,
    private CORE: CoreService
  ) {}
  //======================================================================

  @Input() startup;

  video;

  public subscribe(id): void {
    const isLoggedIn = this.AUTH.getUser();

    if (isLoggedIn) {
      this.CORE.followStartUp(id).subscribe((data) => {
        this.startup.followed = data.body.follow;
        // this.followed.emit(data);
      });
    } else {
      this.ROUTER.navigate(["/auth/login"]);
    }
  }

  //======================================================================
  pageCount = null;
  ngOnInit() {
    if (this.startup.video !== '#' && this.startup.video) {
      this.video = this.SANITIZE.bypassSecurityTrustResourceUrl(
        this.startup.video
      );
    } else {
      this.video = null;
    }

  }
  ngAfterViewInit() {
    this.CORE.postPageCount(this.startup.id).subscribe(data => {
      this.CORE.getPageCount(this.startup.id).subscribe(data => {
        this.pageCount = data.body.view_count
      });
    });
  }

  //======================================================================

  public active_section: string = "idea";
  public changeToSection(section: string): void {
    this.active_section = section;
  }
} //======================================================================
