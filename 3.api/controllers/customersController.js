const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const CustomerModel = require("../models/customers");

class customersControllers {
  static async register(req, res) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const createCustomer = new CustomerModel({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        password: hashPassword,
        isBpjs: req.body.isBpjs,
      });

      await createCustomer.save();
      res.status(201).json({
        status: "Created Success",
        message: "Register Success",
        data: createCustomer,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async login(req, res) {
    try {
      const customer = await CustomerModel.findOne({
        email: req.body.email,
      });

      !customer &&
        res.status(404).json({
          status: "login failed",
          message: `Customer with email ${req.body.email} not registered`,
        });

      const isPasswordMatch = await bcrypt.compare(
        req.body.password,
        customer.password
      );

      const accesToken = jwt.sign(
        {
          id: customer.id,
          name: customer.name,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
      );

      isPasswordMatch == true
        ? res
            .status(200)
            .json({ id: customer._id, name: customer.name, accesToken })
        : res.status(401).json({
            status: "login failed",
            message: "Wrong password",
          });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = customersControllers;
