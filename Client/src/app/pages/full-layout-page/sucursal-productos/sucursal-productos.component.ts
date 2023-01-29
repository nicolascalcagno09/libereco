import { Component, OnInit, ɵConsole } from "@angular/core";
import { SucursalService } from "app/shared/services/sucursal.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ProductoService } from "app/shared/services/producto.service";
import swal from 'sweetalert2';
import { HttpErrorResponse } from "@angular/common/http";


@Component({
  selector: "app-sucursal-productos",
  templateUrl: "./sucursal-productos.component.html",
  styleUrls: ["./sucursal-productos.component.scss"],
})
export class SucursalProductosComponent implements OnInit {
  idSucursal;
  sucursalSelect;
  productos: any = [];
  productosIds: any = [];
  mySubscription: any;
  SaboresEstados: Array<any> = [
    { nombre: "Disponible", valor: "disponible" },
    { nombre: "Sin Stock", valor: "sin_stock" },
    { nombre: "No Disponible", valor: "no_disponible" },
  ];

  constructor(
    private sucursalService: SucursalService,
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private router: Router,
  ) {
    this.productoService.getProductoConPresentaciones().then((result) => {
      // Traigo toda la lista de productos disponibles
      this.productos = result.data;
      this.productos.map((pro) =>
        pro.presentaciones.map((p) => (p.selected = false))
      );
      this.productos.map((pro) =>
        pro.sabores.map((p) => (p.estado = "disponible"))
      );

      // Cargo la sucursal
      this.idSucursal = this.route.snapshot.paramMap.get("id");
      this.sucursalService.getSucursal(this.idSucursal).then((result) => {
        this.sucursalSelect = result.data;

        this.mySubscription = this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            // Trick the Router into believing it's last link wasn't previously loaded
            this.router.navigated = false;
          }
        });

        // ACA HAY QUE CARGAR LOS DATOS DE LA SUCURSAL A EDITAR

        this.productos.forEach((pro) => {
          //se cargan los productos
          let index = this.sucursalSelect.productos.findIndex(p2 => p2.id === pro.id);
          if (index != -1) {
            pro.selected = true
            this.productosIds.push(pro.id)
          }

          //se cargan las presentaciones
          pro.presentaciones.forEach((p) => {
            let index = this.sucursalSelect.presentaciones.findIndex(p2 => p2.presentacionId === p.id);
            if (index != -1) {
              p.selected = true
              p.precio = this.sucursalSelect.presentaciones[index].precio
            }
          })
          //se cargan los sabores
          pro.sabores.forEach(s => {
            let index = this.sucursalSelect.sabores.findIndex(s2 => s2.saborId === s.id);
            if (index != -1) {
              s.estado = this.sucursalSelect.sabores[index].estado
            }
          })
        });
        console.log("productos edit --> " + this.productosIds)
      });
    });
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  presentacionSelect(producto, presentacion) {
    let i = (this.productos[producto].presentaciones[presentacion].selected = !this.productos[producto].presentaciones[presentacion].selected);
  }

  productoSelect(producto) {
    console.log(this.productos[producto].selected = !this.productos[producto].selected);
    if (this.productos[producto].selected) {
      this.productosIds.push(this.productos[producto].id)
    }
    if (!this.productos[producto].selected) {
      this.productosIds = this.productosIds.filter(element => {
        return element != this.productos[producto].id;
      })
    }
    console.log("productos id --> " + this.productosIds)
  }

  guardar() {
    let presentacionesSelected = [];
    let saboresEstados = [];

    this.productos.map((p) =>
      p.presentaciones.map((pre) => {
        if (pre.selected == true) {
          let aux: any = {};
          aux.presentacion = pre.id;
          aux.precio = pre.precio === null ? 0 : pre.precio;
          aux.fecha = new Date();
          aux.aprobado = true;
          presentacionesSelected.push(aux);
        }
      })
    );

    this.productos.map((p) =>
      p.sabores.map((s) => {
        if (s.estado != "disponible") {
          let aux: any = {};
          aux.sabor = s.id;
          aux.estado = s.estado;
          saboresEstados.push(aux);
        }
      })
    );

    let productos = {
      sucursal: this.sucursalSelect.id,
      presentaciones: presentacionesSelected,
      saboresEstados: saboresEstados,
      productosIds: this.productosIds,
    };


    swal.fire(
      'Actualizando!',
      'Por favor aguarde',
      'info'
    )
    this.sucursalService.updateProductos(JSON.stringify(productos)).
      then((result: any) => {

        if (result.code == 201) {
          swal.fire(
            'Actualizado!',
            'Los productos han sido Actualizados.',
            'success'
          ).then(result => {
            this.router.navigate(['/sucursales-list/']);
          })
        }

      }).catch((err: HttpErrorResponse) => {
        console.log('catch' + JSON.stringify(err));
        swal.fire(
          'Error!',
          'Hubo un error al actualizar: ' + this.errorMessage(err),
          'error'
        )
      })
  }

  errorMessage(err: HttpErrorResponse) {
    if (err.status === 0) {
      return 'No se encuentra conexión a internet'
    } else {
      return err.error.errors
    }
  }
}
