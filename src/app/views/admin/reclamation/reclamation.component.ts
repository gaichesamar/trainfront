import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ReclamationService } from "src/environments/reclamation.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-recl",
  templateUrl: "./reclamation.component.html",
})
export class ReclamationComponent implements OnInit {
  form: FormGroup;

  constructor(private router: Router, private service: ReclamationService, private fb: FormBuilder) {
    this.form = this.fb.group({
      lieuDepart: ['', Validators.required],
      lieuArrivee: ['', Validators.required],
      heureDepart: ['', Validators.required],
      heureArrivee: ['', Validators.required],
      description: ['', Validators.required]    
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid) {
      const data: any = {
        lieuDepart: this.form.get('lieuDepart').value,
        lieuArrivee: this.form.get('lieuArrivee').value,
        heureDepart: this.form.get('heureDepart').value,
        heureArrivee: this.form.get('heureArrivee').value,
        description: this.form.get('description').value
      };

      this.service.createreclamation(data).subscribe(
        () => {
          console.log('reclamation created successfully');
          Swal.fire({
            icon: 'success',
            title: 'Succès!',
            text: 'Votre réclamation a été envoyée avec succès!'
          }).then(() => {
            this.router.navigate(['/admin/tables']);
          });

        },
        (error) => {
          console.error('Error creating annonce:', error);
        }
      );
    } else {
      console.log('Form is invalid. Please fill in all the required fields.');
    }
  }
}
