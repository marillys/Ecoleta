import multer from 'multer';
import path from 'path';
import crypto from 'crypto';//gerar um nome unico para a imagem

//definir onde serão salvos as imagens dos uploads
export default{
    storage: multer.diskStorage({
        destination: path.resolve(__dirname,'..','..','uploads'),
        filename(request, file, callback){
            //nome do arquivo
            
            //gera um hash
            const hash = crypto.randomBytes(6).toString('hex');

            //concatena o hash com o nome do arquivo do usuário
            const fileName = `${hash}-${file.originalname}`;

            callback(null,fileName);
        }
    }),
};