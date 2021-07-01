import {Router} from "express";
import { CreateUserController } from "./src/controllers/CreatUserController";
import { CreateTagController } from "./src/controllers/CreateTagController";
import { ensureAdmin } from "./src/middlewares/ensureAdmin";
import{AuthenticateUserController} from "./src/controllers/AuthenticateUserController"
import { CreateComplimentController } from "./src/controllers/CreateComplimentController";
import { ensureAuthenticated} from "./src/middlewares/ensureAuthenticated";
import { ListUserSendComplimentsController } from "./src/controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./src/controllers/ListUserReceiveComplimentsController";
import { ListTagsController } from "./src/controllers/ListTagsController";
import { ListUsersController } from "./src/controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();


router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle);
router.get("/tags", listTagsController.handle)
router.post("/users",createUserController.handle);
router.post("/login", authenticateUserController.handle)
router.post("/compliments", ensureAuthenticated, createComplimentController.handle);

router.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle);
router.get("/users/compliments/receive",ensureAuthenticated, listUserSendComplimentsController.handle)
router.get("/users", ensureAuthenticated, listUsersController.handle);

export {router};