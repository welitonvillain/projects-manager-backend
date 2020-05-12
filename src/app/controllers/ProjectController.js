import { Sequelize } from 'sequelize';
import Project from '../models/Project';
import CellArea from '../models/CellArea';
import Type from '../models/Type';
import Category from '../models/Category';
import Status from '../models/Status';

class ProjectController {
  async index(req, res) {
    const { title } = req.params;

    const { Op } = Sequelize;

    const projects = await Project.findAll({
      where: { title: { [Op.iLike]: `${title}%` }},
    });

    if (!projects) {
      return res.status(400).json({ error: 'Project does not match' });
    }

    return res.json(projects);
  }

  async store(req, res) {
    const {
      code,
      title,
      description,
      cell_id,
      area_id,
      type_id,
      category_id,
      status_id,
      initial_date,
      final_date,
    } = req.body;

    const project = await Project.findOne({ where: { code } });

    if (project) {
      return res.status(401).json({ error: 'Project already exists' });
    }

    const cell_area = await CellArea.findOne({ where: { cell_id, area_id } });

    if (!cell_area) {
      return res
        .status(401)
        .json({ error: 'Relationship between Area and Cell is not found' });
    }

    const type = await Type.findByPk(type_id);

    if (!type) {
      return res.status(401).json({ error: 'Type does not match' });
    }

    const category = await Category.findByPk(category_id);

    if (!category) {
      return res.status(401).json({ error: 'Category does not match' });
    }

    const status = await Status.findByPk(status_id);

    if (!status) {
      return res.status(401).json({ error: 'Status does not match' });
    }

    const { id, rel_cell_area } = await Project.create({
      code,
      title,
      description,
      cell_area_id: cell_area.id,
      type_id,
      category_id,
      status_id,
      initial_date,
      final_date,
    });

    return res.json({
      id,
      code,
      title,
      description,
      rel_cell_area,
      type_id,
      category_id,
      status_id,
    });
  }
}

export default new ProjectController();
