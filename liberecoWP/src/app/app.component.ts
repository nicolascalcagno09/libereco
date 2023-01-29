import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'liberecoWP';

  constructor(
    private router: Router,
    private metaService: Meta,
    private titleService: Title,
    public route: ActivatedRoute
  ) {

  }


  ngOnInit(): void {


  }



}
