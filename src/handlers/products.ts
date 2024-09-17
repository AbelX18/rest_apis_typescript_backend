import { Request,Response} from 'express'
import Product from '../models/Product.model'

export const getProducts= async(req:Request, res:Response) =>{
    const products = await Product.findAll({
        order: [
            ['id', 'DESC']
        ]
    })
    res.json({data: products})
}

export const getProductsById= async(req:Request, res:Response) =>{
    const { id } = req.params
    const products = await Product.findByPk(id)

    if (!products){
        return res.status(404).json({
            error: 'Producto no Encontrado'
        })
    }
    res.json({data : products})
}

export const createProduct = async (req:Request,res: Response) =>{
    const product = await Product.create(req.body)

    res.status(201).json({data: product})
}

export const updateProduct= async (req:Request,res:Response) =>{
    
    const { id } = req.params
    const products = await Product.findByPk(id)

    if (!products){
        return res.status(404).json({
            error: 'Producto no Encontrado'
        })
    }

    
    // Actualizar
    await products.update(req.body)
    await products.save()

    res.json({data : products})

}

export const updateAvailability= async(req:Request,res:Response) =>{
    
    const { id } = req.params
    const products = await Product.findByPk(id)

    if (!products){
        return res.status(404).json({
            error: 'Producto no Encontrado'
        })
    }

    
    // Actualizar
    products.availability = !products.dataValues.availability
    await products.save()

    res.json({data : products})

}

export const deleteProduct= async(req:Request,res:Response) =>{
    
    const { id } = req.params
    const products = await Product.findByPk(id)

    if (!products){
        return res.status(404).json({
            error: 'Producto no Encontrado'
        })
    }

    await products.destroy()
    res.json({data:'Producto Eliminado'})
}