import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import PostsRoute from './routes/post.route';

validateEnv();

const app = new App([new IndexRoute(), new AuthRoute(), new PostsRoute()]);
app.listen();
