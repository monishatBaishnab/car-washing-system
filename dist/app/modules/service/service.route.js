"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const service_validation_1 = require("./service.validation");
const service_controller_1 = require("./service.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.get('/', service_controller_1.ServiceControllers.fetchAllService);
router.get('/:id', service_controller_1.ServiceControllers.fetchSingleService);
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(service_validation_1.ServiceValidations.createServiceValidation), service_controller_1.ServiceControllers.createService);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(service_validation_1.ServiceValidations.updateServiceValidation), service_controller_1.ServiceControllers.updateService);
// router.put(
//   '/:id/featured-course',
//   auth(USER_ROLE.admin as TUserRole),
//   validateRequest(ServiceValidations.updateServiceValidation),
//   ServiceControllers.updateService,
// );
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), service_controller_1.ServiceControllers.deleteService);
exports.ServiceRoutes = router;
