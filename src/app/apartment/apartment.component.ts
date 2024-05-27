import { Component } from '@angular/core';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrl: './apartment.component.css'
})
export class ApartmentComponent {
  

  currentDate!: string;
  currentTime!: string;



  formData: any = {
    customerName: '',
  phoneNumber: '',
  ownerName:''

  };
  customerName: any;
  phoneNumber: any;
  apttask!: any;
  dataofApartList: any[]=[];
  constructor(private gitservice: GithubService) { }

  async register(){
   
    if (!this.customerName && !this.phoneNumber) {
     await this.gitservice.saveRegisterAptData(this.formData.customerName,this.formData)
      .then(() => {
        console.log('Customer added successfully');
        this.customerName = '';
        this.phoneNumber = '';
      })
      .catch((error: any) => console.error('Error adding customer:', error));
    }
  }
  

  async adduserData(): Promise<void> {
    try{
      const now = new Date();
      this.currentDate = now.toISOString().slice(0, 10);
      this.currentTime = now.toLocaleTimeString();
      
      const ExistFile=  await  this.gitservice.checkFileApartExists('userName.json');
      alert('Existing File'+ ExistFile)
      if(ExistFile === true){
         
    this.dataofApartList.push(this.apttask);
     
    
    let flattenedArray = this.dataofApartList.flat().filter(item => item !== "");

  await this.gitservice.saveApartmentData('userName',JSON.stringify(flattenedArray));
   
      }
      else{
 const data=await  this.gitservice.retrieveApartmentData('userName');
   this.dataofApartList.push( data);
     
    this.dataofApartList.push(this.apttask);
     
     await this.gitservice.getShaFilebyNameFordeleteApt('userName.json');
     let flattenedArray = this.dataofApartList.flat().filter(item => item !== "");

   await this.gitservice.saveApartmentData('userName',JSON.stringify(flattenedArray));
      }
    }
    catch (error) {
      console.error('Error executing operations:', error);
      throw error;
    }  
  
}

}
