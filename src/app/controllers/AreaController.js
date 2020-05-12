import Area from '../models/Area';
import Management from '../models/Management';

class AreaController {
  async store(req, res) {
    const { code, name, mng_code } = req.body;

    const management = await Management.findOne({ where: { code: mng_code } });

    if (!management) {
      return res.status(401).json({ error: 'Management does not exists' });
    }

    const area = await Area.findOne({ where: { code } });

    if (area) {
      return res.status(401).json({ error: 'Area already exists' });
    }

    const { id } = await Area.create({
      code,
      name,
      management_id: management.id,
    });

    return res.json({
      id,
      code,
      name,
    });
  }
}

export default new AreaController();
