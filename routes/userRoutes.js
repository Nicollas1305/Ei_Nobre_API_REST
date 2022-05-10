const router = require('express').Router()
const User = require('../models/User')
const multer = require('multer')


// Create User
router.post('/Create', async (req, res) => {
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

// Buscar todos
router.get('/Read', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})



// Buscar Por ID
router.get('/ReadId/:id', async (req, res) => {
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





const ImageModel = require("../models/Image")

//Image Storage
const Storage = multer.diskStorage({
    destination: 'profileUploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const profileUploads = multer({
    storage: Storage
}).single('profileImage')

router.post('/profileUploads', (req, res) => {
    profileUploads(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            const newImage = new ImageModel({
                name: req.body.name,
                image: {
                    data: req.file.filename,
                    contentType: 'image/png'
                }
            })
            newImage.save()
                .then(() => res.send("Successfullu uploaded")).catch((err) => console.log(err))
        }
    })
})
module.exports = router