const router = require('express').Router();
const furnitureManager = require('../managers/furnitureManager');

router.get('/', async (req,res)=>{
  const furnitures = await furnitureManager.getAll(req.query);
  res.json(furnitures);
})

router.post('/', async (req,res) => {
  try {
    await furnitureManager.create({...req.body, _ownerId: req.user._id});
    res.status(201).end();
  }catch (e) {
    res.status(400)
      .json({
        message: 'Cannot create furniture',
      })
  }
});

router.get('/:furnitureId', async (req,res)=>{
  const furniture = await furnitureManager.getOne(req.params.furnitureId);

  res.json(furniture);
})

router.put('/:furnitureId', async (req,res)=>{
  const furnitureId = req.params.furnitureId;
  const data = req.body;

  const furniture = await furnitureManager.update(furnitureId,data);

  res.status(204).json(furniture);
})

router.delete('/:furnitureId', async (req,res)=>{
  const furnitureId = req.params.furnitureId;

  await furnitureManager.delete(furnitureId);

  res.status(200).end();
})



module.exports = router;