import { Routes } from "@angular/router";
import {ChargingStationService} from "../services/charging-station.service";


export default [
  {
    path: "",
    providers: [ChargingStationService],
    children: [
      {
        path: "stations",
        title: "Charging Stations",
        loadComponent: () =>
          import("./charging-station-list/charging-station-list.component").then(
            (module) => module.ChargingStationListComponent,
          ),
      },


    ],
  },
] as Routes;
