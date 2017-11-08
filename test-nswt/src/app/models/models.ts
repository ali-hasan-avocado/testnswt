import { BusStatuses } from './bus-statuses.enum';
export class BusInfoByOrganization {
    organisation: string;
    date: string;
    busData: BusInfo[];
}
export class BusInfoByOrganizationViewModel {
    organisation: string;
    date: string;
    busData: BusInfoViewModel[];
    notes?: string;
}
export class BusInfo {
    busId: string;
    routeVariant: string;
    deviationFromTimetable?: number;
}

export class BusInfoViewModel extends BusInfo {
    routeVariantCode?: string;
    routeVariantLessCode?: string;
    status: BusStatuses;
}
export class BusNotesRequestModel {
    organisation: string;
    notes?: string;
}
