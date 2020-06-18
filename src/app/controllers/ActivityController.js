import { Sequelize } from 'sequelize';
import { isEqual, getDay, addDays, parseISO, startOfWeek } from 'date-fns';

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
          where: { final_date: null, type_id: { [Op.not]: 1 } },
        },
      ],
    });

    if (!activities) {
      return res.status(400).json({ error: 'User has no activity registered' });
    }

    return res.json(activities);
  }

  async showByDate(req, res) {
    const { initial, final } = req.query;
	
	console.log(initial, final);

    const { Op } = Sequelize;
    const activities = await Activity.findAll({
      where: { 
        user_id: req.userId,
        [Op.and]: [{
          final_date: {
            [Op.between]: [initial, final],
          },
        }],
      },
    });

    if (!activities) {
      return res.status(204).json({ success: 'No activity registered during this period'});
    }

    const json = { 1: [], 2: [], 3: [], 4: [], 5: [] };

    let initial_date = parseISO(initial);
    let final_date = parseISO(final);


    while(!isEqual(getDay(initial_date), getDay(final_date) )) {
      const activitiesOfDay = activities.filter(activity => {
        console.log('Initial: ',  getDay(initial_date));
        console.log('Final: ', initial_date);
        return getDay(activity.final_date) === getDay(initial_date);
      });

      const day = getDay(initial_date);

      json[day] = activitiesOfDay;

      initial_date = addDays(initial_date, 1);
    }


    return res.json(json);
  }




  async store(req, res) {
    const activities = req.body;
    const errors = [];

    console.log(activities);

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
