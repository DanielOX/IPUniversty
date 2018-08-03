const express = require('express')
const axios = require('axios');
const hbs = require('hbs')
const app = express();

app.use(require('express-ajax'));
app.set('view engine','hbs')
hbs.registerHelper('studentView',(data)=>{
    return `
    <div>
        <h5>Student Name : ${data[0].Name}</h5>   
        <h5>Batch : ${data[0].Batch}</h5>
        <h5>Examination : ${data[0].Examination}</h5>
        <h5>Institution : ${data[0].Institution}</h5>
        </div>
    `
})
hbs.registerHelper('jsonParse',(data) =>{
    let dataToView = "" ;
    data.forEach(result => { 
    result.Marks.forEach( marks => dataToView += `
    
     <tr>
     <td>${marks.Name}</td>
     <td>${marks.Credits}</td>
     <td>${marks.Internal}</td>
     <td>${marks.External}</td>
     <td>${marks.Total}</td>
     <td>${marks.Grade}</td>
     </tr>
     `)
     dataToView += `<tr> <td><br> <strong><br> Showing above result for semester : ${result.Semester} <br> </strong><br> </td> </tr>`

    })
    return dataToView

})
app.get('/',(request,response) => {
    response.render('input.hbs')
});


app.get('/request/:rollNumber',(req,res,next) => {
    const getRollInfo = (rollNumber) => {
        axios.get(`http://outcome-ipu.herokuapp.com/find/${rollNumber}`)
        .then(data => { res.render('result.hbs',data)})
        .catch(err => {res.send(err);next();} )
    }    
    getRollInfo(req.params.rollNumber)
});

app.listen(3000)