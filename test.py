def rote_Facility_t_search(db_name,just_1_88,pre_Start_temple_number,pre_Goal_temple_number):
    
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
    conn.close()
    return [SandG_name,SandG_lat,SandG_lng,SandG_information,SandG_phone_number,SandG_articles]
        
        
        
        
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
            c.execute("select information from gourmet_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            #route_gourmet_information = c_gourmet.fetchall()
            Provisional = c.fetchall()
            if Provisional != []:
                route_information.append(Provisional)
                
            #緯度
            c.execute("select lat from gourmet_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            #route_gourmet_lat = c_gourmet.fetchall()
            Provisional = c.fetchall()
            if Provisional != []:
                route_lat.append(Provisional)
            
            #経度
            c.execute("select lng from gourmet_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            #route_gourmet_lng = c_gourmet.fetchall()
            Provisional = c.fetchall()
            if Provisional != []:
                route_lng.append(Provisional)
            
            #電話番号
            c.execute("select phone_number from gourmet_place where route_number like ?",("%/" + str_waypoints_temple_number + "/%",))
            #route_gourmet_phone_number = c_gourmet.fetchall()
            Provisional = c.fetchall()
            if Provisional != []:
                route_phone_number.append(Provisional)
                
    
    conn.close()
    
    #数をカウント
    Pre_route_gourmet_name = sum(route_name,[])
    Pre_route_gourmet_name = get_unique_list(Pre_route_gourmet_name)
    route_gourmet_articles = sum(len(v) for v in Pre_route_gourmet_name)
    
    return [route_name,route_lat,route_lng,route_information,route_phone_number,route_articles]
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    








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
        c.execute("select information "+ table_name +" where temple_number = ?",(temple_number,))
        information = c.fetchall()
        
        #電話番号
        c.execute("select phone_number "+ table_name +" where temple_number = ?",(temple_number,))
        phone_number = c.fetchall()

        conn.close()
        
        #全部入りリストを作って渡す list_gourmet を作って list_gourmet[0]とかで取り出す。
        return [name,lat,lng,information,phone_number]
        
    
    
    #--------グルメ-------------------------------------------------------------------
    conn_gourmet = sqlite3.connect("gourmet.db")
    c_gourmet = conn_gourmet.cursor()

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