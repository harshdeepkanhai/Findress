import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

class AddressCollection extends Mongo.Collection {}

export const Address = new AddressCollection('address');

Address.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  }
});

Meteor.methods({
  addressUpsert: function(id, doc) {
    Address.upsert(id, doc);
  }
});
