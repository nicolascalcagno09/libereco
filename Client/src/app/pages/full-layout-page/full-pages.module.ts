import { DisableControlDirective } from './../../shared/directives/disable-control.directive';
import { SharedModule } from './../../shared/shared.module';
import { ProductoNewComponent } from './producto-new/producto-new.component';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { SaborCategoriaComponent } from './sabor-categoria/sabor-categoria.component';
import { CommonModule } from "@angular/common";
import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { FullLayoutPageComponent } from './full-layout-page.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { UiSwitchModule } from 'ngx-ui-switch';
import { IndexComponent } from './index/index.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserNewComponent } from './user-new/user-new.component';
import { SaborNewComponent } from './sabor-new/sabor-new.component';
import { SaborListComponent } from './sabor-list/sabor-list.component';
import { PresentacionListComponent } from './presentacion-list/presentacion-list.component';
import { PresentacionNewComponent } from './presentacion-new/presentacion-new.component';
import { SucursalNewComponent } from './sucursal-new/sucursal-new.component';
import { SucursalListComponent } from './sucursal-list/sucursal-list.component';
import { SucursalProductosComponent } from './sucursal-productos/sucursal-productos.component';
import { MisDatosComponent } from './mis-datos/mis-datos.component';
import { MisProductosComponent } from './mis-productos/mis-productos.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { SucursalTurnosComponent } from './sucursal-turnos/sucursal-turnos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MisMensajesComponent } from './mis-mensajes/mis-mensajes.component';
import { MisMensajesNuevosComponent } from './mis-mensajes-nuevos/mis-mensajes-nuevos.component';
import { ContactosNuevosComponent } from './contactos-nuevos/contactos-nuevos.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { Angular2CsvModule } from 'angular2-csv';
import {  NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule  } from '@angular-material-components/datetime-picker';



// importar locales
import localePy from '@angular/common/locales/es-PY';
import localePt from '@angular/common/locales/pt';
import localeEn from '@angular/common/locales/en';
import localeEsAr from '@angular/common/locales/es-AR';
import { UsuarioappListComponent } from './usuarioapp-list/usuarioapp-list.component';
import { ArticulocanjeableNewComponent } from './articulocanjeable-new/articulocanjeable-new.component';
import { ArticulocanjeableListComponent } from './articulocanjeable-list/articulocanjeable-list.component';
import { NovedadListComponent } from './novedad-list/novedad-list.component';
import { NovedadNewComponent } from './novedad-new/novedad-new.component';
import { PromocionListComponent } from './promocion-list/promocion-list.component';
import { PromocionNewComponent } from './promocion-new/promocion-new.component';
import {CalendarModule} from 'primeng/calendar';

// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localePy, 'es');
registerLocaleData(localePt, 'pt');
registerLocaleData(localeEn, 'en')
registerLocaleData(localeEsAr, 'es-Ar');




@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule,
        NgxDatatableModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        TagInputModule,
        UiSwitchModule,
        NgxMaterialTimepickerModule,
        MatExpansionModule,
        Angular2CsvModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        CalendarModule,
    ],
    declarations: [
        FullLayoutPageComponent,
        IndexComponent,
        UserListComponent,
        UserNewComponent,
        SaborNewComponent,
        SaborListComponent,
        PresentacionListComponent,
        PresentacionNewComponent,
        SucursalNewComponent,
        SucursalListComponent,
        SaborCategoriaComponent,
        ProductoListComponent,
        ProductoNewComponent,
        DisableControlDirective,
        SucursalProductosComponent,
        MisDatosComponent,
        MisProductosComponent,
        SucursalTurnosComponent,
        ChangePasswordComponent,
        MisTurnosComponent,
        ContactoComponent,
        MisMensajesComponent,
        MisMensajesNuevosComponent,
        ContactosNuevosComponent,
        PromocionListComponent,
        PromocionNewComponent,
        NovedadListComponent,
        NovedadNewComponent,
        ArticulocanjeableListComponent,
        ArticulocanjeableNewComponent,
        UsuarioappListComponent
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'es-Ar' }],
})
export class FullPagesModule { }
