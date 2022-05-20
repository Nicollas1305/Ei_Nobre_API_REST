const router = require('express').Router()
const User = require('../models/Product')
const multer = require('multer')


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
    upload(req, res, (err) => {
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