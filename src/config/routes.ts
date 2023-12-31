import PmProjects from "../assets/images/pm-projects-icon.png";
import TtReports from "../assets/images/tt-reports-icon.png";
import HrEmployees from "../assets/images/hr-employees-icon.png";
import HrUpdates from "../assets/images/hr-updates-icon.png";
import TtLoad from "../assets/images/tt-load-icon.png";

export const routes = [
    {
        label: "Projects",
        allowedRoles: ["project-managers"],
        description: "See and edit projects that you lead.",
        path: "/project-management",
        logo: PmProjects,
    },
    {
        label: "Reports",
        allowedRoles: ["tt-reports"],
        description: "Generate reports about users TimeTrack loaded hours",
        path: "/timetrack/reports",
        logo: TtReports,
    },
    {
        label: "Human Resources",
        allowedRoles: ["hr-employees", "hr-limited"],
        description: "Manage users and teams",
        path: "/human-resources",
        logo: HrEmployees,
    },
    {
        label: "Providers",
        allowedRoles: ["admin", "admin-limited"],
        description: "Manage providers",
        path: "/providers",
        logo: HrEmployees,
    },
    {
        label: "Updates",
        allowedRoles: ["hr-updates"],
        description: "Create, see, edit, delete, and export employees updates",
        path: "/human-resources/updates",
        logo: HrUpdates,
    },
    {
        label: "Timetracker",
        allowedRoles: ["tt-load"],
        description: "Manage your loaded hours on the TimeTrack system",
        path: "/timetrack/load",
        logo: TtLoad,
    },
];
