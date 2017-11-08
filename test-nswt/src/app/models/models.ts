export class BusInfoByOrganization {
    organisation: string;
    date: string;
    busData: BusInfo[];
}
export class BusInfoByOrganizationViewModel {
    organisation: string;
    date: string;
    busData: BusInfoViewModel[];
}
export class BusInfo {
    busId: string;
    routeVariant: string;
    deviationFromTimetable?: number;
}

export class BusInfoViewModel extends BusInfo {
    routeVariantCode?: string;
}
