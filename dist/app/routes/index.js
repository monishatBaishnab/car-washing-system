"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const router = (0, express_1.Router)();
const routes = [
    {
        path: '/auth',
        route: user_route_1.UserRoutes,
    },
];
routes.map(({ path, route }) => {
    router.use(path, route);
});
exports.appRouter = router;
