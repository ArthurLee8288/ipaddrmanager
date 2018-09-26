#encoding:utf-8
from flask import Flask,url_for,render_template,redirect,request,jsonify,session
import time,json
import IPy
import countdb
from exts import db
from models import User,Networkaddr,Address,Type,Department
import IPy
import hashlib
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from sqlalchemy import and_


app = Flask(__name__)
app.config.from_object(countdb)
db.init_app(app)

def to_json(data,total):
    ret = []  # 需要序列化的列表
    for i in data:
        department_data =  Department.query.filter(Department.id == i.department).first()
        type_data = Type.query.filter(Type.id == i.type).first()
        netaddr_data = Networkaddr.query.filter(Networkaddr.id == i.netaddr).first()
        uname_data = User.query.filter(User.id == i.username).first()
        tmp = {'id':i.id, 'ipaddr': i.ipaddr,'macaddr':i.macaddr,'department':department_data.department_name,'place':i.place,'person':i.person,'type':type_data.devicename,'username':uname_data.username,'netaddr':netaddr_data.networkaddr,'option':''}  # 通过data的每一个元素构造一个字典
        ret.append(tmp)
    # ret = json.dumps(ret)
    ret_return = json.dumps({'total': total, 'rows': ret})
    return ret_return
def ip_to_json(data):
    ip_list=[]
    for i in data:
        mark = Address.query.filter(Address.ipaddr == i).first()
        if mark:
            tmp = {'ip':str(i),'mark':'是'}
        else:
            tmp = {'ip':str(i),'mark':'否'}
        ip_list.append(tmp)
    ret = json.dumps(ip_list)
    return ret

@app.route('/',methods=['GET','POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter(User.username == username).first()
        pwd = check_password_hash(user.password,password)
        if pwd :
            session['username'] = username
            # time.sleep(1.5)
            return 'ok'
        else:
            # time.sleep(1.5)
            return 'no'

@app.route('/manager',methods=['GET','POST'])
def manager():
    if request.method == 'GET':
        networkaddr = Networkaddr.query.all()
        return render_template('manager.html', netaddr = networkaddr)


@app.route('/ipcontext',methods=['GET','POST'])
def ipcontext():
    page = request.form.get('page').encode('UTF-8')
    rows = request.form.get('rows').encode('UTF-8')
    first = int(rows) * (int(page)-1)
    netaddr_form = request.form.get('netaddr')
    netaddr = Networkaddr.query.filter(Networkaddr.networkaddr == netaddr_form).first()
    context = Address.query.filter(and_(Address.netaddr == netaddr.id,Address.mark == 1)).limit(rows).offset(first).all()
    total = Address.query.filter(and_(Address.netaddr == netaddr.id,Address.mark == 1)).count()
    context = to_json(context,total)
    return context

@app.route('/ipaddress',methods=['GET','POST'])
def ipaddress():
    netaddr_form = request.form.get('netaddr')
    netaddr = Networkaddr.query.filter(Networkaddr.networkaddr == netaddr_form).first()
    ip = IPy.IP(netaddr.networkaddr + '/' + netaddr.subnetmask)
    ip = ip_to_json(ip)
    return ip
@app.route('/typelist',methods=['GET','POST'])
def typelist():
    typelist_list = Type.query.all()
    list=[]
    for i in typelist_list:
        list.append({"id":i.id,"text":i.devicename})
    return json.dumps(list)

@app.route('/add_data',methods=['POST'])
def add_data():
    ipaddress = request.form.get('ipaddr')
    department = request.form.get('department')
    useuser = request.form.get('useuser')
    macaddr = request.form.get('macaddr')
    useplace = request.form.get('useplace')
    devicetype = request.form.get('devicetype')
    new_data = Address (ipaddr=ipaddress,macaddr=macaddr,department = department,place=useplace,person=useuser,type=devicetype ,netaddr ='1',username ='1',mark='1')
    db.session.add(new_data)
    db.session.commit()

@app.route('/departmentlist',methods=['POST'])
def departmentlist():
    department_list = Department.query.all()
    list=[]
    for i in department_list:
        list.append({"id":i.id,"text":i.department_name})
    return json.dumps(list)

@app.route('/change_ip')
def change_ip():
    temp = request.args.get('id')
    return temp
@app.route('/delete')
def delete():
    pass

@app.context_processor
def my_context_processor():
    username = session.get('username')
    return {'username': username}

if __name__ == '__main__':
    app.run()
