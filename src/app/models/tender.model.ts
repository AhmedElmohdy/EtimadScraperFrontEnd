export interface TenderItem {
  id: number;
  tenderId: number;
  referenceNumber: string;
  tenderName: string;
  tenderNumber: string;
  branchName: string;
  agencyName: string;
  tenderTypeName: string;
  submitionDate: string;
  lastEnqueriesDate: string;
  lastOfferPresentationDate: string;
  offersOpeningDate: string | null;
  remainingDays: number;
  remainingHours: number;
  remainingMins: number;
  financialFees: number;
  invitationCost: number;
  buyingCost: number;
}

export interface TenderListResponse {
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  data: TenderItem[];
}
