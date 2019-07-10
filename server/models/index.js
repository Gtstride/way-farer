/* eslint-disable no-console */
import createUsersTable from './user';
import createBookingTable from './booking';
import createTripTable from './trip';
import createBusTable from './bus';


(async () => {
  try {
    await createUsersTable();
    await createBookingTable();
    await createTripTable();
    await createBusTable();
  } catch (error) {
    console.log(error);
  }
})();
