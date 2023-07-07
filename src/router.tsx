import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from './layout';
import Intro from './components/Intro';
import Dashboard from './components/Dashboard';
import Redirect from './utils/redirect';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} path='/'>
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
    </Route>
  )
);

export default router;
