
function parseData(initData) {
    let result = [
      {
        id: initData.id,
        first_name: initData.first_name,
        last_name: initData.last_name,
        nickname: initData.nickname,
        height_feet: initData.height_feet,
        height_inches: initData.height_inches,
        positions: initData.positions,
        weight_pounds: initData.weight_pounds,
        teamid: initData.team.id,
        teamabbreviation: initData.team.abbreviation,
        teamcity: initData.team.city,
        teamconference: initData.team.conference,
        teamdivision: initData.team.division,
        teamfull_name: initData.team.full_name,
        teamname: initData.team.name,
      },
    ];
    return result;
  }
  module.exports = parseData;