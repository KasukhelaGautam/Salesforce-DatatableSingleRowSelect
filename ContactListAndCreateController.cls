public class ContactListAndCreateController {

    @AuraEnabled
    public static List<Contact> getListOfContacts(){
        return [SELECT 	Name,
                		Email,
               			Title,
               			MobilePhone
                 FROM   Contact
                 LIMIT 10];
    }
}