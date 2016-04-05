$(document).ready(function(){
    document.addEventListener("deviceready", function(){
    });

    $('#search_btn').click(function(e){
        e.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();
        var errormsg = "";
        var user_url = 'http://beta20.rubixitsolutions.com/DesktopModules/AccountDetails/API/User/ValidateUser?UserName=' + username + '&Password=' + password;
        $.ajax({
            url: user_url,
            dataType: 'json',
            success: function(response){
                //console.log("JSON - " + response);
                var posts = JSON.parse(response);
                //console.log(posts);
                if (posts.Status == "1")
                {
                    window.localStorage["userID"] = posts.UserID;
                    window.location = "Account.html";
                }
                else
                {
                    errormsg = posts.ErrorMsg;
                    $('#errormsg').html(errormsg);
                }
            }
        });
    });

    
    $('#proceed_btn').click(function (e) {
        e.preventDefault();

        var fileref = $('#fileref').val();
        var filepassword = $('#filepassword').val();
        var case_errormsg = "";
        var Borrower1 = "";
        var Borrower2 = "";
        var case_url = 'http://beta20.rubixitsolutions.com/DesktopModules/AccountDetails/API/User/ValidateSolexAccount?FileReference=' + fileref + '&FilePassword=' + filepassword;

        //console.log(case_url);
        $.ajax({
            url: case_url,
            dataType: 'json',
            success: function(caseresponse){
                //console.log("JSON - " + caseresponse);
                var caseposts = JSON.parse(caseresponse);
                
                if (caseposts.Status == "1") {
                    //window.localStorage["userID"] = caseposts.UserID;
                    //window.location = "spec.html";
                    $("#plDetails").show();
                    $("#plFileRef").hide();

                    $("#FirstName").val(caseposts.Firstname);
                    $("#LastName").val(caseposts.Surname);
                    $("#FirstName2").val(caseposts.Firstname2);
                    $("#LastName2").val(caseposts.Surname2);
                    $("#Address1").val(caseposts.Address1);
                    $("#Address2").val(caseposts.Address2);
                    $("#Address3").val(caseposts.Address3);
                    $("#Address4").val(caseposts.Address4);
                    $("#PostCode").val(caseposts.PostCode);
                    $("#Address1b").val(caseposts.Address1B);
                    $("#Address2b").val(caseposts.Address2B);
                    $("#Address3b").val(caseposts.Address3B);
                    $("#Address4b").val(caseposts.Address4B);
                    $("#PostCodeb").val(caseposts.PostCodeB);
                    
                    var myOptions = {
                        1: caseposts.Firstname + ' ' + caseposts.Surname,
                        2: caseposts.Firstname2 + ' ' + caseposts.Surname2
                    };
                    var mySelect = $('#Borrowers');
                    $.each(myOptions, function (val, text) {
                        mySelect.append(
                            $('<option></option>').val(val).html(text)
                            );
                    });
                }
                else {
                    case_errormsg = caseposts.ErrorMsg;
                    $('#case_errormsg').html(case_errormsg);
                }
            }
        });
    });


    $('#register_btn').click(function (e) {
        e.preventDefault();

        var EmailAddress = $('#regemail').val();
        var Password = $('#regpassword').val();
        var FileRef = $('#fileref').val();
        var FilePassword = $('#filepassword').val();

        var Firstname = "";
        var Lastname = "";
        var Address1 = "";
        var Address2 = "";
        var Address3 = "";
        var Address4 = "";
        var PostCode = "";

        if ($('#Borrowers').val() == "1") {
            Firstname = $('#FirstName').val();
            Lastname = $('#LastName').val();
            Address1 = $('#Address1').val();
            Address2 = $('#Address2').val();
            Address3 = $('#Address3').val();
            Address4 = $('#Address4').val();
            PostCode = $('#PostCode').val();
        }
        else {
            Firstname = $('#FirstName2').val();
            Lastname = $('#LastName2').val();
            Address1 = $('#Address1b').val();
            Address2 = $('#Address2b').val();
            Address3 = $('#Address3b').val();
            Address4 = $('#Address4b').val();
            PostCode = $('#PostCodeb').val();
        }

        var case_errormsg = "";

        var url = "http://beta20.rubixitsolutions.com/DesktopModules/AccountDetails/API/User/RegisterUser?EmailAddress=" + EmailAddress + "&Password=" + Password +
            "&Firstname=" + Firstname + "&Lastname=" + Lastname + "&FileReference=" + FileRef + "&FilePassword=" + FilePassword +
            "&Address1=" + Address1 + "&Address2=" + Address2 + "&Address3=" + Address3 + "&Address4=" + Address4 + "&PostCode=" + PostCode;

        console.log(url);
        $.ajax({
            url: url,
            dataType: 'json',
            success: function (detailsresponse) {
                console.log("JSON - " + detailsresponse);
                var detailsposts = JSON.parse(detailsresponse);
                //console.log(caseposts);
                $.each(detailsposts, function () {
                    if (detailsposts.Status == "1") {
                        //console.log(caseposts.UserID);
                        window.localStorage["userID"] = caseposts.UserID;
                        window.location = "Account.html";
                    }
                    else {
                        case_errormsg = detailsposts.ErrorMsg;
                        $('#case_errormsg').html(case_errormsg);

                    }
                });
            }
        });
    });
});
