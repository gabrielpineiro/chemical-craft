'use strict';

describe('chemicalCraftApp.controllers module', function() {

  	beforeEach(module('chemicalCraftApp.controllers'));

	describe('test chemicalController', function(){
        var scope, testedController;

        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            testedController = $controller('chemicalController', {$scope: scope});
        }));

        it('should be defined', function(){
            expect(testedController).toBeDefined();
        });
    });
});