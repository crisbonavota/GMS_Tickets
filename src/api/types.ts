export interface FilterItem {
    field: string;
    value?: string | number | boolean | null;
}

export interface CustomFilter {
    name: string;
    value: any;
}

export interface Range {
    start: number;
    end: number;
}

export interface Sort {
    field: string;
    isAscending: boolean;
}

export interface ApplicationUserPublic {
    id: number;
    email: string;
    fullName: string;
    image: string;
}

export interface ApplicationUserPrivate extends ApplicationUserPublic {
    roles: Array<string>;
}

export interface AuthToken {
    token: string;
    expiresIn: number;
}

export interface AuthResponse {
    authToken: AuthToken;
    refreshToken: AuthToken;
    tokenType: string;
    authState: ApplicationUserPrivate;
}

export interface LegacyUserPublic {
    id: number;
    email: string;
    fullName: string;
    fileNumber: number;
}

export interface BusinessUnit {
    id: number;
    name: string;
}

export interface Account {
    id: number;
    name: string;
    company: Company;
    country: Country;
    notes: string;
    active: boolean;
    responsibleLegacyUser?: LegacyUserPublic;
}

export interface Company {
    id: number;
    name: string;
    country: Country;
    status: string;
    active: boolean;
    address: string;
    afipId: string;
    city: string;
    creationDate: string;
    fiscalId: string;
    ivaType: number;
}

export interface Proposal {
    id: number;
    name: string;
    account: Account;
}

export interface Project {
    id: number;
    name: string;
    proposal: Proposal;
    status: number;
    businessUnit: BusinessUnit;
    startDate?: string;
    endDate?: string;
    creationDate?: string;
    contractType: number;
    leaderLegacyUser: LegacyUserPublic;
    progress: number;
    comments: string;
    hours: number;
    creationLegacyUser: LegacyUserPublic;
    uiColor?: string;
    active: boolean;
    sold: boolean;
    currency: Currency;
    notes: string;
}

export interface ProjectCreation {
    name: string;
    proposalId: number;
    status: number;
    contractType: number;
    startDate?: string;
    endDate?: string;
    leaderLegacyUserId: number;
    hours: number;
}

export interface UpdateType {
    id: number;
    caption: string;
    active: boolean;
}

export interface Currency {
    id: number;
    code: string;
}

export interface Update {
    id: number;
    legacyUser: LegacyUserPublic;
    updateType: UpdateType;
    date: string;
    endDate?: string;
    amount?: number;
    amountCurrency?: Currency;
    dateTelegram?: Date;
    weekDay?: number;
    newDate?: string;
    reportNumber?: number;
    notes?: string;
}

export interface UpdateCreation {
    legacyUserId: number;
    updateTypeId: number;
    date: string;
    endDate?: string;
    amount?: number;
    amountCurrencyId?: number;
    dateTelegram?: Date;
    weekDay?: number;
    newDate?: string;
    reportNumber?: number;
    notes?: string;
}

export interface KeyValuePair {
    [key: string]: any;
}

export interface PatchDocumentItem {
    op: string;
    path: string;
    value: any;
}

export interface TaskType {
    id: number;
    name: string;
    code: string;
    caption: string;
    shortname: string;
}

export interface TimetrackItem {
    id: number;
    project: Project;
    legacyUser: LegacyUserPublic;
    task: string;
    tasktype: TaskType;
    hours: number;
    date: string;
}

export interface Position {
    id: number;
    name: string;
}

export interface Country {
    id: number;
    name: string;
    code: string;
}

export interface Contact {
    relation: string;
    name: string;
    phone: string;
}

export interface MedicalCoverage {
    id: number;
    name: string;
}

export interface City {
    id: number;
    name: string;
}

export interface Address {
    street: string;
    number: string;
    floor: string;
    department: string;
}

export interface Employee {
    id: number;
    fileNumber: number;
    legacyUser: LegacyUserPublic;
    afipId: string;
    entryDate: string;
    position: Position;
    avatar: string;
    firstName: string;
    lastName: string;
    gender: boolean;
    birthDate: string;
    birthCountry: Country;
    childs: number;
    maritalStatus: string;
    email: string;
    contact: Array<Contact>;
    homePhone: string;
    mobilePhone: string;
    salaryCurrency: Currency;
    medicalCoverage: MedicalCoverage;
    address: Address;
    city: City;
    country: Country;
    active: boolean;
}
