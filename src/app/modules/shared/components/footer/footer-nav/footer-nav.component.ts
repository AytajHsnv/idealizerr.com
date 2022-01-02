import { Component, OnInit } from "@angular/core";

@Component({
  selector: "footer-nav",
  templateUrl: "./footer-nav.component.html",
  styleUrls: ["./footer-nav.component.scss"],
})
export class FooterNavComponent implements OnInit {
  constructor() {}

  public categories = [
    {
      name: "",
      routes: [
        {
          name: "Competition",
          route: "competition",
        },
        {
          name: "News",
          route: "news",
        },
        {
          name: "Terms",
          route: "terms",
        },
        {
          name: "How it works",
          route: "how-it-works",
        },
        {
          name: "About",
          route: "about",
        },
      ],
    },
  ];

  ngOnInit() {}
}
