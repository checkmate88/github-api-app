/* Mocha test 1: checks if a full name for the user login Kibo007 is equal to 'Bojan Dragojevic' */
/* Mocha test 2: checks if the first repository name from the user login Kibo007 is equal to "allmighty-autocomplete" */

  function makeTest(name) {   	
    var name = "Kibo007"; /*Github login name, used it tests*/
    var fullUserNameExpected = "Bojan Dragojevic"; /*Expected full user name*/
    var firstRepoExpected = "allmighty-autocomplete"; /*Expected first repository name*/

    /* 1. Check if a real full user name is equal to the expexted one: */
    it("For " + name + " full name is: " + fullUserNameExpected, function() {
      assert.equal(fullUserName, fullUserNameExpected);
    });

    /* 2. Check if the real first repository name is equal to expected one: */
    it("For " + name + " the first repository name is: " + firstRepoExpected, function() {
      assert.equal(firstRepo, firstRepoExpected);
    });
    
  }
 makeTest(name);
  

 