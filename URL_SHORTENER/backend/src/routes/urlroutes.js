import express from 'express'

import generateCode from '../utils/generatecode.js'

import urlModel from '../models/url.model.js'

const router = express.Router()

/*

  post /api/url

*/

router.post('/', async function (req, res) {

    const { url } = req.body;

    //validation for url 

    if (!url) {
        return res.status(400).json({ error: "url required" })
    }

    if (url.startsWith("http://") == false && url.startsWith("https://") == false) {
        return res.status(400).json({ error: "enter valid url " })
    }

    if (url.length > 2048) {
        return res.status(400).json({ error: "url is too long" })
    }

    const code = generateCode()

    const newUrl = await urlModel.create({

        originalUrl: url,
        shortenUrl: code

    })

    return res.status(201).json({

        message: "url is shortend ",

        data: {

            originalUrl: newUrl.originalUrl,
            shortenUrl: newUrl.shortenUrl

        }

    })

})

// get api 
router.get('/',async function (req,res) {

    // sari urls backend se hi leni padegi so ..
    const allUrls = await urlModel.find();

    return res.status(200).json({
        message:"all urls fetched successfully",
        data:{
            allUrls
        }
    })

    
})

// redirect api 


export default router