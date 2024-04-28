import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PortfolioDataService } from './services/portfolio-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [PortfolioDataService],
})
export class AppComponent {
  title = 'sriram-ponangi.github.io';
  data: any;

  constructor(private portfolioDataService: PortfolioDataService) {
    portfolioDataService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }
}
