$(function () {
    $('#login').dialog({
        title:'IpManager系统登陆',
        width:300,
        height:200,
        modal:true,
        buttons:'#btn',
        draggable:false,
        closable: false,
    });
    $('#username').validatebox({
        required:true,
        missingMessage:'请输入帐号',
    });
    $('#password').validatebox({
        required:true,
        missingMessage:'请输入密码',
    });
    if(!$('#username').validatebox('isValid')){
        $('#username').focus();
    }else if(!$('#username').validatebox('isValid')){
        $('#password').focus();
    }
    $('#btn a').click(function(){
    if(!$('#username').validatebox('isValid')){
        $.messager.alert('错误','请输入帐号','error')
        // $('#username').focus();
    }else if(!$('#password').validatebox('isValid')){
        $.messager.alert('错误','请输入密码','error')
        // $('#password').focus();
    }else{
         $.messager.progress({
            interval:150,
            text:'登陆中，请稍后。。。',
        });
        var data = {
            'username': $('#username').val(),
            'password': $('#password').val(),
        }
        $.ajax({
            type: 'post',
            url: '/',
            data: data,
            dataType: 'text',
            success:function (data) {
                if (data == "ok"){
                        $(location).attr('href', '/manager')
                }
                if (data == 'no') {
                        $.messager.progress('close');
                        $.messager.alert('登陆失败','用户名或密码错误','error')
                }
            }
        });
    };
    return false;
    });
})