import Category from '../models/Category';

class CategoryController {
  async index(req, res) {
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(400).json({ error: 'Category does not match' });
    }

    return res.json(category);
  }

  async store(req, res) {
    const { name } = req.body;

    const category = await Category.findOne({ where: { name } });

    if (category) {
      return res.status(401).json({ error: 'Category already exists' });
    }

    const { id } = await Category.create(req.body);

    return res.json({
      id,
      name,
    });
  }
}

export default new CategoryController();
