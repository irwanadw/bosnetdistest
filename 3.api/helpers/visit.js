const visitModels = require("../models/visit");

const getVisitByCustomerIdAtVisitDate = async (customerId, visitDate) => {
  let start = new Date(visitDate);
  start.setHours(0, 0, 0, 0);
  let end = new Date(visitDate);
  end.setHours(23, 59, 59, 999);

  const result = await visitModels.findOne({
    customerId: customerId,
    createdAt: { $gte: start, $lt: end },
  });
  console.log(result);
  return result;
};

const makeMultipleSearchQuery = (params) => (obj) =>
  Object.assign(obj, {
    $or: params.map((param) => ({
      [param.field]: {
        $regex: param.keyword,
      },
    })),
  });
module.exports = {
  getVisitByCustomerIdAtVisitDate,
  makeMultipleSearchQuery,
};
