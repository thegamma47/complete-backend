const express = require('express');
const multer = require('multer');
const { uploadFile } = require('./services/storage.service');
const Post = require('./models/post.model'); // NEW — imports your Post model

const app = express();
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/create_post', upload.single('image'), async (req, res) => {
    try {
        const result = await uploadFile(req.file.buffer);

        // NEW — save to MongoDB using the Post model
        const post = await Post.create({
            image: result.url,
            caption: req.body.caption
        });

        res.json(post); // NEW — send back the saved database document
    } catch (err) {
        console.error('Upload failed:', err.message);
        res.status(500).json({ error: err.message });
    }
})

app.get('/get_post', async (req, res) => {

    const post = await Post.find()

    return res.status(200).json({
        message: "Posts fetched successfully",
        post: post
    })
});

module.exports = app;







// const express = require('express');
// const multer = require('multer');
// const { uploadFile } = require('./services/storage.service');
// const postmodel = require('./models/post.model');

// const app = express();
// app.use(express.json());

// const upload = multer({storage: multer.memoryStorage()});

// app.post('/create_post',upload.single('image'),async(req,res)=>{
//     console.log(req.body);
//     console.log(req.file);

//     try {
//         const result = await uploadFile(req.file.buffer);
//         console.log(result);
//         res.json(result);
//     } catch (err) {
//         console.error('Upload failed:', err.message);
//         res.status(500).json({ error: err.message });
//     }
// })

// module.exports = app;