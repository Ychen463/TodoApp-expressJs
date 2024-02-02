import express from 'express' //导入 Express 框架，用于构建 Web 服务器。
import cors from 'cors'; //导入 CORS（Cross-Origin Resource Sharing）中间件，用于允许跨域请求。
import morgan from 'morgan'; //导入日志中间件，用于记录请求日志，方便开发和调试。
import TodoRouter from './routes/todoRoutes.js'; //导入自定义的路由模块，这个模块定义了处理待办事项（To-Do）相关请求的路由。

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(morgan('dev'));

app.use("",TodoRouter);

// 对于所有未被前面路由处理的请求，返回一个 404 错误响应。
// 这是一个通用的错误处理，用于捕获和响应任何未定义路由的请求。
app.all("*",(req,res)=>{
    return res.status(404).json("404 Not Found.");
})
export default app;
