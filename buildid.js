const { v4: uuidv4 } = require('uuid');

let buildId = 0

function getBuildId(){
  if (!buildId){
    buildId = uuidv4()
  }
  return buildId
}

module.exports = getBuildId