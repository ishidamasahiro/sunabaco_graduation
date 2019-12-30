######################################
#今後の展望
#Python>JS間の変数受け渡しをJSonを使うことで簡略化←こっちもめんどくさそう
#
#宇宙人にしゃべらせる
#ルート距離の合計
#画面下の隙間に絵
#逆、順めぐり
#現在地取得
#住所から検索
#言語対応
#コンビニ他リアルタイム取得（スクレイピング？googleMapApi?
#SNS連携、利用者による登録
#疑似遍路
#小豆島88箇所
#
######公開するにあたりしなくてはいけないと思われること######
#地図の操作をスマホ対応に
#APIキーの設定
#pythonフラスクのインストール（サーバー側で必要なら
#プルダウンをスマフォ実機対応
#ピンの画像へのリンク(googleMap_temple.js 100行付近//マーカーの画像 を見てください)
#
######データベースへの入力######
#1<>88間のルートは/1/88/と入力
#[]()',全角スペースは使わない
#
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
G_route_caution = None

#リストのダブりを消す関数
def get_unique_list(seq):
    seen = []
    return [x for x in seq if x not in seen and not seen.append(x)]

#-----各施設、情報を検索する関数
def Facility_search(db_name,temple_number):
    table_name = db_name + "_place"
    db_name = db_name + ".db"
    
    conn = sqlite3.connect(db_name)
    c = conn.cursor()

    #名前
    c.execute("select name from "+ table_name +" where temple_number = ?",(temple_number,))
    name = c.fetchall()
    
    #緯度
    c.execute("select lat from "+ table_name +" where temple_number = ?",(temple_number,))
    lat = c.fetchall()
    
    #経度
    c.execute("select lng from "+ table_name +" where temple_number = ?",(temple_number,))
    lng = c.fetchall()
    
    #情報
    c.execute("select information from "+ table_name +" where temple_number = ?",(temple_number,))
    information = c.fetchall()
    
    #電話番号
    c.execute("select phone_number from "+ table_name +" where temple_number = ?",(temple_number,))
    phone_number = c.fetchall()

    conn.close()
    
    #全部入りリストを作って渡す list_gourmet を作って list_gourmet[0]とかで取り出す。
    return [name,lat,lng,information,phone_number]
    
#-----ルート中の寺周辺の物件を検索
def rote_temple_Facility_search(db_name,just_1_88,pre_Start_temple_number,pre_Goal_temple_number):
    
    conn = sqlite3.connect(db_name + ".db")
    c = conn.cursor()
    
    SandG_name = []
    SandG_information = []
    SandG_lat = []
    SandG_lng = []
    SandG_phone_number = []
    SandG_articles = 0
    
    #-------寺周辺-------
    #1>88 or 88>1
    if just_1_88 == True:
        c.execute("select name from " + db_name +"_place where temple_number = 1 or temple_number = 88")
        Provisional = c.fetchall()
        if Provisional != []:
            SandG_articles += len(Provisional)
            SandG_name.append(Provisional)

        #情報
        c.execute("select information from " + db_name +"_place where temple_number = 1 or temple_number = 88")
        Provisional = c.fetchall()
        if Provisional != []:
            SandG_information.append(Provisional)
        
        #緯度
        c.execute("select lat from " + db_name +"_place where temple_number = 1 or temple_number = 88")
        #SandG_gourmet_lat.append(c_gourmet.fetchall())
        Provisional = c.fetchall()
        if Provisional != []:
            SandG_lat.append(Provisional)
        
        #経度
        c.execute("select lng from " + db_name +"_place where temple_number = 1 or temple_number = 88")
        #SandG_gourmet_lng.append(c_gourmet.fetchall())
        Provisional = c.fetchall()
        if Provisional != []:
            SandG_lng.append(Provisional)
        
        #電話番号
        c.execute("select phone_number from " + db_name +"_place where temple_number = 1 or temple_number = 88")
        #SandG_gourmet_phone_number.append(c_gourmet.fetchall())
        Provisional = c.fetchall()
        if Provisional != []:
            SandG_phone_number.append(Provisional)
            
    else:
        for i in range(int(pre_Start_temple_number),int(pre_Goal_temple_number)+1):
            #名前
            c.execute("select name from " + db_name + "_place where temple_number = ?",
                            (i,))
            Provisional = c.fetchall()
            if Provisional != []:
                SandG_articles += len(Provisional)
                SandG_name.append(Provisional)

            #情報
            c.execute("select information from " + db_name + "_place where temple_number = ?",
                            (i,))
            Provisional = c.fetchall()
            if Provisional != []:
                SandG_information.append(Provisional)
            
            #緯度
            c.execute("select lat from " + db_name + "_place where temple_number = ?",
                            (i,))
            #SandG_gourmet_lat.append(c_gourmet.fetchall())
            Provisional = c.fetchall()
            if Provisional != []:
                SandG_lat.append(Provisional)
            
            #経度
            c.execute("select lng from " + db_name + "_place where temple_number = ?",
                            (i,))
            #SandG_gourmet_lng.append(c_gourmet.fetchall())
            Provisional = c.fetchall()
            if Provisional != []:
                SandG_lng.append(Provisional)
            
            #電話番号
            c.execute("select phone_number from " + db_name + "_place where temple_number = ?",
                            (i,))
            #SandG_gourmet_phone_number.append(c_gourmet.fetchall())
            Provisional = c.fetchall()
            if Provisional != []:
                SandG_phone_number.append(Provisional)
                
            #print("SandG_gourmet_phone_number:::::")
            #print(SandG_gourmet_phone_number)#[('0884-77-3528',), ('090-9773-9905',), ('0884-77-0083',), ('0884-77-0073',)]
            
    return [SandG_name,SandG_lat,SandG_lng,SandG_information,SandG_phone_number,SandG_articles]

#ルート中のルート上の物件を検索
def rote_Facility_search(db_name,only_two_temples,just_1_88,pre_Start_temple_number,pre_Goal_temple_number,waypoints_temple_number):
    
    conn = sqlite3.connect(db_name + ".db")
    c = conn.cursor()
    
    route_name = []
    route_information = []
    route_lat = []
    route_lng = []
    route_phone_number = []
    route_articles = 0
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
        c.execute("select name from " + db_name + "_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c.fetchall()
        if Provisional != []:
            route_name.append(Provisional)
        
        #情報
        c.execute("select information from " + db_name + "_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c.fetchall()
        if Provisional != []:
            route_information.append(Provisional)
            
        #緯度
        c.execute("select lat from " + db_name + "_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c.fetchall()
        if Provisional != []:
            route_lat.append(Provisional)
        
        #経度
        c.execute("select lng from " + db_name + "_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c.fetchall()
        if Provisional != []:
            route_lng.append(Provisional)
        
        #電話番号
        c.execute("select phone_number from " + db_name + "_place where route_number = ?",("/" + str_waypoints_temple_number0 + "/" + str_waypoints_temple_number1 + "/",))
        Provisional = c.fetchall()
        if Provisional != []:
            route_phone_number.append(Provisional)
        # print("%/" + str_waypoints_temple_number0 + "/%" + str_waypoints_temple_number1 + "/%")
    else:
        for i in range(len(waypoints_temple_number)):
            #waypoints_temple_number[i]そのままでは使えないので変換
            str_waypoints_temple_number = str(waypoints_temple_number[i]).replace("(","")
            str_waypoints_temple_number = str_waypoints_temple_number.replace(",","")
            str_waypoints_temple_number = str_waypoints_temple_number.replace(")","")
            
            #名前
            c.execute("select name from " + db_name + "_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            Provisional = c.fetchall()
            if Provisional != []:
                route_name.append(Provisional)

            #情報
            c.execute("select information from " + db_name + "_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            #route_gourmet_information = c_gourmet.fetchall()
            Provisional = c.fetchall()
            if Provisional != []:
                route_information.append(Provisional)
                
            #緯度
            c.execute("select lat from " + db_name + "_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            #route_gourmet_lat = c_gourmet.fetchall()
            Provisional = c.fetchall()
            if Provisional != []:
                route_lat.append(Provisional)
            
            #経度
            c.execute("select lng from " + db_name + "_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            #route_gourmet_lng = c_gourmet.fetchall()
            Provisional = c.fetchall()
            if Provisional != []:
                route_lng.append(Provisional)
            
            #電話番号
            c.execute("select phone_number from " + db_name + "_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            #route_gourmet_phone_number = c_gourmet.fetchall()
            Provisional = c.fetchall()
            if Provisional != []:
                route_phone_number.append(Provisional)
                
    
    conn.close()
    
    #数をカウント
    Pre_route_name = sum(route_name,[])
    Pre_route_name = get_unique_list(Pre_route_name)
    route_articles = sum(len(v) for v in Pre_route_name)
    
    return [route_name,route_lat,route_lng,route_information,route_phone_number,route_articles]


#-----トップページ-----
@app.route("/")
def top():
    return render_template("index.html")


#-----お寺から探す-----
@app.route("/temple_search")
def temple_search():
    return render_template("temple_search.html")

#-----------------------------------------------------------------------------
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
    
    #ルート上の注意
    c_distance.execute("select caution from route where route_number = ? or route_number = ?",("/" + str(before_temple) + "/" + temple_number + "/","/" + temple_number + "/" + str(after_temple) + "/"))
    route_caution = c_distance.fetchall()
    
    #print(route_distance)
    conn_distance.close()
    
    #--------グルメ-------------------------------------------------------------------
    gourmet_element = Facility_search("gourmet",temple_number)
    gourmet_name = gourmet_element[0]
    gourmet_lat = gourmet_element[1]
    gourmet_lng = gourmet_element[2]
    gourmet_information = gourmet_element[3]
    gourmet_phone_number = gourmet_element[4]
    
    #--------宿-------------------------------------------------------------------
    inn_element = Facility_search("inn",temple_number)
    inn_name = inn_element[0]
    inn_lat = inn_element[1]
    inn_lng = inn_element[2]
    inn_information = inn_element[3]
    inn_phone_number = inn_element[4]

    #--------コンビニ-------------------------------------------------------------------
    convenience_element = Facility_search("convenience",temple_number)
    convenience_name = convenience_element[0]
    convenience_lat = convenience_element[1]
    convenience_lng = convenience_element[2]

    #--------立ち寄りスポット-------------------------------------------------------------------
    interesting_element = Facility_search("interesting",temple_number)
    interesting_name = interesting_element[0]
    interesting_lat = interesting_element[1]
    interesting_lng = interesting_element[2]
    interesting_information = interesting_element[3]

    #--------道の駅-------------------------------------------------------------------
    roadside_station_element = Facility_search("roadside_station",temple_number)
    roadside_station_name = roadside_station_element[0]
    roadside_station_lat = roadside_station_element[1]
    roadside_station_lng = roadside_station_element[2]
    roadside_station_information = roadside_station_element[3]
    
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
    global G_route_caution
    
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
    G_route_caution = route_caution
    
    return render_template("googleMap_temple.html",
                            temple_place = temple_place,
                            
                            gourmet_information = gourmet_information,
                            gourmet_name = gourmet_name,
                            gourmet_lat = gourmet_lat,
                            gourmet_lng = gourmet_lng,
                            gourmet_phone_number = gourmet_phone_number,
                            
                            inn_name = inn_name,
                            inn_information = inn_information,
                            inn_phone_number = inn_phone_number,
                            inn_lat = inn_lat,inn_lng = inn_lng,
                            
                            convenience_name = convenience_name,
                            convenience_lat = convenience_lat,
                            convenience_lng = convenience_lng,
                            
                            interesting_name = interesting_name,
                            interesting_information = interesting_information,
                            interesting_lat = interesting_lat,
                            interesting_lng = interesting_lng,
                            
                            roadside_station_name = roadside_station_name,
                            roadside_station_information = roadside_station_information,
                            roadside_station_lat = roadside_station_lat,
                            roadside_station_lng = roadside_station_lng,
                            
                            route_BandA = route_BandA,
                            route_distance = route_distance,
                            route_caution = route_caution,
                            )
#-----------------------------------------------------------------------------


#-----ルートマップ-----
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
    just_1_88 = False#1番と88番の時の判定
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
                            route_distance = G_route_distance,
                            route_caution = G_route_caution
                        )
    
    
    #寺が隣り合ってるなら
    elif int(Goal_temple_number) - int(Start_temple_number) == 1 or int(Goal_temple_number) - int(Start_temple_number) == -1 or int(Goal_temple_number) - int(Start_temple_number) == 87 or int(Goal_temple_number) - int(Start_temple_number) == -87:
        #逆めぐり
        if int(Goal_temple_number) - int(Start_temple_number) == -1 or int(Goal_temple_number) - int(Start_temple_number) == -87:
            waypoints_temple_number.append(Goal_temple_number)
            waypoints_temple_number.append(Start_temple_number)
            # print("88>1")
            # print("waypoints_temple_number")
            # print(waypoints_temple_number)
        
        #順めぐり
        elif int(Goal_temple_number) - int(Start_temple_number) == 1 or int(Goal_temple_number) - int(Start_temple_number) == 87:
            waypoints_temple_number.append(Start_temple_number)
            waypoints_temple_number.append(Goal_temple_number)
            # print("1>88")
            # print("waypoints_temple_number")
            # print(waypoints_temple_number)
            
        if int(Goal_temple_number) - int(Start_temple_number) == -87 or int(Goal_temple_number) - int(Start_temple_number) == 87:
            just_1_88 = True
            
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
    #各物件
    #---------------------------------------------------------------------------------
    #グルメ-----------------------------------------
    #スタート、ゴール、経由寺周辺
    SandG_gourmet_element = rote_temple_Facility_search("gourmet",just_1_88,pre_Start_temple_number,pre_Goal_temple_number)
    SandG_gourmet_name = SandG_gourmet_element[0]
    SandG_gourmet_lat = SandG_gourmet_element[1]
    SandG_gourmet_lng = SandG_gourmet_element[2]
    SandG_gourmet_information = SandG_gourmet_element[3]
    SandG_gourmet_phone_number = SandG_gourmet_element[4]
    SandG_gourmet_articles = SandG_gourmet_element[5]
    
    #ルート上
    route_gourmet_element = rote_Facility_search("gourmet",only_two_temples,just_1_88,pre_Start_temple_number,pre_Goal_temple_number,waypoints_temple_number)
    route_gourmet_name = route_gourmet_element[0]
    route_gourmet_lat = route_gourmet_element[1]
    route_gourmet_lng = route_gourmet_element[2]
    route_gourmet_information = route_gourmet_element[3]
    route_gourmet_phone_number = route_gourmet_element[4]
    route_gourmet_articles = route_gourmet_element[5]
    
    
    #宿----------
    #スタート、ゴール、経由寺周辺
    SandG_inn_element = rote_temple_Facility_search("inn",just_1_88,pre_Start_temple_number,pre_Goal_temple_number)
    SandG_inn_name = SandG_inn_element[0]
    SandG_inn_lat = SandG_inn_element[1]
    SandG_inn_lng = SandG_inn_element[2]
    SandG_inn_information = SandG_inn_element[3]
    SandG_inn_phone_number = SandG_inn_element[4]
    SandG_inn_articles = SandG_inn_element[5]
    
    #ルート上
    route_inn_element = rote_Facility_search("inn",only_two_temples,just_1_88,pre_Start_temple_number,pre_Goal_temple_number,waypoints_temple_number)
    route_inn_name = route_inn_element[0]
    route_inn_lat = route_inn_element[1]
    route_inn_lng = route_inn_element[2]
    route_inn_information = route_inn_element[3]
    route_inn_phone_number = route_inn_element[4]
    route_inn_articles = route_inn_element[5]
    
    
    #道の駅----------
    #スタート、ゴール、経由寺周辺
    SandG_roadside_station_element = rote_temple_Facility_search("roadside_station",just_1_88,pre_Start_temple_number,pre_Goal_temple_number)
    SandG_roadside_station_name = SandG_roadside_station_element[0]
    SandG_roadside_station_lat = SandG_roadside_station_element[1]
    SandG_roadside_station_lng = SandG_roadside_station_element[2]
    SandG_roadside_station_information = SandG_roadside_station_element[3]
    #SandG_roadside_station_phone_number = SandG_roadside_station_element[4]
    SandG_roadside_station_articles = SandG_roadside_station_element[5]
    #print(SandG_roadside_station_name)
    
    #ルート上
    route_roadside_station_element = rote_Facility_search("roadside_station",only_two_temples,just_1_88,pre_Start_temple_number,pre_Goal_temple_number,waypoints_temple_number)
    route_roadside_station_name = route_roadside_station_element[0]
    route_roadside_station_lat = route_roadside_station_element[1]
    route_roadside_station_lng = route_roadside_station_element[2]
    route_roadside_station_information = route_roadside_station_element[3]
    #route_roadside_station_phone_number = route_roadside_station_element[4]
    route_roadside_station_articles = route_roadside_station_element[5]
    
    
    
    #スポット----------
    #スタート、ゴール、経由寺周辺
    SandG_interesting_element = rote_temple_Facility_search("interesting",just_1_88,pre_Start_temple_number,pre_Goal_temple_number)
    SandG_interesting_name = SandG_interesting_element[0]
    SandG_interesting_lat = SandG_interesting_element[1]
    SandG_interesting_lng = SandG_interesting_element[2]
    SandG_interesting_information = SandG_interesting_element[3]
    #SandG_interesting_phone_number = SandG_inn_element[4]
    SandG_interesting_articles = SandG_interesting_element[5]
    
    #ルート上
    route_interesting_element = rote_Facility_search("interesting",only_two_temples,just_1_88,pre_Start_temple_number,pre_Goal_temple_number,waypoints_temple_number)
    route_interesting_name = route_interesting_element[0]
    route_interesting_lat = route_interesting_element[1]
    route_interesting_lng = route_interesting_element[2]
    route_interesting_information = route_interesting_element[3]
    #route_interesting_phone_number = route_roadside_station_element[4]
    route_interesting_articles = route_interesting_element[5]
    
    
    #コンビニ---------------
    #スタート、ゴール、経由寺周辺
    SandG_convenience_element = rote_temple_Facility_search("convenience",just_1_88,pre_Start_temple_number,pre_Goal_temple_number)
    SandG_convenience_name = SandG_convenience_element[0]
    SandG_convenience_lat = SandG_convenience_element[1]
    SandG_convenience_lng = SandG_convenience_element[2]
    SandG_convenience_information = SandG_convenience_element[3]
    #SandG_interesting_phone_number = SandG_inn_element[4]
    SandG_convenience_articles = SandG_convenience_element[5]
    
    #ルート上
    route_convenience_element = rote_Facility_search("convenience",only_two_temples,just_1_88,pre_Start_temple_number,pre_Goal_temple_number,waypoints_temple_number)
    route_convenience_name = route_convenience_element[0]
    route_convenience_lat = route_convenience_element[1]
    route_convenience_lng = route_convenience_element[2]
    route_convenience_information = route_convenience_element[3]
    #route_interesting_phone_number = route_roadside_station_element[4]
    route_convenience_articles = route_convenience_element[5]
    
    
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