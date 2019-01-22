import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import './app-findress.html';

import { Address } from '../../api/address/address.js';

Template.app_findress.onCreated(() => {
  // We need to set a timeout here so that we don't redirect from inside a redirection
  //   which is a no-no in FR.
});
let srchterm = new ReactiveVar('');
let lat = new ReactiveVar('');
let lng = new ReactiveVar('');
let cntry = new ReactiveVar('');
let full_addr = new ReactiveVar('');
Template.app_findress.helpers({
  lat() {
    return lat.get();
  },
  lng() {
    return lng.get();
  },
  cntry() {
    return cntry.get();
  },
  full_addr() {
    return full_addr.get();
  },
  srch_term() {
    return srchterm.get();
  }
});

Template.app_findress.events({
  'submit .address'(event) {
    event.preventDefault();
    const target = event.target;
    const text = target.text.value;
    const api_key = `AIzaSyC-wDQ6kl_dodK8dC8xmpBISr2YmGGTRlQ`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json`;
    HTTP.call(
      'GET',
      url,
      {
        params: { address: text, key: api_key }
      },
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          let latitude = result.data.results[0].geometry.location.lat;
          let longitude = result.data.results[0].geometry.location.lng;
          let country = result.data.results[0].address_components.filter(el =>
            el.types.includes('country')
          )[0].long_name;
          let full_address = result.data.results[0].formatted_address;
          Meteor.call(
            'addressUpsert',
            { _id: '0' },
            { latitude, longitude, country, full_address, srchterm: text }
          );
          srchterm.set(Address.findOne({ _id: '0' }).srchterm);
          lat.set(Address.findOne({ _id: '0' }).latitude);
          lng.set(Address.findOne({ _id: '0' }).longitude);
          cntry.set(Address.findOne({ _id: '0' }).country);
          full_addr.set(Address.findOne({ _id: '0' }).full_address);
          target.text.value = '';
        }
      }
    );
  }
});
