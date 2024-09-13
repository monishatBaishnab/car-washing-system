import { Router } from 'express';
import { UserControllers } from './user.controller';
import { UserValidations } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { TUserRole } from './user.interface';

const router = Router();

router.get(
  '/users',
  auth(USER_ROLE.admin as TUserRole as TUserRole),
  UserControllers.fetchAllUser,
);

router.get(
  '/:email',
  auth(USER_ROLE.admin as TUserRole, USER_ROLE.user as TUserRole),
  UserControllers.fetchUserInfo,
);

router.post(
  '/register',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);

router.patch(
  '/create-admin/:userId',
  auth(USER_ROLE.admin as TUserRole),
  UserControllers.createAdmin,
);
router.patch(
  '/update-profile/:userId',
  auth(USER_ROLE.admin as TUserRole, USER_ROLE.user as TUserRole),
  UserControllers.updateProfile,
);

router.post(
  '/login',
  validateRequest(UserValidations.loginUserValidationSchema),
  UserControllers.loginUser,
);

export const UserRoutes = router;
