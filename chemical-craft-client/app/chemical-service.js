angular.module("chemicalCraftApp.services", []).factory("chemicalService", function($http) {
  'use strict';
  var service = {};
  
  service.getPeriodicTable = function(callback) {

    var httpServiceUrl = "http://localhost:3000/chemistry/";
    $http({
        url: httpServiceUrl,
        method: "get",
        headers: { 'Content-Type': 'application/json'}
    }).success(function (data) {
        callback(data);
    });
  };

  return service;

});