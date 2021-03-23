import React from "react";
import BranchesTabs from "./Component/Branches/BranchesTabs";
import categories from "./Component/RiskReport/configrations/categories";
import itemsDetailes from "./Component/RiskReport/configrations/itemsDetailes";

const BranchesList = React.lazy(() =>
  import("./Component/Branches/BranchesList")
);
const AwarnessType = React.lazy(() =>
  import("./Component/Awarness/AwarnessTabs")
);
const AwarnessEmployee = React.lazy(() =>
  import("./Component/Awarness/AwarnessEmployee")
);
const AwarnessState = React.lazy(() =>
  import("./Component/Awarness/TrainingStat")
);

const ListUsers = React.lazy(() =>
  import("./views/Components/Users/TabsUsers")
);
const ListCompanies = React.lazy(() =>
  import("./views/Components/Maintainance/Companies/ListCompanies")
);
const ListMembers = React.lazy(() =>
  import("./views/Components/Maintainance/Companies/Members/ListMembers")
);
const Riskassesments = React.lazy(() =>
  import("./Component/RiskReport/RiskReportDropDown")
);
const RiskassesmentsStaticstic = React.lazy(() =>
  import("./Component/RiskReport/RiskStatistic/RiskStatistic")
);
const BranchesTab = React.lazy(() =>
  import("./Component/Branches/BranchesTabs")
);
const Breadcrumbs = React.lazy(() => import("./views/Base/Breadcrumbs"));
const Cards = React.lazy(() => import("./views/Base/Cards"));
const Carousels = React.lazy(() => import("./views/Base/Carousels"));
const Collapses = React.lazy(() => import("./views/Base/Collapses"));
const Dropdowns = React.lazy(() => import("./views/Base/Dropdowns"));
const Forms = React.lazy(() => import("./views/Base/Forms"));
const Jumbotrons = React.lazy(() => import("./views/Base/Jumbotrons"));
const ListGroups = React.lazy(() => import("./views/Base/ListGroups"));
const Navbars = React.lazy(() => import("./views/Base/Navbars"));
const Navs = React.lazy(() => import("./views/Base/Navs"));
const Paginations = React.lazy(() => import("./views/Base/Paginations"));
const Popovers = React.lazy(() => import("./views/Base/Popovers"));
const ProgressBar = React.lazy(() => import("./views/Base/ProgressBar"));
const Switches = React.lazy(() => import("./views/Base/Switches"));
const Tables = React.lazy(() => import("./views/Base/Tables"));
const Tabs = React.lazy(() => import("./views/Base/Tabs"));
const Tooltips = React.lazy(() => import("./views/Base/Tooltips"));
const BrandButtons = React.lazy(() => import("./views/Buttons/BrandButtons"));
const ButtonDropdowns = React.lazy(() =>
  import("./views/Buttons/ButtonDropdowns")
);
const ButtonGroups = React.lazy(() => import("./views/Buttons/ButtonGroups"));
const Buttons = React.lazy(() => import("./views/Buttons/Buttons"));
const Charts = React.lazy(() => import("./views/Charts"));
const Dashboard = React.lazy(() => import("./views/Components/Dashboard/Dashboard"));
const CoreUIIcons = React.lazy(() => import("./views/Icons/CoreUIIcons"));
const Flags = React.lazy(() => import("./views/Icons/Flags"));
const FontAwesome = React.lazy(() => import("./views/Icons/FontAwesome"));
const SimpleLineIcons = React.lazy(() =>
  import("./views/Icons/SimpleLineIcons")
);
const Alerts = React.lazy(() => import("./views/Notifications/Alerts"));
const Badges = React.lazy(() => import("./views/Notifications/Badges"));
const Modals = React.lazy(() => import("./views/Notifications/Modals"));
const Colors = React.lazy(() => import("./views/Theme/Colors"));
const Typography = React.lazy(() => import("./views/Theme/Typography"));
const Widgets = React.lazy(() => import("./views/Widgets/Widgets"));
// const Users = React.lazy(() => import("./views/Users/Users"));
// const User = React.lazy(() => import("./views/Users/User"));

const ListCities = React.lazy(() =>
  import("./views/Components/Cities/ListCities")
);
const ListAreas = React.lazy(() =>
  import("./views/Components/Areas/ListAreas")
);
const ListNeighbourhoods = React.lazy(() =>
  import("./views/Components/Neighbours/ListNeighbours")
);
const ListMonthlyCats = React.lazy(() =>
  import("./views/Components/MonthlyReports/Cats/ListCats")
);
const ListMaintainanceCats = React.lazy(() =>
  import("./views/Components/Maintainance/Cats/ListCats")
);
const ListMonthlyReports = React.lazy(() =>
  import("./views/Components/MonthlyReports/Reports/ListReports")
);
const ListMonthlyStatistics = React.lazy(() =>
  import("./views/Components/MonthlyReports/Statistics/ListMain")
);
const ListMaintainanceStatistics = React.lazy(() =>
  import("./views/Components/Maintainance/Statistics/ListMain")
);
const ListMaintainanceReports = React.lazy(() =>
  import("./views/Components/Maintainance/Reports/ListReports")
);
const ListMonthlyItems = React.lazy(() =>
  import("./views/Components/MonthlyReports/Items/ListItems")
);
const ListMaintainanceItems = React.lazy(() =>
  import("./views/Components/Maintainance/Items/ListItems")
);
const MonthlyReportDetails = React.lazy(() =>
  import("./views/Components/MonthlyReports/Reports/ReportDetails")
);
const MaintainanceReportDetails = React.lazy(() =>
  import("./views/Components/Maintainance/Reports/ReportDetails")
);
const General = React.lazy(() => import("./views/Components/General/General"));
const Logout = React.lazy(() => import("../src/login/Logout"));
const myAccount = React.lazy(() => import("./myAccount/myAccount"));
const AdminPayment = React.lazy(() =>
  import("./views/Components/AdminPayment/adminPayment")
);
const ConstantList = React.lazy(() =>
  import("./views/Components/Constant/ConstantList")
);
const AssessmentTabs = React.lazy(() =>
  import("./Component/RiskReport/assessmentstabs")
);
const TechnicalDepartment = React.lazy(() =>
  import("./Component/TchnicalDepartment/TechDep")
);
const IncidentRebort = React.lazy(() =>
  import("./Component/IncidentReport/IncidentRebort")
);
const IncidentRebortDet = React.lazy(() =>
  import("./Component/IncidentReport/IncidentDetailes")
);
const EmergancyDep = React.lazy(() =>
  import("./Component/EmergencyReport/EmergencyRebDep")
);

const StatisticIncident = React.lazy(() =>
  import("./Component/IncidentReport/IncidentStatistics")
);
const StatisticEmergency = React.lazy(() =>
  import("./Component/EmergencyReport/EmergancyStatistics")
);


const routes = [
  { path: "/", exact: true, name: "الصفحه الرئيسيه" },

  { path: "/branches", exact: true, name: "الفروع", component: BranchesList },
  { path: "/branches/:id", exact: true, name: "الفرع", component: BranchesTabs },

  { path: "/EmergencyReport", exact: true, name: "تقارير الطواريء", component: EmergancyDep },
  { path: "/statisticsEmergancy", exact: true, name: "احصائيات الطواريء", component: StatisticEmergency },


  { path: "/AwareStatistic", exact: true, name: "احصائيات التدريب", component: AwarnessState },

  { path: "/incident", exact: true, name: "تقرير الاصابات", component: IncidentRebort },
  { path: "/incident/:id", exact: true, name: " تفاصيل تقرير الاصابات", component: IncidentRebortDet },
  { path: "/statisticIncident", exact: true, name: "احصائيات الاصابات", component: StatisticIncident },



  { path: "/Tech", exact: true, name: "اقسام الدعم الفني", component: TechnicalDepartment },

  { path: "/risk", exact: true, name: "تقييم المخاطر", component: Riskassesments },
  { path: "/Riskcategoris", exact: true, name: "التصنيفات", component: categories },
  { path: "/risk/:id", exact: true, name: "تفاصيل التقييم ", component: AssessmentTabs },
  { path: "/Riskcategoris/:id", exact: true, name: "تفاصيل العناصر", component: itemsDetailes },
  { path: "/RiskStatistic", exact: true, name: "الاحصائيات", component: RiskassesmentsStaticstic },



  { path: "/Aware", exact: true, name: "التدريب", component: AwarnessType },
  { path: "/Aware/:id", exact: true, name: "موظفي التدريب ", component: AwarnessEmployee },

  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/theme", exact: true, name: "Theme", component: Colors },
  { path: "/theme/colors", name: "Colors", component: Colors },
  { path: "/theme/typography", name: "Typography", component: Typography },
  { path: "/base", exact: true, name: "Base", component: Cards },
  { path: "/base/cards", name: "Cards", component: Cards },
  { path: "/base/forms", name: "Forms", component: Forms },
  { path: "/base/switches", name: "Switches", component: Switches },
  { path: "/base/tables", name: "Tables", component: Tables },
  { path: "/base/tabs", name: "Tabs", component: Tabs },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", component: Breadcrumbs },
  { path: "/base/carousels", name: "Carousel", component: Carousels },
  { path: "/base/collapses", name: "Collapse", component: Collapses },
  { path: "/base/dropdowns", name: "Dropdowns", component: Dropdowns },
  { path: "/base/jumbotrons", name: "Jumbotrons", component: Jumbotrons },
  { path: "/base/list-groups", name: "List Groups", component: ListGroups },
  { path: "/base/navbars", name: "Navbars", component: Navbars },
  { path: "/base/navs", name: "Navs", component: Navs },
  { path: "/base/paginations", name: "Paginations", component: Paginations },
  { path: "/base/popovers", name: "Popovers", component: Popovers },
  { path: "/base/progress-bar", name: "Progress Bar", component: ProgressBar },
  { path: "/base/tooltips", name: "Tooltips", component: Tooltips },
  { path: "/buttons", exact: true, name: "Buttons", component: Buttons },
  { path: "/buttons/buttons", name: "Buttons", component: Buttons },

  {
    path: "/buttons/button-dropdowns",
    name: "Button Dropdowns",
    component: ButtonDropdowns
  },
  {
    path: "/buttons/button-groups",
    name: "Button Groups",
    component: ButtonGroups
  },
  {
    path: "/buttons/brand-buttons",
    name: "Brand Buttons",
    component: BrandButtons
  },
  { path: "/icons", exact: true, name: "Icons", component: CoreUIIcons },
  { path: "/icons/coreui-icons", name: "CoreUI Icons", component: CoreUIIcons },
  { path: "/icons/flags", name: "Flags", component: Flags },
  { path: "/icons/font-awesome", name: "Font Awesome", component: FontAwesome },
  {
    path: "/icons/simple-line-icons",
    name: "Simple Line Icons",
    component: SimpleLineIcons
  },
  {
    path: "/notifications",
    exact: true,
    name: "Notifications",
    component: Alerts
  },
  { path: "/notifications/alerts", name: "Alerts", component: Alerts },
  { path: "/notifications/badges", name: "Badges", component: Badges },
  { path: "/notifications/modals", name: "Modals", component: Modals },
  { path: "/widgets", name: "Widgets", component: Widgets },
  { path: "/charts", name: "Charts", component: Charts },
  // { path: "/users", exact: true, name: "Users", component: Users },
  // { path: "/users/:id", exact: true, name: "User Details", component: User },

  {
    path: "/users",
    name: "مستخدمي النظام",
    component: ListUsers
  },
  {
    path: "/maintainanceCompanies",
    name: "شركات الصيانة",
    component: ListCompanies
  },
  {
    path: "/maintainanceCompanyMembers",
    name: "موظفين الشركة",
    component: ListMembers
  },
  { path: "/cities", exact: true, name: "المدن", component: ListCities },
  { path: "/areas", exact: true, name: "المناطق", component: ListAreas },
  {
    path: "/neighbourhoods",
    exact: true,
    name: "الأحياء",
    component: ListNeighbourhoods
  },
  { path: "/monthlyCats", exact: true, name: "تصانيف التقارير الشهرية", component: ListMonthlyCats },
  { path: "/maintainanceCats", exact: true, name: "تصانيف تقارير الصيانة", component: ListMaintainanceCats },
  { path: "/monthlyItems", exact: true, name: "عناصر تصنيف تقرير شهري", component: ListMonthlyItems },
  { path: "/maintainanceItems", exact: true, name: "عناصر تصنيف تقرير صيانة", component: ListMaintainanceItems },
  {
    path: "/monthlyReports",
    exact: true,
    name: "التقارير الشهرية",
    component: ListMonthlyReports
  },
  {
    path: "/monthlyStatistics",
    exact: true,
    name: "إحصائيات التقارير الشهرية",
    component: ListMonthlyStatistics
  },
  {
    path: "/maintainanceStatistics",
    exact: true,
    name: "إحصائيات تقارير الصيانة",
    component: ListMaintainanceStatistics
  },
  {
    path: "/maintainanceReports",
    exact: true,
    name: "تقارير الصيانة",
    component: ListMaintainanceReports
  },
  {
    path: "/monthlyReportDetails/:id",
    exact: true,
    name: "تفاصيل التقرير الشهري",
    component: MonthlyReportDetails
  },
  {
    path: "/maintainanceReportDetails/:id",
    exact: true,
    name: "تفاصيل تقرير الصيانة",
    component: MaintainanceReportDetails
  },

  {
    path: "/settings/aboutUs",
    exact: true,
    name: "من نحن",
    component: General
  },
  {
    path: "/settings/privacyPolicy",
    exact: true,
    name: "شروط الاستخدام",
    component: General
  },
  { path: "/logout", name: "", component: Logout },
  {
    path: "/myAccount",
    exact: true,
    name: "حسابي الشخصي",
    component: myAccount
  },
  {
    path: "/settings/bankAccounts",
    exact: true,
    name: " حسابي البنكي",
    component: AdminPayment
  },
  {
    path: "/settings/constants",
    exact: true,
    name: " الثوابت",
    component: ConstantList
  }
];

export default routes;
