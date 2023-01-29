import { Component, OnInit, Inject } from '@angular/core';
import { Sucursal } from 'src/model/sucursal.model';
import { SucursalService } from 'src/services/sucursal.service';
import { TipoSaborService } from 'src/services/tipoSabor.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-sabores',
  templateUrl: './dialog-sabores.component.html',
  styleUrls: ['./dialog-sabores.component.scss']
})
export class DialogSaboresComponent implements OnInit {

  sucursalSelected:any = {} 
  tipoSabores=[]
  constructor(
    private sucursalService: SucursalService,
    private tipoSaborService: TipoSaborService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.tipoSabores = data.tipoSabores
    this.sucursalSelected = this.sucursalService.sucursalSelect;
    
    this.tipoSaborService.getAllConSaboresActivos().then(result => {
      this.tipoSabores = result.data;
    })
    

  }

  ngOnInit(): void {
  }



}
