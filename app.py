import sqlite3
import datetime
from flask import Flask,render_template,request,redirect,session

from flask import Flask
app = Flask(__name__)

# flaskでは標準でFlask.secret_keyを設定するとsessionを使うことができます
app.secret_key = "sunabacoTakamatsu"


#-----トップページ-----
@app.route("/")
def top():
    return render_template("index.html")

#-----四国地図-----
@app.route("/sikoku_map")
def sikoku_map():
    return render_template("sikoku_map.html")

#-----香川地図-----
@app.route("/kagawa_map")
def kagawa_map():
    return render_template("kagawa_map.html")

#-----香川エリア01-----
@app.route("/kagawa_arie01_map")
def kagawa_arie01_map():
    return render_template("kagawa_arie01_map.html")

#-----寺基準のgoogleMapのページ-----
@app.route("/googleMap_temple")
def googleMap_temple():
    return render_template("googleMap_temple.html")

#おまじない--------------------------------------------
if __name__ == "__main__":
    app.run()