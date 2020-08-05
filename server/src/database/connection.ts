import knex from 'knex';
import path from 'path';//usado quando precisa referenciar caminhos dentro do node

const connection = knex({
    client: 'sqlite3',
    connection:{
        filename: path.resolve(__dirname, 'database.sqlite'),//passa argumentos e concatena como se fossem pastas, padroniza conforme o sistema operacional
    },
    useNullAsDefault:true,
});

export default connection;