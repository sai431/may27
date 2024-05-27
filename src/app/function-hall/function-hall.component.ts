import { Component } from '@angular/core';
import { GithubService } from '../github.service';
interface TimeSlot {
  date: string;
  time: string;
  customerName: string;
}
@Component({
  selector: 'app-function-hall',
  templateUrl: './function-hall.component.html',
  styleUrl: './function-hall.component.css'
})
export class FunctionHallComponent {

  formData: any = {
    customerName: '',
  phoneNumber: '',
  ownerName:''

  };

  filteredTimes!: any[];
  currentDate: Date = new Date();
  selectedDate: string = '';
     isAlreadyBooked! :any;

  timeSlots: TimeSlot[] = [];
  timeSlotsnewForDup: any[] = [];
  selectedTimeSlots: { [key: string]: string[] } = {};
  customerName: string = '';
  outputList: any[] = [];
dataofCustomerListondate: any[] =[];
  
filteredDatawithdelete: any[] = [];
  timeSlotsnewForDupAfterDel: any[]=[];
  constructor(private firestore: GithubService) {}
  toggleTimeSlot(date: string, time: string) {
    if (!this.selectedTimeSlots[date]) {
      this.selectedTimeSlots[date] = [];
    }
    const index = this.selectedTimeSlots[date].indexOf(time);
    if (index === -1) {
      this.selectedTimeSlots[date].push(time);
    } else {
      this.selectedTimeSlots[date].splice(index, 1);
    }
  }
async displayCustomerForBooking(){
  this.dataofCustomerListondate= await this.firestore.retrievebookingDataFHAllbydateonly(this.customerName,this.selectedDate);

}
async cancelcustomerbooking(customerName:any){
  
  this.timeSlotsnewForDup= await this.firestore.retrievebookingDataFHAll(this.customerName,this.selectedDate,this.selectedTimeSlots[this.selectedDate]);
  this.filteredDatawithdelete=this.filterDatawithdelete(this.timeSlotsnewForDup,customerName);
  await this.firestore.getShaFilebyNameFordeletefHall('ownerone'+this.selectedDate+'.json');
    this.timeSlotsnewForDupAfterDel.push(this.filteredDatawithdelete);
    await this.firestore.saveBookingDataFunctionHall(this.customerName,this.selectedDate, this.transformData(this.timeSlotsnewForDupAfterDel));
    this.dataofCustomerListondate=await this.firestore.retrievebookingDataFHAll(this.customerName,this.selectedDate,this.selectedTimeSlots[this.selectedDate]);
}
  async bookTimeSlots() {
    if (!this.selectedDate) {
      alert('Please select a date.');
      return;
    }

    if (!this.selectedTimeSlots[this.selectedDate] || this.selectedTimeSlots[this.selectedDate].length === 0) {
      alert('Please select at least one time slot.');
      return;
    }
    const ExistFile= await this.firestore.checkFileExistsFhall('ownerone'+this.selectedDate+'.json');
alert(ExistFile)
    for (const time of this.selectedTimeSlots[this.selectedDate]) {
      if(ExistFile === true){
      this.timeSlotsnewForDup= await this.firestore.retrievebookingDataFHAll(this.customerName,this.selectedDate,this.selectedTimeSlots[this.selectedDate]);
      alert('timeSlotsnewForDup'+JSON.stringify(this.timeSlotsnewForDup))
      //this.filteredTimes = this.filterOutTimeDuplicates(this.timeSlotsnewForDup);
      //alert('filter times'+JSON.stringify(this.filteredTimes))
      this.isAlreadyBooked = this.timeSlotsnewForDup.some(slot => slot.date === this.selectedDate && slot.time ===time)
      }
      else{
      this.isAlreadyBooked = this.timeSlots.some(slot => slot.date === this.selectedDate && slot.time === time);
      }
      if (this.isAlreadyBooked) {
        alert(`The time slot ${time} on ${this.selectedDate} is already booked. Please uncheck it and select another one.`);
        return;
      }
      this.timeSlots.push({ date: this.selectedDate, time: time, customerName: this.customerName });
      console.log(JSON.stringify(this.timeSlots))
      
    }
   
    if(ExistFile === true){
    await this.firestore.getShaFilebyNameFordeletefHall('ownerone'+this.selectedDate+'.json');
    this.timeSlotsnewForDup.push(this.timeSlots);
    alert('after adding dup'+JSON.stringify(this.timeSlotsnewForDup))
   
    await this.firestore.saveBookingDataFunctionHall(this.customerName,this.selectedDate, this.transformData(this.timeSlotsnewForDup));
    this.selectedTimeSlots[this.selectedDate] = [];
    this.customerName = '';
    }
    else{
      await this.firestore.saveBookingDataFunctionHall(this.customerName,this.selectedDate,this.timeSlots);
      this.selectedTimeSlots[this.selectedDate] = [];
      this.customerName = '';
    }
  }

 filterOutTimeDuplicates(data: any[]): string[] {
    const seen = new Set();
    const filteredTimes: string[] = [];

    data.forEach(item => {
      if (!seen.has(item.time)) {
        seen.add(item.time);
        filteredTimes.push(item.time);
      }
    });

    return filteredTimes;
  }

  async register(){
   
    
     await this.firestore.saveRegisterFhallData(this.formData.customerName,this.formData)
      .then(() => {
        console.log('Customer added successfully');
        this.customerName = '';
        
      })
      .catch((error: any) => console.error('Error adding customer:', error));
    
  }
  

  
  filterDatawithdelete(inputData: any[], usernameToRemove: string): any[] {
    

    inputData.forEach(item => {
      if (Array.isArray(item)) {
        item.forEach(subItem => {
          if (subItem.customerName !== usernameToRemove) {
            this.filteredDatawithdelete.push(subItem);
          }
        });
      } else {
        if (item.customerName !== usernameToRemove) {
          this.filteredDatawithdelete.push(item);
        }
      }
    });

    return this.filteredDatawithdelete;
  }
  transformData(inputData: any): any[] {
    const outputList: any[] = [];

    inputData.forEach((item: any) => {
      if (Array.isArray(item)) {
        outputList.push(...item);
      } else {
        outputList.push(item);
      }
    });

    return outputList;
  }

}
