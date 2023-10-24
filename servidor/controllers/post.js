const Post = require("../models/post");
const image = require("../utils/image");

function createPost(req, res) {
    const post = new Post(req.body);
    post.created_at = new Date();

    const imagePath = image.getFilePath(req.files.miniature);
    post.miniature = imagePath;

    post.save()
        .then(postStored => {
            res.status(201).send(postStored);
        })
        .catch(error => {
            res.status(400).send({ msg: "Error al crear el post" });
        });
}

function getPosts(req, res) {
    const {page = 1, limit = 10} = req.query;

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { created_at: "desc"},
    };

    Post.paginate({}, options, (error, postsStored) => {
        if(error) {
            res.status(400).send({msg: "Error al obtener los posts"});
        } else {
            res.status(200).send(postsStored);
        }
    });
}

function updatePost(req, res) {
    const { id } = req.params;
    const postData = req.body;

    if(req.files.miniature) {
        const imagePath = image.getFilePath(req.files.miniature);
        postData.miniature = imagePath;
    }

    Post.findByIdAndUpdate({_id: id }, postData)
        .then(() => {
            res.status(200).send({msg: "Actualizacion correcta"});
        })
        .catch(error => {
            res.status(400).send({msg: "Error al actualizar el post"});
        });
}

function deletePost(req, res) {
    const { id } = req.params;

    Post.findByIdAndDelete(id)
        .then(() => {
            res.status(200).send({msg: "Post eliminado"});
        })
        .catch(error => {
            res.status(400).send({msg: "Error al eliminar el post"});
        });
}

function getPost(req, res) {
    const { path } = req.params;

    Post.findOne({path}).exec()
        .then(postStored => {
            if (!postStored) {
                res.status(400).send({msg: "No se ha encontrado ningun post"});
            } else {
                res.status(200).send(postStored);
            }
        })
        .catch(error => {
            res.status(400).send({msg: "Error del servidor"});
        });
}





module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    getPost,
};