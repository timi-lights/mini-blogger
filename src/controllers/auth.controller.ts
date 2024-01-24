import { LoginUserDto, RegisterUserDto } from '@/dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { NextFunction, Request, Response } from 'express';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: RegisterUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);
      res.status(201).json({ status: 'success', data: signUpUserData, message: 'Signup successfull' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginUserDto = req.body;
      const { token, findUser } = await this.authService.login(userData);

      res.status(200).json({ status: 'success', data: { token, findUser }, message: 'Login Successfull' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default AuthController;
