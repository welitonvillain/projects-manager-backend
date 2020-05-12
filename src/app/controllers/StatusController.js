import Status from '../models/Status';

class StatusController {
  async index(req, res) {
    const { id } = req.params;

    const status = await Status.findByPk(id);

    if (!status) {
      return res.status(400).json({ error: 'Status does not match' });
    }

    return res.json(status);
  }

  async store(req, res) {
    const { name } = req.body;

    const status = await Status.findOne({ where: { name } });

    if (status) {
      return res.status(401).json({ error: 'Status already exists' });
    }

    const { id } = await Status.create(req.body);

    return res.json({
      id,
      name,
    });
  }
}

export default new StatusController();
