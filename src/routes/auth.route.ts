import AuthController from '@controllers/auth.controller';
import { RegisterUserDto, LoginUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class AuthRoute implements Routes {
  public path = '/api/auth/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(RegisterUserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}login`, validationMiddleware(LoginUserDto, 'body'), this.authController.logIn);
  }
}

export default AuthRoute;
