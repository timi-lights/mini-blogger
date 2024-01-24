import { PostController } from '@/controllers/posts.controller';
import { CreateAPostDto } from '@/dtos/post.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class PostsRoute implements Routes {
  public path = '/api/posts';
  public router = Router();
  public postController = new PostController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.postController.getAllBlogPosts);
    this.router.put(`${this.path}/:id`, authMiddleware, this.postController.updateBlogPost);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateAPostDto, 'body'), this.postController.createBlogPost);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.postController.deleteBlogPost);
  }
}

export default PostsRoute;
