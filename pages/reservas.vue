<template>
  <CtCard title="Reservas" withoutShaped fluid width="100%" class="mx-auto">
    <v-row dense>
      <v-col cols="12" v-if="serverMessage" v-html="serverMessage" class="error--text" />
      <v-btn icon class="ma-4" @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn outlined class="mr-4 ma-4" color="grey darken-2" @click="setToday">
        Hoy
      </v-btn>
      <v-col cols="2">
        <v-select v-model="type" :items="types" dense outlined hide-details class="ma-2" label="Tipo" />
      </v-col>
      <v-col cols="2">
        <v-select v-model="weekday" :items="weekdays" dense outlined hide-details label="Días" class="ma-2" />
      </v-col>
      <v-toolbar-title v-html="title" class="ma-4" />
      <v-spacer />
      <v-btn icon class="ma-4" @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-col cols="12" style="min-height: 600px;" v-if="eventsSummaryLoaded">
        <v-calendar
          ref="calendar"
          locale="es"
          v-model="value"
          :weekdays="weekday"
          :type="type"
          :events="events"
          :event-overlap-mode="mode"
          :event-overlap-threshold="30"
          :event-color="getEventColor"
          @change="updateRange"
          @click:event="showEvent"
        ></v-calendar>
      </v-col>
    </v-row>
    <v-dialog v-model="eventToAdd" v-if="eventToAdd">
      <CtCard title="Reservar">
        <template v-slot:rightTitleContent>
          <CtBtn type="icon" :icon="['fa', 'times']" @click="eventToAdd = null" color="white" />
        </template>
        <v-row dense>
          <v-spacer v-if="$vuetify.breakpoint.smAndUp" />
          <v-date-picker label="Día" readonly v-model="eventToAdd.day" />
          <v-spacer v-if="$vuetify.breakpoint.smAndUp" />
          <v-time-picker label="Hora" readonly v-model="eventToAdd.time" />
          <v-spacer v-if="$vuetify.breakpoint.smAndUp" />
        </v-row>
        <v-row dense>
          <v-spacer />
          <v-col cols="8" class="mt-6">
            <CtTextField label="Descripción" v-model="eventToAdd.description" />
            <v-textarea outlined label="Detalles" v-model="eventToAdd.details" />
          </v-col>
          <v-spacer />
        </v-row>
        <v-row dense>
          <v-spacer />
          <CtBtn @click="addEvent">
            Reservar
          </CtBtn>
          <v-spacer />
        </v-row>
      </CtCard>
    </v-dialog>
  </CtCard>
</template>

<script>
import { mapActions } from 'vuex'
import CtCard from "../components/CtCard";
import CtTextField from "../components/CtTextField";
import CtBtn from "../components/CtBtn";

export default {
  components: {CtBtn, CtTextField, CtCard},
  middleware: 'authenticated',

  data() {
    return {
      eventToAdd: null,
      type: 'month',
      types: [
        { text: 'Mes', value: 'month' },
        { text: 'Semana', value: 'week' },
        { text: 'Día', value: 'day' },
        { text: '4 días', value: '4day' },
      ],
      mode: 'stack',
      weekday: [1, 2, 3, 4, 5, 6, 0],
      weekdays: [
        { text: 'Dom - Sáb', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Lun - Dom', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Lun - Vie', value: [1, 2, 3, 4, 5] },
        { text: 'Lun, Mié, Vie', value: [1, 3, 5] },
      ],
      value: '',
      eventsSummaryLoaded: false,
      eventsSummary: [],
      events: [],
      schedule: [
        { start: { hour: '9', minute: '00' }, end: { hour: '10', minute: '00' } },
        { start: { hour: '14', minute: '00' }, end: { hour: '15', minute: '00' } },
        { start: { hour: '18', minute: '00' }, end: { hour: '19', minute: '00' } },
      ],
      colors: ['accent', 'primary'],
      names: ['Reservado', 'Libre'],
      start: null,
      end: null,
    }
  },

  computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }

      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth

      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear

      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)

      switch (this.type) {
        case 'month':
          return `${startMonth} ${startYear}`
        case 'week':
        case '4day':
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
          return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    },
    reservatedDates() {
      return this.eventsSummary.map((es) => (new Date(es.reservated_at)).toString())
    },
    serverMessage () {
      return this.$store.state.serverMessage.serverMessage
    },
    token () {
      return this.$store.state.user.token
    },
    user () {
      return this.$store.state.user.user
    },
  },

  mounted() {
    this.fetch()
  },

  methods: {
    // Backend events methods
    afterFetch(response) {
      this.eventsSummary = response.data
      this.eventsSummaryLoaded = true
    },

    fetch() {
      // eventSummary
      this.$axios.get('/api/eventSummary')
        .then((response) => (response.data) ? this.afterFetch(response) : '')
        .catch((error) => (error.response.data.message) ? this.setServerMessage(error.response.data.message) : this.setServerMessage('Error.'))
    },

    showEvent({ nativeEvent, event }) {
      if (event.color === 'primary') {
        this.eventToAdd = {
          day: this.formatDate(new Date(event.start), false),
          time: (new Date(event.start)).getHours() + ':00',
          description: '',
          details: '',
          creator_id: this.user.id,
          destinator_id: 2,
        }
      }
    },

    afterAddEvent() {
      this.eventToAdd = null
      this.$router.push('/notificaciones')
    },

    addEvent() {
      this.$axios.post('/api/event', {
        description: this.eventToAdd.description,
        details: this.eventToAdd.details,
        creator_id: this.eventToAdd.creator_id,
        destinator_id: this.eventToAdd.destinator_id,
        reservated_at: Math.floor((new Date(this.eventToAdd.day + ' ' + this.eventToAdd.time + ':00')).getTime() / 1000)
      })
        .then((response) => (response.data) ? this.afterAddEvent() : this.setServerMessage(response.data))
        .catch((error) => (error.response.data.message) ? this.setServerMessage(error.response.data.message) : this.setServerMessage('Error.'))
    },

    // Frontend events methods
    getEventColor (event) {
      return event.color
    },
    nth (d) {
      return d > 3 && d < 21
        ? 'th'
        : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    },
    formatDate (a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
    },
    setToday () {
      this.value = this.today
    },
    updateRange ({ start, end }) {
      const events = []

      const currentDayStart = new Date(`${start.date}T00:00:00`)
      const currentDayEnd = new Date(`${start.date}T00:00:00`)
      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000

      for (let i = 0; i < days; i++) {
        for (let z = 0; z < this.schedule.length; z++) {
          currentDayStart.setHours(this.schedule[z].start.hour, this.schedule[z].start.minute)
          currentDayEnd.setHours(this.schedule[z].end.hour, this.schedule[z].end.minute)
          const index = this.reservatedDates.includes(currentDayStart.toString()) ? 0 : 1

          if (currentDayStart.getDay() !== 0 && currentDayStart.getDay() !== 6) {
            events.push({
              name: this.names[index] + ' de ' + this.schedule[z].start.hour + ' a ' + this.schedule[z].end.hour,
              start: this.formatDate(currentDayStart, true),
              end: this.formatDate(currentDayEnd, true),
              color: this.colors[index],
            })
          }
        }
        currentDayStart.setDate(currentDayStart.getDate() + 1);
        currentDayEnd.setDate(currentDayEnd.getDate() + 1);
      }

      this.start = start
      this.end = end
      this.events = events
    },

    // Vuex methods
    ...mapActions({
      setServerMessage: 'serverMessage/setServerMessage',
    }),
  }
}
</script>
