import { Component, OnInit } from "@angular/core";
import { TrainService } from "src/environments/train.service";

@Component({
  selector: "app-card-page-visits",
  templateUrl: "./card-page-visits.component.html",
})
export class CardPageVisitsComponent implements OnInit {
  formatDateTime(arg0: any) {
  throw new Error('Method not implemented.');
  }
      trajets: any[];
      reservation: any;
    
      constructor(private trainService: TrainService) { } 
      ngOnInit(): void {
        this.getAllTrajets();
      }
    
      getAllTrajets(): void {
        this.trainService.getAllTrajets().subscribe(
          (data) => {
            this.trajets = data;
          },
          (error) => {
            console.error('Error fetching trajets:', error);
          }
        );
      }
    }  