import Validator from 'validatorjs';


class TripValidator {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async tripValidator(req, res, next) {
    const {
      origin, destination,
    } = req.body;

    const rules = {
      bus_id: 'required|integer',
      origin: 'required|min:2',
      destination: 'required|min:2',
      trip_date: 'required',
      fare: 'required|integer',
    };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return res.status(400).json({
        status: 400,
        error: validation.errors.errors,
      });
    }

    req.body.origin = origin.toLowerCase().trim();
    req.body.destination = destination.toLowerCase().trim();
    return next();
  }
}

export default TripValidator;
