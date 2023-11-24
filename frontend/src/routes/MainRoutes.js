import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
// import { element } from 'prop-types';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
// render - utilities
const CustomerPage = Loadable(lazy(() => import('pages/customer-page')));
const AdminPage = Loadable(lazy(() => import('pages/admin-page')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/chart',
      element: <DashboardDefault />
    },
    {
      path: 'adminManage',
      element: <AdminPage />
    },
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'customerManage',
      element: <CustomerPage />
    },
    {
      path: '/icons/ant',
      element: <AntIcons />
    }
  ]
};

export default MainRoutes;
