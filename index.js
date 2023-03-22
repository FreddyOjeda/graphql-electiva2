const express = require('express')
const express_graphql=require('express-graphql').graphqlHTTP

const { buildSchema} =require('graphql')
const app= express()

//data
const {products} = require('./data/products.json')


//setters
app.set('port',process.env.PORT || 3000)


const getProduct = (args)=>{
    let id = args.id
    return products.filter(product => product.id==id)[0]
}

const getProducts = (args)=>{
    
    if(args.name){
        let name = args.name
        return products.filter(product => product.name==name)
    }

    return products
}
const root = {
    product : getProduct,
    products :getProducts,
}

const schema = buildSchema(`
    type Query{
        product(id:Int!) : Product
        products(name:String):[Product]
    },
    type Product{
        id:Int
        name:String
        description:String
        image:String
        value:Int
        size:String
        sale:Int
    }
`)

app.use('/graphql', express_graphql({
    schema:schema,
    rootValue:root,
    graphiql :true
}))

app.listen(app.get('port'),()=> console.log(`Server listening at ${app.get('port')}`))