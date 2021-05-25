module.exports = function(app) {
	var controller = require('../controllers/gardeningController');

	app.route('/api/gardens')
		.get(controller.list_gardens)

	app.route('/api/gardens/:id')
		.get(controller.garden_info)

	app.route('/api/gardeners')
		.get(controller.list_gardeners)

	app.route('/api/sensors')
		.get(controller.list_sensors)

	app.route('/api/maintenances')
		.get(controller.list_maintenances)
		.post(controller.create_maintenance);

	app.route('/api/sensors/garden/:id')
		.get(controller.sensors_of_garden)

	app.route('/api/maintenances/garden/:id')
		.get(controller.calendar_of_garden)

	app.route('/api/maintenances/garden/:id/next')
		.get(controller.next_on_garden)

	app.route('/api/maintenances/garden/:id')
		.get(controller.calendar_of_garden)

	app.route('/api/maintenances/:id/done')
		.get(controller.maintenance_done)

	app.use(controller.show_index);
};

/*
EXAMPLE from LAB
app.route('/api/movies/:id')
.get(controller.read_movie)
.put(controller.update_movie)
.delete(controller.delete_movie);*/