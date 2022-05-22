const router = require('express').Router()
const User = require('../models/User')
const Product = require('../models/Product')
const multer = require('multer')
const Requests = require('../models/Requests')

// Criar Usuários
router.post('/user/Create', async (req, res) => {
    const { name, identity, cpf, address, email, telephone, responsibility, password } = req.body


    if (!name) {
        res.status(422).json({ error: "Nome Obrigatório" })
        return
    }
    const user = {
        name,
        identity,
        cpf,
        address,
        email,
        telephone,
        responsibility,
        password
    }

    try {
        await User.create(user)

        res.status(201).json({ message: "Usuário criado no sistema." })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

// Buscar Usuários
router.get('/user/read', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

// Buscar Usuários por ID
router.get('/user/readId/:id', async (req, res) => {
    try {
        const id = req.params.id

        const user = await User.findOne({ _id: id })


        if (!user) {
            res.status(422).json({ message: "Usuário não encontrado." })
            return
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

// Deletar Usuários
router.delete('/user/delete/:id', async (req, res) => {
    const id = req.params.id

    const user = await User.findOne({ _id: id })

    if (!user) {
        res.status(422).json({ message: "Usuário não encontrado. " })
        return
    }
    try {
        await User.deleteOne({ _id: id })
        res.status(200).json({ message: "Usuário removido com sucesso!" })

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

// Atualizar dados Usuário
router.patch('/user/update/:id', async (req, res) => {
    const id = req.params.id
    const { name, identity, cpf, address, email, telephone, responsibility, password } = req.body


    const user = {
        name,
        identity,
        cpf,
        address,
        email,
        telephone,
        responsibility,
        password
    }

    try {
        const updatedUser = await User.updateOne({
            _id: id
        }, user)

        if (updatedUser.matchedCount === 0) {
            res.status(422).json({ message: "Usuário não encontrado." })
            return
        }
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Image Storage
const Storage = multer.diskStorage({
    destination: 'productImagesUpload',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const productUploads = multer({
    storage: Storage
}).single('productImage')

// Criar Produto
router.post('/product/create', async (req, res) => {
    productUploads(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            const newProduct = new Product({
                name: req.body.name,
                price: req.body.price,
                size: req.body.size,
                description: req.body.description,
                nameImage: req.body.nameImage,
                images: {
                    data: req.file.filename,
                    contentType: 'image/png'
                },
            })
            newProduct.save()
                .then(() => res.send("Successfullu uploaded")).catch((err) => console.log(err))
        }
    })
})

// Buscar Produtos
router.get('/product/read', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

// Buscar Produto por ID
router.get('/product/readId/:id', async (req, res) => {
    try {
        const id = req.params.id

        const user = await Product.findOne({ _id: id })


        if (!user) {
            res.status(422).json({ message: "Usuário não encontrado." })
            return
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

// Deletar Produto
router.delete('/product/delete/:id', async (req, res) => {
    const id = req.params.id

    const product = await Product.findOne({ _id: id })

    if (!product) {
        res.status(422).json({ message: "Usuário não encontrado. " })
        return
    }
    try {
        await Product.deleteOne({ _id: id })
        res.status(200).json({ message: "Usuário removido com sucesso!" })

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})
// Atualizar produto

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Criar Comanda
router.post('/command/create', async (req, res) => {
    const { idRequest, products, value } = req.body

    if (!idRequest) {
        res.status(422).json({ error: "Sem ID PEDIDO" })
        return
    }

    const request = {
        idRequest,
        products,
        value
    }
    try {

        await Requests.create(request)

        res.status(201).json({ message: "Comanda inserida no sistema!!!." })

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

})

// Buscar Comanda
router.get('/command/read', async (req, res) => {
    try {
        const request = await Requests.find()
        res.status(200).json(request)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

// Deletar Comanda
router.delete('/command/delete/:id', async (req, res) => {
    const id = req.params.id

    const command = await Requests.findOne({ _id: id })

    if (!command) {
        res.status(422).json({ message: "Comanda não encontrada. " })
        return
    }
    try {
        await Requests.deleteOne({ _id: id })
        res.status(200).json({ message: "Comanda removida com sucesso!" })

    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

module.exports = router