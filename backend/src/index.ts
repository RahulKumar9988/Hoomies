import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from './router/users';

const app = new Hono()

app.use('/*',cors());
app.route('/api/v1/users',userRouter);

export default app
