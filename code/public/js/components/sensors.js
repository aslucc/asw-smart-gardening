const Sensors = {
    template:`
      <div class="sensors-template">
      <h6>Sensori</h6>
      <div v-if="nothing"> <p class="empty-card"> Nessun sensore collegato! </p> </div>
      <div v-else class="card sensors-scrollbar">
        <table class="table sensors-table">
          <tbody>
          <tr v-for="sensor in sensors">
            <th scope="row">#{{sensor.API}}</th>
            <td>{{sensor.where}}</td>
            <td>{{sensor.fieldname}} </td>
            <td>
              {{sensor.value}} {{getMeasureUnit(sensor.fieldname)}}
              <i v-if="sensor.flagOn" class="fas fa-circle red-state"></i>
              <i v-else class="fas fa-circle green-state"></i>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      </div>
    `,
    data() {
        return {
            nothing: true,
            sensors: []
        }
    },
    props: {'gardenid': {
        required: true
    }},
    watch: {
        gardenid() {
            this.getSensors()
        }
    },
    methods: {
        getSensors: function () {
            if(this.$props.gardenid !== "") {
                axios.get(DBURL + "/sensors/garden/" + this.$props.gardenid)
                    .then(response => {
                        if (response.data.length > 0) {
                            this.nothing = false
                            this.sensors = response.data
                        } else {
                            this.nothing = true
                        }
                    })
                    .catch(error => {
                        this.nothing = true
                        console.log(error)
                    });
            }
        },
        getMeasureUnit: function (fieldname){
            switch(fieldname){
                case "Temperature":
                    return "°C"
                case "Humidity":
                    return "%"
                default:
                    return ""
            }
        },
        init: function(){
            this.getSensors();
        }
    },
    mounted(){
        this.init()
    }
}
