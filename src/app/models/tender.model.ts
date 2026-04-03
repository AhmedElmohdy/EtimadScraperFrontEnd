export interface TenderDetailsResponse {
  tenderId: string;
  basicInformation: {
    title: string;
    tenderNumberIAM: string;
    referenceNumber: string;
    purpose: string;
    documentsValue: string;
    status: string;
    contractDuration: string;
    maintenanceInsurance: string;
    competitionType: string;
    organization: string;
    remainingTime: string;
    submissionMethod: string;
    initialGuaranteeRequirements: string;
    initialGuaranteeTitle: string;
    initialGuaranteeValue: string;
    finalGuarantee: string;
  };
  datesAndDeadlines: {
    inquiryDeadline: string;
    submissionDeadline: string;
    offerOpeningDate: string;
    technicalOfferOpeningDate: string;
    stopPeriod: string;
    expectedAwardDate: string;
    actionStartDate: string;
    questionSubmissionStartDate: string;
    maxQuestionResponseTime: string;
    openingPlace: string;
  };
  classificationAndExecution: {
    tenderCondition: string;
    executionLocation: string;
    description: string;
    category: string;
    supplyItemsIncluded: string;
    constructionWorks: string;
    maintenanceAndOperationWorks: string;
  };
  awardingResults: {
    awardingResultStatus: string;
    awardingResultMessage: string;
  };
  localContent: {
    localContentRequirements: string;
  };
  metadata: {
    scrapedAt: string;
    dataSource: string;
    isSuccess: boolean;
    errorMessage: string | null;
  };
}

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
  condetionalBookletPrice: number;
}

export interface TenderListResponse {
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  data: TenderItem[];
}

export interface TenderCounts {
  todayCount: number;
  yesterdayCount: number;
  last7DaysCount: number;
}
