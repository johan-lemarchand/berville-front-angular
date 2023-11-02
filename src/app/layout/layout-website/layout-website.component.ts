import {Component} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {RouterOutlet} from "@angular/router";


@Component({
  selector: 'app-layout-website',
  templateUrl: './layout-website.component.html',
  styleUrls: ['./layout-website.component.scss'],
  standalone: true,
    imports: [
        HeaderComponent,
        FooterComponent,
        RouterOutlet
    ]
})
export class LayoutWebsiteComponent {
}
