import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { UrlsService } from "./urls.service";
@Injectable({ providedIn: "root" })
//======================================================================
export class DashboardService {
  //======================================================================

  constructor(private HTTP: HttpClient, private URLS: UrlsService) {}

  //======================================================================

  private _header = new HttpHeaders({
    "Content-Type": "application/json; charset=utf-8"
  });

  //======================================================================

  public title = new BehaviorSubject<string>("");
} //======================================================================
