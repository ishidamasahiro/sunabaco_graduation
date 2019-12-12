from flask import Flask
app = Flask(__name__)



@app.route('/')
def hello_world():
    return '<html><body><h1>sample</h1></body></html>'


#おまじない--------------------------------------------
if __name__ == '__main__':
    app.run()