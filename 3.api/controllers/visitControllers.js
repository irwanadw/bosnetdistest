const jwt = require("jsonwebtoken");

const visitModels = require("../models/visit");
const customerModels = require("../models/customers");
const ticketModels = require("../models/ticket");

const { decodeToken } = require("../helpers/auth");
const { getVisitByCustomerIdAtVisitDate, makeMultipleSearchQuery } = require("../helpers/visit");
const {
  getTicketByTodayAndCustomerIdAndIsActive,
  getTicketByTodayAndCustomerVisitDate,
} = require("../helpers/ticket");

class visitControllers {
  static async createVisit(req, res) {
    try {
      const { id: customerId } = decodeToken(req);
      const { doctorName, visitDate } = req.body;

      const getCustomer = await customerModels.findById({ _id: customerId });
      if (!getCustomer) return { status: 404, error: "Customer not found" };
      const getVisitAlready = await getVisitByCustomerIdAtVisitDate(
        customerId,
        visitDate
      );
      if (getVisitAlready) {
        return res.status(400).json({
          status: "Forbidden",
          message:
            "You have already make a visit at that day. Only one visit per day",
        });
      }
      const getTicket = await getTicketByTodayAndCustomerVisitDate(
        customerId,
        visitDate
      );
      if (!getTicket.length)
        return res.status(400).json({
          status: "Forbidden",
          message: "You have no ticket or Your ticket is Inactive",
        });
      const createVisit = new visitModels({
        ticketNumber: getTicket[0].ticketNumber,
        customerId: customerId,
        visitorName: getCustomer.name,
        age: getCustomer.age,
        doctorName: doctorName,
        visitDate: new Date(visitDate),
      });
      const result = await createVisit.save();

      return res.status(200).json({
        message: "Created Success",
        data: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async cancelVisit(req, res) {
    try {
      const { id: customerId } = decodeToken(req);

      await visitModels.deleteOne({customerI:customerId});
      return res.status(200).json({
        status: 'Success',
        message: "Deleted Success",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async getVisitWithSearch(req,res) {
    try {
        const {search} = req.query;
        const queryFilter = makeMultipleSearchQuery([
            { field: 'ticketNumber', keyword: search },
            { field: 'visitorName', keyword: search },
            { field: 'doctorName', keyword: search },
          ])({});

        const result = await visitModels.find(queryFilter)
        return res.status(200).json({
            status: 'Success',
            data: result,
          });

    } catch (error) {
        console.log(error);
      res.status(500).json(error);
    }
  }
}

module.exports = visitControllers;
