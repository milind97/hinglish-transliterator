from flask import Flask, render_template
from flask import request, make_response
from indictrans import Transliterator
from translator import translate

import enchant
from langid.langid import LanguageIdentifier, model

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("./test.html")


@app.route("/convert",methods=['POST','GET'])
def convert_():
    req_data = request.args
    # print(req_data['text'])
    # text = "Ayush"
    text = req_data['text'].split()[-1]
    print(text)
    # from here the function will be called which will check and convert the text
    text = translate(trn, text, eng_dict, hin_dict, classifier)
    print(text)
    res = make_response(text,200)
    res.headers['Content-Type'] = 'text/plain'
    # res.headers['Content-Type'] = 'text/plain'
    return res


if __name__ == "__main__":
    eng_dict = enchant.Dict('en_US')
    hin_dict = enchant.Dict('hi_IN')
    trn = Transliterator(source='eng', target='hin')
    classifier = LanguageIdentifier.from_modelstring(model, norm_probs=True)
    app.run('0.0.0.0')