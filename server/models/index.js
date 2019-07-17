/* eslint-disable no-console */
import createUsersTable from './user';
import seedAdmin from './seeduser';
// import createBookingTable from './booking';
import createTripTable from './trip';
// import createBusTable from './bus';


(async () => {
  try {
    await createUsersTable();
    await seedAdmin();
    await createTripTable();
    // await createBookingTable();
    // await createBusTable();
  } catch (error) {
    console.log(error);
  }
})();
