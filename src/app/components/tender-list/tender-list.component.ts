import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TenderService, TenderFilter } from '../../services/tender.service';
import { TenderItem, TenderCounts } from '../../models/tender.model';

@Component({
  selector: 'app-tender-list',
  imports: [DatePipe, DecimalPipe, RouterLink, FormsModule],
  templateUrl: './tender-list.component.html',
  styleUrl: './tender-list.component.scss',
})
export class TenderListComponent implements OnInit {
  private readonly tenderService = inject(TenderService);

  tenders = signal<TenderItem[]>([]);
  totalCount = signal(0);
  totalPages = signal(0);
  currentPage = signal(1);
  loading = signal(false);
  error = signal<string | null>(null);

  counts = signal<TenderCounts | null>(null);
  countsLoading = signal(false);

  filter: TenderFilter = { tenderName: '', branchName: '', agencyName: '' };

  readonly pageSize = 6;
  readonly circleMax = 60;

  ngOnInit(): void {
    this.loadTenders();
    this.loadCounts();
  }

  loadCounts(): void {
    this.countsLoading.set(true);
    this.tenderService.getTenderCounts().subscribe({
      next: (res) => {
        this.counts.set(res);
        this.countsLoading.set(false);
      },
      error: () => {
        this.countsLoading.set(false);
      },
    });
  }

  loadTenders(): void {
    this.loading.set(true);
    this.error.set(null);
    this.tenderService
      .getTenders(this.currentPage(), this.pageSize, this.filter)
      .subscribe({
        next: (res) => {
          this.tenders.set(res.data);
          this.totalCount.set(res.totalCount);
          this.totalPages.set(res.totalPages);
          this.loading.set(false);
        },
        error: () => {
          this.error.set(
            'حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.',
          );
          this.loading.set(false);
        },
      });
  }

  applyFilter(): void {
    this.currentPage.set(1);
    this.loadTenders();
  }

  resetFilter(): void {
    this.filter = { tenderName: '', branchName: '', agencyName: '' };
    this.currentPage.set(1);
    this.loadTenders();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage())
      return;
    this.currentPage.set(page);
    this.loadTenders();
  }

  getCircleDashArray(days: number): string {
    const r = 34;
    const circumference = 2 * Math.PI * r;
    const progress = Math.min(days / this.circleMax, 1);
    return `${(progress * circumference).toFixed(1)} ${circumference.toFixed(1)}`;
  }

  getCircleColor(days: number): string {
    if (days <= 7) return '#e53935';
    if (days <= 14) return '#fb8c00';
    return '#00a99d';
  }

  formatFees(fees: number): string {
    return fees === 0 ? 'مجانا' : fees.toLocaleString('ar-SA') + ' ر.س';
  }

  getPageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const delta = 2;
    const pages: number[] = [];

    for (
      let i = Math.max(1, current - delta);
      i <= Math.min(total, current + delta);
      i++
    ) {
      pages.push(i);
    }
    return pages;
  }
}
