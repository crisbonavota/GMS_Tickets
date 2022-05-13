import tonic3 from './tonic3-logo.webp';
import report from './tt-reports-icon.png';
import updates from './hr-updates-icon.png';
import employees from './hr-employees-icon.png';
import defaultIcon from './default-icon.png';

export const Tonic3Logo = tonic3;
export const ReportIcon = report;
export const UpdatesIcon = updates;
export const EmployeesIcon = employees;
export const DefaultIcon = defaultIcon;

export const DeployAssets: { [key: string]: string } = {
    "ttReports": ReportIcon,
    "hrUpdates": UpdatesIcon,
    "hrEmployees": EmployeesIcon,
    "default": DefaultIcon
};
