import crypto from 'crypto'


const generateCode = ()=>{

    const mainString = "zxcvbnmlkjhgfdsaqwertyuiop1234567890ZXCVBNMLKJHGFDSAQWERTYUIOP"

    let shorten = ""

    for (let i = 0 ; i<6;i++){
        shorten += mainString.charAt(Math.floor(Math.random() * 62))
    }

    console.log(shorten)

    return shorten

}

export default generateCode