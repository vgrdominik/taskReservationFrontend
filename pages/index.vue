<template>
  <CtCard title="¿Cómo trabajar conmigo?" width="600" class="mx-auto">
    <v-row dense>
      <v-spacer />
      <iframe width="560" height="315" src="https://www.youtube.com/embed/iv5GjtPuHn0?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <v-spacer />
      <v-col cols="12">
        <v-card-title v-html="'Proyecto de ejemplo'" class="primary--text" />
        <v-subheader v-html="'Aplicativo para reservar tareas (Ésta página)'" />
      </v-col>
      <CtBtn type="text" color="primary" href="https://github.com/vgrdominik/taskReservationDocumentation/blob/master/TaskReservationWirframe.pdf" target="_blank">
        Wireframe (Esquema del sitio)
      </CtBtn>
      <CtBtn type="text" color="primary" href="https://github.com/vgrdominik/taskReservationDocumentation/blob/master/tasks.csv" target="_blank">
        Tareas
      </CtBtn>
      <CtBtn type="text" color="primary" href="https://github.com/vgrdominik?utf8=%E2%9C%93&tab=repositories&q=taskReservation&type=&language=" target="_blank">
        Código
      </CtBtn>
      <v-col cols="12" class="body-2 px-5">
        Tiempo desde primera reunión hasta entrega: 1 semana
      </v-col>
      <v-col cols="12" class="body-2 px-5">
        Coste reunión 1 hora: 45€ + IVA
      </v-col>
      <v-col cols="12" class="body-2 px-5">
        Coste orientativo total: 1960€ + IVA
      </v-col>
      <CtBtn color="primary" to="/registro" class="mt-4 mx-auto">
        Registro gratuito
      </CtBtn>
    </v-row>
  </CtCard>
</template>

<script>
export default {
}
</script>
