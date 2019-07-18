import React from 'react';
import { Route } from 'react-router-dom';
import { loginRoute, searchRoute, searchDetailsRoute } from './route-constants';
import Login from '../login/Login';
import Search from '../search/Search';
import SearchDetails from '../search/Search-details';

// route config
const routes = [
   {
     path: '/',
     component: Login,
     //pathMatch: 'full'
   },
  {
    path: `/${loginRoute}`,
    component: Login,
    
  },
  {
    path: `/${searchRoute}`,
    component: Search
  },
  {
    path: `/${searchDetailsRoute}`,
    component: SearchDetails
  }
];

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = route => (
  <Route
    path={route.path} exact
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

const CustomRoutes = () => (
  <main>
    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
  </main>
);

export default CustomRoutes;
