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
    code: string,
    active: boolean
}

export interface Update {
    id: number,
    legacyUser: LegacyUserPublic,
    updateType: UpdateType,
    date: Date,
    endDate: Date,
    amount: number,
    amountCurrency: Currency,
    motive: string,
    dateTelegram: Date,
    weekDay: number,
    newDate: Date,
    notes: string,
    followUp: string,
    active: boolean,
    data: string
}
