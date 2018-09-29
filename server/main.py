from flask import Flask, render_template
from flask import request, make_response, send_from_directory
from indictrans import Transliterator
from translator import translate

import enchant
from langid.langid import LanguageIdentifier, model

import json

app = Flask(__name__, static_url_path='')

@app.route('/js/<path:path>')
def send_js(path):
    print("paath: " + path)
    return send_from_directory('js', path)

@app.route("/")
def index():
    return render_template("./test.html")


@app.route("/convert",methods=['POST','GET'])
def convert_():
    req_data = None
    if request.method == "POST":
        # print(req_data)
        req_data = request.json['text']
        flag = request.json['flag']
        # print(flag)
    # print(req_data)
    # print(req_data['text'])
    # text = "Ayush"
    # text = req_data['text'].split()[-1]
    text = req_data
    print(text)
    # from here the function will be called which will check and convert the text
    text = translate(trn, text, eng_dict, hin_dict, classifier,flag)
    print(text)

    # res = make_response({"lists":text},200)
    # res.headers['Content-Type'] = 'application/json'
    # res.headers['Content-Type'] = 'text/plain'
    return json.dumps({"lists":text})


if __name__ == "__main__":
    eng_dict = enchant.Dict('en_US')
    hin_dict = enchant.Dict('hi_IN')
    trn = Transliterator(source='eng', target='hin')
    classifier = LanguageIdentifier.from_modelstring(model, norm_probs=True)
    app.run('0.0.0.0')