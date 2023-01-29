import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioApp } from 'app/shared/model/usuarioapp.model';
import { UsuarioappService } from 'app/shared/services/usuarioapp.service';

@Component({
  selector: 'app-usuarioapp-list',
  templateUrl: './usuarioapp-list.component.html',
  styleUrls: ['./usuarioapp-list.component.scss']
})
export class UsuarioappListComponent implements OnInit {

  loadingIndicator: boolean = true;
  reorderable: boolean = true;
  usuarios: Array<UsuarioApp> = [];
  presentacionForm: FormGroup;
  columnsWithSearch: string[] = [];
  filteredDataNuevos: Array<UsuarioApp> = [];

  constructor(private fb: FormBuilder,
    private usuarioappService: UsuarioappService,
    private router: Router
  ) {
    this.updateUsuarios();
  }

  ngOnInit(): void {
  }

  updateUsuarios() {
    this.usuarioappService.getAll().then((data: any) => {
      this.usuarios = data.data;
      if (this.usuarios.length != 0) {
        this.filteredDataNuevos = this.usuarios;
        this.columnsWithSearch = Object.keys(this.usuarios[0]);
        console.log(this.columnsWithSearch)
        console.log(this.usuarios)

      }
    });

  }

  onSort(event) {
    console.log(event);
  }

  updateFilter(event) {
    let filter = event.target.value.toLowerCase();
    filter = filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    this.usuarios = this.filteredDataNuevos.filter(item => {
      for (let i = 0; i < this.columnsWithSearch.length; i++) {
        var colValue = item[this.columnsWithSearch[i]];
        if ((!filter || (!!colValue && colValue.toString().toLowerCase().indexOf(filter) !== -1)) && this.columnsWithSearch[i] !== 'sucursal') {
          return true;
        }
        else {
          if (this.columnsWithSearch[i] === 'sucursal') {
            var colValue;
            if ((filter && filter.toString().trim().length > 0) && item[this.columnsWithSearch[i]] && item[this.columnsWithSearch[i]].localidad) {
              colValue = item[this.columnsWithSearch[i]].localidad;
            }
            colValue = colValue && colValue.toString().trim().length > 0 ? colValue.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : '';
            if (!filter || (!!colValue && colValue.toLowerCase().indexOf(filter) !== -1)) {
              return true;
            }
          }
        }
      }
    });
  }
}
