import Management from '../models/Management';

class ManagementController {
  async store(req, res) {
    const { code } = req.body;

    const management = await Management.findOne({
      where: { code },
    });

    if (management) {
      return res.status(401).json({ error: 'Management already exists' });
    }

    const { id, name } = await Management.create(req.body);

    return res.json({
      id,
      code,
      name,
    });
  }
}

export default new ManagementController();
