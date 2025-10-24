const Category = require('../models/category');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort('name');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = new Category({
      ...req.body,
      slug: req.body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.seedCategories = async (req, res) => {
  try {
    const sampleCategories = [
      { name: 'Technology', description: 'Latest tech news and trends' },
      { name: 'Lifestyle', description: 'Tips for a better lifestyle' },
      { name: 'Travel', description: 'Travel guides and destinations' },
      { name: 'Food', description: 'Recipes and culinary adventures' },
      { name: 'Health', description: 'Health and wellness tips' }
    ];

    const createdCategories = [];
    for (const catData of sampleCategories) {
      const existingCategory = await Category.findOne({ name: catData.name });
      if (!existingCategory) {
        const category = new Category({
          ...catData,
          slug: catData.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        });
        await category.save();
        createdCategories.push(category);
      }
    }

    res.status(201).json({
      message: `Created ${createdCategories.length} sample categories`,
      categories: createdCategories
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
