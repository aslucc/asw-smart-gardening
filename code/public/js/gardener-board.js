const GardenerBoard = {
	components: {
		'meteo': Meteo,
		'maintenance-card': MaintenanceCard,
		'gardens-in-need': GardensInNeed,
		'gardener-calendar': Calendar
	},
	template: `
		<div class="gardener-board row">
			<div class="col-12 col-md-7">
				<div class= "row">
					<h5 class="mt-3">Calendario di {{gardenerName}}</h5>
				</div>
				<gardener-calendar :from="'gardener'" 
								   @clicked-maint="showMaint" 
								   :gardener="this.$route.params.id"></gardener-calendar>
			</div>
			<div class="col-12 col-md-5">
				<div v-if="!emptyMaint" class="row mt-3">
					<maintenance-card :garden="garden" :maintenance="maintenance" :from="'gardener'"></maintenance-card>
				</div>
				<div v-if="!emptyMaint" class="row">
					<meteo :garden="garden"></meteo>
				</div>
				<div>
					<gardens-in-need :gardener="this.$route.params.id"></gardens-in-need>
				</div>
			</div>
		</div>
	`,
	data() {
		return {
			gardenerName: "",
			maintenance:{},
			garden:{},
			emptyMaint: true,
			token: ""
		}
	},
	methods: {
		getGardenerName: function() {
			axios
				.get(DBURL + "/gardener/" + this.$route.params.id, {
					headers: {
						Authorization: this.token
					}
				})
				.then(response => {
					this.gardenerName = response.data.name + " " + response.data.surname
				})
				.catch(error => (console.log(error)));
		},
		getGarden: function () {
			axios.get(DBURL + "/gardens/" + this.maintenance.garden)
				.then(response => {
					this.garden = response.data
				})
				.catch(error => (console.log(error)));

		},
		showMaint: function(maint) {
			this.maintenance = maint
			this.emptyMaint = false
			this.getGarden()
		}
	},
	mounted() {
		if (localStorage.user && localStorage.idGardener) {
			this.token = localStorage.user;
			this.getGardenerName();
		} else {
			this.$router.replace('/').catch(err => {});
		}
	}
}