const Post = require('../models/postModel');
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.createPost = async (req, res) => {
    const post = new Post({
        posterId: req.body.posterId,
        title: req.body.title,
        message: req.body.message,
        image: req.body.image,
        video: req.body.video,
        type: req.body.type
    });

    try {
        const savedPost = await post.save();
        return res.status(201).json({ savedPost });
    } catch (err) {
        return res.status(400).send(err);
    }
};



module.exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    const updatedRecord = {
        title: req.body.title,
        message: req.body.message,
        type: req.body.type,
        image: req.body.image,
        video: req.body.video
    };

    Post.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log(err);
        });
};



module.exports.deletePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await Post.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Succefully deleted" });
    } catch (err) {
        return res.status(500).json({ message: err })
    }
};



// Comments functions

module.exports.commentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return Post.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        text: req.body.text,
                        timestamp: new Date().getTime()
                    }
                }
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        ).populate({ path: 'posterId', select: ['name', 'firstName'] }).populate({ path: 'comments.commenterId', select: ['name', 'firstName'] });
    } catch (err) {
        return res.status(400).send(err);
    }
};



module.exports.editCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return Post.findById(req.params.id, (err, docs) => {
            const theComment = docs.comments.find((comment) =>
                comment._id.equals(req.body.commentId)
            );

            if (!theComment) return res.status(404).send("Comment not found");
            theComment.text = req.body.text;

            return docs.save((err) => {
                if (!err) return res.status(200).send(docs);
                return res.status(500).send(err);
            });
        }).populate({ path: 'posterId', select: ['name', 'firstName'] }).populate({ path: 'comments.commenterId', select: ['name', 'firstName'] });
    } catch (err) {
        return res.status(400).send(err);
    }
};



module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return Post.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId
                    },
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) res.status(200).json({ message: "Succefully deleted" });
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
};



// Display functions

module.exports.getEventsPosts = async (req, res) => {
    const { page = 1, limit = 7 } = req.query;
    const events = await Post.find({ type: "événements" }).populate({ path: 'posterId', select: ['name', 'firstName'] }).populate({ path: 'comments.commenterId', select: ['name', 'firstName'] }).sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);
    res.status(200).json(events)
};



module.exports.getNewsPosts = async (req, res) => {
    const { page = 1, limit = 7 } = req.query;
    const news = await Post.find({ type: "actualités" }).populate({ path: 'posterId', select: ['name', 'firstName'] }).populate({ path: 'comments.commenterId', select: ['name', 'firstName'] }).sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);
    res.status(200).json(news)
};



module.exports.readPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    Post.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('ID unknown : ' + err);
    }).populate({ path: 'posterId', select: ['name', 'firstName'] }).populate({ path: 'comments.commenterId', select: ['name', 'firstName'] });
};



module.exports.getAllPosts = async (req, res) => {
    const { page = 1, limit = 7 } = req.query;
    const posts = await Post.find().populate({ path: 'posterId', select: ['name', 'firstName'] }).populate({ path: 'comments.commenterId', select: ['name', 'firstName'] }).sort({ createdAt: -1 }).limit(limit * 1).skip((page - 1) * limit);
    res.status(200).json(posts)
};