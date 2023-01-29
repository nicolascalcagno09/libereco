import { Component, OnInit } from '@angular/core';
import { LocalStorageProvider } from 'app/shared/providers/local-storage/local-storage.provider';
import { SucursalService } from 'app/shared/services/sucursal.service';
import { Turno } from 'app/shared/model/turno.model';
import { TurnoService } from 'app/shared/services/turno.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { Sucursal } from 'app/shared/model/sucursal.model';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {

  inicioManiana: string;
  finManiana: string;
  inicioTarde: string;
  finTarde: string;
  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  idSucursal;
  sucursalSelect: Sucursal = {} as Sucursal;
  idTurnoEdit: number
  turnos: Array<any> = [];
  turnoSelect: Turno = {} as Turno;
  turnoForm: FormGroup;
  isCorrido: string;
  
  validation_messages = {
    'abierto': [
      { type: 'required', message: 'Valor requerido' }
    ],
    'horarioDeCorrido': [
      { type: 'required', message: 'Valor requerido' }
    ],
    'inicioManiana': [
      { type: 'required', message: 'Valor requerido' }
    ],
    'finManiana': [
      { type: 'required', message: 'Valor requerido' }
    ],
  };

  estadoAbierto: Array<any> = [
    { nombre: "Si", valor: true },
    { nombre: "No", valor: false },
  ];

  horarioCorrido: Array<any> = [
    { nombre: "Si", valor: true },
    { nombre: "No", valor: false },
  ];
  
  constructor(private localStorage: LocalStorageProvider,
              private sucursalService: SucursalService,
              private turnoService: TurnoService,
              private fb: FormBuilder) 
  
  {
    this.localStorage.get(localStorage.KEYS.USER).then((user: any) => {
      let u = JSON.parse(user);
      this.idSucursal = u.sucursal.id
      console.log("SUCURSAL--> " + this.idSucursal)
        this.sucursalService.getSucursal(this.idSucursal).then((result) => {
          this.sucursalSelect = result.data;
        });
        this.turnoService.getAllBySucursal(this.idSucursal).then((data: any) => {
          this.turnos = data.data;
        });
    });

    this.turnoForm = this.fb.group({
      diaDeLaSemana: [this.turnoSelect.diaDeLaSemana],
      abierto: [this.turnoSelect.abierto || '', Validators.required],
      horarioDeCorrido: [this.turnoSelect.horarioDeCorrido || '', Validators.required],
      inicioManiana: [this.inicioManiana || ''],
      finManiana: [this.finManiana || ''],
      inicioTarde: [this.inicioTarde || ''],
      finTarde: [this.finTarde || '']
    });
    this.loadGetAll();

  }

  ngOnInit(): void {
  }

  editarTurno(turno: Turno) {
    window.scroll(0,0);
    this.idTurnoEdit = turno.id;
    this.loadTurno();
  }

  loadTurno() {
    this.turnoService.getTurno(this.idTurnoEdit).then(result => {
      this.turnoSelect = result.data[0];
      this.turnoForm.patchValue({
        abierto: this.turnoSelect.abierto,
        horarioDeCorrido: this.turnoSelect.horarioDeCorrido,
        diaDeLaSemana: this.turnoSelect.diaDeLaSemana,
        inicioManiana: this.turnoSelect.inicioManiana,
        finManiana: this.turnoSelect.finManiana,
        inicioTarde: this.turnoSelect.inicioTarde,
        finTarde: this.turnoSelect.finTarde
      });
    });
  }

  loadGetAll() {
    this.turnoService.getAllBySucursal(this.idSucursal).then((data: any) => {
      this.turnos = data.data;
    });
  }

  diaDeLaSemana(){
    if(this.turnoSelect.diaDeLaSemana==0){
      return "Domingo"
    }
    if(this.turnoSelect.diaDeLaSemana==1){
      return "Lunes"
    }
    if(this.turnoSelect.diaDeLaSemana==2){
      return "Martes"
    }
    if(this.turnoSelect.diaDeLaSemana==3){
      return "Miércoles"
    }
    if(this.turnoSelect.diaDeLaSemana==4){
      return "Jueves"
    }
    if(this.turnoSelect.diaDeLaSemana==5){
      return "Viernes"
    }
    if(this.turnoSelect.diaDeLaSemana==6){
      return "Sábado"
    }
  }

  tipoTurno(){
    if(this.turnoSelect.tipo == "1"){
      return "Mañana"
    }else{
      return "Tarde-Noche"
    }
  }

  actualizar() {

    let inicioM : string = this.turnoForm.get('inicioManiana').value;
    let finM: string = this.turnoForm.get('finManiana').value;

    let inicioT : string = this.turnoForm.get('inicioTarde').value;
    let finT: string = this.turnoForm.get('finTarde').value;
  
    if (this.turnoForm.get('inicioManiana').value==null || this.turnoForm.get('finManiana').value==null
    || this.turnoForm.get('inicioTarde').value == null || this.turnoForm.get('finTarde').value == null) {
      swal.fire(
        'Error!',
        'Debe ingresar horarios',
        'error'
      )
    } else {
      let turno: any = {
        inicioManiana: inicioM,
        finManiana: finM,
        horarioDeCorrido: this.turnoForm.get('horarioDeCorrido').value,
        abierto: this.turnoForm.get('abierto').value,
        inicioTarde: inicioT,
        finTarde: finT,
      }

      this.turnoService.updateTurno(turno, this.idTurnoEdit).then(response => {
        swal.fire(
          'Actualizado!',
          'El turno ha sido actualizado.',
          'success'
        ).then(result => {
          this.loadGetAll();
          this.idTurnoEdit = null;
          this.inicioManiana = null;
          this.finManiana = null;
          this.inicioTarde = null;
          this.finTarde = null;
        })
      });
    }
  }

}
