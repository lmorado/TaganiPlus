import MainIndex from '../views/Main'
import ListInputs from '../views/Inputs/ListInputs'
import GrowingMediaInputs from '../views/Inputs/GrowingMediaInputs'
import FertilizerInputs from '../views/Inputs/FertilizerInputs'
import SeedInputs from '../views/Inputs/SeedInputs'
import NewActivities from '../views/Activities/NewActivities'
import IncomeSummary from '../views/Reports/IncomeSummary'
import ExpenseSummary from '../views/Reports/ExpenseSummary'

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/main', exact: true, name: 'Dashboard', component: MainIndex, value: 'main_Index' },
  { path: '/inputs/list', exact: true, name: 'Input List', component: ListInputs, value: 'list_Inputs' },
  { path: '/inputs/media', exact: true, name: 'Growing Media', component: GrowingMediaInputs, value: 'growong_media_Inputs' },
  { path: '/inputs/fertilizer', exact: true, name: 'Fertilizers', component: FertilizerInputs, value: 'fertilizer_Inputs' },
  { path: '/inputs/seeds', exact: true, name: 'Seeds', component: SeedInputs, value: 'seeds_Inputs' },
  { path: '/activities', exact: true, name: 'New Activities', component: NewActivities, value: 'activities' },
  { path: '/reports/income', exact: true, name: 'Income Summary', component: IncomeSummary, value: 'reports_Income' },
  { path: '/reports/expense', exact: true, name: 'Expense Summary', component: ExpenseSummary, value: 'reports_Expense' }
];


export default routes;
