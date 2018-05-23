#encoding:utf-8

from exts import db

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    username = db.Column(db.String(50),nullable=False)
    password = db.Column(db.String(100),nullable=False)
    person = db.Column(db.String(50),nullable=False)


class Address(db.Model):
    __tablename__= 'address'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    ipaddr = db.Column(db.String(100),nullable=False)
    macaddr = db.Column(db.String(100),nullable=False)
    department = db.Column(db.String(50),nullable=False)
    place = db.Column(db.String(100),nullable=False)
    person = db.Column(db.String(20),nullable=False)
    type = db.Column(db.String(100),nullable=False)
    netaddr = db.Column(db.Integer,db.ForeignKey('networkaddr.id'))
    username = db.Column(db.Integer,db.ForeignKey('user.id'))


class Networkaddr(db.Model):
    __tablename__ = 'networkaddr'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    networkaddr = db.Column(db.String(50),nullable=False)
    subnetmask = db.Column(db.String(50),nullable=False)
    setuser = db.Column(db.String(100),nullable=False)