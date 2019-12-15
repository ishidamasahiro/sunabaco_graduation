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

#-----------------------------------------------------------------------------
#-----お寺から探す-----
@app.route("/temple_search")
def temple_search():
    return render_template("temple_search.html")

#-----寺検索から寺基準のgoogleMapのページ-----
@app.route("/temple_search_select",methods = ["POST"])
def temple_search_select():
    temple_number = request.form.get("temple_number")
    
    #データベースから寺の位置情報を持ってくる
    conn_temple = sqlite3.connect("temple.db")
    c_temple = conn_temple.cursor()
    #寺の番でdbから呼び出す
    c_temple.execute("select address,lat,lng,information from temple_place where temple_number = ?",(temple_number,))
    temple_place = c_temple.fetchone()#リスト型になる[address,lat,lng,informaton]
    
    conn_temple.close()
    
    #グルメ
    conn_gourmet = sqlite3.connect("gourmet.db")
    c_gourmet = conn_gourmet.cursor()
    #寺の番でdbから呼び出す
    #もし複数の寺にかかる施設があるというならtempule_numberを/80/81/82/といった具合に登録して*/80/*でlike検索してはどうか？
    c_gourmet.execute("select address from gourmet_place where temple_number = ?",(temple_number,))
    gourmet_address = c_gourmet.fetchall()
    #[('香川県高松市牟礼町牟礼３１８６',), ('香川県高松市牟礼町牟礼３２１４−１',)]
    
    c_gourmet.execute("select information from gourmet_place where temple_number = ?",(temple_number,))
    gourmet_information = c_gourmet.fetchall()
    #gourmet_information = str(gourmet_information) + ","
    #[('山田屋',), ('Remza<br>喫茶店?',)],
    
    #print(temple_place)
    #print(gourmet_address)
    print(gourmet_information)
    conn_gourmet.close()
    
    return render_template("googleMap_temple.html",temple_place = temple_place,gourmet_address = gourmet_address,gourmet_information = gourmet_information)
#-----------------------------------------------------------------------------

#-----------------------------------------------------------------------------
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

#-----地図検索から寺基準のgoogleMapのページ-----
@app.route("/googleMap_temple/<int:temple_number>")#temple_numberに寺の番が入ってくる
def googleMap_temple(temple_number):
    
    #データベースから寺の位置情報を持ってくる
    conn = sqlite3.connect("temple.db")
    c = conn.cursor()
    #寺の番でdbから呼び出す
    c.execute("select lat,lng from temple_place where temple_number = ?",(temple_number,))
    temple_place = c.fetchone()#リスト型になる[lat,lng]
    conn.close()
    
    #print("temple_place=")
    #print(temple_place)
    
    return render_template("googleMap_temple.html",temple_place = temple_place)
#-----------------------------------------------------------------------------



#おまじない--------------------------------------------
if __name__ == "__main__":
    app.run()