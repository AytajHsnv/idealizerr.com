import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investors',
  templateUrl: './investors.component.html',
  styleUrls: ['./investors.component.scss']
})
export class InvestorsComponent implements OnInit {

  constructor(private _: TranslateService, private title: Title, private AUTH: AuthService, private ROUTER: Router) { }

  ngOnInit() {
    this.title.setTitle(`Idealizerr - ${this._.instant('home.investors')}`);
  }
  public subscribe(): void {
    const isLoggedIn = this.AUTH.getUser();

    if (isLoggedIn) {
      this.ROUTER.navigate(["/dashboard/new/startup"]);
    } else {
      this.ROUTER.navigate(["/auth/login"]);
    }
  }

}
