import { DialogSaboresComponent } from './dialog-sabores/dialog-sabores.component';
import { SucursalService } from './../services/sucursal.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductoService } from 'src/services/producto.service';
import { HttpClientModule } from '@angular/common/http';
import { DialogMapaComponent } from './dialog-mapa/dialog-mapa.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GtagModule } from 'angular-gtag';
import { LegalesComponent } from './legales/legales.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DialogSaboresComponent,
    DialogMapaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    MatDialogModule,
    GtagModule.forRoot({ trackingId: 'GTM-M4FWQX4', trackPageviews: true })
    ],
  providers: [
    ProductoService,
    SucursalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
