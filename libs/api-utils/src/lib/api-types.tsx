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
