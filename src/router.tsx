import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from './utils/layout';
import Intro from './routes/Intro';
import Dashboard from './routes/Dashboard';
import Redirect from './utils/redirect';
import Error404 from './routes/404';
import BudgetDetails from './routes/BudgetDetails';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} path='/' errorElement={<Error404 />}>
      <Route
        element={
          <Redirect>
            <Intro />
          </Redirect>
        }
        index
      />
      <Route
        element={
          <Redirect>
            <Dashboard />
          </Redirect>
        }
        path='dashboard'
      />
      <Route path='budget/:id' element={<BudgetDetails />} />
    </Route>
  )
);

export default router;
