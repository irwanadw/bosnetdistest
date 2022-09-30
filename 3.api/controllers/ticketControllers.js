const ticketModels = require("../models/ticket");
const customerModels = require("../models/customers");
const visitModels = require("../models/visit");

const { decodeToken } = require("../helpers/auth");
const {
  getAllTicketByToday,
  getTicketByTodayAndCustomerId,
  getTicketByBpjsToday,
  getTicketByTodayAndCustomerIdBPJS,
  printTicketNumber,
} = require("../helpers/ticket");

class ticketControllers {
  static async printTicket(req, res) {
    try {
      const { id: customerId } = decodeToken(req);
      const getCustomer = await customerModels.findById({ _id: customerId });
      if (!getCustomer) return { status: 404, error: "Customer not found" };
      const isBPJS = getCustomer.isBpjs;

      const getAllTicketToday = await getAllTicketByToday();
      const getTicketByCustomerToday = await getTicketByTodayAndCustomerIdBPJS(
        customerId,
        isBPJS
      );
      const getAllTicketByBpjsToday = await getTicketByBpjsToday(isBPJS);

      if (getAllTicketToday.length) {
        if (getTicketByCustomerToday) {
          if (getTicketByCustomerToday.length) {
            if (
              getTicketByCustomerToday[getTicketByCustomerToday.length - 1]
                .isActive
            ) {
              return res.status(400).json({
                status: "Forbidden",
                message:
                  "You already have a ticket, You need to cancel it to print a new ticket",
              });
            } else {
              const lastTicket =
                getAllTicketByBpjsToday[getAllTicketByBpjsToday.length - 1];
              const queue = parseInt(lastTicket.ticketNumber.split(".")[1]);
              const number = printTicketNumber(queue)
              if (isBPJS) {

                const ticket = `A.${number}`;
                await ticketModels.create({
                  ticketNumber: ticket,
                  customerId: customerId,
                  isBpjs: true,
                });
                return res.status(200).json({
                  ticketNumber: ticket,
                  createdAt: new Date(),
                });
              } else {
                const ticket = `B.${number}`;
                await ticketModels.create({
                  ticketNumber: ticket,
                  customerId: customerId,
                  isBpjs: false,
                });
                return res.status(200).json({
                  ticketNumber: ticket,
                  createdAt: new Date(),
                });
              }
            }
          } else {
            if (getAllTicketByBpjsToday.length) {
              const lastTicket =
                getAllTicketByBpjsToday[getAllTicketByBpjsToday.length - 1];
              const queue = parseInt(lastTicket.ticketNumber.split(".")[1]);
              const number = printTicketNumber(queue)
              if (isBPJS) {
                const ticket = `A.${number}`;
                await ticketModels.create({
                  ticketNumber: ticket,
                  customerId: customerId,
                  isBpjs: true,
                });
                return res.status(200).json({
                  ticketNumber: ticket,
                  createdAt: new Date(),
                });
              } else {
                const ticket = `B.${number}`;
                await ticketModels.create({
                  ticketNumber: ticket,
                  customerId: customerId,
                  isBpjs: false,
                });
                return res.status(200).json({
                  ticketNumber: ticket,
                  createdAt: new Date(),
                });
              }
            } else {
              const number = 1;
              if (isBPJS) {
                const ticket = `A.00${number}`;
                await ticketModels.create({
                  ticketNumber: ticket,
                  customerId: customerId,
                  isBpjs: true,
                });
                return res.status(200).json({
                  ticketNumber: ticket,
                  createdAt: new Date(),
                });
              } else {
                const ticket = `B.00${number}`;
                await ticketModels.create({
                  ticketNumber: ticket,
                  customerId: customerId,
                  isBpjs: false,
                });
                return res.status(200).json({
                  ticketNumber: ticket,
                  createdAt: new Date(),
                });
              }
            }
          }
        } else {
          if (getAllTicketByBpjsToday.length) {
            const lastTicket =
              getAllTicketByBpjsToday[getAllTicketByBpjsToday.length - 1];
            const queue = parseInt(lastTicket.ticketNumber.split(".")[1]);
            if (isBPJS) {
              const ticket = `A.00${queue + 1}`;
              await ticketModels.create({
                ticketNumber: ticket,
                customerId: customerId,
                isBpjs: true,
              });
              return res.status(200).json({
                ticketNumber: ticket,
                createdAt: new Date(),
              });
            } else {
              const ticket = `B.00${queue + 1}`;
              await ticketModels.create({
                ticketNumber: ticket,
                customerId: customerId,
                isBpjs: false,
              });
              return res.status(200).json({
                ticketNumber: ticket,
                createdAt: new Date(),
              });
            }
          } else {
            const number = 1;
            if (isBPJS) {
              const ticket = `A.00${number}`;
              await ticketModels.create({
                ticketNumber: ticket,
                customerId: customerId,
                isBpjs: true,
              });
              return res.status(200).json({
                ticketNumber: ticket,
                createdAt: new Date(),
              });
            } else {
              const ticket = `B.00${number}`;
              await ticketModels.create({
                ticketNumber: ticket,
                customerId: customerId,
                isBpjs: false,
              });
              return res.status(200).json({
                ticketNumber: ticket,
                createdAt: new Date(),
              });
            }
          }
        }
      } else {
        const number = 1;
        if (isBPJS) {
          const ticket = `A.00${number}`;
          await ticketModels.create({
            ticketNumber: ticket,
            customerId: customerId,
            isBpjs: true,
          });
          return res.status(200).json({
            ticketNumber: ticket,
            createdAt: new Date(),
          });
        } else {
          const ticket = `B.00${number}`;
          await ticketModels.create({
            ticketNumber: ticket,
            customerId: customerId,
            isBpjs: false,
          });
          return res.status(200).json({
            ticketNumber: ticket,
            createdAt: new Date(),
          });
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async cancelTicket(req, res) {
    try {
      const { id: customerId } = decodeToken(req);
      const getAllTicketByCustomerIDToday = await getTicketByTodayAndCustomerId(
        customerId
      );
      const getVisit = await visitModels.findOne({customerId: customerId})
        
      if (getVisit) {
        return res.status(400).json({
            status: "Forbidden",
            message: "You have already make a visit schedule, You need to cancel the schedule first",
          });
      };

      if (!getAllTicketByCustomerIDToday.length) {
        return res.status(404).json({
          status: "Not Found",
          message: "You have no create any ticket today",
        });
      }
      if (getAllTicketByCustomerIDToday.length === 3) {
        return res.status(400).json({
          status: "Forbidden",
          message:
            "You have already print ticket 3 timest, today. You should wait until tomorrow",
        });
      }
      const lastTicket =
        getAllTicketByCustomerIDToday[0];
      if (lastTicket.isActive) {
        await ticketModels.updateOne(
          {
            _id: lastTicket._id,
          },
          {
            $set: {
              isActive: false,
              updatedAt: new Date(),
            },
          }
        );

        return res.status(200).json({
          status: "Success",  
          message: "Update Success",
        });
      } else {
        return res.status(400).json({
          status: "Forbidden",
          message: "Your ticket is already inactive, just print a ticket again",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}

module.exports = ticketControllers;
