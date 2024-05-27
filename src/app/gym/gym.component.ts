import { Component } from '@angular/core';
import { GithubService } from '../github.service';
interface Machine {
  booked: boolean;
  name: any;
  ownerName: any;
}

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrl: './gym.component.css'
})
export class GymComponent {
  mobileNumber!:any;
  customerName!:any;
  phoneNumber!: string;

///
machines: Machine[] = [];
  currentDate!: string;
  currentTime!: string;
  originalArray: any[] = [];
  uniqueArray!: any[];
  isBooked: boolean = false;
  machineNames: string[] = []; // Example list of machine names
  newMachineName: string = '';
  gymtask:any ='';
  dataofMachineList:any[]=[];
  dataofNewMachineList:any[]=[];
  originalMachineData:any[]=[];
  gymBookingdata:any[]=[];
  gymBookingdataNelist:any[]=[];

  





  formData: any = {
    customerName: '',
  phoneNumber: '',
  ownerName:''

  };
  constructor(private gitservice: GithubService) { }
  async register(){
   
    if (!this.customerName && !this.phoneNumber) {
     await this.gitservice.saveRegisterGymData(this.formData.customerName,this.formData)
      .then(() => {
        console.log('Customer added successfully');
        this.customerName = '';
        this.phoneNumber = '';
      })
      .catch((error: any) => console.error('Error adding customer:', error));
    }
  }
  

  async addMachine(newMachineName: any): Promise<void> {
    try{
  const ExistFile=  await  this.gitservice.checkFileExists(this.formData.ownerName);
  console.log('ExistFile'+ExistFile)
  if(ExistFile === false){
  
    this.dataofMachineList.push(newMachineName);
    
    let flattenedArray = this.dataofMachineList.flat().filter(item => item !== "");
    await this.gitservice.saveGymMachineData(this.formData.ownerName,JSON.stringify(flattenedArray));
  }
  else{
      
 const data=await  this.gitservice.retrieveGymMachineData(this.formData.ownerName);
   this.dataofMachineList.push( data);
     
    this.dataofMachineList.push(newMachineName);
    this.uniqueArray = this.dataofMachineList.filter((value, index, self) => self.indexOf(value) === index);;
    console.log('unique '+JSON.stringify(this.uniqueArray))
     await this.gitservice.getShaFilebyNameFordelete(this.formData.ownerName+'.json');
     let flattenedArray = this.dataofMachineList.flat().filter(item => item !== "");

   await this.gitservice.saveGymMachineData(this.formData.ownerName,JSON.stringify(flattenedArray));
  }
      }
    
    catch (error) {
      console.error('Error executing operations:', error);
      throw error;
    }
  }

  
  async displayMachinesForBooking() : Promise<void>{
    this.dataofNewMachineList=await  this.gitservice.retrieveGymMachineData(this.formData.ownerName);
   console.log(this.dataofNewMachineList);
   
 }
 
 async toggleBookingStatus(machine: Machine) {
  
  this.gymBookingdata.push({
    name: machine,
    booked: true,
    ownerName: 'owner1'
  });
  const ExistFile=  await  this.gitservice.checkFileExists(this.formData.ownerName+'.json');
  alert('Existing File'+ ExistFile)
  if(ExistFile === false){
   
    await this.gitservice.saveGymBookingData(this.formData.ownerName,JSON.stringify(this.gymBookingdata))
  }
  else{
  this.gymBookingdataNelist=await  this.gitservice.retrieveGymMachineData(this.formData.ownerName);
  this.gymBookingdata.push(this.gymBookingdataNelist);
  await this.gitservice.getShaFilebyNameFordelete(this.formData.ownerName+'.json');
  await this.gitservice.saveGymBookingData('ownerName',JSON.stringify(this.gymBookingdata))
  }
    }
  
    async adduserData(): Promise<void> {
      try{
        const now = new Date();
        this.currentDate = now.toISOString().slice(0, 10);
        this.currentTime = now.toLocaleTimeString();
        console.log(this.currentDate +":"+this.currentTime)
        const ExistFile=  await  this.gitservice.checkFileExists('userName.json');
        alert('Existing File'+ ExistFile)
        if(ExistFile === false){
           
      this.dataofMachineList.push(this.gymtask);
       
      
      let flattenedArray = this.dataofMachineList.flat().filter(item => item !== "");
  
    await this.gitservice.saveGymMachineData('userName',JSON.stringify(flattenedArray));
     
        }
        else{
   const data=await  this.gitservice.retrieveGymMachineData("userName");
     this.dataofMachineList.push( data);
       
      this.dataofMachineList.push(this.gymtask);
       
       await this.gitservice.getShaFilebyNameFordelete('userName.json');
       let flattenedArray = this.dataofMachineList.flat().filter(item => item !== "");
  
     await this.gitservice.saveGymMachineData('userName',JSON.stringify(flattenedArray));
        }
      }
      catch (error) {
        console.error('Error executing operations:', error);
        throw error;
      }  
    
}
}
