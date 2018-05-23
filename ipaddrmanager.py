#encoding:utf-8
from flask import Flask,url_for,render_template,redirect,request,jsonify,session
import time,json
import IPy
import countdb
from exts import db
from models import User,Networkaddr,Address
import IPy
import hashlib
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash


app = Flask(__name__)
app.config.from_object(countdb)
db.init_app(app)

def to_json(data):
    ret = []  # 需要序列化的列表
    for i in data:
        tmp = {'id':i.id, 'ipaddr': i.ipaddr,'macaddr':i.macaddr,'department':i.department,'place':i.place,'person':i.person,'type':i.type,'username':i.username,'netaddr':i.netaddr,'option':''}  # 通过data的每一个元素构造一个字典
        ret.append(tmp)
    ret = json.dumps(ret)
    return ret
def ip_to_json(data):
    ip_list=[]
    for i in data:
        tmp = {'ip':str(i)}
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
        user = check_password_hash(user.password,password)
        if user:
            session['username'] = username
            time.sleep(1.5)
            return 'ok'
        else:
            time.sleep(1.5)
            return 'no'

@app.route('/manager',methods=['GET','POST'])
def manager():
    if request.method == 'GET':
        networkaddr = Networkaddr.query.all()
        return render_template('manager.html', netaddr = networkaddr)


@app.route('/ipcontext',methods=['GET','POST'])
def ipcontext():
    netaddr_form = request.form.get('netaddr')
    netaddr = Networkaddr.query.filter(Networkaddr.networkaddr == netaddr_form).first()
    context = Address.query.filter(Address.netaddr == netaddr.id).all()
    context = to_json(context)
    return context

@app.route('/ipaddress',methods=['GET','POST'])
def ipaddress():
    netaddr_form = request.form.get('netaddr')
    netaddr = Networkaddr.query.filter(Networkaddr.networkaddr == netaddr_form).first()
    ip = IPy.IP(netaddr.networkaddr + '/' + netaddr.subnetmask)
    ip = ip_to_json(ip)
    return ip


@app.route('/change_ip')
def change_ip():
    temp = request.args.get('id')
    print (temp)
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
