import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/user";
import { UserService } from "src/environments/user.service";

import { Observable, Subscriber, observable } from 'rxjs';
import { formatDate } from "@angular/common";


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent  {
  onChange($event: any) {
  throw new Error('Method not implemented.');
  }
  
    username: string = '';
    form: FormGroup;
    data: any;
    users: any[] | undefined;
    title = 'imagetobase64';
    photo: Observable<any>; 
    base64code: any;
    selectedFile : any;
    user;
    storedUsername: string;
    dateNaissance: string;
    userId: number;
    userInfo: User;
    onchange=($event :Event) =>{
      const target =$event.target as HTMLInputElement;
      const file: File =(target.files as FileList)[0];
      this.convertToBase64(file)
    }
    convertToBase64(file: File){
      const observable = new Observable((Subscriber: Subscriber<any>) =>{
        this.readFile(file,Subscriber)
      })
      observable.subscribe((d) => {
        console.log(d)
        this.photo=d
        this.base64code=d
      })
    }
  
  
  
    constructor(private router: Router, private service: UserService) {
     
      this.form = new FormGroup({
        username: new FormControl('', [Validators.required]),
        nom: new FormControl('', [Validators.required]),
        prenom: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        telephone: new FormControl('', [Validators.required]),
        dateNaissance: new FormControl('', [Validators.required]),
        dateSupp: new FormControl('', [Validators.required]),
        photo: new FormControl('', [Validators.required])
  
      });
    }
    onFileChanged(event: any) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.base64code = reader.result as string;
        
        
      };
    }
    
    ngOnInit() {
      this.storedUsername = sessionStorage.getItem('username');
      this.dateNaissance = sessionStorage.getItem('dateNaissance');
      this.userId = Number(localStorage.getItem('userId'));
  
      if (this.storedUsername) {
        this.service.getUser(this.storedUsername).subscribe(
          (user) => {
            this.userInfo = user;
            this.user = user;
          },
          (error) => {
            console.error('Error fetching user data:', error);
          }
        );
      }
      this.all();
  
    }
    all() { 
      this.service.getAllUsers().subscribe(data => {
        this.users = data;
        
      });
    }
    
    onSubmit() {
      const data: User = {
        nom: this.form.value.nom,
        prenom: this.form.value.prenom,
        email: this.form.value.email,
        password: this.form.value.password,
        telephone: this.form.value.telephone,
        dateNaissance: this.form.value.dateNaissance,
        dateInscription: new Date(),
        dateSupp: this.form.value.dateSupp,
        otp: '', // You may want to set a proper value
        photo: this.base64code,
      };
    
      this.service.create(data).subscribe(
        () => {
          console.log('User created successfully');
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    }
    
    deleteUser(userId: number) {
      this.service.delete(userId).subscribe(
        response => {
          console.log('User deleted successfully:', response);
          this.all(); 
  
        },
        error => {
          console.error('Error deleting user:', error);
        }
      );
    }
   
    readFile(file:File, Subscriber: Subscriber<any>) {
      const filereader= new FileReader();
      filereader.readAsDataURL(file)
      filereader.onload = () =>{
        Subscriber.next(filereader.result);
        Subscriber.complete()
      }
      filereader.onerror = () =>{
        Subscriber.error()
        Subscriber.complete()
      }
    }
    formaterDate(date: Date): string {
      const locale = 'ar-AR'; 
      const format = 'dd MMM yyyy';
      return formatDate(date, format, locale);
    }
    onRoleChange(event: any) {
      const selectedRole = event.target.value;
      const roleArray = this.form.get('role') as FormArray;
      roleArray.clear(); 
      roleArray.push(new FormControl(selectedRole));
    }
}  