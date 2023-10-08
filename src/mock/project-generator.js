// utils

function dynamicNumGenerator(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function convertDaysToMilliseconds(noOfDays) {
  return noOfDays * 24 * 60 * 60 * 1000;
}

function offsetDate(max) {
  return  convertDaysToMilliseconds(dynamicNumGenerator(max, 10))
}

function dynamicId() {
  return Date.now() - dynamicNumGenerator(100000);
}

function addDate(ipDate, offsetDate) {
  const date =  new Date(ipDate.getTime() + convertDaysToMilliseconds(offsetDate));
  console.log(ipDate, offsetDate,date)
  return date 
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

    const projStartDate = new Date(randStartDate());

   let prevSprintInfo = {
      startDate: projStartDate,
      duration: randDuration()
    }

    proj.sprints = Array.from(
      Array(dynamicNumGenerator(MAX_SPRINT_NUM, 3)).keys()
    ).map((eachSprintIndex, index, ) => {
      const currSprintInfo = {
        startDate: addDate(prevSprintInfo.startDate, index ===0 ? 0: prevSprintInfo.duration) ,
        duration: index === 0 ? prevSprintInfo.duration : randDuration()
      }

      // console.log(currSprintInfo)
      const currSprint =  {
        id: `${dynamicId()}`,
        name: `sprint-${eachSprintIndex}`,
        startDate: `${currSprintInfo.startDate.toISOString()}`,
        duration: `${currSprintInfo.duration}`,
      };

      prevSprintInfo = currSprintInfo;

      return currSprint;
    });

    proj.links = [];
    for (let i = 1; i < proj.sprints.length; i++) {
      const link = {
        source: proj.sprints[i -1].id,
        target: proj.sprints[i ].id,
        type: 0,
      };
      proj.links.push(link);
    }

    return proj;
  }
);
