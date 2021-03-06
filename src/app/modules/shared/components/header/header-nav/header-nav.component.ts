import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "header-nav",
  templateUrl: "./header-nav.component.html",
  styleUrls: ["./header-nav.component.scss"]
})
export class HeaderNavComponent implements OnInit {
  @Input()
  user;
  constructor() {}

  ngOnInit() {}
}
