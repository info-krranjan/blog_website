const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (error) => console.error(error));
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

// Define a Post schema
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Post = mongoose.model('Post', postSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
    const posts = await Post.find();
    res.render('home', { posts });
});

app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('post', { post });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
