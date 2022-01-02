import { Component, OnInit } from "@angular/core";
import FlipClock from "flipclock";
import { CoreService } from "src/app/modules/shared/services/core.service";
import { Competition, IUser } from "src/app/modules/shared/models/models";
import { Subscription } from "rxjs";
import { objectIsNull } from "src/app/modules/shared/services/utils.service";
import { AuthService } from "src/app/modules/shared/services/auth.service";
//======================================================================
@Component({
  selector: "core-main-competition-section",
  templateUrl: "./core-main-competition-section.component.html",
  styleUrls: ["./core-main-competition-section.component.scss"]
}) //======================================================================
export class CoreMainCompetitionSectionComponent implements OnInit {
  //======================================================================

  constructor(private CORE: CoreService, private AUTH: AuthService) {}

  //======================================================================
  public _user: IUser = null;
  private _userSubscription;
  public isCountDownGoing: boolean;
  ngOnInit() {
    this.subsCompetition();
    this._userSubscription = this.AUTH.user.subscribe(user => {
      this._user = user;
    });
  }

  //======================================================================

  ngAfterViewInit(): void {}

  //======================================================================

  ngOnDestroy(): void {
    this.subs_competition.unsubscribe();
    this._userSubscription.unsubscribe();
  }

  //======================================================================

  private competition_clock: any;
  private initCompetitionClock(date: Date): void {
    this.competition.amount_of_prize.amount_of_prize;
    const el = document.querySelector(".competition-clock");
    this.competition_clock = new FlipClock(el, date, {
      face: "DayCounter",
      countdown: true
    });

    const checktime = () => {
      const currentDate = new Date();
      const diff = date.getTime() / 1000 - currentDate.getTime() / 1000;

      if (diff <= -1) {
        this.competition_clock.stop();
        this.isCountDownGoing = true;
        return;
      }

      setTimeout(() => {
        checktime();
      }, 1000);
    };
    setTimeout(() => {
      checktime();
    }, 1000);
  }

  //======================================================================

  public competition: Competition;
  private subs_competition: Subscription;
  private subsCompetition(): void {
    this.subs_competition = this.CORE.competition.subscribe(competition => {
      if (!objectIsNull(competition)) {
        this.competition = competition;
        setTimeout(() => {
          this.initCompetitionClock(
            new Date(this.competition.timer.end_date * 1000)
          );
        }, 100);
      }
    });
  }
} //======================================================================
