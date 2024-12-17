import { Component, OnInit, Input } from "@angular/core";
import { TrainService } from "src/environments/train.service";

@Component({
  selector: "app-card-table",
  templateUrl: "./card-table.component.html",
})
export class CardTableComponent implements OnInit {
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

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


