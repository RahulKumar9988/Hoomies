import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from './router/users';
import { postRoute } from './router/post';

const app = new Hono()

app.use('/*',cors());
app.get('/',async (c)=>{
    return c.text('Hello, Hono!')
})
app.route('/api/v1/users',userRouter);
app.route('/api/v1/post',postRoute);


export default app
