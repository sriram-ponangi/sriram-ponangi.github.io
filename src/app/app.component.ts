import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PortfolioDataService } from './services/portfolio-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'sriram-ponangi.github.io';

  /** Use async pipe so the view updates when data loads (works with Zone.js and zoneless). */
  data$ = this.portfolioDataService.getData();

  constructor(private readonly portfolioDataService: PortfolioDataService) {}
}
