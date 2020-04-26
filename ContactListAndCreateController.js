({
    doInit : function(component,event,helper){
        component.set('v.columns', [
           		{ label: 'Name', fieldName: 'Name' },
   			    { label: 'Email', fieldName: 'Email' ,type: 'email'},
	            { label: 'Mobile Number', fieldName: 'MobilePhone'},
                { label: 'Title', fieldName: 'Title' }
                
       ]);
        var action = component.get("c.getListOfContacts");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var records = response.getReturnValue();
           
                component.set("v.data", records);
            }else if (state === "INCOMPLETE") {
                //do as required
            }else if (state === "ERROR") {
                var errors = response.getError();
            }
        });
        $A.enqueueAction(action);
    },
    
    /**Handle the  selection of a row from the datatable.
     * Keep track of old and new arrays.
    */
    handleRowSelect : function(component, event, helper){

        var tableT = component.find("activeContactsTable");

        if (component.get("v.showNewContact")){
            tableT.set("v.selectedRows",null);
            return;
        }

        var selectedRows = event.getParam('selectedRows');
        if(selectedRows.length == 1){
          component.set("v.oldSelectedRow",selectedRows[0]);
            
        }
        if(selectedRows.length == 2){
            var original = component.get("v.oldSelectedRow");
            for (var i = 0; i < selectedRows.length; i++){

                if(original!=selectedRows[i]){

                    var r = [];
                    r.push(selectedRows[i]);
                    tableT.set("v.selectedRows",r);
                    component.set("v.oldSelectedRow",selectedRows[i]);
                }
            }
        }
    },

    /**Function invoked on click of the chekbox. If this is checked
     * then do not allow selection of checkboxes on the datatable.
     */
     createNewContact : function(component, event, helper){

        let checked = component.find("newContactCheckbox").get("v.checked");
		if (checked){
	        var table = component.find("activeContactsTable");
	        table.set("v.selectedRows",null);
		}
	    component.set("v.showNewContact", checked);

    },
})