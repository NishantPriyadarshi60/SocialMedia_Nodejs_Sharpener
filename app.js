const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const multer = require('multer');
const upload = multer({ dest: 'public/images/uploads/' });

// Import routes
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Use routes
app.use('/posts', upload.single('image'), postRoutes);
app.use('/comments', commentRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});