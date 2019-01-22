import './routes.js';

import '../../ui/layouts/app-body.js';
import '../../ui/pages/app-findress.js';
// import '../../ui/pages/app-not-found.js';

FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'app_findress' });
  }
});

// the App_notFound template is used for unknown routes and missing lists
// FlowRouter.notFound = {
//   action() {
//     BlazeLayout.render('App_body', { main: 'App_notFound' });
//   }
// };
