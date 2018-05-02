#encoding:utf-8

from exts import db

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    username = db.Column(db.String(50),nullable=False)
    password = db.Column(db.String(100),nullable=False)


# class Address(db.Model):
#     __tablename__= 'address'
#     id = db.Column(db.Integer,primary_key=True)
#     department = db.Column(db.String(50),nullable=False)
#     place = db.Column(db.String(100),nullable=False)
#     person = db.Column(db.String(20),nullable=False)
#     ipa = db.Column(db.String(100),nullable=False)
#     mac = db.Column(db.String(100),nullable=False)
#     dt = db.Column(db.String(100),nullable=False)
#     radd = db.Column(db.String(100))
#     ruse = db.Column(db.String(100))
#     rwd = db.Column(db.String(100))