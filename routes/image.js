import { Router } from "express";
import images from "../modal/image.js";

var router = Router();

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Get All Images
router.get("/", async function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var response = images;
    res.status(200).json({
        status: 'success',
        results: response.length,
        data: { response }
    });
});

// Get image from id
router.get("/:id", async function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var image;
    images.forEach((img, i) => {
        if(img.id == req.params.id){
            image = img;
        }
    });
    res.status(200).json({
        status: 'success',
        data: { image }
    });
});

// Upload image
router.post('/', async function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var image = req.body;
    if ('title' in image && 'location' in image) {
        image['uploaded_at'] = new Date();
        image['id'] = uuidv4();
        images.push(image);
        res.status(200).json({
            status: 'success'
        });
    } else {
        res.status(400).json({
            status: 'fail'
        });
    }
});

// Update Image Title
router.put('/:id', async function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var imageIndex;
    images.forEach((image, i) => {
        if(image.id == req.params.id){
            imageIndex = i;
        }
    });
    if (imageIndex != undefined && 'title' in req.body) {
        images[imageIndex]['title'] = req.body['title'];
        res.status(200).json({
            status: 'success'
        });
    } else {
        res.status(400).json({
            status: 'fail'
        });
    }
});

// Delete Image
router.delete('/:id', async function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var imageIndex;
    images.forEach((image, i) => {
        if(image.id == req.params.id){
            imageIndex = i;
        }
    });
    if (imageIndex != undefined) {
        images.splice(imageIndex, 1);
        res.status(200).json({
            status: 'success'
        });
    } else {
        res.status(400).json({
            status: 'fail'
        });
    }
});

export default router;
