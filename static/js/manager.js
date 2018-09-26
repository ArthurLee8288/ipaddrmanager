var id='';
var ip_list='';
// var tab;
$(function () {
    $('.easyui-validatebox').validatebox({
        required: true,
        missingMessage:'字段不得为空',
    })
    $('#left').accordion({
        multiple: false,
        selected: false,
    });
    /*tab=*/$('#nav').tabs({
            border: false,
            fit: true,
            plan: true,
        });
    $('#cc_department').combobox({
        width:143,
        height:23,
        panelHeight:100,
        url:'departmentlist',
        valueField:'id',
        textField:'text',
    });
    $('#cc_type').combobox({
        width:143,
        height:23,
        panelHeight:100,
        url:'typelist',
        valueField:'id',
        textField:'text',
        editable : false,
    });
    $('#nav').tabs({
            onSelect:function (title,index) {
                id = 10000-$('#nav').tabs('getSelected').attr('id')
                console.log(id)
                $.ajax({
                    type: 'post',
                    url: 'ipaddress',
                    data: {'netaddr':title},
                    dataType:'json',
                        success:function (ip_return) {
                            $("#rightnav table#ip_list").datagrid({
                                columns :[[
                                    {
                                        field:'ip',
                                        title:'IP地址',
                                        width:130,
                                        align:'center',
                                    },
                                    {
                                        field:'mark',
                                        title:'是否使用',
                                        width:130,
                                        align:'center',
                                    }
                                 ]],
                                singleSelect:true,
                                striped:true,
                                fit: true,
                                onBeforeSelect:function(){
                                        return false;
                                },
                            });
                            $("#rightnav table#ip_list").datagrid('loadData',ip_return)
                            //ip_list = $('#ip_list').datagrid('getData')
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
    var row_record = $('#'+id).datagrid('getData').rows[data];
    console.log(row_record.place)
    $('#change_ip').dialog({
        title:'修改信息',
        height:200,
        width:500,
        modal:true,
        buttons:'#btn',
        draggable:false,

        onOpen:function() {
             $('#datagrid_ipaddr_change').val(row_record.ipaddr);
             $('#datagrid_macaddr_change').val(row_record.macaddr);
             $('#datagrid_deperment_change').val(row_record.department);
             $('#datagrid_place_change').val(row_record.place);
             $('#datagrid_person_change').val(row_record.person);
             $('#datagrid_type_change').val(row_record.type)
         }
    })
}
function delete_for(data) {
    alert('删除'+data)
}
function btn_grid(value,row,index) {
    var str = '<a href="javascript:void(0)"  onclick=change_for('+ index +') class="my_change">修改</a>|<a href="#" class="my_delete" onclick=delete_for('+row.ipaddr+')>删除</a>';
    return str
}
function temp() {
    var temp = $('#cc_ipaddress').val()
    var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    var reg = temp.match(exp);
    if (!reg){
        alert ('请输入合法的IP地址')
    }
    // $('#add_ip').dialog('close')
    $.ajax({
        type:'post',
        url:'add_data',
        data:{
            ipaddr:$('#cc_ipaddress').val(),
            department:$('#cc_department').val(),
            useuser:$('#cc_user').val(),
            macaddr:$('#cc_macaddr').val(),
            useplace:$('#cc_place').val(),
            devicetype:$('#cc_type').val(),
        },
    })


}function show_context(data,obj) {
    netaddress = data;
    var id = $(obj).index()+1;
    var data = {'netaddr': netaddress};
    if ($('#nav').tabs('exists',netaddress)){
        $('#nav').tabs('select',netaddress);
    }else {
        var content = '<table id=' + id + '></table>'
        $('#nav').tabs('add', {
            id:10000-id,
            title: netaddress,
            selected: true,
            closable: true,
            fit: true,
            content: content,
            border: false,
        })


        $('table#'+id).datagrid({
            fit:true,
            fitColumns: true,
            striped: true,
            singleSelect: true,
            method:'post',
            url:'ipcontext',
            queryParams:{'netaddr': netaddress},
            rownumbers: true,
            // height:423,
            pagination: true,
            showFooter:true,
            showHeader:true,
            pageList:[10,20,50],
            PageSize:5,
            loadMsg:'请稍后，数据加载中',
            columns: [[
                {
                    field: 'ipaddr',
                    title: 'IP地址',
                    // width:100,
                    align: 'center',
                },
                {
                    field: 'macaddr',
                    title: 'MAC地址',
                    // width:100
                    align: 'center',
                },
                {
                    field: 'department',
                    title: '部门',
                    // width:100,
                    align: 'center',
                },
                {
                    field: 'place',
                    title: '位置',
                    // width:100,
                    align: 'center',
                },
                {
                    field: 'person',
                    title: '使用人',
                    // width:100,
                    align: 'center',
                },
                {
                    field: 'type',
                    title: '设备类型',
                    // width:100,
                    align: 'center',
                },
                {
                    field: 'netaddr',
                    title: '网络地址',
                    // width:100,
                    align: 'center',
                },
                {
                    field: 'username',
                    title: '创建人',
                    // width:100,
                    align: 'center',
                },
                {
                    field: 'options',
                    title: '操作',
                    width: 100,
                    align: 'center',
                    formatter: btn_grid,
                },
            ]],
            toolbar: [{
                text: '添加',
                iconCls: 'icon-add',
                handler: function () {
                    $('.context_first').find('input').val('');
                    var pp = $('#nav').tabs('getSelected')
                    $('#add_ip').dialog({
                        title: '增加用户IP',
                        height: 220,
                        width: 540,
                        modal: true,
                        buttons: '#btn',
                        draggable: false,
                    })
                }
            }],
            onLoadSuccess: function () {
                $(".my_change").linkbutton({
                    plain: true,
                    iconCls: 'icon-edit'
                });
                $(".my_delete").linkbutton({
                    plain: true,
                    iconCls: 'icon-clear'
                });
            },
            onBeforeSelect: function () {
                return false;
            }
        });
        // $.ajax({
        //     type: 'post',
        //     url: 'ipcontext',
        //     data: data,
        //     dataType: 'json',
        //     success: function (data_retrun) {
        //         // $('table#1').datagrid({
        //         //     fitColumns:true,
        //         //     striped:true,
        //         //     singleSelect:true,
        //         //     rownumbers:true,
        //         //     pagination:true,
        //         //     columns :[[
        //         //         {
        //         //                 field:'ipaddr',
        //         //                 title:'IP地址',
        //         //                 // width:100,
        //         //                 align:'center',
        //         //             },
        //         //         {
        //         //                 field:'macaddr',
        //         //                 title:'MAC地址',
        //         //                 // width:100
        //         //                 align:'center',
        //         //             },
        //         //         {
        //         //                 field:'department',
        //         //                 title:'部门',
        //         //                 // width:100,
        //         //                 align:'center',
        //         //             },
        //         //         {
        //         //                 field:'place',
        //         //                 title:'位置',
        //         //                 // width:100,
        //         //                 align:'center',
        //         //             },
        //         //         {
        //         //                 field:'person',
        //         //                 title:'使用人',
        //         //                 // width:100,
        //         //                 align:'center',
        //         //             },
        //         //         {
        //         //                 field:'type',
        //         //                 title:'设备类型',
        //         //                 // width:100,
        //         //                 align:'center',
        //         //             },
        //         //         {
        //         //                 field:'netaddr',
        //         //                 title:'网络地址',
        //         //                 // width:100,
        //         //                 align:'center',
        //         //             },
        //         //         {
        //         //                 field:'username',
        //         //                 title:'创建人',
        //         //                 // width:100,
        //         //                 align:'center',
        //         //             },
        //         //         {
        //         //             field:'options',
        //         //             title:'操作',
        //         //             width:100,
        //         //             align:'center',
        //         //             formatter: btn_grid,
        //         //         },
        //         //     ]],
        //         //     onLoadSuccess:function () {
        //         //         $(".my_change").linkbutton({
        //         //             plain:true,
        //         //             iconCls:'icon-edit'
        //         //         });
        //         //         $(".my_delete").linkbutton({
        //         //             plain:true,
        //         //             iconCls:'icon-clear'
        //         //         });
        //         //     },
        //         //     onBeforeSelect:function(){
        //         //         return false;
        //         //     }
        //         // });
        //         $('table#'+id).datagrid('loadData', data_retrun);
        //         // $('#1').datagrid({
        //         //     toolbar: [{
        //         //         text:'添加',
        //         //         iconCls: 'icon-add',
        //         //         handler: function(){
        //         //             $('.context_first').find('input').val('');
        //         //             var pp = $('#nav').tabs('getSelected')
        //         //             $('#add_ip').dialog({
        //         //                 title:'增加用户IP',
        //         //                 height:220,
        //         //                 width:540,
        //         //                 modal:true,
        //         //                 buttons:'#btn',
        //         //                 draggable:false,
        //         //             })
        //         //         }
        //         //     }]
        //         // });
        //     }
        // });
    }
        // return false;
}