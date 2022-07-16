const db = require("../db");

class CarController {
  //work with all cars
  async createCar(req, res) {
    const {date, name, count, distance} = req.body;
    const newCar = await db.query(`INSERT INTO cars (date, name, count, distance) values ($1, $2, $3, $4) RETURNING *`, [date, name, count, distance]);
    res.json(newCar.rows[0]);
  };
  async getCars(req, res) {};
  //work with current car
  async getOneCar(req, res) {};
  async updateCar(req, res) {};
  async deleteCar(req, res) {};
}

module.exports = new CarController();