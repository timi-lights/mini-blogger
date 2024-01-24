import { HttpException } from '@/exceptions/HttpException';
import { Post } from '@/interfaces/post.interface';
import postModel from '@/models/posts.model';

export class PostService {
  private postsRepo = postModel;

  async createBlogPost(payload: Post): Promise<Post> {
    const postExist: Post = await this.postsRepo.findOne({
      title: payload.title,
    });

    if (postExist) {
      throw new HttpException(409, 'This post title already exists', {});
    }

    const post: Post = await this.postsRepo.create({ ...payload });
    return post;
  }

  async updateBlogPost(id: string, payload: Post): Promise<Post> {
    const postExist: Post = await this.postsRepo.findById(id);

    if (!postExist) {
      throw new HttpException(409, 'This post does not exist', {});
    }

    const newPost: Post = await this.postsRepo.findByIdAndUpdate(
      id,
      {
        ...payload,
      },
      { new: true },
    );

    return newPost;
  }

  async getAllBlogPosts(page: number, pageSize: number, searchQuery?: string): Promise<Post[]> {
    const skip = (page - 1) * pageSize;

    let query = {};
    if (searchQuery) {
      query = {
        $or: [{ title: { $regex: new RegExp(searchQuery, 'i') } }, { content: { $regex: new RegExp(searchQuery, 'i') } }],
      };
    }

    const posts = await this.postsRepo.find(query).skip(skip).limit(pageSize);

    return posts;
  }

  async deleteBlogPost(id: string): Promise<void> {
    const post = await this.postsRepo.findByIdAndDelete(id);

    if (!post) {
      throw new HttpException(404, 'Post not found', {});
    }
  }
}
