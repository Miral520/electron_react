import Index from '@pages/index/index';

const routes = [
    {
      path: "/",
      component: Index,
      exact: true,
    },
    // {
    //   path: "/app",
    //   component: App,
    //   exact: false,
    //   routes: [
    //     {
    //       path: "/app/index",
    //       component: Bus
    //     },
    //   ]
    // }
];

export default routes;