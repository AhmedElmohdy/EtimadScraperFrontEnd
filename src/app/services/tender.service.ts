import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  TenderListResponse,
  TenderDetailsResponse,
} from '../models/tender.model';

export interface TenderFilter {
  tenderName?: string;
  branchName?: string;
  agencyName?: string;
}

@Injectable({ providedIn: 'root' })
export class TenderService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://localhost:7000/api';

  getTenders(
    page: number,
    pageSize: number,
    filter: TenderFilter = {},
  ): Observable<TenderListResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (filter.tenderName) params = params.set('tenderName', filter.tenderName);
    if (filter.branchName) params = params.set('branchName', filter.branchName);
    if (filter.agencyName) params = params.set('agencyName', filter.agencyName);

    return this.http.get<TenderListResponse>(
      `${this.baseUrl}/tenders-integration/list`,
      { params },
    );
  }

  getTenderDetails(tenderId: string): Observable<TenderDetailsResponse> {
    const params = new HttpParams().set('includeRawHtml', 'false');
    return this.http.get<TenderDetailsResponse>(
      `${this.baseUrl}/TenderScraper/details/${encodeURIComponent(tenderId)}`,
      { params },
    );
  }
}
