'user strict'

angular.module('sdlctoolApp')
    .directive('splitArray', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
            	var field = JSON.parse(attrs.splitArray);
            	
            	function fromUser(commaSeparatedValues) {
            		if(!commaSeparatedValues)
            			return;
            		var tempValue = commaSeparatedValues.split(',');
            		var users = [];
            		if(field.itemType === 'user') {
	            		for(var i = 0; i < tempValue.length; i++) {
	            			users.push(JSON.stringify({name: tempValue[i].trim()}));
	        			}
            			return users;
            		}
            	}   
            	function toUser(valuesFromController) {
            		var modelValue = [];
            		var i = 0;
            		if(Array.isArray(valuesFromController)) {
	            		if(field.itemType === 'user') {
	            			while(valuesFromController[i]) {
	            				modelValue.push(JSON.parse(valuesFromController[i]).name);
	            				i++;
	            			}
	            			
	            			return modelValue.join(', ') + ', ';
	            		}
            		}
            	}
            	ngModel.$validators.validCharacters = function(modelValue, viewValue) {
            		  if(field.itemType === 'user'){
            			  var value = toUser(modelValue) || viewValue;
            			  return /^(\w+,\s*)*\w*$/.test(value);
            		  }
            		  return false;
            	};
            	ngModel.$parsers.push(fromUser);
            	ngModel.$formatters.push(toUser);
            	
            	scope.$watchCollection(attrs.ngModel, function ngModelWatch(value, old) {
                    if (!Array.isArray(value) || old === value) {
                        return;
                    }

                    ///copypasta from ngModelWatch()
                    var formatters = ngModel.$formatters,
                        idx = formatters.length;

                    ngModel.$modelValue = value;
                    while (idx--) {
                        value = formatters[idx](value);
                    }

                    if (ngModel.$viewValue !== value) {
                    	ngModel.$viewValue = value;
                    	ngModel.$render();
                    }
            	});
            	////endcopypasta
            	
            }
        };
    });