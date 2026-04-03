import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TenderService } from '../../services/tender.service';
import { TenderDetailsResponse } from '../../models/tender.model';

type TabKey =
  | 'basic'
  | 'dates'
  | 'classification'
  | 'awarding'
  | 'localContent';

@Component({
  selector: 'app-tender-details',
  imports: [RouterLink],
  templateUrl: './tender-details.component.html',
  styleUrl: './tender-details.component.scss',
})
export class TenderDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly tenderService = inject(TenderService);

  details = signal<TenderDetailsResponse | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  activeTab = signal<TabKey>('basic');

  readonly tabs: { key: TabKey; label: string }[] = [
    { key: 'basic', label: 'المعلومات الأساسية' },
    { key: 'dates', label: 'العناوين والمواعيد المتعلقة بالمنافسة' },
    { key: 'classification', label: 'مجال التصنيف وموقع التنفيذ والتقديم' },
    { key: 'awarding', label: 'إعلان نتائج الترسية' },
    { key: 'localContent', label: 'آليات المحتوى المحلي' },
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tenderService.getTenderDetails(id).subscribe({
        next: (data) => {
          this.details.set(data);
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
  }

  setTab(tab: TabKey): void {
    this.activeTab.set(tab);
  }

  cleanText(value: string): string {
    return value
      .replace(/\.\.\.عرض المزيد\.\.\./g, '')
      .replace(/\.\.\.عرض الأقل\.\.\./g, '')
      .trim();
  }

  getTabIcon(key: TabKey): string {
    const icons: Record<TabKey, string> = {
      basic: '⊞',
      dates: '⏱',
      classification: '☰',
      awarding: '👥',
      localContent: '🏠',
    };
    return icons[key];
  }
}
