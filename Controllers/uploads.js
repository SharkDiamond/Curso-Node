

const cargarArchivo=(req,res)=>{

    
    console.log(req.files);
    res.json({
        msg:"subiendo archivo..."

    })


}


module.exports={

    cargarArchivo
}