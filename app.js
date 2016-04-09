/*Variables for mocha tests: */
var fullUserName, firstRepo;

/*Submit button event: */
$(function() {
    $('#submit').on('click', function(e) {
        e.preventDefault();
        $('#output').html('<span>Loading data...</span>');

        /*Get a username data from input field: */
        var username = $('#githubUsername').val();
        /*Create root endpoints for getting JSON data within Github Api: */
        var requri = 'https://api.github.com/users/' + username;
        var repouri = 'https://api.github.com/users/' + username + '/repos?page=1&per_page=100'; // changing the default value of 30 items per page to the 100'

        /*Get JSON data: */
        requestJSON(requri, function(json) {

            /*Warning 1: if there is no such Github user, post a message: */
            if (json.message == "Not Found" || username == '') {
                $('#output').html("<h3>The Github user does not exist</h3>");
            } else {
                /* User info: */
                var fullname = json.name;
                var username = json.login;
                var profileurl = json.html_url;

                if (fullname == undefined) {
                    fullname = username;
                }
                /* Output a name of Github user and a link to his Git: */
                var outhtml = '<h2>A list of repositories for user ' + fullname + ' <span class="smallname">(@<a href="' + profileurl + '" target="_blank">' + username + '</a>)</span></h2>';

                var repositories;
                $.getJSON(repouri, function(json) {
                    repositories = json;
                    loadReposList(); // Main function
                    loadReposListTest(); // Test function            
                });

                function loadReposList() {
                    /*Warning 2: If there are no repositories, post a message: */
                    if (repositories.length == 0) {
                        outhtml = outhtml + '<h3>There are no repositories from this user!</h3></div>';
                    }
                    /*If there are some repositories; create a list: */
                    else {
                        outhtml = outhtml + '<ol>';
                        /*For every repository output a link on it, description, dates of creation, update, and push*/
                        $.each(repositories, function(index) {
                            outhtml = outhtml + '<li><a href="' + repositories[index].html_url +
                                '" target="_blank">' + repositories[index].name +
                                '</a></li><p><b>Description: ' + repositories[index].description + '</b></p>' +
                                '<p>Created at: ' + repositories[index].created_at.slice(0, 10) + '<br>' +
                                'Updated at: ' + repositories[index].updated_at.slice(0, 10) + '<br>' +
                                'Pushed at: ' + repositories[index].pushed_at.slice(0, 10) + '</p>';
                        });
                        outhtml = outhtml + '</ol></div>';
                    }
                    $('#output').html(outhtml);

                } // end of loadReposList()

                /*Mocha test function: */
                function loadReposListTest() {
                    /*For test 1: Get full user name: */
                    fullUserName = json.name;
                    makeTest(fullUserName);

                    /*For test 2: Get the name of 1st repository: */
                    firstRepo = repositories[0].name;
                    makeTest(firstRepo);                  
                   
                    /*Start the test: */
                    mocha.run();
                }; // end of loadReposListTest function

            } // end of else statement

            /*Warning 3: if Server answers with code 400, post a message and show it in console: */
            $.ajax({
                statusCode: {
                    400: function() {
                        console.log("Server: 400 Bad Request ");
                        $('#output').html("<h4>Server: 400 Bad Request, Problems parsing JSON</h4>");
                    }
                }
            });

        }); // end of JSON request
    }); // end of submit button event

    function requestJSON(url, callback) {
        $.ajax({
            url: url,
            complete: function(xhr) {
                callback.call(null, xhr.responseJSON);
            }
        });
    }
});