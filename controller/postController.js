const { title } = require('node:process')
const { posts } = require('../data/postsData')

const getAllPosts = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            data: posts
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "server error",
            error: err.message
        })
    }
}

const getSinglePost = (req, res) => {
    let id = req.params.id
    try {
        let obj = posts.find(p => p.id === id)

        if (!obj) {
            return res.status(404).json({
                success: false,
                message: "data not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "post data fetched successfully",
            data: obj
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'server error',
            error: err.message
        })
    }
}

const createPost = (req, res) => {
    try {
        let body = req.body
        let newPost = {
            userId: body.userId,
            id: Date.now().toString(),
            title: body.title,
            body: body.body
        }
        if (!req.body.title || !req.body.body) {
            return res.status(400).json({
                success: false,
                message: "title and body required"
            })
        }
        let postObj = posts.push(newPost)

        res.status(201).json({
            success: true,
            message: "new post created successfully",
            data: newPost
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "server error",
            error: err.message
        })
    }
}

const updatePost = (req, res) => {
    try {
        let updateId = req.params.id
        let idx = posts.findIndex(p => p.id === updateId)

        if (!idx) {
            return res.status(404).json({
                success: false,
                message: "data not found"
            })
        }

        let updateobj = {
            ...posts[idx],
            title: req.body.title,
            body: req.body.body,
            userId: req.body.userId,
            id: updateId
        }

        let updObj = posts[idx] = updateobj

        res.status(200).json({
            success  : true,
            message : `Post with name ${updateobj.title} updated successfully`,
            data : updObj
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "server error",
            error: err.message
        })
    }
}

const removePost=(req, res)=>{
    let removeId = req.params.id
    try{
        let idx = posts.findIndex(p => p.id === removeId)
        if(!idx){
            return res.status(404).json({
                success : false,
                message : `post with id ${idx} not found`
            })
        }
        let removeObj = posts.splice(idx, 1)

        res.status(200).json({
            success : true,
            message : "post deleted successfully",
            data : removeObj[0]
        })

    }catch(err){
         res.status(500).json({
            success: false,
            message: "server error",
            error: err.message
        })
    }
}

module.exports = {
    getAllPosts,
    getSinglePost,
    createPost,
    updatePost,
    removePost
}