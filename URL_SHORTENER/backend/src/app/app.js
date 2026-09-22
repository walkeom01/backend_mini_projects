import express from 'express' 
import urlroutes from '../routes/urlroutes.js'
import urlModel from '../models/url.model.js'

const app = express() 

app.use(express.json())
app.use('/api/url',urlroutes)

app.get("/:code", async function (req,res) {

    const {code} = req.params;

    const url = await urlModel.findOne({
        shortenUrl : code
    })

    if(!url){
        return res.status(404).json({
            error:"url not found"
        })
    }

    res.redirect(302,url.originalUrl)
    
    await urlModel.findOneAndUpdate({
        shortenUrl:code
    },
{
    $inc:{clicks:1}
})
})

export default app