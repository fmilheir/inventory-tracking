require('../models/database');
const Data = require('../models/Data');

exports.test = async(req, res) => {
    try{
        const limit = 15;
        let items;
        if (req.query.item ){
            items = await Data.find({'object' : req.query.item }).limit(limit);
        }
        else if (req.query.type === "true") {
            items = await Data.find({'type' : true}).limit(limit);
        } else if(req.query.type === "false") {
            items = await Data.find({'type' : false}).limit(limit);
        } else {
            items = await Data.find({}).sort({_id: -1}).limit(limit);
        }
        res.render('vizualization', {title: 'vizualization', items});
        
    }
    catch(error){
        console.log("error" + error);
    }
}






exports.delete= async(req, res) =>{
        const id = req.params.id;
        try {
      
            Data.findOne({_id: id}, function(err, updateRecord) {
                updateRecord.type = false;
                updateRecord.save(function(err, newRecord) {
                    record = newRecord;
                });
            });

          res.redirect("/vizualization");
        } catch (e) {
          res.status(404).send({
            message: `could not delete  record ${id}.`,
          });
        }
}

exports.edit = async(req, res) =>{
    const id = req.params.id;
    res.render('edit');
}

exports.update= async(req, res) =>{
    const id = req.params.id;
    try {
        Data.findOne({_id: id}, function(err, updateRecord) {
            updateRecord.quantity = req.body.number;
            updateRecord.save(function(err, newRecord) {
                record = newRecord;
            });
        });
        res.redirect('/vizualization');
        
    } 
    catch (error) {

        console.log("couldnt update the item")
    }
    
}

exports.graphic = async(req, res) =>{
    res.render('view_graphics');
}

exports.add = async(req, res) =>{
   
    res.render('add', {title: 'add item'});
}

exports.addOnPost = async(req, res) =>{
    try{
        
        const newData =  new Data({
            object: req.body.item,
            type : true,
            quantity: req.body.number
        });

        await newData.save();
        res.redirect('/vizualization');
    
  }
   catch (error) 
   {
        req.flash('infoErrors', error);
        res.redirect('/add');
  }
}

