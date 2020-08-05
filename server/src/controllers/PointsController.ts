import{Request, Response} from 'express';
import knex from '../database/connection';

class PointsController{
    async index(request:Request, response:Response){
        const{city,uf,items} = request.query;

        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));

        const points = await knex('points')
        .join('point_items','points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id',parsedItems)
        .where('city',String(city))
        .where('uf',String(uf))
        .distinct()
        .select('points.*');

    const serializedPoints = points.map(point => {
        return{
            ...point,//retorna tudo
            image_url: 'http://192.168.0.106:3333/uploads/'+point.image,
            //image_url:item.image
        };
    });//transformar o dado em um novo formato mais acessível à pessoa que requisitou
    
        return response.json(serializedPoints);

        //return response.json(points);
    };

    async show(request:Request, response:Response){
        const { id } =request.params;

        const point = await knex('points').where('id',id).first();

        if(!point){
            return response.status(400).json({message: 'Point not found'});
        }

        const serializedPoint = {
            ...point,//retorna tudo
            image_url: 'http://192.168.0.106:3333/uploads/'+point.image,
                //image_url:item.image
            
        };//transformar o dado em um novo formato mais acessível à pessoa que requisitou

        const items = await knex('items')
        .join('point_items','items.id','=', 'point_items.item_id')
        .where('point_items.point_id',id)
        .select('items.title');

        return response.json({point: serializedPoint,items});
    }

    async create (request:Request, response:Response) {
        const{
            name,
            email,
            whatsapp,
            latitude,
            longitude, 
            city,
            uf,
            items,
        } = request.body;
    
        //Executar uma transação, um comando não executa se outro der erro
        const trx = await knex.transaction();
        console.log("1");
        

        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude, 
            city,
            uf,
        };

        console.log(point.city + " " + point.uf)

        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];

        console.log("2");
    
        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number)=>{
                return{
                    item_id,
                    point_id,
                };
            });
        console.log("3")
        await trx('point_items').insert(pointItems);

        //inserir a transação
        await trx.commit();
    
        return response.json({
            id: point_id,
            ...point,
        });
    }
}
export default PointsController;