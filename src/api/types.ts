// types from the tickets project

export interface AuthenticationResponse {
  token: string;
  expiration: number;
  tokenType: string;
  authState: ApplicationUser;
}

export enum AlternativeOperators {
  StringContains = 1,
  DateTime,
}

export type PatchOperation =
  | "add"
  | "remove"
  | "replace"
  | "copy"
  | "move"
  | "test";

export interface PatchObject {
  path: string;
  op: PatchOperation;
  value: any;
}

export interface Sort {
  field: string;
  isAscending: boolean;
}

export interface AuditableEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationUser extends AuditableEntity {
  email: string;
  name: string;
  areaId: string;
}

export interface Area {
  id: string;
  name: string;
  members: ApplicationUser[];
}

export interface MessageCreation {
  ticketId: string;
  content: string;
}

export interface MessageView {
  authorId: string;
  author: ApplicationUser;
  content: string;
  date: Date;
}

export interface TicketCreation {
  id: string;
  requesterId: string;
  assigneesIds: string[];
  followersIds: string[];
  tipo: Tipo;
  priority: Priorities;
  subject: string;
  status: Status;
  tags: string[];
  message: string;
}

export interface TicketView {
  id: string;
  subject: string;
  priority: Priorities;
  status: Status;
  tipo: Tipo;
  requester: ApplicationUser;
  assignees: ApplicationUser[];
  followers: ApplicationUser[];
  currentUserId: string;
  currentUserRole: TicketRoles;
  description: string;
  createdAt: Date;
}

export enum TicketRoles {
  None = 0,
  Requester,
  Assignee,
  Follower,
}

export interface FilterProperties {
  propertyName: string;
  filterValue: string;
  operator: string;
}

export enum Tipo {
  Support,
  Complaint,
}

export enum Priorities {
  Urgent,
  Low,
}

export enum Status {
  New,
  Open,
  Close,
}

// Orginal types from GMS

//MODIFICADO
export interface FilterItem {
  field: string;
  value?: string | number | boolean | null;
  operator?: string; // SE LE AGREGO ESTA PROPIEDAD
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

export interface IndirectCost {
  id: number;
  project: Project;
  currency: Currency;
  description: string;
  amount: number;
  date: string;
}

export interface CurrencyExchange {
  id: number;
  baseCurrency: Currency;
  targetCurrency: Currency;
  price: number;
  date: string;
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
  businessUnit: BusinessUnit;
}

export interface BusinessUnit {
  id: number;
  name: string;
  active: boolean;
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
  hours: number;
  creationLegacyUser: LegacyUserPublic;
  uiColor?: string;
  active: boolean;
  sold: boolean;
  currency: Currency;
  income: number;
}

export interface ProjectRevenueValues {
  project: Project;
  resourcesCost: number;
  hoursReported: number;
  indirectCost: number;
  profit: number;
  income: number;
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
  active: boolean;
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
  altura: string;
  floor: string;
  number: string;
}

export interface Employee {
  map(arg0: (employee: any) => any): unknown;
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
  children: Array<ChildCreation>;
  maritalStatus: MaritalStatus;
  email: string;
  contact: Array<Contact>;
  homePhone: string;
  mobilePhone: string;
  salaryCurrency: Currency;
  medicalCoverage: MedicalCoverage;
  address: Address;
  city: string;
  country: Country;
  active: boolean;
  postalCode: string;
  salaryAmount: number;
  workTime: WorkTime;
  employer: Employer;
}
export interface Provider {
  id: number;
  legacyUserId: number;
  legacyUser: LegacyUserPublic;
  firstName: string;
  lastName: string;
  afipId: string;
  businessName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  creationDate: Date;
  active: boolean;
  fileNumber: number;
  providerType: ProviderType;
}

export interface Group {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

export interface GroupLegacyUser {
  id: number;
  group: Group;
  legacyUser: LegacyUserPublic;
}

export interface Child {
  id: number;
  birthDate: Date;
  employee: Employee;
  employeeId: number;
  name: string;
}

export interface ChildCreation {
  birthDate: string;
  name: string;
}

export interface Training {
  id: number;
  name: string;
  companyName: string;
  numberOfHours: number;
  startDate: Date;
  endDate: Date;
  status: StatusTraining;
  satisfactionLevel: SatisfactionLevel;
  legacyUser: LegacyUserPublic;
  legacyUserId: number;
  typeOfTraining: string;
  points: number;
  sepyme: string;
  courseCost: number;
  attendance: string;
  typeOfRequest: string;
  effectivenessLevel: EffectivenessLevel;
}

export enum MaritalStatus {
  Single,
  Married,
  Cohabiting,
  Divorced,
  Separated,
  Widowed,
}

export enum StatusTraining {
  NotStartedYet,
  InProgress,
  Abandoned,
  Finished,
}

export enum SatisfactionLevel {
  NotAtAllSatisfied,
  PartlySatified,
  Satisfied,
  MoreThanSatisfied,
  VerySatisfied,
}

export enum EffectivenessLevel {
  Low,
  Medium,
  High,
}

export enum WorkTime {
  FullTime,
  PartTime,
}

export enum ProviderType {
  OnDemand,
  Dedicated,
}

export enum Employer {
  W3AR,
  T3,
}
