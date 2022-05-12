import { LegacyUserPublic } from '@gms-micro/auth-types';
export interface BusinessUnit {
    id: number,
    name: string
}

export interface Account {
    id: number,
    name: string
}

export interface Proposal {
    id: number,
    name: string,
    account: Account
}

export interface Project {
    id: number,
    name: string,
    proposal: Proposal
}

export interface UpdateType {
    id: number,
    caption: string,
    active: boolean
}

export interface Currency {
    id: number,
    code: string
}

export interface Update {
    id: number,
    legacyUser: LegacyUserPublic,
    updateType: UpdateType,
    date: string,
    endDate?: string,
    amount?: number,
    amountCurrency?: Currency,
    dateTelegram?: Date,
    weekDay?: number,
    newDate?: string,
    reportNumber?: number
    notes?: string,
}

export interface UpdateCreation {
    legacyUserId: number,
    updateTypeId: number,
    date: string,
    endDate?: string,
    amount?: number,
    amountCurrencyId?: number,
    dateTelegram?: Date,
    weekDay?: number,
    newDate?: string,
    reportNumber?: number
    notes?: string,
}

export interface KeyValuePair {
    [key: string]: any
}

export interface PatchDocumentItem {
    op: string,
    path: string,
    value: any
}

export interface TaskType {
    id: number,
    name: string,
    code: string
}

export interface TimetrackItem {
    id: number,
    project: Project,
    legacyUser: LegacyUserPublic,
    task: string,
    tasktype: TaskType,
    hours: number,
    date: string
}

export interface Position {
    id: number,
    name: string
}

export interface Country {
    id: number,
    name: string,
    code: string
}

export interface Contact {
    relation: string,
    name: string,
    phone: string
}

export interface MedicalCoverage {
    id: number,
    name: string
}

export interface City {
    id: number,
    name: string
}

export interface Address {
    street: string,
    number: string,
    floor: string,
    department: string
}

export interface Employee {
    fileNumber: number,
    legacyUser: LegacyUserPublic,
    afipId: string,
    entryDate: string,
    position: Position,
    avatar: string,
    firstName: string,
    lastName: string,
    gender: boolean,
    birthDate: string,
    birthCountry: Country,
    childs: number,
    maritalStatus: string,
    email: string,
    contact: Array<Contact>,
    homePhone: string,
    mobilePhone: string,
    salaryCurrency: Currency,
    medicalCoverage: MedicalCoverage,
    address: Address,
    city: City,
    country: Country,
    active: boolean
}
