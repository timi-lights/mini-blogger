import AuthService from '@/services/auth.service';

import { NextFunction, Request, Response } from 'express';

class IndexController {
  public authService = new AuthService();

  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
