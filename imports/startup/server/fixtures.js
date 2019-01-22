import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Meteor.call(
    'addressUpsert',
    { _id: '0' },
    { latitude: '', longitude: '', country: '', full_address: '' }
  );
});
