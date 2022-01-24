var express = require('express');
var router = express.Router();
const models = require('../../models')
const helpers = require('../../helpers/util')
let Response = require('../../wrapper/response')
const path = require('path')
const fs = require('fs')

router.get('/', helpers.isLoggedIn, async function (req, res, next) {
  try {
    let products = await models.Product.findAll({})
    res.json(new Response(products))
  } catch (err) {
    console.error(err)
    res.json(new Response(null, 'Terjadi kesalahan'))
  }
});

router.get('/:id', helpers.isLoggedIn, async function (req, res, next) {
  try {
    let product = await models.Product.findOne({ where: { id: req.params.id } })
    res.json(new Response(product))
  } catch (err) {
    console.error(err)
    res.json(new Response(null, 'Terjadi kesalahan'))
  }
});

router.post('/', helpers.isLoggedIn, async function (req, res, next) {
  try {
    const { name, ...rest } = req.body;
    let product = {
      name,
      ...rest
    }
    if (req.files) {
      let files = [];
      let promiseArray = [];
      let imagesArr = Array.isArray(req.files.images) ? req.files.images : [req.files.images]

      imagesArr.forEach((f) => {
        let filename = `${Date.now()}${f.name}`
        let fileuri = path.join(__dirname, '..', '..', 'public', 'files', filename)
        if (f.mimetype.includes('image')) {
          files.push({ name: f.name, type: f.mimetype, path: `/files/${filename}` })
          promiseArray.push(f.mv(fileuri))
        }
      })
      await Promise.all(promiseArray)
      product.images = files
    }
    let productdata = await models.Product.create(product)
    res.json(new Response(productdata))
  } catch (err) {
    console.error(err)
    res.json(new Response(null, 'Terjadi kesalahan'))
  }
});

router.put('/:id', helpers.isLoggedIn, async function (req, res, next) {
  try {
    const { name, ...rest } = req.body
    let product = {
      name,
      ...rest
    }

    if (product.deletedFiles) {
      deletedFiles = JSON.parse(product.deletedFiles)
      deletedFiles.forEach((f) => {
        try {
          fs.unlinkSync(path.join(__dirname, '..', '..', 'public', f.path));
        } catch (error) {
          console.error('file not found');
        }
      })
    }

    if (product.images) {
      product.images = JSON.parse(product.images)
    }

    if (req.files) {
      let files = [];
      let promiseArray = [];
      let imagesArr = Array.isArray(req.files.images) ? req.files.images : [req.files.images]

      imagesArr.forEach((f) => {
        let filename = `${Date.now()}${f.name}`
        let fileuri = path.join(__dirname, '..', '..', 'public', 'files', filename)
        if (f.mimetype.includes('image')) {
          files.push({ name: f.name, type: f.mimetype, path: `/files/${filename}` })
          promiseArray.push(f.mv(fileuri))
        }
      })
      await Promise.all(promiseArray)

      if (product.images) {
        product.images = product.images.concat(files)
      } else {
        product.images = files
      }
    }

    let productdata = (await models.Product.update(product, { where: { id: req.params.id }, returning: true }))[1]
    res.json(new Response(productdata))
  } catch (err) {
    console.error(err)
    res.json(new Response(null, 'Terjadi kesalahan'))
  }
});

router.delete('/:id', helpers.isLoggedIn, async function (req, res, next) {
  try {
    let product = await models.Product.findOne({ where: { id: req.params.id } });
    if (product.images) {
      product.images.forEach((f) => {
        try {
          fs.unlinkSync(path.join(__dirname, '..', '..', 'public', f.path));
        } catch (error) {
          console.error('file not found');
        }
      })
    }
    await models.Product.destroy({ where: { id: req.params.id } })
    res.json(new Response(product))
  } catch (err) {
    console.error(err)
    res.json(new Response(null, 'Terjadi kesalahan'))
  }
});

module.exports = router;
