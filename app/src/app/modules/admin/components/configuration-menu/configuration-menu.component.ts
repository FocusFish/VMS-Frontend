import { Component } from "@angular/core";

type MenuItem = {
  link: string;
  name: string;
  disabled?: boolean;
};

@Component({
  selector: "app-admin-layout",
  templateUrl: "./configuration-menu.component.html",
  styleUrl: "./configuration-menu.component.scss",
  standalone: false,
})
export class ConfigurationMenuComponent {
  public menu: MenuItem[] = [
    {
      link: "pings",
      name: "System monitor",
    },
    {
      link: "global",
      name: "Global settings",
    },
    {
      link: "reporting",
      name: "Reporting",
      disabled: false,
    },
    {
      link: "assets",
      name: "Assets",
    },
    {
      link: "movement",
      name: "Movement",
    },
    {
      link: "exchange",
      name: "Exchange",
    },
    {
      link: "movement-rules",
      name: "Movement rules",
    },
  ];
}
