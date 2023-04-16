const fs = require('fs');
const path = require('path');

//const { readJSON, writeJSON } = require('../oldDataBase/');
/*  requiere express-validator*/
const { validationResult } = require("express-validator");


//const products = readJSON('products.json');
//const arrayDeCategorias = readJSON('categories.json');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const {Product, Product_category} = require('../database/models');

module.exports ={
    adminHome: (req, res) => {
      Product.findAll()
      .then(products =>{
        return res.render("admin/adminHome",{
          products,
          session: req.session,
    
        })
      })
      .catch(error => console.log(error))/* ok */
    },
    create: (req, res) => {
      const products = Product.findAll()
      const arrayDeCategorias = Product_category.findAll()
      Promise.all([products, arrayDeCategorias])
      .then(([products, arrayDeCategorias])=>{
        res.render('admin/adminAdd' , {
          products,
          arrayDeCategorias,
          session: req.session,
        });
      })
      .catch(error => console.log(error))/* ok */
        
    },
    store: (req, res) => {

      const errors = validationResult(req);
     /*  let lastId = products[products.length - 1].id; */
     
      if(errors.isEmpty()) {

          let newProduct = {
              /* id : lastId + 1, */
              name : req.body.name,
              brand : req.body.brand,
              /* category : req.body.category, */
              lastname : req.body.lastname,
              price : req.body.price,
              discount : req.body.discount,
              stock: req.body.stock,
              description : req.body.description,
              cpu : req.body.cpu,
              graficCard : req.body.graficCard,
              so : req.body.so,
              ram : req.body.ram,
              capacity : req.body.capacity,
              puertos : req.body.puertos,
              hdmi : req.body.hdmi,
              ethernet : req.body.ethernet,
              usb : req.body.usb,
              wifi : req.body.wifi,
              webCam : req.body.webCam,
              bluetooth : req.body.bluetooth,
              screenSize : req.body.screenSize,
              display : req.body.display,
              resolution : req.body.resolution,
              Conection : req.body.Conection,
              weight : req.body.weight,
              high : req.body.high,
              width : req.body.width,
              depth : req.body.depth,
              product_category_id:  req.body.category,
              /* image: req.files ? req.files.map(image => image.filename) : ["default-image.png"],  */
          };
          Product.create(newProduct)
          .then(product => {
            if(req.files.length === 0){
              Image.create({
                name: "default-image.png" ,
                product_id: product.id,
              }).then(() =>{
               return res.redirect("/products")
              });
            }else {
              const files = req.files.map(file =>{
                return{
                  name: file.filename,
                  product_id: product.id
                };
              });
              Image.bulkCreate(files).then(()=>{
                return res.redirect("/products")
              })  
            };
          })
          .catch(error => console.log(error));
        } else{
          const product = Product.findAll()
          const arrayDeCategorias = Product_category.findAll()

          Promise.all([product, arrayDeCategorias])
          .then(([product, arrayDeCategorias])=>{
            return res.render("admin/adminAdd", {
              product,
              arrayDeCategorias,
              errors : errors.mapped(),
              session: req.session,
              old : req.body,
          })
        })
        .catch(error => console.log(error))
        }

     /*      products.push(newProduct);

          writeJSON("products.json", products);

           */
     

      /* Fin del condicional */
  },
    edit: (req, res) => {
      
        let productToEdit = products.find(
          (product) => product.id == +req.params.id);
    
        res.render("admin/adminEdit", {
          ...productToEdit,
          session: req.session,
          toThousand
        });
      },
      // Update - Method to update

      update: (req, res) => {
        
          const errors = validationResult(req);

          if(req.fileValidatorError){
            errors.errors.push({
                value: "",
                msg: req.fileValidatorError,
                param: "image",
                location: "file",
            });
        }

        if(errors.isEmpty()){
            const { name, price, category,description, discount, brand, stock } = req.body;
            
            const productsModify = products.map((product) => { 
            if(product.id === +req.params.id){
            let productModify =  {
                        ...product,
                        name: name.trim(),
                        price: +price,
                        discount: +discount,
                        category,
                        brand,
                        stock: +stock,
                        description: description.trim(),
                        image: req.files ? req.files.map(image => image.filename) : ["default-image.png"],
                    };
                  /*   if (req.files) {
                        fs.existsSync(`./public/images/products/${product.image}`) &&
                          fs.unlinkSync(`./public/images/products/${product.image}`);
                      } */
                      return productModify;
            }
                return product;
            });

     writeJSON("products.json", productsModify);

      return res.redirect("/admin/home");
    } else {
        const products = readJSON("products.json");
        const product = products.find((product) => product.id === +req.params.id);
      if (req.file) {
        fs.existsSync(`./public/images/products/${req.file.filename}`) &&
          fs.unlinkSync(`./public/images/products/${req.file.filename}`);
      }

      return res.render("admin/adminEdit", {
        ...product,
        errors: errors.mapped(),
        old: req.body,
        session: req.session,
        toThousand
      });
    }
  },     
    
    destroy: (req,res) => {
        let productId = Number(req.params.id);
        
        products.forEach(product => {
          if(product.id === productId){
            let newArrayProducts = products.indexOf(product);
            products.splice(newArrayProducts, 1)
          }
        })
        writeJSON('products.json',products);
        res.redirect("/admin/home");
    },

    
        
}
