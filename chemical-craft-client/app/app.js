angular.module("chemicalCraftApp", ["chemicalCraftApp.controllers"])
.directive('chemicalElement', function($rootScope) {
  return {
  	restrict: 'E',
	controller: function($scope, $attrs) {
      $scope.element = $scope.getChemicalElementByPosition($scope.p, $scope.g);
	},
	template: '<div id="{{element.Code}}" x-lvl-draggable="true" class="chemical-element {{element.Category}}">'+
	'<div class="atomic-number"><span>{{element.AtomicNumber}}</span></div>'+
	'<div class="code"><b>{{element.Code}}</b></div>'+
	'<div class="name"><span>{{element.Name}}</span></div>'+
	'</div>'
  };
})
.directive('lvlDraggable', ['$rootScope', function($rootScope) {
	return {
		restrict: 'A',
		link: function(scope, el, attrs, controller) {
			
			angular.element(el).attr("draggable", "true");
						
			var id = angular.element(el).attr("id");
			
			el.bind("dragstart", function(event) {
				event.originalEvent.dataTransfer.setData("Text", event.target.id);
				$rootScope.$emit("LVL-DRAG-START");
			});

			el.bind("dragend", function(e) {
				$rootScope.$emit("LVL-DRAG-END");
			});
		}
	}
}])
.directive('lvlDropTarget', ['$rootScope', function($rootScope) {
	return {
		restrict: 'A',
		scope: {
			onDrop: '&'
		},
		link: function(scope, el, attrs, controller) {
			
			var id = attrs.id;
			
			el.bind("dragover", function(e) {
			  if (e.preventDefault) {
				e.preventDefault();
			  }

			  e.originalEvent.dataTransfer = 'move';
			  return false;
			});

			el.bind("dragenter", function(e) {
			  angular.element(e.target).addClass('lvl-over');
			});

			el.bind("dragleave", function(e) {
			  angular.element(e.target).removeClass('lvl-over');
			});

			el.bind("drop", function(e) {
			  if (e.preventDefault) {
				e.preventDefault();
			  }

			  if (e.stopPropogation) {
				e.stopPropogation();
			  }
				
				var data = e.originalEvent.dataTransfer.getData("text");
				var dest = document.getElementById(id);
				var src = document.getElementById(data);

				scope.onDrop({dragEl: src, dropEl: dest});
			});

			$rootScope.$on("LVL-DRAG-START", function() {
				var el = document.getElementById(id);
				angular.element(el).addClass("lvl-target");
			});

			$rootScope.$on("LVL-DRAG-END", function() {
				var el = document.getElementById(id);
				angular.element(el).removeClass("lvl-target");
				angular.element(el).removeClass("lvl-over");
			});
		}
	}
}])
;