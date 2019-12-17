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
    c_temple.execute("select address,temple_number,name,information,phone_number from temple_place where temple_number = ?",(temple_number,))
    temple_place = c_temple.fetchone()#リスト型になる[address,temple_number,name,informaton,phone_number]
    
    conn_temple.close()
    
    #--------グルメ-------------------------------------------------------------------
    conn_gourmet = sqlite3.connect("gourmet.db")
    c_gourmet = conn_gourmet.cursor()
    #寺の番でdbから呼び出す
    #もし複数の寺にかかる施設があるというならtempule_numberを/80/81/82/といった具合に登録して*/80/*でlike検索してはどうか？
    c_gourmet.execute("select address from gourmet_place where temple_number = ?",(temple_number,))
    #住所
    gourmet_address = c_gourmet.fetchall()
    #[('香川県高松市牟礼町牟礼３１８６',), ('香川県高松市牟礼町牟礼３２１４−１',)]
    
    #寺番号
    # c_gourmet.execute("select temple_number from gourmet_place where temple_number = ?",(temple_number,))
    # gourmet_number = c_gourmet.fetchall()
    
    #名前
    c_gourmet.execute("select name from gourmet_place where temple_number = ?",(temple_number,))
    gourmet_name = c_gourmet.fetchall()
    
    #情報
    c_gourmet.execute("select information from gourmet_place where temple_number = ?",(temple_number,))
    gourmet_information = c_gourmet.fetchall()
    
    #電話番号
    c_gourmet.execute("select phone_number from gourmet_place where temple_number = ?",(temple_number,))
    gourmet_phone_number = c_gourmet.fetchall()

    conn_gourmet.close()
    #------------------------------------------------------------------------------------
    
    #--------宿-------------------------------------------------------------------
    conn_inn = sqlite3.connect("inn.db")
    c_inn = conn_inn.cursor()
    #寺の番でdbから呼び出す
    c_inn.execute("select address from inn_place where temple_number = ?",(temple_number,))
    #住所
    inn_address = c_inn.fetchall()
    
    #名前
    c_inn.execute("select name from inn_place where temple_number = ?",(temple_number,))
    inn_name = c_inn.fetchall()
    
    #情報
    c_inn.execute("select information from inn_place where temple_number = ?",(temple_number,))
    inn_information = c_inn.fetchall()
    
    #電話番号
    c_inn.execute("select phone_number from inn_place where temple_number = ?",(temple_number,))
    inn_phone_number = c_inn.fetchall()

    conn_inn.close()
    #------------------------------------------------------------------------------------
    
    #--------コンビニ-------------------------------------------------------------------
    conn_convenience = sqlite3.connect("convenience.db")
    c_convenience = conn_convenience.cursor()
    #寺の番でdbから呼び出す
    c_convenience.execute("select address from convenience_place where temple_number = ?",(temple_number,))
    #住所
    convenience_address = c_convenience.fetchall()
    
    #名前
    c_convenience.execute("select name from convenience_place where temple_number = ?",(temple_number,))
    convenience_name = c_convenience.fetchall()
    
    #情報
    c_convenience.execute("select information from convenience_place where temple_number = ?",(temple_number,))
    convenience_information = c_convenience.fetchall()
    
    #電話番号
    # c_convenience.execute("select phone_number from convenience_place where temple_number = ?",(temple_number,))
    # convenience_phone_number = c_convenience.fetchall()

    conn_convenience.close()
    #------------------------------------------------------------------------------------
    
    #--------面白いところ-------------------------------------------------------------------
    conn_interesting = sqlite3.connect("interesting.db")
    c_interesting = conn_interesting.cursor()
    #寺の番でdbから呼び出す
    c_interesting.execute("select address from interesting_place where temple_number = ?",(temple_number,))
    #住所
    interesting_address = c_interesting.fetchall()
    
    #名前
    c_interesting.execute("select name from interesting_place where temple_number = ?",(temple_number,))
    interesting_name = c_interesting.fetchall()
    
    #情報
    c_interesting.execute("select information from interesting_place where temple_number = ?",(temple_number,))
    interesting_information = c_interesting.fetchall()
    
    #電話番号
    # c_convenience.execute("select phone_number from convenience_place where temple_number = ?",(temple_number,))
    # convenience_phone_number = c_convenience.fetchall()

    conn_interesting.close()
    #------------------------------------------------------------------------------------
    
    return render_template("googleMap_temple.html",temple_place = temple_place,
                            gourmet_address = gourmet_address,gourmet_information = gourmet_information,gourmet_name = gourmet_name,gourmet_phone_number = gourmet_phone_number,
                            inn_address = inn_address,inn_name = inn_name,inn_information = inn_information,inn_phone_number = inn_phone_number,
                            convenience_address = convenience_address,convenience_name = convenience_name,convenience_information = convenience_information,
                            interesting_address = interesting_address,interesting_name = interesting_name,interesting_information = interesting_information)
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