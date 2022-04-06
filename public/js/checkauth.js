var checkauth = async() => {
    var token = await localStorage.getItem('access_token');
    console.log("token - ", token);
    $.ajax({
        type: "POST",
        url: '/checkauth',
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", token);
        },
        success: (res) => {

            console.log("success:", res);
            return true;
        },
        error: (err) => {
            window.location.replace('/');
            console.log("err: ", err);
            return false;
        }
    });
}

$(document).ready(async() => {
    var mainHtml = $("#main").html();

    $("#main").html("Loading...");

    var proceed = await checkauth();
    if(proceed){
        $("#main").html(mainHtml);
    }
});