import Validator from 'validatorjs';


class BookingValidator {
  /**
   * Validate the bookings bassed on payload.
   * Users can book seat
   * Users can delete their bookings
   * Only admins can see all bookings
   * @param {*} id
   * @param {*} email
   * @param {*} is_admin
   */
  static async bookingValidator(req, res, next) {
    const {
      first_name, last_name, email,
    } = req.body;

    const rules = {
      user_id: 'integer',
      trip_id: 'integer|required|min:2',
      seat_number: 'min:2|max:4',
      email: 'string|min:8|max:50',
    };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return res.status(400).json({
        status: 400,
        error: validation.errors.errors,
      });
    }

    req.params.first_name = first_name.toLowerCase().trim();
    req.params.last_name = last_name.toLowerCase().trim();
    req.params.email = email.toLowerCase().trim();
    return next();
  }
}

export default BookingValidator;
