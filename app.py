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
    c_temple.execute("select temple_number,name,information,lat,lng from temple_place where temple_number = ?",(temple_number,))
    temple_place = c_temple.fetchone()#リスト型になる[temple_number,name,informaton,lat,lng]
    
    #前後の札所
    c_BandA = conn_temple.cursor()
    #次と前の札所の名前
    before_temple = int(temple_number) - 1
    after_temple = int(temple_number) + 1
    #88~1の場合
    if before_temple == 0:
        before_temple = 88
    if after_temple == 89:
        after_temple = 1
    
    c_BandA.execute("select temple_number,name from temple_place where temple_number = ? or temple_number = ?",(before_temple, after_temple))
    route_BandA = c_BandA.fetchall()#[(22, '平等寺'), (24, '最御崎寺(東寺)')]
    #1番,88番札所の時は配列の並べ替え
    #print(route_BandA)
    if int(temple_number) == 1 or int(temple_number) == 88:
        #print("ok")
        route_BandA.reverse()
    #print(route_BandA)
    conn_temple.close()
    
    #前後の札所までの距離
    conn_distance = sqlite3.connect("route.db")
    c_distance = conn_distance.cursor()
    c_distance.execute("select distance from route where route_number = ? or route_number = ?",("/" + str(before_temple) + "/" + temple_number + "/","/" + temple_number + "/" + str(after_temple) + "/"))
    route_distance = c_distance.fetchall()#[(19.7,), (75.4,)]
    #print(route_distance)
    conn_distance.close()
    
    #ルートナンバーをhtmlに渡す?
    
    #--------グルメ-------------------------------------------------------------------
    conn_gourmet = sqlite3.connect("gourmet.db")
    c_gourmet = conn_gourmet.cursor()
    #寺の番でdbから呼び出す
    #もし複数の寺にかかる施設があるというならtempule_numberを/80/81/82/といった具合に登録して*/80/*でlike検索してはどうか？
    #住所
    #c_gourmet.execute("select address from gourmet_place where temple_number = ?",(temple_number,))
    #gourmet_address = c_gourmet.fetchall()
    #[('香川県高松市牟礼町牟礼３１８６',), ('香川県高松市牟礼町牟礼３２１４−１',)]
    
    #寺番号
    # c_gourmet.execute("select temple_number from gourmet_place where temple_number = ?",(temple_number,))
    # gourmet_number = c_gourmet.fetchall()
    
    #名前
    c_gourmet.execute("select name from gourmet_place where temple_number = ?",(temple_number,))
    gourmet_name = c_gourmet.fetchall()
    
    #緯度
    c_gourmet.execute("select lat from gourmet_place where temple_number = ?",(temple_number,))
    gourmet_lat = c_gourmet.fetchall()
    
    #経度
    c_gourmet.execute("select lng from gourmet_place where temple_number = ?",(temple_number,))
    gourmet_lng = c_gourmet.fetchall()
    
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
    #住所
    #c_inn.execute("select address from inn_place where temple_number = ?",(temple_number,))
    #inn_address = c_inn.fetchall()
    
    #名前
    c_inn.execute("select name from inn_place where temple_number = ?",(temple_number,))
    inn_name = c_inn.fetchall()
    
    #情報
    c_inn.execute("select information from inn_place where temple_number = ?",(temple_number,))
    inn_information = c_inn.fetchall()
    
    #電話番号
    c_inn.execute("select phone_number from inn_place where temple_number = ?",(temple_number,))
    inn_phone_number = c_inn.fetchall()
    
    #緯度
    c_inn.execute("select lat from inn_place where temple_number = ?",(temple_number,))
    inn_lat = c_inn.fetchall()
    
    #経度
    c_inn.execute("select lng from inn_place where temple_number = ?",(temple_number,))
    inn_lng = c_inn.fetchall()

    conn_inn.close()
    #------------------------------------------------------------------------------------
    
    #--------コンビニ-------------------------------------------------------------------
    conn_convenience = sqlite3.connect("convenience.db")
    c_convenience = conn_convenience.cursor()
    #寺の番でdbから呼び出す
    #c_convenience.execute("select address from convenience_place where temple_number = ?",(temple_number,))
    #住所
    #convenience_address = c_convenience.fetchall()
    
    #名前
    c_convenience.execute("select name from convenience_place where temple_number = ?",(temple_number,))
    convenience_name = c_convenience.fetchall()
    
    #緯度
    c_convenience.execute("select lat from convenience_place where temple_number = ?",(temple_number,))
    convenience_lat = c_convenience.fetchall()
    
    #経度
    c_convenience.execute("select lng from convenience_place where temple_number = ?",(temple_number,))
    convenience_lng = c_convenience.fetchall()
    
    #情報
    #c_convenience.execute("select information from convenience_place where temple_number = ?",(temple_number,))
    #convenience_information = c_convenience.fetchall()
    
    #電話番号
    # c_convenience.execute("select phone_number from convenience_place where temple_number = ?",(temple_number,))
    # convenience_phone_number = c_convenience.fetchall()

    conn_convenience.close()
    #------------------------------------------------------------------------------------
    
    #--------立ち寄りスポット-------------------------------------------------------------------
    conn_interesting = sqlite3.connect("interesting.db")
    c_interesting = conn_interesting.cursor()
    #寺の番でdbから呼び出す
    #c_interesting.execute("select address from interesting_place where temple_number = ?",(temple_number,))
    #住所
    #interesting_address = c_interesting.fetchall()
    
    #名前
    c_interesting.execute("select name from interesting_place where temple_number = ?",(temple_number,))
    interesting_name = c_interesting.fetchall()
    
    #情報
    c_interesting.execute("select information from interesting_place where temple_number = ?",(temple_number,))
    interesting_information = c_interesting.fetchall()
    
    #緯度
    c_interesting.execute("select lat from interesting_place where temple_number = ?",(temple_number,))
    interesting_lat = c_interesting.fetchall()
    
    #経度
    c_interesting.execute("select lng from interesting_place where temple_number = ?",(temple_number,))
    interesting_lng = c_interesting.fetchall()
    
    #電話番号
    # c_convenience.execute("select phone_number from convenience_place where temple_number = ?",(temple_number,))
    # convenience_phone_number = c_convenience.fetchall()

    conn_interesting.close()
    #------------------------------------------------------------------------------------

    
    
    return render_template("googleMap_temple.html",temple_place = temple_place,
                            gourmet_information = gourmet_information,gourmet_name = gourmet_name,gourmet_lat = gourmet_lat,gourmet_lng = gourmet_lng,gourmet_phone_number = gourmet_phone_number,
                            inn_name = inn_name,inn_information = inn_information,inn_phone_number = inn_phone_number,inn_lat = inn_lat,inn_lng = inn_lng,
                            convenience_name = convenience_name,convenience_lat = convenience_lat,convenience_lng = convenience_lng,
                            interesting_name = interesting_name,interesting_information = interesting_information,interesting_lat = interesting_lat,interesting_lng = interesting_lng,
                            route_BandA = route_BandA,
                            route_distance = route_distance)
#-----------------------------------------------------------------------------

#-----ルート-----
@app.route("/route_map",methods = ["POST"])
def route_map():
    Start_temple_number = request.form.get("Start_temple_number")
    Goal_temple_number = request.form.get("Goal_temple_number")
    
    #----------スタートとゴールの座標を取得----------
    #データベースから寺の位置情報を持ってくる
    conn_temple = sqlite3.connect("temple.db")
    c_temple = conn_temple.cursor()
    
    #寺の番でdbから呼び出す

    #寺番号
    c_temple.execute("select temple_number from temple_place where temple_number = ? or temple_number = ?",(Start_temple_number,Goal_temple_number))
    temple_number = c_temple.fetchall()
    
    #名前
    c_temple.execute("select name from temple_place where temple_number = ? or temple_number = ?",(Start_temple_number,Goal_temple_number))
    temple_name = c_temple.fetchall()
    
    #情報
    c_temple.execute("select information from temple_place where temple_number = ? or temple_number = ?",(Start_temple_number,Goal_temple_number))
    temple_information = c_temple.fetchall()
    
    #緯度
    c_temple.execute("select lat from temple_place where temple_number = ? or temple_number = ?",(Start_temple_number,Goal_temple_number))
    temple_lat = c_temple.fetchall()
    
    #経度
    c_temple.execute("select lng from temple_place where temple_number = ? or temple_number = ?",(Start_temple_number,Goal_temple_number))
    temple_lng = c_temple.fetchall()
    
    #conn_temple.close()
    
    #----------経由する寺の情報----------
    #データベースから寺の位置情報を持ってくる
    #conn_temple = sqlite3.connect("temple.db")
    #c_temple = conn_temple.cursor()
    
    #寺の番でdbから呼び出す
    #Start_temple_number
    #Goal_temple_number
    
    #スタートとゴールが2つ以上離れている場合（1<>88間は最短をいくことにしているので除外）
    if int(Goal_temple_number) - int(Start_temple_number) != 1 and int(Goal_temple_number) - int(Start_temple_number) != -87 and int(Goal_temple_number) - int(Start_temple_number) != 87:
        
        #経由する寺番号
        waypoints_temple_number = []
        #順巡り
        if(int(Start_temple_number) < int(Goal_temple_number)):
            for num in range(int(Start_temple_number), int(Goal_temple_number)):
                if num != int(Start_temple_number):
                    c_temple.execute("select temple_number from temple_place where temple_number = ?",(num,))
                    waypoints_temple_number.append(c_temple.fetchone())
        #23>28 [24, 25, 26, 27]

        #逆めぐり
        if(int(Start_temple_number) > int(Goal_temple_number)):
            for num in range(int(Goal_temple_number),int(Start_temple_number)):
                if num != int(Goal_temple_number):
                    c_temple.execute("select temple_number from temple_place where temple_number = ?",(num,))
                    waypoints_temple_number.append(c_temple.fetchone())
        #23>10 [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
                
        #経由する寺名
        waypoints_temple_name = []
        #順巡り
        if(int(Start_temple_number) < int(Goal_temple_number)):
            for num in range(int(Start_temple_number), int(Goal_temple_number)):
                if num != int(Start_temple_number):
                    c_temple.execute("select name from temple_place where temple_number = ?",(num,))
                    waypoints_temple_name.append(c_temple.fetchone())
                    
        #逆巡り
        if(int(Start_temple_number) > int(Goal_temple_number)):
            for num in range(int(Goal_temple_number),int(Start_temple_number)):
                if num != int(Goal_temple_number):
                    c_temple.execute("select name from temple_place where temple_number = ?",(num,))
                    waypoints_temple_name.append(c_temple.fetchone())
                    
        #情報
        waypoints_temple_information = []
        #順巡り
        if(int(Start_temple_number) < int(Goal_temple_number)):
            for num in range(int(Start_temple_number), int(Goal_temple_number)):
                if num != int(Start_temple_number):
                    c_temple.execute("select information from temple_place where temple_number = ?",(num,))
                    waypoints_temple_information.append(c_temple.fetchone())
                    
        #逆巡り
        if(int(Start_temple_number) > int(Goal_temple_number)):
            for num in range(int(Goal_temple_number),int(Start_temple_number)):
                if num != int(Goal_temple_number):
                    c_temple.execute("select information from temple_place where temple_number = ?",(num,))
                    waypoints_temple_information.append(c_temple.fetchone())


        #緯度
        waypoints_temple_lat = []
        #順巡り
        if(int(Start_temple_number) < int(Goal_temple_number)):
            for num in range(int(Start_temple_number), int(Goal_temple_number)):
                if num != int(Start_temple_number):
                    c_temple.execute("select lat from temple_place where temple_number = ?",(num,))
                    waypoints_temple_lat.append(c_temple.fetchone())
                    
        #逆巡り
        if(int(Start_temple_number) > int(Goal_temple_number)):
            for num in range(int(Goal_temple_number),int(Start_temple_number)):
                if num != int(Goal_temple_number):
                    c_temple.execute("select lat from temple_place where temple_number = ?",(num,))
                    waypoints_temple_lat.append(c_temple.fetchone())

        #経度
        waypoints_temple_lng = []
        #順巡り
        if(int(Start_temple_number) < int(Goal_temple_number)):
            for num in range(int(Start_temple_number), int(Goal_temple_number)):
                if num != int(Start_temple_number):
                    c_temple.execute("select lng from temple_place where temple_number = ?",(num,))
                    waypoints_temple_lng.append(c_temple.fetchone())
                    
        #逆巡り
        if(int(Start_temple_number) > int(Goal_temple_number)):
            for num in range(int(Goal_temple_number),int(Start_temple_number)):
                if num != int(Goal_temple_number):
                    c_temple.execute("select lng from temple_place where temple_number = ?",(num,))
                    waypoints_temple_lng.append(c_temple.fetchone())
    
    conn_temple.close()
    
    return render_template("route_map.html",
                            temple_lng = temple_lng,
                            temple_lat = temple_lat,
                            temple_information = temple_information,
                            temple_name = temple_name,
                            temple_number = temple_number,
                            Start_temple_number = Start_temple_number,
                            Goal_temple_number = Goal_temple_number,
                            waypoints_temple_number = waypoints_temple_number,
                            waypoints_temple_name = waypoints_temple_name,
                            waypoints_temple_information = waypoints_temple_information,
                            waypoints_temple_lat = waypoints_temple_lat,
                            waypoints_temple_lng = waypoints_temple_lng
                            )

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