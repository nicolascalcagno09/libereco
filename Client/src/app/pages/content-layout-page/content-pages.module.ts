import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";
import { ContentLayoutPageComponent } from './content-layout-page.component';
import { LoginPageComponent} from './login/login-page.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule,
        NgbModule
    ],
    declarations: [
        ContentLayoutPageComponent,
        LoginPageComponent
    ]
})
export class ContentPagesModule { }
