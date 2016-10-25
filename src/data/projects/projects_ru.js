import prepareProjects from './prepareProjects';

const projects = require('./projects_ru.json');

module.exports = prepareProjects(projects);
