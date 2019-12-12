import sqlite3
import datetime
from flask import Flask,render_template,request,redirect,session

from flask import Flask
app = Flask(__name__)

# flaskでは標準でFlask.secret_keyを設定するとsessionを使うことができます
app.secret_key = "sunabacoTakamatsu"


@app.route('/')
def hello_world():
    return render_template("index.html")


#おまじない--------------------------------------------
if __name__ == "__main__":
    app.run()