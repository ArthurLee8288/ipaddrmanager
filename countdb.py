#encoding:utf-8
import os


DEBUG = True
SECRET_KEY = os.urandom(24)

HOSTNAME = '10.149.1.111'
PORT = '3306'
DATABASE = 'ipaddrmanager'
USERNAME = 'root'
PASSWORD = '123456'
DB_URI = 'mysql+mysqldb://{}:{}@{}:{}/{}?charset=utf8'.format(USERNAME,PASSWORD,HOSTNAME,PORT,DATABASE)
SQLALCHEMY_DATABASE_URI = DB_URI
