import { DialogSaboresComponent } from './../dialog-sabores/dialog-sabores.component';
import { ProductoService } from './../../services/producto.service';
import { Component, OnInit } from '@angular/core';
import { SucursalService } from 'src/services/sucursal.service';
import { Sucursal } from 'src/model/sucursal.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TipoSaborService } from 'src/services/tipoSabor.service';
import { Turno } from 'src/model/turno.model';
import { ViewportScroller } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-local-detail',
  templateUrl: './local-detail.component.html',
  styleUrls: ['./local-detail.component.scss']
})
export class LocalDetailComponent implements OnInit {

  sucursalSelect = {} as Sucursal;
  tipoSabores: any;
  deliveryValue: boolean = false;

  productos: Array<any> = [];
  turnos: Array<Turno> = [];
  isOpen: string;
  productosIds: any = [];
  panelOpenState = false;
  strFin: string;


  constructor(
    private sucursalService: SucursalService,
    private productoService: ProductoService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private tipoSaborService: TipoSaborService,
    private viewportScroller: ViewportScroller,
    private router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {
    let id = this.route.snapshot.paramMap.get("id");
    this.sucursalService.getSucursalByUrlAmigable(id).then(sucursal => {
      this.sucursalSelect = sucursal.data;
      this.sucursalService.sucursalSelect = sucursal.data;
      this.hasDelivery();

      this.metaService.removeTag("name='description'")
      this.metaService.removeTag("property='og:site_name'")
      this.metaService.removeTag("property='og:title'")
      this.metaService.removeTag("property='og:type'")
      this.metaService.removeTag("property='og:url'")
      this.metaService.removeTag("name='og:image'")

      this.titleService.setTitle('Heladería en ' + this.sucursalSelect.localidad + ' - Libereco Helados');
      this.metaService.addTag({ name: 'description', content: "Ingresa para conocer nuestros productos, sabores y precios, y también nuestros horarios y delivery" });
      this.metaService.addTag({ property: 'og:site_name', content: 'Heladería en ' + this.sucursalSelect.localidad + ' - Libereco Helados' });
      this.metaService.addTag({ property: 'og:title', content: 'Ingresa para conocer nuestros productos, sabores y precios, y también nuestros horarios y delivery' });
      this.metaService.addTag({ property: 'og:type', content: 'website' });
      this.metaService.addTag({ property: 'og:url', content: 'https://libereco.com.ar/sucursal/' + this.sucursalSelect.urlamigable });
      this.metaService.addTag({ name: 'og:image', content: this.sucursalSelect.imagen_path });

      this.sucursalService.getTurnosBySucursal(this.sucursalSelect.id).then(result => {
        this.turnos = result.data;
        this.calculateOpen(this.turnos);
      });
      this.productoService.getProductosActivosByOrdenConPresentacionesActivasByOrden().then(productos => {
        productos.data.forEach(producto => {
          let presentaciones: Array<any> = []
          producto.presentaciones.forEach(presentacion1 => {
            this.sucursalSelect.presentaciones.forEach((presentacion2: any) => {
              if (presentacion1.id == presentacion2.presentacionId) {
                presentaciones.push(presentacion2)
              }
            })
          })
          let sabores = producto.sabores.length > 0
          let productoConPresentaciones = {
            id: producto.id,
            nombre: producto.nombre,
            tieneSabores: sabores,
            presentaciones: presentaciones
          }
          this.productos.push(productoConPresentaciones)
        });
        this.productos.forEach((pro) => {
          //se cargan los productos
          let index = this.sucursalSelect.productos.findIndex(p2 => p2.id === pro.id);
          if (index != -1) {
            pro.selected = true
            this.productosIds.push(pro.id)
          }
        })
      })
    });
    this.tipoSaborService.getAllConSabores().then(result => {
      this.tipoSabores = result.data;
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      window.scroll(0, 0);
    }, 100);
    // window.scroll(0, 0);
    // this.viewportScroller.scrollToAnchor('top')
  }

  hasDelivery() {
    if (this.sucursalSelect.deliveryTiene) {
      this.deliveryValue = true;
    } else {
      this.deliveryValue = false;
    }
  }

  openDialog() {

    const dialogRef = this.dialog.open(DialogSaboresComponent, {
      data: {
        sucursal: this.sucursalSelect,
        tipoSabores: this.tipoSabores
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  calculateOpen(turnos) {
    var hoy = new Date();
    let index = 0;
    for (let turno of turnos) {
      if (turno.diaDeLaSemana === hoy.getDay()) {
        if (this.betweenHours(turno.inicioManiana, turno.finManiana) && turno.abierto) {
          this.isOpen = "Abierto"
          this.strFin = turno.finManiana;
          break;
        }
        else {
          if (this.betweenHours(turno.inicioTarde, turno.finTarde) && turno.abierto && !turno.horarioDeCorrido) {
            this.strFin = turno.finTarde;
            this.isOpen = "Abierto";
            break;
          } else {
            this.isOpen = "Cerrado";
          }
        }

      }
    }
    index++;
  }

  betweenHours(h0, h1) {
    var h1hora = h1.substring(0, 1);
    var h1minutos = h1.substring(3, 4);
    if (h1hora === '0') {
      h1 = '24:' + h1minutos;
    }
    var now = new Date();
    var mins = now.getHours() * 60 + now.getMinutes();
    return this.toMins(h0) <= mins && mins <= this.toMins(h1);
  }

  toMins(h) {
    var b = h.split(':')
    return b[0] * 60 + +b[1];
  }

  goToFormulario() {
    this.router.navigate(['/calificacion-franquicia', { sucursal: this.route.snapshot.paramMap.get("id") }]);
  }
}
