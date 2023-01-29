import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-local',
  templateUrl: './card-local.component.html',
  styleUrls: ['./card-local.component.scss']
})
export class CardLocalComponent implements OnInit {

  @Input() sucursal:any={}

  constructor() { }

  ngOnInit(): void {
  }

}
