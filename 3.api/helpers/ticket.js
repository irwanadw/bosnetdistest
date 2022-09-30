const ticketModels = require("../models/ticket");

const getAllTicketByToday = async () => {
  let start = new Date();
  start.setHours(0, 0, 0, 0);

  let end = new Date();
  end.setHours(23, 59, 59, 999);

  const result = await ticketModels.find({
    createdAt: { $gte: start, $lt: end },
  });
  return result;
};

const getTicketByBpjsToday = async (isBpjs) => {
  let start = new Date();
  start.setHours(0, 0, 0, 0);

  let end = new Date();
  end.setHours(23, 59, 59, 999);

  const result = await ticketModels.find({
    createdAt: { $gte: start, $lt: end },
    isBpjs: isBpjs,
  });
  return result;
};
const getTicketByTodayAndCustomerIdBPJS = async (customerId, isBPJS) => {
  let start = new Date();
  start.setHours(0, 0, 0, 0);

  let end = new Date();
  end.setHours(23, 59, 59, 999);

  const result = await ticketModels.find({
    isBPJS: isBPJS,
    customerId: customerId,
    createdAt: { $gte: start, $lt: end },
  });
  return result;
};

const getTicketByTodayAndCustomerId = async (customerId) => {
  let start = new Date();
  start.setHours(0, 0, 0, 0);

  let end = new Date();
  end.setHours(23, 59, 59, 999);

  const result = await ticketModels
    .find({
      customerId: customerId,
      createdAt: { $gte: start, $lt: end },
    })
    .sort({ createdAt: -1 });
  return result;
};

const getTicketByTodayAndCustomerVisitDate = async (customerId, visitDate) => {
  let start = new Date(visitDate);

  start.setHours(0, 0, 0, 0);
  let end = new Date(visitDate);
  end.setHours(23, 59, 59, 999);

  const result = await ticketModels
    .find({
      isActive: true,
      customerId: customerId,
      createdAt: { $gte: start, $lt: end },
    })
    .sort({ createdAt: -1 });
  return result;
};

const printTicketNumber = (queue) => {
  if (queue < 10) {
    return `00${queue + 1}`;
  }
  if (queue < 100 && queue+1 >= 10) {
    return `0${queue + 1}`;
  }
  if (queue < 1000 && queue+1 >= 100) {
    return `${queue + 1}`;
  } else {
    return res.status(400).json({
      status: "Forbidden",
      message: "Quota this hosptital is only 999",
    });
  }
};

module.exports = {
  getAllTicketByToday,
  getTicketByTodayAndCustomerId,
  getTicketByBpjsToday,
  getTicketByTodayAndCustomerIdBPJS,
  getTicketByTodayAndCustomerVisitDate,
  printTicketNumber,
};
