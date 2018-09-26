#encoding:utf-8

from exts import db

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    username = db.Column(db.String(12),nullable=False)
    password = db.Column(db.String(93),nullable=False)
    person = db.Column(db.String(6),nullable=False)


class Address(db.Model):
    __tablename__= 'address'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    ipaddr = db.Column(db.String(15),nullable=False)
    macaddr = db.Column(db.String(17),nullable=False)
    department = db.Column(db.Integer,db.ForeignKey('department.id'))
    place = db.Column(db.String(8),nullable=False)
    person = db.Column(db.String(6),nullable=False)
    type = db.Column(db.Integer,db.ForeignKey('type.id'))
    netaddr = db.Column(db.Integer,db.ForeignKey('networkaddr.id'))
    username = db.Column(db.Integer,db.ForeignKey('user.id'))
    mark = db.Column(db.Integer,nullable=False)

class Type(db.Model):
    __tablename__ = 'type'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    devicename = db.Column(db.String(8),nullable=False)


class Networkaddr(db.Model):
    __tablename__ = 'networkaddr'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    networkaddr = db.Column(db.String(15),nullable=False)
    subnetmask = db.Column(db.String(15),nullable=False)
    setuser = db.Column(db.String(8),nullable=False)

class Department(db.Model):
    __tablename__ = 'department'
    id = db.Column(db.Integer,primary_key=Type,autoincrement=Type)
    department_name = db.Column(db.String(8),nullable= False)