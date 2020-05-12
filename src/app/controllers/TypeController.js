import Type from '../models/Type';

class TypeController {
  async index(req, res) {
    const { id } = req.params;

    const type = await Type.findByPk(id);

    if (!type) {
      return res.status(400).json({ error: 'Type does not match' });
    }

    return res.json(type);
  }

  async store(req, res) {
    const { name } = req.body;

    const type = await Type.findOne({ where: { name } });

    if (type) {
      return res.status(401).json({ error: 'Type already exists' });
    }

    const { id } = await Type.create(req.body);

    return res.json({
      id,
      name,
    });
  }
}

export default new TypeController();
