import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { shareReplay, tap } from 'rxjs';
import { PortfolioDataService } from './services/portfolio-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, NgTemplateOutlet, RouterOutlet],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'sriram-ponangi.github.io';
  projects: any[] = [];
  currentProjectPage = 1;
  projectPageSize = 3;
  readonly projectPageSizeOptions = [3, 5, 10];

  /** Use async pipe so the view updates when data loads (works with Zone.js and zoneless). */
  data$ = this.portfolioDataService.getData().pipe(
    tap((data) => this.projects = data?.projects ?? []),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(private readonly portfolioDataService: PortfolioDataService) {}

  get pagedProjects(): any[] {
    const startIndex = (this.currentProjectPage - 1) * this.projectPageSize;
    return this.projects.slice(startIndex, startIndex + this.projectPageSize);
  }

  get totalProjectPages(): number {
    return Math.max(1, Math.ceil(this.projects.length / this.projectPageSize));
  }

  get projectPages(): number[] {
    return Array.from({ length: this.totalProjectPages }, (_, index) => index + 1);
  }

  selectProjectPage(page: number): void {
    this.currentProjectPage = Math.min(Math.max(page, 1), this.totalProjectPages);
  }

  changeProjectPageSize(event: Event): void {
    const pageSize = Number((event.target as HTMLInputElement).value);
    if (!Number.isFinite(pageSize) || pageSize < 1) {
      return;
    }

    this.projectPageSize = Math.floor(pageSize);
    this.currentProjectPage = 1;
  }
}
