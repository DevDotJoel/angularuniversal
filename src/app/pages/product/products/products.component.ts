import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/Event';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  events:Event []=[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(environment.apiUrl+"api/events").subscribe((result:any)=>{
      this.events=result;
    })
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

}
