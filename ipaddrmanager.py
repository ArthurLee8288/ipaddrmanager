from flask import Flask,url_for,render_template,redirect,request,jsonify
import config
from exts import db
from models import User


app = Flask(__name__)


@app.route('/')
def login():
    return render_template('login.html')


if __name__ == '__main__':
    app.run()
