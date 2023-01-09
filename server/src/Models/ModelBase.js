const knex = require("../Database");
module.exports = ({
  name = '',
  tableName = '',
  selectableProps = [],
  timeout = 1000
}) => {
    const knex = require('../Database')
    const conn = knex(tableName)

    const create = async (props) => {
        delete props.id
        return conn.insert(props);
    }

    const findAll = async (filters) => {
        const query = knex.select(selectableProps).from(tableName);

        if(filters){
            return query.where(filters);
        }

        return query;
    }

    const find = async (filters, columns) => knex.select(columns).from(tableName).where(filters).first();

    const update = (id, props) => {
        delete props.id

        return knex.update(props)
            .from(tableName)
            .where({
                id
            })
            .returning(selectableProps);
    }

    const destroy = id => {
        return knex.del()
            .from(tableName)
            .where({
                id
            });
    }

    return {
        name,
        tableName,
        selectableProps,
        timeout,
        create,
        findAll,
        find,
        update,
        destroy
    }
}