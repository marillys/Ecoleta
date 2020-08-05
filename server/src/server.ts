import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from  './routes';

const app = express();

app.use(cors());
app.use(express.json());//adiciona um plugin para entender o body das requisições

app.use(routes);
//rota para acessar as imagens
app.use('/uploads',express.static(path.resolve(__dirname,'..','uploads')));

app.listen(3333);
