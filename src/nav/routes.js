import CreateDrinks from '../views/Drinks/CreateDrinks'
import DrinkList from '../views/Drinks/DrinkList'
import ViewDrinks from '../views/Drinks/ViewDrinks'
import BasicEquipments from '../views/Equipments/BasicEquipments'
import NewActivities from '../views/Activities/NewActivities'
import FinancialReports from '../views/Reports/FinancialReports'

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/drinks/create', exact: true, name: 'Create Drinks', component: CreateDrinks, value: 'create_drinks' },
  { path: '/drinks/list', exact: true, name: 'Drinks List', component: DrinkList, value: 'list_Drinks' },
  { path: '/drinks/view/:id', name: 'View Drinks', component: ViewDrinks, value: 'view_Drinks' },
  { path: '/equipments', exact: true, name: 'Basic Equipments', component: BasicEquipments, value: 'equipments' },
  { path: '/activities', exact: true, name: 'New Activities', component: NewActivities, value: 'activities' },
  { path: '/reports', exact: true, name: 'Financial Reports', component: FinancialReports, value: 'reports' }
];


export default routes;
