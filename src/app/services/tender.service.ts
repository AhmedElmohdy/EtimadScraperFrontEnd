import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TenderListResponse } from '../models/tender.model';

@Injectable({ providedIn: 'root' })
export class TenderService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://localhost:7000/api';

  getTenders(page: number, pageSize: number): Observable<TenderListResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<TenderListResponse>(
      `https://localhost:7000/api/tenders-integration/list`,
      { params },
    );
  }
}
