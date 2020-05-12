import Cell from '../models/Cell';
import Area from '../models/Area';

class CellController {
  async store(req, res) {
    const { code, name, areas } = req.body;

    if (await Cell.findOne({ where: { code } })) {
      return res.status(401).json({ error: 'Cell already exists.' });
    }

    const cell = await Cell.create(req.body);

    areas.forEach(async item => {
      const area = await Area.findByPk(item);
      if (area) {
        await area.addCell(cell);
      }
    });

    return res.json({
      id: cell.id,
      code,
      name,
    });
  }
}

export default new CellController();
