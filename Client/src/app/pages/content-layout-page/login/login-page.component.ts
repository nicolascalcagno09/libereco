import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { RequestLogin, ResponseLogin } from '../../../models/endpoints/OAuth2';
import { Oauth2Service } from '../../../shared/services/oauth2.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AppInfo } from '../../../shared/config/base';
import { AuthenticationService } from '../../../shared/auth/authentication.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

    @ViewChild('f') loginForm: NgForm;
    user: RequestLogin = {
      username: '',
      password: '',
      grant_type: 'password'
    };
    private loading = null;
     alert = false;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private loginService: Oauth2Service,
        private authenticationService: AuthenticationService,
        ) { }

    // On submit button click
    onSubmit() {
        this.loginForm.reset();
    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }

    login(user: RequestLogin) {
          this.loginService.post_login(user, AppInfo.Name.Sga).subscribe(
            async (data: HttpResponse<ResponseLogin>) => {
              // if (this.loading) {
              //   this.loading.dismiss();
              //   this.loading = null;
              // }
              const response: ResponseLogin = data.body;
              await this.authenticationService.login(data.body.data.access_token, data.body.data.user,data.body.data.accessPermitionsDictionary,data.body.data.refresh_token, data.body.data.access_token_expires_at);
              this.router.navigate(['/admin']);
            },
            (errorResponse: HttpErrorResponse | any) => {
              this.alert = true;
              if (this.loading) {
                this.loading.dismiss();
                this.loading = null;
                
              }
              //this.intermediaryService.presentToastError("Usuario o contraseña incorrecta");
            }
          );
      }
}
