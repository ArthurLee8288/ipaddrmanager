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
        $('#username').focus();
        $.messager.alert('错误','请输入帐号','error')
    }else if(!$('#password').validatebox('isValid')){
        $('#password').focus();
        $.messager.alert('错误','请输入密码','error')
    }
    })
})

