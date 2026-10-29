const express = require('express')

const router = express.Router()
const {getAllPosts, getSinglePost, createPost, updatePost, removePost} = require("../controller/postController")

router.get("/", getAllPosts)
router.get('/:id', getSinglePost)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id', removePost)


module.exports = {router}