// server/src/controllers/posts.js
const Post = require('../models/post');
const Category = require('../models/category');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ published: true })
      .populate('category', 'name')
      .sort('-createdAt');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = new Post({
      ...req.body,
      slug: req.body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('category', 'name');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.seedPosts = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res.status(400).json({ error: 'No categories found. Please seed categories first.' });
    }

    const samplePosts = [
      {
        title: 'The Future of Artificial Intelligence',
        content: 'Artificial Intelligence is revolutionizing industries across the globe. From healthcare to finance, AI systems are becoming increasingly sophisticated and capable of handling complex tasks that were once thought to be exclusively human domains.',
        excerpt: 'Exploring the latest developments in AI technology and their impact on society.',
        category: categories.find(cat => cat.name === 'Technology')?._id
      },
      {
        title: '10 Tips for a Healthier Lifestyle',
        content: 'Maintaining a healthy lifestyle doesn\'t have to be complicated. Small changes in your daily routine can make a significant difference in your overall well-being and quality of life.',
        excerpt: 'Simple yet effective tips to improve your health and wellness.',
        category: categories.find(cat => cat.name === 'Health')?._id
      },
      {
        title: 'Exploring the Hidden Gems of Southeast Asia',
        content: 'Southeast Asia offers a treasure trove of undiscovered destinations that combine stunning natural beauty, rich cultural heritage, and incredible culinary experiences.',
        excerpt: 'Discover lesser-known destinations in Southeast Asia that will leave you breathless.',
        category: categories.find(cat => cat.name === 'Travel')?._id
      },
      {
        title: 'The Art of Home Cooking',
        content: 'Cooking at home allows you to control ingredients, experiment with flavors, and create meals that are both nutritious and delicious. Learning basic cooking techniques can transform your relationship with food.',
        excerpt: 'Master the fundamentals of home cooking and elevate your culinary skills.',
        category: categories.find(cat => cat.name === 'Food')?._id
      },
      {
        title: 'Minimalism: Living with Less',
        content: 'The minimalist lifestyle focuses on simplifying your surroundings and eliminating clutter to create a more meaningful and intentional life. It\'s about quality over quantity.',
        excerpt: 'How embracing minimalism can lead to a more fulfilling and stress-free life.',
        category: categories.find(cat => cat.name === 'Lifestyle')?._id
      },
      {
        title: 'Sustainable Technology Solutions',
        content: 'As technology advances, so does our responsibility to ensure it benefits both people and the planet. Sustainable tech solutions are crucial for addressing climate change and environmental challenges.',
        excerpt: 'Innovative technologies that are helping create a more sustainable future.',
        category: categories.find(cat => cat.name === 'Technology')?._id
      }
    ];

    const createdPosts = [];
    for (const postData of samplePosts) {
      const existingPost = await Post.findOne({ title: postData.title });
      if (!existingPost && postData.category) {
        const post = new Post({
          ...postData,
          slug: postData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''),
          published: true
        });
        await post.save();
        createdPosts.push(post);
      }
    }

    res.status(201).json({
      message: `Created ${createdPosts.length} sample posts`,
      posts: createdPosts
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
