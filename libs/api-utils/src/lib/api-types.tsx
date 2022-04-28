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
