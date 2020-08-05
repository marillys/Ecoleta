import{Request, Response} from 'express';
import knex from '../database/connection';

class ItemsController{
    async index(request:Request, response:Response) {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
        return{
            id:item.id,
            title: item.title,
            image_url: 'http://192.168.0.106:3333/uploads/'+item.image,
            //image_url:item.image
        };
    });//transformar o dado em um novo formato mais acessível à pessoa que requisitou

    return response.json(serializedItems);
}}

export default ItemsController;