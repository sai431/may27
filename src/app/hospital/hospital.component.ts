import { Component } from '@angular/core';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrl: './hospital.component.css'
})
export class HospitalComponent {
  doctors: any[] = [
    {"date":"2024-05-31","owner":"Sandeep","docter3":"Doctor Anil"},
    {"date":"2024-05-31","owner":"vinod","docter3":"Doctor Basha"},
    {"date":"2024-05-31","owner":"city","docter3":"Doctor Chaithu"}
  ];

  formData: any = {
    doctorName: '',
  doctorstatus: '',
  ownerName:''

  };

  private number: number = 0;
  datalist: any[]=[];

  

 

  async increment() {
    const data= await this.gitservice.retrieveHospData('Sandeep');
    this.number=data.doctorstatus;
    this.formData=data;
    this.formData.doctorstatus=this.number+1;
    await this.gitservice.getShaFilebyNameFordeletehosp('Sandeep.json');
     
    
    
    
   await this.gitservice.saveHospData(this.formData.ownerName,JSON.stringify(this.formData));
  
    
    
    //this.number++;
  }

  decrement(): void {
    this.number--;
  }

  readInput(doctor: any) {
    console.log(`Input for ${doctor.docter3}: ${doctor.inputText}`);
    this.formData.ownerName=doctor.owner;
    this.formData.doctorName=doctor.docter3;
    this.formData.doctorstatus=doctor.inputText;
    this.gitservice.saveHospData(this.formData.ownerName,JSON.stringify(this.formData));
  }

  constructor(private gitservice:GithubService){}

}
