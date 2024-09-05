const express = require('express')
const cors = require('cors')

/* rotas */
const eventoRoutes = require('./routers/EventosRoutes')
const despesaRoutes = require('./routers/DespesasRoutes')
const doadorRoutes = require ('./routers/DoadoresRoutes')

const app = express( )
const port = 3001
app.use(express.json( ))
app.use(cors( ))
app.use(eventoRoutes)
app.use(despesaRoutes)
app.use(doadorRoutes)
app.listen(port, ( ) => `Executando na porta ${port}`)