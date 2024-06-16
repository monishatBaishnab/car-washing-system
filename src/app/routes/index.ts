import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { ServiceRoutes } from '../modules/service/service.route';

const router = Router();

const routes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
];

routes.map(({ path, route }) => {
  router.use(path, route);
});

export const appRouter = router;
