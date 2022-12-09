const { Router } = require("express");
// const cloudinary = require("cloudinary").v2
const cloudinary = require("../utils/cloudinary");

const { Images } = require("../db");
const router = Router();

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
  secure: true
})

router.get("/", async (req, res) => {
  const {name, order} = req.query;
  const images = await Images.findAll()

  if(name){
    try {
      const image = await images.filter(i => i.name.toLowerCase().includes(name.toLowerCase()));
      res.json(image);
    } catch (error) {
      console.log(error);
    }
  } else if (order){
    if (order === "AZ"){
      try {
        const imagesAsc = await images.sort((a, b) => {
          if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if(b.name.toLowerCase() > a.name.toLowerCase()) return -1;
          return 0;
        });
        res.json(imagesAsc);
      } catch (error) {
        console.log(error)
      }
    } else if (order === "ZA"){
      try {
        const imagesDesc = await images.sort((a, b) => {
          if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
          if(b.name.toLowerCase() > a.name.toLowerCase()) return 1;
          return 0
        });
        res.json(imagesDesc);
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    res.json(images);
  }
});

router.get("/:id", async (req, res) => {
  // id x params
  const id = req.params.id;
  const images = await Images.findAll();
  
  if (id) {
    try {
      const image = images.filter(u => Number(u.id) === Number(id));
      if(!image.length) res.status(400).json({msg: "no existe imagen con ese id"});
      res.json(image);
    } catch (error) {
      console.log(error);
    }
  }
});

router.post("/", async (req, res) => {
  const {name, public_id, version, signature, url} = req.body;
  const expectedSignature = cloudinary.utils.api_sign_request({public_id, version}, cloudinaryConfig.api_secret);

  if(expectedSignature === signature){
    try {
      const imageUpload = await Images.findOrCreate({
        where: {
          name,
          image: {
            public_id,
            url
          }
        }
      });
      res.json(imageUpload);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(404).json({msg: "The signature do not match."})
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id; // en un principio lo hacemos solo con id
  const newData = req.body;
  // si viene desability

  if(newData.disable) newData.is_active = false;
  try {
    const imageModified = await Images.update(newData, {where: {id}});
    console.log(imageModified);
    res.json({msg: "Image updated"});
  } catch (error) {
    console.log(error);
  };


});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const imageToDelete = await Images.findByPk(id);
  if(!imageToDelete) {
    res.status(404).json({msg: "That image do not exist brou"});
  } else if(imageToDelete.is_active){
    res.status(400).json({msg: "The image must be diactivated before delete"});
  } else {
    try {
      await Images.destroy({where: {id}});
      res.json({msg: "The image has been delete successfully"});
    } catch (error) {
      console.log(error);
    }
  };
});

module.exports = router;
