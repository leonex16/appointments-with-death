import React from 'react';
import ReactDOM from 'react-dom';
import { locale, addLocale } from 'primereact/api';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/arya-orange/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import App from './App';
import './main.css';

// addLocale('es', {
//   dateFormat: 'dd/mm/yy',
//   firstDayOfWeek: 1,
//   dayNames: ['domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
//   dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
//   dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
//   monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
//   monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
//   today: 'Hoy',
//   clear: 'Claro'
// });
// locale('es');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
