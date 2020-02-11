import MainIndex from '../views/Main/MainIndex'
import LogIn from '../views/Main/LogIn'
import ListInputs from '../views/Inputs/ListInputs'
import GrowingMediaInputs from '../views/Inputs/GrowingMediaInputs'
import FertilizerInputs from '../views/Inputs/FertilizerInputs'
import SeedInputs from '../views/Inputs/SeedInputs'
import Accounts from '../views/Finance/Accounts'
import Transfers from '../views/Finance/Transfers'
import Transactions from '../views/Finance/Transactions'
import Reconciliations from '../views/Finance/Reconciliations'
import IncomeSummary from '../views/Reports/IncomeSummary'
import ExpenseSummary from '../views/Reports/ExpenseSummary'

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/main/index', exact: true, name: 'Dashboard', component: MainIndex, value: 'main_Index' },
  { path: '/login', exact: true, name: 'Login', component: LogIn, value: 'login' },
  { path: '/inputs/list', exact: true, name: 'Input List', component: ListInputs, value: 'list_Inputs' },
  { path: '/inputs/media', exact: true, name: 'Growing Media', component: GrowingMediaInputs, value: 'growong_media_Inputs' },
  { path: '/inputs/fertilizer', exact: true, name: 'Fertilizers', component: FertilizerInputs, value: 'fertilizer_Inputs' },
  { path: '/inputs/seeds', exact: true, name: 'Seeds', component: SeedInputs, value: 'seeds_Inputs' },
  { path: '/finance/accounts', exact: true, name: 'Accounts', component: Accounts, value: 'fin_Accounts' },
  { path: '/finance/transfers', exact: true, name: 'Transfers', component: Transfers, value: 'fin_Transfers' },
  { path: '/finance/transactions', exact: true, name: 'Transactions', component: Transactions, value: 'fin_Transactions' },
  { path: '/finance/reconciliations', exact: true, name: 'Reconciliations', component: Reconciliations, value: 'fin_Reconciliations' },
  { path: '/reports/income', exact: true, name: 'Income Summary', component: IncomeSummary, value: 'reports_Income' },
  { path: '/reports/expense', exact: true, name: 'Expense Summary', component: ExpenseSummary, value: 'reports_Expense' }
];


export default routes;
