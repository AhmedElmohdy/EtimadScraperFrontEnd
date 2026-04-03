import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TenderService } from '../../services/tender.service';
import { TenderItem } from '../../models/tender.model';

@Component({
  selector: 'app-tender-list',
  imports: [DatePipe, DecimalPipe],
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

  readonly pageSize = 6;
  readonly circleMax = 60;

  ngOnInit(): void {
    this.loadTenders();
  }

  loadTenders(): void {
    this.loading.set(true);
    this.error.set(null);
    this.tenderService.getTenders(this.currentPage(), this.pageSize).subscribe({
      next: (res) => {
        this.tenders.set(res.data);
        this.totalCount.set(res.totalCount);
        this.totalPages.set(res.totalPages);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.');
        this.loading.set(false);
      },
    });
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
