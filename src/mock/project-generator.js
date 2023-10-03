// utils

function dynamicNumGenerator(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function offsetDate(max) {
  return dynamicNumGenerator(max, 10) * 24 * 1000 * 1000;
}

function dynamicId() {
  return Date.now() - dynamicNumGenerator(100000);
}

function randStartDate() {
  return Date.now() - offsetDate(30);
}

function randDuration() {
  return dynamicNumGenerator(1, 5);
}

// start
const NUMBER_OF_PROJECTS = 10;
const MAX_SPRINT_NUM = 10;

export const PROJECT_DUMMY = Array.from(Array(NUMBER_OF_PROJECTS).keys()).map(
  (eachProjIndex) => {
    const proj = {
      id: `${dynamicId()}`,
      name: `project-${eachProjIndex}`,
    };

    proj.sprints = Array.from(
      Array(dynamicNumGenerator(MAX_SPRINT_NUM, 3)).keys()
    ).map((eachSprintIndex) => {
      return {
        id: `${dynamicId()}`,
        name: `sprint-${eachSprintIndex}`,
        startDate: `${new Date(randStartDate()).toISOString()}`,
        duration: `${randDuration()}`,
      };
    });

    proj.links = [];
    for (let i = 1; i < proj.sprints.length; i++) {
      const link = {
        source: proj.sprints[i].id,
        target: proj.sprints[i - 1].id,
        type: 0,
      };
      proj.links.push(link);
    }

    return proj;
  }
);
