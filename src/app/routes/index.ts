import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const routes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
];

routes.map(({ path, route }) => {
  router.use(path, route);
});

export const appRouter = router;
