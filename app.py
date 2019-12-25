######################################
#今後の展望
#JS,Pythonの処理を関数やクラスにしてまとめることで行を削減。jsは特にやれるはず
# (sikoku_map.jsは少しやってる。関数をまとめた別ファイルをつくって使いまわしたい)
#
#Python>JS間の変数受け渡しをJSonを使うことで簡略化←こっちもめんどくさそう
#
#宇宙人にしゃべらせる
#ルートの合計
#画面下の隙間に絵
#逆、順めぐり
#現在地取得
#住所から検索
#言語対応
#コンビニ他リアルタイム取得（スクレイピング？
#SNS連携
#
#地図の操作をスマホ対応に
#APIキーの設定
#フラスクのインストール（サーバー側で必要なら
#プルダウンをスマフォ実機対応
#ピンの画像へのリンク
######################################


import sqlite3
import datetime
from flask import Flask,render_template,request,redirect,session

from flask import Flask
app = Flask(__name__)

# flaskでは標準でFlask.secret_keyを設定するとsessionを使うことができます
app.secret_key = "sunabacoTakamatsu"

#画面遷移禁止用のグローバル変数
G_temple_place = None

G_gourmet_information = None
G_gourmet_name = None
G_gourmet_lat = None
G_gourmet_lng = None
G_gourmet_phone_number = None

G_inn_name = None
G_inn_information = None
G_inn_phone_number = None
G_inn_lat = None
G_inn_lng = None

G_convenience_name = None
G_convenience_lat = None
G_convenience_lng = None

G_interesting_name = None
G_interesting_information = None
G_interesting_lat = None
G_interesting_lng = None

G_roadside_station_name = None
G_roadside_station_information = None
G_roadside_station_lat = None
G_roadside_station_lng = None

G_route_BandA = None
G_route_distance = None

#リストのダブりを消す関数
def get_unique_list(seq):
    seen = []
    return [x for x in seq if x not in seen and not seen.append(x)]



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
    #print("temple_number:::::")
    #print(temple_number)
    
    #もし000番ならリロード
    if int(temple_number) == 000:
        return render_template("temple_search.html")
    
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
    
    c_distance.execute("select caution from route where route_number = ? or route_number = ?",("/" + str(before_temple) + "/" + temple_number + "/","/" + temple_number + "/" + str(after_temple) + "/"))
    route_caution = c_distance.fetchall()
    
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

    #--------道の駅-------------------------------------------------------------------
    conn_roadside_station = sqlite3.connect("roadside_station.db")
    c_roadside_station = conn_roadside_station.cursor()
    #寺の番でdbから呼び出す
    #c_interesting.execute("select address from interesting_place where temple_number = ?",(temple_number,))
    #住所
    #interesting_address = c_interesting.fetchall()
    
    #名前
    c_roadside_station.execute("select name from roadsidestation where temple_number = ?",(temple_number,))
    roadside_station_name = c_roadside_station.fetchall()
    
    #情報
    c_roadside_station.execute("select information from roadsidestation where temple_number = ?",(temple_number,))
    roadside_station_information = c_roadside_station.fetchall()
    
    #緯度
    c_roadside_station.execute("select lat from roadsidestation where temple_number = ?",(temple_number,))
    roadside_station_lat = c_roadside_station.fetchall()
    
    #経度
    c_roadside_station.execute("select lng from roadsidestation where temple_number = ?",(temple_number,))
    roadside_station_lng = c_roadside_station.fetchall()
    
    #電話番号
    # c_convenience.execute("select phone_number from convenience_place where temple_number = ?",(temple_number,))
    # convenience_phone_number = c_convenience.fetchall()

    conn_roadside_station.close()
    #------------------------------------------------------------------------------------

    #画面遷移禁止用に取っておく
    global G_temple_place

    global G_gourmet_information
    global G_gourmet_name
    global G_gourmet_lat
    global G_gourmet_lng
    global G_gourmet_phone_number

    global G_inn_name
    global G_inn_information
    global G_inn_phone_number
    global G_inn_lat
    global G_inn_lng

    global G_convenience_name
    global G_convenience_lat
    global G_convenience_lng

    global G_interesting_name
    global G_interesting_information
    global G_interesting_lat
    global G_interesting_lng

    global G_roadside_station_name
    global G_roadside_station_information
    global G_roadside_station_lat
    global G_roadside_station_lng

    global G_route_BandA
    global G_route_distance
    
    G_temple_place = temple_place

    G_gourmet_information = gourmet_information
    G_gourmet_name = gourmet_name
    G_gourmet_lat = gourmet_lat
    G_gourmet_lng = gourmet_lng
    G_gourmet_phone_number = gourmet_phone_number

    G_inn_name = inn_name
    G_inn_information = inn_information
    G_inn_phone_number = inn_phone_number
    G_inn_lat = inn_lat
    G_inn_lng = inn_lng

    G_convenience_name = convenience_name
    G_convenience_lat = convenience_lat
    G_convenience_lng = convenience_lng

    G_interesting_name = interesting_name
    G_interesting_information = interesting_information
    G_interesting_lat = interesting_lat
    G_interesting_lng = interesting_lng

    G_roadside_station_name = roadside_station_name
    G_roadside_station_information = roadside_station_information
    G_roadside_station_lat = roadside_station_lat
    G_roadside_station_lng = roadside_station_lng 

    G_route_BandA = route_BandA
    G_route_distance = route_distance
    
    # print("G_temple_place001:::")
    # print(G_temple_place)
    
    
    return render_template("googleMap_temple.html",temple_place = temple_place,
                            gourmet_information = gourmet_information,gourmet_name = gourmet_name,gourmet_lat = gourmet_lat,gourmet_lng = gourmet_lng,gourmet_phone_number = gourmet_phone_number,
                            inn_name = inn_name,inn_information = inn_information,inn_phone_number = inn_phone_number,inn_lat = inn_lat,inn_lng = inn_lng,
                            convenience_name = convenience_name,convenience_lat = convenience_lat,convenience_lng = convenience_lng,
                            interesting_name = interesting_name,interesting_information = interesting_information,interesting_lat = interesting_lat,interesting_lng = interesting_lng,
                            roadside_station_name = roadside_station_name,roadside_station_information = roadside_station_information,roadside_station_lat = roadside_station_lat,roadside_station_lng = roadside_station_lng,
                            route_BandA = route_BandA,
                            route_distance = route_distance,
                            route_caution = route_caution,
                            )
#-----------------------------------------------------------------------------

#-----ルート-----
@app.route("/route_map",methods = ["POST"])
def route_map():
    Start_temple_number = request.form.get("Start_temple_number")
    Goal_temple_number = request.form.get("Goal_temple_number")
    
    #逆順時に寺周辺の施設を検索できるよう変数をつくる
    pre_Start_temple_number = Start_temple_number
    pre_Goal_temple_number = Goal_temple_number
    if pre_Start_temple_number > pre_Goal_temple_number:
            pre_Start_temple_number = Goal_temple_number
            pre_Goal_temple_number = Start_temple_number
    
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
    
    waypoints_temple_number = []
    waypoints_temple_name = []
    waypoints_temple_information = []
    waypoints_temple_lat = []
    waypoints_temple_lng = []
    
    only_two_temples = False#寺が隣り合っているときの判定
    # print("G_temple_place:::")
    # print(G_temple_place)
    
    #同じ寺を選んだら
    if int(Goal_temple_number) - int(Start_temple_number) == 0:
        #同じ画面を映す
        # print("同じ画面を映す:::")
        return render_template("googleMap_temple.html",
                            temple_place = G_temple_place,
                        
                            gourmet_information = G_gourmet_information,
                            gourmet_name = G_gourmet_name,
                            gourmet_lat = G_gourmet_lat,
                            gourmet_lng = G_gourmet_lng,
                            gourmet_phone_number = G_gourmet_phone_number,
                            
                            inn_name = G_inn_name,
                            inn_information = G_inn_information,
                            inn_phone_number = G_inn_phone_number,
                            inn_lat = G_inn_lat,
                            inn_lng = G_inn_lng,
                            
                            convenience_name = G_convenience_name,
                            convenience_lat = G_convenience_lat,
                            convenience_lng = G_convenience_lng,
                            
                            interesting_name = G_interesting_name,
                            interesting_information = G_interesting_information,
                            interesting_lat = G_interesting_lat,
                            interesting_lng = G_interesting_lng,
                            
                            roadside_station_name = G_roadside_station_name,
                            roadside_station_information = G_roadside_station_information,
                            roadside_station_lat = G_roadside_station_lat,
                            roadside_station_lng = G_roadside_station_lng,
                            
                            route_BandA = G_route_BandA,
                            route_distance = G_route_distance
                        )
    
    
    #寺が隣り合ってるなら
    elif int(Goal_temple_number) - int(Start_temple_number) == 1 or int(Goal_temple_number) - int(Start_temple_number) == -1 or int(Goal_temple_number) - int(Start_temple_number) == 87 or int(Goal_temple_number) - int(Start_temple_number) == -87:
        #逆めぐり
        if int(Goal_temple_number) - int(Start_temple_number) == -1:
            waypoints_temple_number.append(Goal_temple_number)
            waypoints_temple_number.append(Start_temple_number)
        
        #順めぐり
        else:
            waypoints_temple_number.append(Start_temple_number)
            waypoints_temple_number.append(Goal_temple_number)
            
        only_two_temples = True
        
        #二つの寺名
        c_temple.execute("select name from temple_place where temple_number = ?",(Start_temple_number,))
        waypoints_temple_name.append(c_temple.fetchone())
        c_temple.execute("select name from temple_place where temple_number = ?",(Goal_temple_number,))
        waypoints_temple_name.append(c_temple.fetchone())
        
        #情報
        c_temple.execute("select information from temple_place where temple_number = ?",(Start_temple_number,))
        waypoints_temple_information.append(c_temple.fetchone())
        c_temple.execute("select information from temple_place where temple_number = ?",(Goal_temple_number,))
        waypoints_temple_information.append(c_temple.fetchone())
        
        #緯度
        c_temple.execute("select lat from temple_place where temple_number = ?",(Start_temple_number,))
        waypoints_temple_lat.append(c_temple.fetchone())
        c_temple.execute("select lat from temple_place where temple_number = ?",(Goal_temple_number,))
        waypoints_temple_lat.append(c_temple.fetchone())
        
        #経度
        c_temple.execute("select lng from temple_place where temple_number = ?",(Start_temple_number,))
        waypoints_temple_lng.append(c_temple.fetchone())
        c_temple.execute("select lng from temple_place where temple_number = ?",(Goal_temple_number,))
        waypoints_temple_lng.append(c_temple.fetchone())
    
        
    
    #スタートとゴールが2つ以上離れている場合（1<>88間は最短をいくことにしているので除外）
    elif int(Goal_temple_number) - int(Start_temple_number) != 1 and int(Goal_temple_number) - int(Start_temple_number) != -87 and int(Goal_temple_number) - int(Start_temple_number) != 87:
        
        #経由する寺番号
        #waypoints_temple_number = []
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
        #waypoints_temple_name = []
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
        #waypoints_temple_information = []
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
        # waypoints_temple_lat = []
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
        #waypoints_temple_lng = []
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
    
    #---------------------------------------------------------------------------------
    #ルート上の物件
    #---------------------------------------------------------------------------------
    #グルメ-----------------------------------------
    #寺番号
    # c_temple.execute("select temple_number from temple_place where temple_number = ? or temple_number = ?",(Start_temple_number,Goal_temple_number))
    # temple_number = c_temple.fetchall()
    
    #waypoints_temple_number = []
    #Start_temple_number
    #Goal_temple_number
    
    conn_gourmet = sqlite3.connect("gourmet.db")
    c_gourmet = conn_gourmet.cursor()
    
    SandG_gourmet_name = []
    SandG_gourmet_information = []
    SandG_gourmet_lat = []
    SandG_gourmet_lng = []
    SandG_gourmet_phone_number = []
    SandG_gourmet_articles = 0
    
    #-------寺周辺-------
    for i in range(int(pre_Start_temple_number),int(pre_Goal_temple_number)+1):
        #名前
        c_gourmet.execute("select name from gourmet_place where temple_number = ?",
                        (i,))
        Provisional = c_gourmet.fetchall()
        if Provisional != []:
            SandG_gourmet_articles += len(Provisional)
            # print("SandG_gourmet_articles:::")
            # print(SandG_gourmet_articles)
            #print(i)
            #print(Provisional)
            # print(len(Provisional))
            # print(Provisional)
            SandG_gourmet_name.append(Provisional)
        # print("SandG_gourmet_name:::::")
        # print(SandG_gourmet_name)
        # print(len(SandG_gourmet_name))
        #[[('ひわさ屋',), ('居酒屋つくし',), ('むらかみ旅館 味処 むらかみ',), ('てこ屋',)], [('うどん本陣＿山田家本店',), ('Remza',), ('パテハウス',)]]
            
        #情報
        c_gourmet.execute("select information from gourmet_place where temple_number = ?",
                        (i,))
        Provisional = c_gourmet.fetchall()
        if Provisional != []:
            SandG_gourmet_information.append(Provisional)
        
        #緯度
        c_gourmet.execute("select lat from gourmet_place where temple_number = ?",
                        (i,))
        #SandG_gourmet_lat.append(c_gourmet.fetchall())
        Provisional = c_gourmet.fetchall()
        if Provisional != []:
            SandG_gourmet_lat.append(Provisional)
        
        #経度
        c_gourmet.execute("select lng from gourmet_place where temple_number = ?",
                        (i,))
        #SandG_gourmet_lng.append(c_gourmet.fetchall())
        Provisional = c_gourmet.fetchall()
        if Provisional != []:
            SandG_gourmet_lng.append(Provisional)
        
        #電話番号
        c_gourmet.execute("select phone_number from gourmet_place where temple_number = ?",
                        (i,))
        #SandG_gourmet_phone_number.append(c_gourmet.fetchall())
        Provisional = c_gourmet.fetchall()
        if Provisional != []:
            SandG_gourmet_phone_number.append(Provisional)
            
        #print("SandG_gourmet_phone_number:::::")
        #print(SandG_gourmet_phone_number)#[('0884-77-3528',), ('090-9773-9905',), ('0884-77-0083',), ('0884-77-0073',)]
        
    
    route_gourmet_name = []
    route_gourmet_information = []
    route_gourmet_lat = []
    route_gourmet_lng = []
    route_gourmet_phone_number = []
    route_gourmet_articles = 0
    #--------ルート上---------
    if only_two_temples == True:
        #waypoints_temple_number[i]そのままでは使えないので変換
        str_waypoints_temple_number0 = str(waypoints_temple_number[0]).replace("(","")
        str_waypoints_temple_number0 = str_waypoints_temple_number0.replace(",","")
        str_waypoints_temple_number0 = str_waypoints_temple_number0.replace(")","")
        
        str_waypoints_temple_number1 = str(waypoints_temple_number[1]).replace("(","")
        str_waypoints_temple_number1 = str_waypoints_temple_number1.replace(",","")
        str_waypoints_temple_number1 = str_waypoints_temple_number1.replace(")","")
        
        #名前
        c_gourmet.execute("select name from gourmet_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_gourmet.fetchall()
        if Provisional != []:
            route_gourmet_name.append(Provisional)
        
        #情報
        c_gourmet.execute("select information from gourmet_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_gourmet.fetchall()
        if Provisional != []:
            route_gourmet_information.append(Provisional)
            
        #緯度
        c_gourmet.execute("select lat from gourmet_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_gourmet.fetchall()
        if Provisional != []:
            route_gourmet_lat.append(Provisional)
        
        #経度
        c_gourmet.execute("select lng from gourmet_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_gourmet.fetchall()
        if Provisional != []:
            route_gourmet_lng.append(Provisional)
        
        #電話番号
        c_gourmet.execute("select phone_number from gourmet_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_gourmet.fetchall()
        if Provisional != []:
            route_gourmet_phone_number.append(Provisional)
        # print("%/" + str_waypoints_temple_number0 + "/%" + str_waypoints_temple_number1 + "/%")
    else:
        for i in range(len(waypoints_temple_number)):
            
            # print(waypoints_temple_number)#[(24,), (25,), (26,), (27,), (28,), (29,), (30,)]
            #print(waypoints_temple_number[i])#(24,)
            # test1 = str(waypoints_temple_number[i]).replace("(","")
            # test1 = test1.replace(",","")
            # test1 = test1.replace(")","")
            # print(test1)#24
            
            #waypoints_temple_number[i]そのままでは使えないので変換
            str_waypoints_temple_number = str(waypoints_temple_number[i]).replace("(","")
            str_waypoints_temple_number = str_waypoints_temple_number.replace(",","")
            str_waypoints_temple_number = str_waypoints_temple_number.replace(")","")
            
            #名前
            c_gourmet.execute("select name from gourmet_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            Provisional = c_gourmet.fetchall()
            if Provisional != []:
                route_gourmet_name.append(Provisional)
                #Provisional = get_unique_list(Provisional)
                #route_gourmet_articles += len(Provisional)

            #route_gourmet_name = c_gourmet.fetchall()
            # print("route_gourmet_name::::::::")
            # print(route_gourmet_name)#[('さばせ大福',)]
            # print(route_gourmet_name[0])#('さばせ大福',)
            
            #情報
            c_gourmet.execute("select information from gourmet_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            #route_gourmet_information = c_gourmet.fetchall()
            Provisional = c_gourmet.fetchall()
            if Provisional != []:
                route_gourmet_information.append(Provisional)
                
            #print("route_gourmet_information:::")
            #print(route_gourmet_information)
            
            #緯度
            c_gourmet.execute("select lat from gourmet_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            #route_gourmet_lat = c_gourmet.fetchall()
            Provisional = c_gourmet.fetchall()
            if Provisional != []:
                route_gourmet_lat.append(Provisional)
            
            #経度
            c_gourmet.execute("select lng from gourmet_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            #route_gourmet_lng = c_gourmet.fetchall()
            Provisional = c_gourmet.fetchall()
            if Provisional != []:
                route_gourmet_lng.append(Provisional)
            
            #電話番号
            c_gourmet.execute("select phone_number from gourmet_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            #route_gourmet_phone_number = c_gourmet.fetchall()
            Provisional = c_gourmet.fetchall()
            if Provisional != []:
                route_gourmet_phone_number.append(Provisional)
                
    
    conn_gourmet.close()
    
    #数をカウント
    Pre_route_gourmet_name = sum(route_gourmet_name,[])
    Pre_route_gourmet_name = get_unique_list(Pre_route_gourmet_name)
    route_gourmet_articles = sum(len(v) for v in Pre_route_gourmet_name)
    
    # print("route_gourmet_articles:::")
    # print(route_gourmet_name)
    # print(route_gourmet_articles)
    
    
    #宿----------
    conn_inn = sqlite3.connect("inn.db")
    c_inn = conn_inn.cursor()
    
    SandG_inn_name = []
    SandG_inn_information = []
    SandG_inn_lat = []
    SandG_inn_lng = []
    SandG_inn_phone_number = []
    SandG_inn_articles = 0
    
    #-------寺周辺-------
    for i in range(int(pre_Start_temple_number),int(pre_Goal_temple_number)+1):
        #名前
        c_inn.execute("select name from inn_place where temple_number = ?",
                        (i,))
        Provisional = c_inn.fetchall()
        if Provisional != []:
            SandG_inn_articles += len(Provisional)
            SandG_inn_name.append(Provisional)
            
        #print("SandG_inn_name:::")
        #print(SandG_inn_name)

        #情報
        c_inn.execute("select information from inn_place where temple_number = ?",
                        (i,))
        Provisional = c_inn.fetchall()
        if Provisional != []:
            SandG_inn_information.append(Provisional)
        
        #緯度
        c_inn.execute("select lat from inn_place where temple_number = ?",
                        (i,))
        Provisional = c_inn.fetchall()
        if Provisional != []:
            SandG_inn_lat.append(Provisional)
        
        #経度
        c_inn.execute("select lng from inn_place where temple_number = ?",
                        (i,))
        Provisional = c_inn.fetchall()
        if Provisional != []:
            SandG_inn_lng.append(Provisional)
        
        #電話番号
        c_inn.execute("select phone_number from inn_place where temple_number = ?",
                        (i,))
        Provisional = c_inn.fetchall()
        if Provisional != []:
            SandG_inn_phone_number.append(Provisional)
    
    route_inn_name = []
    route_inn_information = []
    route_inn_lat = []
    route_inn_lng = []
    route_inn_phone_number = []
    route_inn_articles = 0
    
    #--------ルート上---------
    if only_two_temples == True:
        #waypoints_temple_number[i]そのままでは使えないので変換
        str_waypoints_temple_number0 = str(waypoints_temple_number[0]).replace("(","")
        str_waypoints_temple_number0 = str_waypoints_temple_number0.replace(",","")
        str_waypoints_temple_number0 = str_waypoints_temple_number0.replace(")","")
        
        str_waypoints_temple_number1 = str(waypoints_temple_number[1]).replace("(","")
        str_waypoints_temple_number1 = str_waypoints_temple_number1.replace(",","")
        str_waypoints_temple_number1 = str_waypoints_temple_number1.replace(")","")
        
        #名前
        c_inn.execute("select name from inn_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_inn.fetchall()
        if Provisional != []:
            route_inn_name.append(Provisional)
        
        #情報
        c_inn.execute("select information from inn_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_inn.fetchall()
        if Provisional != []:
            route_inn_information.append(Provisional)
            
        #緯度
        c_inn.execute("select lat from inn_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_inn.fetchall()
        if Provisional != []:
            route_inn_lat.append(Provisional)
        
        #経度
        c_inn.execute("select lng from inn_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_inn.fetchall()
        if Provisional != []:
            route_inn_lng.append(Provisional)
        
        #電話番号
        c_inn.execute("select phone_number from inn_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_inn.fetchall()
        if Provisional != []:
            route_inn_phone_number.append(Provisional)

    else:
        for i in range(len(waypoints_temple_number)):
            
            #waypoints_temple_number[i]そのままでは使えないので変換
            str_waypoints_temple_number = str(waypoints_temple_number[i]).replace("(","")
            str_waypoints_temple_number = str_waypoints_temple_number.replace(",","")
            str_waypoints_temple_number = str_waypoints_temple_number.replace(")","")
            
            #名前
            c_inn.execute("select name from inn_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            Provisional = c_inn.fetchall()
            if Provisional != []:
                # route_inn_articles += len(Provisional)
                route_inn_name.append(Provisional)
                
            #情報
            c_inn.execute("select information from inn_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            Provisional = c_inn.fetchall()
            if Provisional != []:
                route_inn_information.append(Provisional)
                
            #緯度
            c_inn.execute("select lat from inn_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            Provisional = c_inn.fetchall()
            if Provisional != []:
                route_inn_lat.append(Provisional)
            
            #経度
            c_inn.execute("select lng from inn_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            Provisional = c_inn.fetchall()
            if Provisional != []:
                route_inn_lng.append(Provisional)
            
            #電話番号
            c_inn.execute("select phone_number from inn_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            Provisional = c_inn.fetchall()
            if Provisional != []:
                route_inn_phone_number.append(Provisional)
                

    conn_inn.close()
    
    #数をカウント
    Pre_route_inn_name = sum(route_inn_name,[])
    Pre_route_inn_name = get_unique_list(Pre_route_inn_name)
    route_inn_articles = sum(len(v) for v in Pre_route_inn_name)
    
    
    #道の駅----------
    conn_roadside_station = sqlite3.connect("roadside_station.db")
    c_roadside_station = conn_roadside_station.cursor()
    
    SandG_roadside_station_name = []
    SandG_roadside_station_information = []
    SandG_roadside_station_lat = []
    SandG_roadside_station_lng = []
    # SandG_roadside_station_phone_number = []
    SandG_roadside_station_articles = 0
    
    #-------寺周辺-------
    for i in range(int(pre_Start_temple_number),int(pre_Goal_temple_number)+1):
        #名前
        c_roadside_station.execute("select name from roadsidestation where temple_number = ?",
                        (i,))
        Provisional = c_roadside_station.fetchall()
        if Provisional != []:
            SandG_roadside_station_articles += len(Provisional)
            SandG_roadside_station_name.append(Provisional)

        #情報
        c_roadside_station.execute("select information from roadsidestation where temple_number = ?",
                        (i,))
        Provisional = c_roadside_station.fetchall()
        if Provisional != []:
            SandG_roadside_station_information.append(Provisional)
        
        #緯度
        c_roadside_station.execute("select lat from roadsidestation where temple_number = ?",
                        (i,))
        Provisional = c_roadside_station.fetchall()
        if Provisional != []:
            SandG_roadside_station_lat.append(Provisional)
        
        #経度
        c_roadside_station.execute("select lng from roadsidestation where temple_number = ?",
                        (i,))
        Provisional = c_roadside_station.fetchall()
        if Provisional != []:
            SandG_roadside_station_lng.append(Provisional)
        
        #電話番号
        # c_roadside_station.execute("select phone_number from roadsidestation where temple_number = ?",
        #                 (i,))
        # Provisional = c_roadside_station.fetchall()
        # if Provisional != []:
        #     SandG_roadside_station_phone_number.append(Provisional)
    
    route_roadside_station_name = []
    route_roadside_station_information = []
    route_roadside_station_lat = []
    route_roadside_station_lng = []
    # route_roadside_station_phone_number = []
    route_roadside_station_articles = 0
    
    #--------ルート上---------
    if only_two_temples == True:
        #waypoints_temple_number[i]そのままでは使えないので変換
        str_waypoints_temple_number0 = str(waypoints_temple_number[0]).replace("(","")
        str_waypoints_temple_number0 = str_waypoints_temple_number0.replace(",","")
        str_waypoints_temple_number0 = str_waypoints_temple_number0.replace(")","")
        
        str_waypoints_temple_number1 = str(waypoints_temple_number[1]).replace("(","")
        str_waypoints_temple_number1 = str_waypoints_temple_number1.replace(",","")
        str_waypoints_temple_number1 = str_waypoints_temple_number1.replace(")","")
        
        #名前
        c_roadside_station.execute("select name from roadsidestation where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_roadside_station.fetchall()
        if Provisional != []:
            route_roadside_station_name.append(Provisional)
        
        #情報
        c_roadside_station.execute("select information from roadsidestation where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_roadside_station.fetchall()
        if Provisional != []:
            route_roadside_station_information.append(Provisional)
            
        #緯度
        c_roadside_station.execute("select lat from roadsidestation where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_roadside_station.fetchall()
        if Provisional != []:
            route_roadside_station_lat.append(Provisional)
        
        #経度
        c_roadside_station.execute("select lng from roadsidestation where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_roadside_station.fetchall()
        if Provisional != []:
            route_roadside_station_lng.append(Provisional)
        
        #電話番号
        # c_roadside_station.execute("select phone_number from roadside_station_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        # Provisional = c_roadside_station.fetchall()
        # if Provisional != []:
        #     route_roadside_station_phone_number.append(Provisional)

    else:
        for i in range(len(waypoints_temple_number)):
            
            #waypoints_temple_number[i]そのままでは使えないので変換
            str_waypoints_temple_number = str(waypoints_temple_number[i]).replace("(","")
            str_waypoints_temple_number = str_waypoints_temple_number.replace(",","")
            str_waypoints_temple_number = str_waypoints_temple_number.replace(")","")
            
            #名前
            c_roadside_station.execute("select name from roadsidestation where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            Provisional = c_roadside_station.fetchall()
            if Provisional != []:
                # route_roadside_station_articles += len(Provisional)
                route_roadside_station_name.append(Provisional)
                
            # print("str_waypoints_temple_number:::")
            # print(str_waypoints_temple_number)
            # print("route_roadside_station_name:::")
            # print(route_roadside_station_name)
                
            #情報
            c_roadside_station.execute("select information from roadsidestation where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            Provisional = c_roadside_station.fetchall()
            if Provisional != []:
                route_roadside_station_information.append(Provisional)
            # print("route_roadside_station_information:::")
            # print(route_roadside_station_information)
                
            #緯度
            c_roadside_station.execute("select lat from roadsidestation where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            Provisional = c_roadside_station.fetchall()
            if Provisional != []:
                route_roadside_station_lat.append(Provisional)
            
            #経度
            c_roadside_station.execute("select lng from roadsidestation where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            Provisional = c_roadside_station.fetchall()
            if Provisional != []:
                route_roadside_station_lng.append(Provisional)
            
            #電話番号
            # c_roadside_station.execute("select phone_number from roadsidestation where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            # Provisional = c_roadside_station.fetchall()
            # if Provisional != []:
            #     route_roadside_station_phone_number.append(Provisional)
        

    conn_roadside_station.close()
    #数をカウント
    Pre_route_roadside_station_name = sum(route_roadside_station_name,[])
    Pre_route_roadside_station_name = get_unique_list(Pre_route_roadside_station_name)
    route_roadside_station_articles = sum(len(v) for v in Pre_route_roadside_station_name)
    # route_roadside_station_name = get_unique_list(route_roadside_station_name)
    # route_roadside_station_articles = len(route_roadside_station_name[0])
    # route_roadside_station_articles = sum(len(v) for v in route_roadside_station_name)
    
    # print("route_roadside_station_name[0]:::")
    # print(len(route_roadside_station_name))
    # print(route_roadside_station_name)
    # print(route_roadside_station_name[0])
    
    
    
    #スポット----------
    conn_interesting = sqlite3.connect("interesting.db")
    c_interesting = conn_interesting.cursor()
    
    SandG_interesting_name = []
    SandG_interesting_information = []
    SandG_interesting_lat = []
    SandG_interesting_lng = []
    # SandG_roadside_station_phone_number = []
    SandG_interesting_articles = 0
    
    #-------寺周辺-------
    for i in range(int(pre_Start_temple_number),int(pre_Goal_temple_number)+1):
        #名前
        c_interesting.execute("select name from interesting_place where temple_number = ?",
                        (i,))
        Provisional = c_interesting.fetchall()
        if Provisional != []:
            SandG_interesting_articles += len(Provisional)
            SandG_interesting_name.append(Provisional)

        #情報
        c_interesting.execute("select information from interesting_place where temple_number = ?",
                        (i,))
        Provisional = c_interesting.fetchall()
        if Provisional != []:
            SandG_interesting_information.append(Provisional)
        
        #緯度
        c_interesting.execute("select lat from interesting_place where temple_number = ?",
                        (i,))
        Provisional = c_interesting.fetchall()
        if Provisional != []:
            SandG_interesting_lat.append(Provisional)
        
        #経度
        c_interesting.execute("select lng from interesting_place where temple_number = ?",
                        (i,))
        Provisional = c_interesting.fetchall()
        if Provisional != []:
            SandG_interesting_lng.append(Provisional)
        
        #電話番号
        # c_roadside_station.execute("select phone_number from roadsidestation where temple_number = ?",
        #                 (i,))
        # Provisional = c_roadside_station.fetchall()
        # if Provisional != []:
        #     SandG_roadside_station_phone_number.append(Provisional)
    
    route_interesting_name = []
    route_interesting_information = []
    route_interesting_lat = []
    route_interesting_lng = []
    # route_roadside_station_phone_number = []
    route_interesting_articles = 0
    
    #--------ルート上---------
    if only_two_temples == True:
        #waypoints_temple_number[i]そのままでは使えないので変換
        str_waypoints_temple_number0 = str(waypoints_temple_number[0]).replace("(","")
        str_waypoints_temple_number0 = str_waypoints_temple_number0.replace(",","")
        str_waypoints_temple_number0 = str_waypoints_temple_number0.replace(")","")
        
        str_waypoints_temple_number1 = str(waypoints_temple_number[1]).replace("(","")
        str_waypoints_temple_number1 = str_waypoints_temple_number1.replace(",","")
        str_waypoints_temple_number1 = str_waypoints_temple_number1.replace(")","")
        
        #名前
        c_interesting.execute("select name from interesting_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_interesting.fetchall()
        if Provisional != []:
            route_interesting_name.append(Provisional)
        
        #情報
        c_interesting.execute("select information from interesting_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_interesting.fetchall()
        if Provisional != []:
            route_interesting_information.append(Provisional)
            
        #緯度
        c_interesting.execute("select lat from interesting_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_interesting.fetchall()
        if Provisional != []:
            route_interesting_lat.append(Provisional)
        
        #経度
        c_interesting.execute("select lng from interesting_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_interesting.fetchall()
        if Provisional != []:
            route_interesting_lng.append(Provisional)
        
        #電話番号
        # c_roadside_station.execute("select phone_number from roadside_station_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        # Provisional = c_roadside_station.fetchall()
        # if Provisional != []:
        #     route_roadside_station_phone_number.append(Provisional)

    else:
        for i in range(len(waypoints_temple_number)):
            
            #waypoints_temple_number[i]そのままでは使えないので変換
            str_waypoints_temple_number = str(waypoints_temple_number[i]).replace("(","")
            str_waypoints_temple_number = str_waypoints_temple_number.replace(",","")
            str_waypoints_temple_number = str_waypoints_temple_number.replace(")","")
            
            #名前
            c_interesting.execute("select name from interesting_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            Provisional = c_interesting.fetchall()
            if Provisional != []:
                # route_interesting_articles += len(Provisional)
                route_interesting_name.append(Provisional)
                
            #情報
            c_interesting.execute("select information from interesting_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            Provisional = c_interesting.fetchall()
            if Provisional != []:
                route_interesting_information.append(Provisional)
            # print("route_interesting_information:::")
            # print(route_interesting_information)
                
            #緯度
            c_interesting.execute("select lat from interesting_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            Provisional = c_interesting.fetchall()
            if Provisional != []:
                route_interesting_lat.append(Provisional)
            
            #経度
            c_interesting.execute("select lng from interesting_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            Provisional = c_interesting.fetchall()
            if Provisional != []:
                route_interesting_lng.append(Provisional)
                

            #電話番号
            # c_roadside_station.execute("select phone_number from roadsidestation where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            # Provisional = c_roadside_station.fetchall()
            # if Provisional != []:
            #     route_roadside_station_phone_number.append(Provisional)

    conn_interesting.close()
    #数をカウント
    Pre_route_interesting_name = sum(route_interesting_name,[])
    Pre_route_interesting_name = get_unique_list(Pre_route_interesting_name)
    route_interesting_articles = sum(len(v) for v in Pre_route_interesting_name)
    
    # print("route_interesting_name:::")
    # print(route_interesting_name)
    # print("SandG_interesting_articles:::")
    # print(SandG_interesting_articles)
    # print("route_interesting_articles:::")
    # print(route_interesting_articles)
    
    
    #コンビニ---------------
    conn_convenience = sqlite3.connect("convenience.db")
    c_convenience = conn_convenience.cursor()
    
    SandG_convenience_name = []
    #SandG_convenience_information = []
    SandG_convenience_lat = []
    SandG_convenience_lng = []
    # SandG_roadside_station_phone_number = []
    SandG_convenience_articles = 0
    
    #-------寺周辺-------
    for i in range(int(pre_Start_temple_number),int(pre_Goal_temple_number)+1):
        #名前
        c_convenience.execute("select name from convenience_place where temple_number = ?",
                        (i,))
        Provisional = c_convenience.fetchall()
        if Provisional != []:
            SandG_convenience_articles += len(Provisional)
            SandG_convenience_name.append(Provisional)

        # #情報
        # c_convenience.execute("select information from convenience_place where temple_number = ?",
        #                 (i,))
        # Provisional = c_convenience.fetchall()
        # if Provisional != []:
        #     SandG_convenience_information.append(Provisional)
        
        #緯度
        c_convenience.execute("select lat from convenience_place where temple_number = ?",
                        (i,))
        Provisional = c_convenience.fetchall()
        if Provisional != []:
            SandG_convenience_lat.append(Provisional)
        
        #経度
        c_convenience.execute("select lng from convenience_place where temple_number = ?",
                        (i,))
        Provisional = c_convenience.fetchall()
        if Provisional != []:
            SandG_convenience_lng.append(Provisional)
        
        #電話番号
        # c_roadside_station.execute("select phone_number from roadsidestation where temple_number = ?",
        #                 (i,))
        # Provisional = c_roadside_station.fetchall()
        # if Provisional != []:
        #     SandG_roadside_station_phone_number.append(Provisional)
    
    route_convenience_name = []
    #route_convenience_information = []
    route_convenience_lat = []
    route_convenience_lng = []
    # route_roadside_station_phone_number = []
    route_convenience_articles = 0
    
    #--------ルート上---------
    if only_two_temples == True:
        #waypoints_temple_number[i]そのままでは使えないので変換
        str_waypoints_temple_number0 = str(waypoints_temple_number[0]).replace("(","")
        str_waypoints_temple_number0 = str_waypoints_temple_number0.replace(",","")
        str_waypoints_temple_number0 = str_waypoints_temple_number0.replace(")","")
        
        str_waypoints_temple_number1 = str(waypoints_temple_number[1]).replace("(","")
        str_waypoints_temple_number1 = str_waypoints_temple_number1.replace(",","")
        str_waypoints_temple_number1 = str_waypoints_temple_number1.replace(")","")
        
        #名前
        c_convenience.execute("select name from convenience_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_convenience.fetchall()
        if Provisional != []:
            route_convenience_name.append(Provisional)
        
        # #情報
        # c_convenience.execute("select information from convenience_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        # Provisional = c_convenience.fetchall()
        # if Provisional != []:
        #     route_convenience_information.append(Provisional)
            
        #緯度
        c_convenience.execute("select lat from convenience_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_convenience.fetchall()
        if Provisional != []:
            route_convenience_lat.append(Provisional)
        
        #経度
        c_convenience.execute("select lng from convenience_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c_convenience.fetchall()
        if Provisional != []:
            route_convenience_lng.append(Provisional)
        
        #電話番号
        # c_roadside_station.execute("select phone_number from roadside_station_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        # Provisional = c_roadside_station.fetchall()
        # if Provisional != []:
        #     route_roadside_station_phone_number.append(Provisional)

    else:
        for i in range(len(waypoints_temple_number)):
            
            #waypoints_temple_number[i]そのままでは使えないので変換
            str_waypoints_temple_number = str(waypoints_temple_number[i]).replace("(","")
            str_waypoints_temple_number = str_waypoints_temple_number.replace(",","")
            str_waypoints_temple_number = str_waypoints_temple_number.replace(")","")
            
            #名前
            c_convenience.execute("select name from convenience_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            Provisional = c_convenience.fetchall()
            if Provisional != []:
                # route_convenience_articles += len(Provisional)
                route_convenience_name.append(Provisional)
                
            #情報
            # c_convenience.execute("select information from convenience_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            # Provisional = c_convenience.fetchall()
            # if Provisional != []:
            #     route_convenience_information.append(Provisional)
            # print("route_convenience_information:::")
            # print(route_interesting_information)
                
            #緯度
            c_convenience.execute("select lat from convenience_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            Provisional = c_convenience.fetchall()
            if Provisional != []:
                route_convenience_lat.append(Provisional)
            
            #経度
            c_convenience.execute("select lng from convenience_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            Provisional = c_convenience.fetchall()
            if Provisional != []:
                route_convenience_lng.append(Provisional)
            
            #電話番号
            # c_roadside_station.execute("select phone_number from roadsidestation where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            # Provisional = c_roadside_station.fetchall()
            # if Provisional != []:
            #     route_roadside_station_phone_number.append(Provisional)

    conn_convenience.close()
    #数をカウント
    Pre_route_convenience_name = sum(route_convenience_name,[])
    Pre_route_convenience_name = get_unique_list(Pre_route_convenience_name)
    route_convenience_articles = sum(len(v) for v in Pre_route_convenience_name)
    
    
    return render_template("route_map.html",
                            temple_lng = temple_lng,
                            temple_lat = temple_lat,
                            temple_information = temple_information,
                            temple_name = temple_name,
                            temple_number = temple_number,
                            Start_temple_number = Start_temple_number,
                            Goal_temple_number = Goal_temple_number,
                            
                            route_gourmet_name = route_gourmet_name,
                            route_gourmet_information = route_gourmet_information,
                            route_gourmet_lat = route_gourmet_lat,
                            route_gourmet_lng = route_gourmet_lng,
                            route_gourmet_phone_number = route_gourmet_phone_number,
                            
                            waypoints_temple_number = waypoints_temple_number,
                            waypoints_temple_name = waypoints_temple_name,
                            waypoints_temple_information = waypoints_temple_information,
                            waypoints_temple_lat = waypoints_temple_lat,
                            waypoints_temple_lng = waypoints_temple_lng,
                            
                            SandG_gourmet_name = SandG_gourmet_name,
                            SandG_gourmet_information = SandG_gourmet_information,
                            SandG_gourmet_lat = SandG_gourmet_lat,
                            SandG_gourmet_lng = SandG_gourmet_lng,
                            SandG_gourmet_phone_number = SandG_gourmet_phone_number,
                            
                            SandG_inn_name = SandG_inn_name,
                            SandG_inn_information = SandG_inn_information,
                            SandG_inn_lat = SandG_inn_lat,
                            SandG_inn_lng = SandG_inn_lng,
                            SandG_inn_phone_number = SandG_inn_phone_number,
                            
                            route_inn_name = route_inn_name,
                            route_inn_information = route_inn_information,
                            route_inn_lat = route_inn_lat,
                            route_inn_lng = route_inn_lng,
                            route_inn_phone_number = route_inn_phone_number,
                            
                            SandG_roadside_station_name = SandG_roadside_station_name,
                            SandG_roadside_station_information = SandG_roadside_station_information,
                            SandG_roadside_station_lat = SandG_roadside_station_lat,
                            SandG_roadside_station_lng = SandG_roadside_station_lng,
                            # SandG_roadside_station_phone_number = SandG_roadside_station_phone_number,
                            
                            route_roadside_station_name = route_roadside_station_name,
                            route_roadside_station_information = route_roadside_station_information,
                            route_roadside_station_lat = route_roadside_station_lat,
                            route_roadside_station_lng = route_roadside_station_lng,
                            # route_roadside_station_phone_number = route_roadside_station_phone_number
                            
                            SandG_interesting_name = SandG_interesting_name,
                            SandG_interesting_information = SandG_interesting_information,
                            SandG_interesting_lat = SandG_interesting_lat,
                            SandG_interesting_lng = SandG_interesting_lng,
                            
                            route_interesting_name = route_interesting_name,
                            route_interesting_information = route_interesting_information,
                            route_interesting_lat = route_interesting_lat,
                            route_interesting_lng = route_interesting_lng,
                            
                            route_convenience_name = route_convenience_name,
                            route_convenience_lat = route_convenience_lat,
                            route_convenience_lng = route_convenience_lng,
                            
                            SandG_convenience_name = SandG_convenience_name,
                            SandG_convenience_lat = SandG_convenience_lat,
                            SandG_convenience_lng = SandG_convenience_lng,
                            
                            gourmet_articles = SandG_gourmet_articles + route_gourmet_articles,
                            inn_articles = SandG_inn_articles + route_inn_articles,
                            roadside_station_articles = SandG_roadside_station_articles + route_roadside_station_articles,
                            interesting_articles = SandG_interesting_articles + route_interesting_articles,
                            convenience_articles = SandG_convenience_articles + route_convenience_articles,
                            
                        )

#-----------------------------------------------------------------------------
#-----四国地図-----
@app.route("/sikoku_map")
def sikoku_map():
    
    #全ての寺を表示させる
    all_temple_number = []
    all_temple_name = []
    all_temple_information = []
    all_temple_lat = []
    all_temple_lng = []
    Provisional = None
    
    #データベースから寺の位置情報を持ってくる
    conn_temple = sqlite3.connect("temple.db")
    c_temple = conn_temple.cursor()
    #寺の番でdbから呼び出す
    for i in range(88):
        c_temple.execute("select temple_number from temple_place where temple_number = ?",(i+1,))
        Provisional = c_temple.fetchone()
        if Provisional != []:
            all_temple_number.append(Provisional)
            
        c_temple.execute("select name from temple_place where temple_number = ?",(i+1,))
        Provisional = c_temple.fetchone()
        if Provisional != []:
            all_temple_name.append(Provisional)
            
        c_temple.execute("select information from temple_place where temple_number = ?",(i+1,))
        Provisional = c_temple.fetchone()
        if Provisional != []:
            all_temple_information.append(Provisional)
            
        c_temple.execute("select lat from temple_place where temple_number = ?",(i+1,))
        Provisional = c_temple.fetchone()
        if Provisional != []:
            all_temple_lat.append(Provisional)
            
        c_temple.execute("select lng from temple_place where temple_number = ?",(i+1,))
        Provisional = c_temple.fetchone()
        if Provisional != []:
            all_temple_lng.append(Provisional)
            
    #print(all_temple_number)
    
    return render_template("sikoku_map.html",
                            all_temple_number = all_temple_number,
                            all_temple_name = all_temple_name,
                            all_temple_information = all_temple_information,
                            all_temple_lat = all_temple_lat,
                            all_temple_lng = all_temple_lng)

    conn_temple.close()

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

#-----豆知識-----
@app.route("/tips")
def tips():
    return render_template("tips.html")

#-----現在地や住所からえらぶ-----
@app.route("/address_search")
def address_search():
    return render_template("address_search.html")


#おまじない--------------------------------------------
if __name__ == "__main__":
    app.run()