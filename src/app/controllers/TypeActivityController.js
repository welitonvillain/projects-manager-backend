import TypeActivity from '../models/TypeActivity';

class TypeActivityController {
  async index(req, res) {
    const { id } = req.params;

    const type = await TypeActivity.findByPk(id);

    if (!type) {
      return res.status(400).json({ error: 'Type Activity does not match' });
    }

    return res.json(type);
  }

  async store(req, res) {
    const { name } = req.body;

    const type = await TypeActivity.findOne({ where: { name } });

    if (type) {
      return res.status(400).json({ error: 'Type Activity already exists' });
    }

    const { id } = await TypeActivity.create(req.body);

    return res.json({
      id,
      name,
    });
  }
}

export default new TypeActivityController();
