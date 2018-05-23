var id='';
var ip_list='';
$(function () {
    $('#left').accordion({
        multiple: false,
        selected: false,
    });
    $('#nav').tabs({
        border: false,
        fit: true,
        plan: true,
    });
    // $('#leftnav a').click(function () {
    //     var data = {'netaddr': $(this).text()};
    //     id = $(this).index()+1
    //     if ($('#nav').tabs('exists',$(this).text())){
    //         $('#nav').tabs('select',$(this).text());
    //     }else {
    //         $('#nav').tabs('add', {
    //             title: $(this).text(),
    //             selected: true,
    //             closable: true,
    //             fit: true,
    //             content:'<table id='+id+'></table>',
    //             border: false,
    //         });
    //         $.ajax({
    //             type: 'post',
    //             url: 'ipcontext',
    //             data: data,
    //             dataType:'json',
    //             success:function (data_retrun) {
    //                 $('table#'+id).datagrid({
    //                     fitColumns:true,
    //                     striped:true,
    //                     singleSelect:true,
    //                     rownumbers:true,
    //                     columns :[[
    //                         {
    //                                 field:'ipaddr',
    //                                 title:'IP地址',
    //                                 // width:100,
    //                                 align:'center',
    //                             },
    //                         {
    //                                 field:'macaddr',
    //                                 title:'MAC地址',
    //                                 // width:100
    //                                 align:'center',
    //                             },
    //                         {
    //                                 field:'department',
    //                                 title:'部门',
    //                                 // width:100,
    //                                 align:'center',
    //                             },
    //                         {
    //                                 field:'place',
    //                                 title:'位置',
    //                                 // width:100,
    //                                 align:'center',
    //                             },
    //                         {
    //                                 field:'person',
    //                                 title:'使用人',
    //                                 // width:100,
    //                                 align:'center',
    //                             },
    //                         {
    //                                 field:'type',
    //                                 title:'设备类型',
    //                                 // width:100,
    //                                 align:'center',
    //                             },
    //                         {
    //                                 field:'netaddr',
    //                                 title:'网络地址',
    //                                 // width:100,
    //                                 align:'center',
    //                             },
    //                         {
    //                                 field:'username',
    //                                 title:'创建人',
    //                                 // width:100,
    //                                 align:'center',
    //                             },
    //                         {
    //                             field:'options',
    //                             title:'操作',
    //                             width:100,
    //                             align:'center',
    //                             formatter: btn_grid,
    //                         },
    //                     ]],
    //                     onLoadSuccess:function () {
    //                         $(".my_change").linkbutton({
    //                             plain:true,
    //                             iconCls:'icon-edit'
    //                         });
    //                         $(".my_delete").linkbutton({
    //                             plain:true,
    //                             iconCls:'icon-clear'
    //                         });
    //                     },
    //                     onBeforeSelect:function(){
    //                         return false;
    //                     }
    //                 });
    //                 $('#'+id).datagrid('loadData',data_retrun);
    //                 $('#'+id).datagrid({
    //                     toolbar: [{
    //                         text:'添加',
    //                         iconCls: 'icon-add',
    //                         handler: function(){
    //                             $('.context_first').find('input').val('');
    //                             $('#add_ip').dialog({
    //                                 title:'增加用户IP',
    //                                 height:220,
    //                                 width:540,
    //                                 modal:true,
    //                                 buttons:'#btn',
    //                                 draggable:false,
    //                             })
    //                         }
    //                     }]
    //                 });
    //             }
    //         });
    //     }
    //     return false;
    // });
    // $('#cc_ipaddress').combobox({
    //     width:143,
    //     height:23,
    //     panelHeight:100,
    //     data : [ip_list]
    // });


    $('#cc_department').combobox({
        width:143,
        height:23,
        panelHeight:100,
    });
     $('#cc_type').combobox({
        width:143,
        height:23,
        panelHeight:100,
    });
    $('#nav').tabs({
            onSelect:function (title,index) {
                var pp = $('#nav').tabs('getSelected')
                id = 10000 - pp.attr('id')
                $.ajax({
                    type: 'post',
                    url: 'ipaddress',
                    data: {'netaddr':title},
                    dataType:'json',
                        success:function (ip_return) {
                            $('#rightnav').find('#ip_list').datagrid({
                                columns :[[
                                    {
                                        field:'ip',
                                        title:'IP地址',
                                        width:260,
                                        align:'center',
                                    },
                                 ]],
                                singleSelect:true,
                                striped:true,
                                fit: true,
                                onBeforeSelect:function(){
                                        return false;
                                },
                            });
                            $('#ip_list').datagrid('loadData',ip_return)
                            ip_list = $('#ip_list').datagrid('getData')
                        }
                    });
            }
        });
    $('#logout').click(function(){
        $(location).prop('href', '/');
        $.session.remove('user');
        return false
    });
});
function change_for(data) {
    var row_record = $('#'+id).datagrid('getData');
    $('#change_ip').dialog({
        title:'修改信息',
        height:200,
        width:500,
        modal:true,
        buttons:'#btn',
        draggable:false,
        // closable: false,

        onOpen:function() {
             $('#datagrid_ipaddr_change').val( row_record.rows[data].ipaddr);
             $('#datagrid_macaddr_change').val( row_record.rows[data].macaddr);
             $('#datagrid_deperment_change').val( row_record.rows[data].department);
             $('#datagrid_place_change').val( row_record.rows[data].place);
             $('#datagrid_person_change').val( row_record.rows[data].person);
             $('#datagrid_type_change').val( row_record.rows[data].type)
         }
    })
}
function delete_for(data) {
    alert('删除'+data)
}
function btn_grid(value,row,index) {
    var str = '<a href="javascript:void(0)" onclick=change_for('+index+') class="my_change">修改</a>|<a href="#" class="my_delete" onclick=delete_for('+row.ipaddr+')>删除</a>';
    return str
}
function temp() {
    var temp = $('#cc_ipaddress').val()
    var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    var reg = temp.match(exp);
    if (!reg){
        alert ('请输入合法的IP地址')
    }
    // alert (reg)
}
function show_context(data,obj) {
        netaddress = data;
        id = $(obj).index()+1;
        var data = {'netaddr': netaddress};
        if ($('#nav').tabs('exists',netaddress)){
            $('#nav').tabs('select',netaddress);
        }else {
            $('#nav').tabs('add', {
                id:10000-id,
                title: netaddress,
                selected: true,
                closable: true,
                fit: true,
                content:'<table id='+id+'></table>',
                border: false,
            });
            $.ajax({
                type: 'post',
                url: 'ipcontext',
                data: data,
                dataType:'json',
                success:function (data_retrun) {
                    $('table#'+id).datagrid({
                        fitColumns:true,
                        striped:true,
                        singleSelect:true,
                        rownumbers:true,
                        columns :[[
                            {
                                    field:'ipaddr',
                                    title:'IP地址',
                                    // width:100,
                                    align:'center',
                                },
                            {
                                    field:'macaddr',
                                    title:'MAC地址',
                                    // width:100
                                    align:'center',
                                },
                            {
                                    field:'department',
                                    title:'部门',
                                    // width:100,
                                    align:'center',
                                },
                            {
                                    field:'place',
                                    title:'位置',
                                    // width:100,
                                    align:'center',
                                },
                            {
                                    field:'person',
                                    title:'使用人',
                                    // width:100,
                                    align:'center',
                                },
                            {
                                    field:'type',
                                    title:'设备类型',
                                    // width:100,
                                    align:'center',
                                },
                            {
                                    field:'netaddr',
                                    title:'网络地址',
                                    // width:100,
                                    align:'center',
                                },
                            {
                                    field:'username',
                                    title:'创建人',
                                    // width:100,
                                    align:'center',
                                },
                            {
                                field:'options',
                                title:'操作',
                                width:100,
                                align:'center',
                                formatter: btn_grid,
                            },
                        ]],
                        onLoadSuccess:function () {
                            $(".my_change").linkbutton({
                                plain:true,
                                iconCls:'icon-edit'
                            });
                            $(".my_delete").linkbutton({
                                plain:true,
                                iconCls:'icon-clear'
                            });
                        },
                        onBeforeSelect:function(){
                            return false;
                        }
                    });
                    $('#'+id).datagrid('loadData',data_retrun);
                    $('#'+id).datagrid({
                        toolbar: [{
                            text:'添加',
                            iconCls: 'icon-add',
                            handler: function(){
                                $('.context_first').find('input').val('');
                                var pp = $('#nav').tabs('getSelected')
                                $('#add_ip').dialog({
                                    title:'增加用户IP',
                                    height:220,
                                    width:540,
                                    modal:true,
                                    buttons:'#btn',
                                    draggable:false,
                                })
                            }
                        }]
                    });
                }
            });
        }
        // return false;
}


