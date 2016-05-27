describe('Protractor Secure SDLC Tool general testsuite', function() {
	var admin = element(by.partialLinkText('Administration'));
	var constantRepeater = "constant in constants";
	
	beforeEach(function() {
		browser.get(browser.params.testHost);
		
	});
	
	it('searching for a constant', function() {
		admin.click();
		element(by.partialLinkText('Constants')).click();
		element(by.id('searchQuery')).sendKeys('custom');
		element(by.partialButtonText('Search a constant')).click();
		expect(element.all(by.repeater(constantRepeater)).count()).toBe(1);
		
	});
	
	it('administering a constant', function() {
		admin.click();
		element(by.partialLinkText('Constants')).click();
		element.all(by.buttonText("Edit")).first().click();
		browser.sleep(2000);
		element(by.id('field_description')).clear().then(function(){
			element(by.id('field_description')).sendKeys("This is the short name representation for the custom requirements.<script>alert(1)</script>");
		});
		
		element(by.buttonText("Save")).click();
		browser.sleep(2000);
		element.all(by.buttonText("Edit")).first().click();
		browser.sleep(3000);
		element(by.id('field_description')).clear().then(function(){
			element(by.id('field_description')).sendKeys("This is the short name representation for the custom requirements.");
		});
		
		element(by.buttonText("Save")).click();
		browser.sleep(3000);
	});
	
	// test for server side input validation.
//	var formData = new FormData();
//	formData.append("id", "1");
//	formData.append("name", "customRequirementName");
//	formData.append("value", "CUS-");
//	formData.append("description", "This is the short name representation for the custom requirements.");
//	    		var constants = [];
//	    		var ajax = new XMLHttpRequest();
//	        	ajax.open("PUT","admin-api/configConstants",true);
//	        	ajax.setRequestHeader("Accept","application/json, text/plain, */*");
//	        	ajax.onreadystatechange = function(){
//	        			if(this.readyState == 4){
//	        				if(this.status == 200){
//	                  alert(this.responseText);
//	                }
//	        					
//	        			}
//	        		}
//	          
//	          ajax.withCredentials = true;
//	ajax.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
//	ajax.setRequestHeader('X-CSRF-TOKEN', 'a3d958ad-edc7-4127-aab3-7fc33dbcaa1f');
//	ajax.send(formData);
	
	
});