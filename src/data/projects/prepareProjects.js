const customers = {
  cpeople: 'http://cpeople.ru',
};

function prepareProjects(projects) {
  const availProjects = projects.filter(project => !project.hidden);
  availProjects.sort((p1, p2) => {
    let y1 = p1.year.toString();
    let y2 = p2.year.toString();
    if (y1.length > 4) y1 = y1.substr(-4);
    if (y2.length > 4) y2 = y2.substr(-4);
    if (y1 === y2) {
      const o1 = p1.order ? p1.order : 0;
      const o2 = p2.order ? p2.order : 0;
      if (o1 === o2) return 0;
      return (o1 < o2) ? 1 : -1;
    }
    return (y1 < y2) ? 1 : -1;
  });

  return availProjects.map((project) => {
    if (!project.customer) return project;
    project.urlCustomer = customers[project.customer]; // eslint-disable-line
    return project;
  });
}

module.exports = prepareProjects;
