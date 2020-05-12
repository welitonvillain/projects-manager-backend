import { Sequelize } from 'sequelize';
import Activity from '../models/Activity';
import Project from '../models/Project';
import TypeActivity from '../models/TypeActivity';

class ActivityController {
  async index(req, res) {
    const { Op } = Sequelize;
    const activities = await Activity.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: Project,
          as: 'project',
          where: { final_date: null, type_id: { [Op.not]: 2 } },
        },
      ],
    });

    if (!activities) {
      return res.status(400).json({ error: 'User has no activity registered' });
    }

    return res.json(activities);
  }

  async store(req, res) {
    const activities = req.body;
    const errors = [];

    for (let i = 0; i < activities.length; i += 1) {
      const {
        id,
        description,
        start,
        end,
        activity,
        classification,
      } = activities[i];

      const project = await Project.findOne({ where: { code: activity } });

      if (!project) {
        errors.push({ id, message: `Projeto ${activity} não encontrado` });
      }

      const type = await TypeActivity.findOne({
        where: { name: classification },
      });

      if (!type) {
        errors.push({
          id,
          message: `Classificação '${classification}' não encontrada`,
        });
      }

      if (project && type) {
        const act = await Activity.create({
          description,
          user_id: req.userId,
          project_id: project.id,
          type_id: type.id,
          initial_date: start,
          final_date: end,
        });

        if (!act)
          errors.push({ id, message: `Problema ao gravar atividade ${id}.` });
      }
    }

    return res.json(errors);
  }
}

export default new ActivityController();
