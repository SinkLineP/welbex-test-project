const db = require("../db");

class CarController {
  async createCar(req, res) {
    const {date, name, count, distance} = req.body;
    const newCar = await db.query(`INSERT INTO cars (date, name, count, distance) values ($1, $2, $3, $4) RETURNING *`, [date, name, count, distance]);
    res.json(newCar.rows[0]);
  };

  async getCars(req, res) {
    const cars = await db.query('SELECT * FROM cars');
    res.json(cars.rows);
  };

  async getOneCar(req, res) {
    const id = req.params.id;
    const cars = await db.query('SELECT * FROM cars where id = $1', [id]);
    res.json(cars.rows[0]);
  };

  async updateCar(req, res) {
    const {id, date, name, count, distance} = req.body
    const car = await db.query(
      'UPDATE cars set date = $1, name = $2, count = $3, distance = $4 where id = $5 RETURNING *',
      [date, name, count, distance, id]
    );
    res.json(car.rows[0]);
  };

  async deleteCar(req, res) {
    const id = req.params.id;
    const cars = await db.query('DELETE FROM cars where id = $1', [id]);
    res.json(cars.rows[0]);
  };
}

module.exports = new CarController();