import { Component, OnInit } from "@angular/core";
import { TrainService } from "src/environments/train.service";

@Component({
  selector: "app-horraire",
  templateUrl: "./horraire.component.html",
})
export class HorraireComponent implements OnInit {
  trajets: any[];
  selectedTrajet: any;
  reservationData: { nombrePlaces: number };
  totalPrice: number;

  constructor(private trainService: TrainService) {}

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

  openReservationModal(trajet: any): void {
    this.selectedTrajet = trajet;
    this.reservationData = { nombrePlaces: trajet.nombrePlaces };
    this.calculateTotalPrice(); // Calculer le prix total lors de l'ouverture du modal
  }
  
  closeReservationModal(): void {
    this.selectedTrajet = null;
  }

  reserve(): void {
    console.log('Réserver', this.reservationData);
  
    this.trainService.createReservation(this.selectedTrajet.id, this.reservationData)
      .subscribe(
        (reservation) => {
          this.selectedTrajet.nombrePlaces -= this.reservationData.nombrePlaces;
          this.closeReservationModal();
        },
        (error) => {
          console.error('Erreur lors de la réservation:', error);
        }
      );
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.selectedTrajet.prixTicket * this.reservationData.nombrePlaces;
  }

  downloadTicket(): void {
    // Informations sur le ticket
    const ticketInfo = `SNCF - Votre ticket \nPrix: ${this.totalPrice} \nTrajet: ${this.selectedTrajet.lieuDepart} - ${this.selectedTrajet.lieuArrivee} \nDate: ${new Date().toLocaleString()}`;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(ticketInfo));
    element.setAttribute('download', 'ticket.txt');
  
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
}