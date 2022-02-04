import { Component, OnInit, ViewChild } from '@angular/core';
import { bank } from '../bank';
import { BankServiceService } from '../bank-service.service';
import { FormControl, FormGroup} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {

  public bankDetails: bank[] = [];
  public bankDetailsByCity:bank[]=[];
  public cityNames: string[] = [];
  public districtName:string[]=[];
  public uniqueCityNames:any;
  public uniqueDistrictNames:any;
  public bankDetailsByDistrict:bank[]=[];
  public bankDetailsResult:bank[]=[];
  public bankNamesArray:string[]=[];
  public uniqueBankNames:any;
  //cityName:any;
  district:any;
  totalLength:any;
  page:number=1;
  totalLengthSelected:any;
  
  myControl = new FormGroup({
    bankName:new FormControl(),
    cityName: new FormControl(),
    district:new FormControl()
  });
  constructor(private bankService:BankServiceService) { }
  selectCity:any;
  
  selectByDistrict(data:any,bankDetails:bank[]){
    this.bankDetailsByDistrict=bankDetails.filter((x:any)=>x.district ===data);
  }
  ngOnInit(){
   this.myControl.get(this.cityNames)
    this.bankService.getBankDetails()
    .subscribe((data) => {
      this.bankDetails = data
      for(let i=0;i<this.bankDetails.length;i++){
        this.cityNames[i]=this.bankDetails[i].city;
        this.districtName[i]=this.bankDetails[i].district;
        this.bankNamesArray[i]=this.bankDetails[i].bank_name;
       }
       this.totalLength=this.bankDetails.length;
       console.log( this.totalLength);
        this.uniqueCityNames = this.cityNames.filter((c, index) => {
        return this.cityNames.indexOf(c) === index;
    });
       this.uniqueDistrictNames=this.districtName.filter((c, index) => {
        return this.districtName.indexOf(c) === index;
    });
      this.uniqueBankNames=this.bankNamesArray.filter((c, index) => {
        return this.bankNamesArray.indexOf(c) === index;
    });
   // this.bankDetails.paginator=this.paginator;
    //this.resultDetails(this.bankDetails,this.myControl.get("bankName")?.value,this.myControl.get("cityName")?.value,this.myControl.get("district")?.value);
    });
  }
  
  dataSource=this.bankDetails;
  displayedColumns: string[] = ['ifsc', 'bank_id', 'branch', 'address','city','district','state','bank_name'];

  onSubmit(){
    console.log(this.myControl.get("cityName")?.value);
    console.log(this.myControl.get("district")?.value);
    console.log(this.bankDetailsResult);
    this.myControl.get("bankName")?.setValue('');
    this.myControl.get("cityName")?.setValue('');
    this.myControl.get("district")?.setValue('');

  }

  resultDetails(bankDetails:bank[],bank_name?:any,city_name?:any,district_name?:any){
    if(bank_name){
        this.bankDetailsResult=bankDetails.filter((x:any)=>x.bank_name ===bank_name);
        if(city_name){
            this.bankDetailsResult=this.bankDetailsResult.filter((x:any)=>x.city ===city_name);
          if(district_name){
            this.bankDetailsResult=this.bankDetailsResult.filter((x:any)=>x.district ===district_name);}
        }else if(district_name){
          this.bankDetailsResult=this.bankDetailsResult.filter((x:any)=>x.district ===district_name);
        }
    }else if(city_name){
        this.bankDetailsResult=bankDetails.filter((x:any)=>x.city ===city_name);
         if(district_name)
          this.bankDetailsResult=this.bankDetailsResult.filter((x:any)=>x.district ===district_name);
     }else if(district_name){
       this.bankDetailsResult=bankDetails.filter((x:any)=>x.district ===district_name);
       if(bank_name){
        this.bankDetailsResult=this.bankDetailsResult.filter((x:any)=>x.bank_name ===bank_name);}
     }else if(district_name){
     this.bankDetailsResult=bankDetails.filter((x:any)=>x.district ===district_name);}
     this.totalLengthSelected=this.bankDetailsResult.length;
  }

}
