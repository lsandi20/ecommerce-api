var express = require('express');
var router = express.Router();
const models = require('../../models')
const helpers = require('../../helpers/util')
let Response = require('../../wrapper/response')

router.get('/', helpers.isLoggedIn, async function (req, res, next) {
  try {
    let categories = await models.Category.findAll({})
    res.json(new Response(categories))
  } catch (err) {
    console.error(err)
    res.json(new Response(null, 'Terjadi kesalahan'))
  }
});

router.get('/:id', helpers.isLoggedIn, async function (req, res, next) {
  try {
    let category = await models.Category.findOne({ where: { id: req.params.id } })
    res.json(new Response(category))
  } catch (err) {
    console.error(err)
    res.json(new Response(null, 'Terjadi kesalahan'))
  }
});

router.post('/', helpers.isLoggedIn, async function (req, res, next) {
  try {
    const { name } = req.body
    let category = await models.Category.create({ name })
    res.json(new Response(category))
  } catch (err) {
    console.error(err)
    res.json(new Response(null, 'Terjadi kesalahan'))
  }
});

router.put('/:id', helpers.isLoggedIn, async function (req, res, next) {
  try {
    const { name } = req.body
    let category = (await models.Category.update({ name }, { where: { id: req.params.id }, returning: true }))[1]
    res.json(new Response(category))
  } catch (err) {
    console.error(err)
    res.json(new Response(null, 'Terjadi kesalahan'))
  }
});

router.delete('/:id', helpers.isLoggedIn, async function (req, res, next) {
  try {
    let category = await models.Category.destroy({ where: { id: req.params.id }, returning: true })
    res.json(new Response(category))
  } catch (err) {
    console.error(err)
    res.json(new Response(null, 'Terjadi kesalahan'))
  }
});

module.exports = router;
