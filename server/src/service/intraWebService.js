const { VersionControlStatusModel } = require('../dbStore/schemaModel/intraWebSchema');


const getVersionControlData = async (req, res, next) => {
  const vcsList = await VersionControlStatusModel.find();
  
  const AC_GIT = [], AC_SVN40 =[], AC_SVN41 =[];
  
  vcsList.forEach(record => {
    const versionType = record.versionType;
    switch (versionType) {
      case "AC_GIT":
        AC_GIT.push(record);
        break;
      case "AC_SVN40":
        AC_SVN40.push(record);
        break;
      case "AC_SVN41":
        AC_SVN41.push(record);
        break;
    }
  });

  const versionData = [{
    versionType: "AC_GIT",
    nestedData: AC_GIT,
  },{
    versionType: "AC_SVN40",
    nestedData: AC_SVN40,
  },{
    versionType: "AC_SVN41",
    nestedData: AC_SVN41,
  }];

  return versionData;
}

module.exports = {
    getVersionControlData
}