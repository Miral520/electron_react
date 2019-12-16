import loadable from '@utils/loadable'
const Index = loadable(()=>import('@pages/index/index'))
// import Index from '@pages/index/index';

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