import CreateDrinks from '../views/Drinks/CreateDrinks'
import DrinkList from '../views/Drinks/DrinkList'
// import ViewDrinks from '../views/Drinks/ViewDrinks'
import MainIndex from '../views/Main'
// import BasicEquipments from '../views/Equipments/BasicEquipments'
import ListEquipments from '../views/Equipments/ListEquipments'
// import ManageEquipments from '../views/Equipments/ManageEquipments'
import NewActivities from '../views/Activities/NewActivities'
import FinancialReports from '../views/Reports/FinancialReports'

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/drinks/create', exact: true, name: 'Create Drinks', component: CreateDrinks, value: 'create_drinks' },
  { path: '/drinks/list', exact: true, name: 'Drinks List', component: DrinkList, value: 'list_Drinks' },
  // { path: '/drinks/view/:id', name: 'View Drinks', component: ViewDrinks, value: 'view_Drinks' },
  { path: '/main', exact: true, name: 'Dashboard', component: MainIndex, value: 'main_Index' },
  // { path: '/equipments/basic', exact: true, name: 'Basic Equipments', component: BasicEquipments, value: 'basic_equipments' },
  { path: '/equipments/list', exact: true, name: 'Equipment List', component: ListEquipments, value: 'list_Equipments' },
  // { path: '/equipments/manage', exact: true, name: 'Manage Equipments', component: ManageEquipments, value: 'manage_equipments' },
  { path: '/activities', exact: true, name: 'New Activities', component: NewActivities, value: 'activities' },
  { path: '/reports', exact: true, name: 'Financial Reports', component: FinancialReports, value: 'reports' }
];


export default routes;
