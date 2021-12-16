const datos=[{id:8761,
             name:'Fuse',
             correo:'lperez@fusetelecom.com'},{
             id:1355,
             name:'WorldNet Telecommunications,',
             correo:'mcorrea@worldnetpr.com'
             },{
             id:15700,
             name:'Liberty Business',
             correo:'accounts-payable@libertypr.com'
             }];

const emailsAparte={

    8761:"support@fusetelecom.com", //FUSE
    1355:"rocgroup@worldnetpr.com", //WORLDNET
    15700:"amarilis.montanez@libertypr.com" //LIBERTY

}

datos.forEach(element=>{

    //CONVIRTIENDO A STRING EL ID
    let idCuenta=element.id.toString();
    //COMPROBANDO SI EL ID ESTA DENTRO DE LOS SELECCIONADOS
   Object.keys(emailsAparte).includes(idCuenta) ? element.correo=emailsAparte[idCuenta] : element.correo;

});


const test=[{data:"",nombre:"gabirle",error_code:1}]



test.forEach(element=>{

    if (element.error_code) {
        console.log(element);
    }
    

})
