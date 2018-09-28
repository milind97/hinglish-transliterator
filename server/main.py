from flask import Flask
from flask import request
from indictrans import Transliterator

import enchant
from langid.langid import LanguageIdentifier, model

app = Flask(__name__)



@app.route("/convert",methods=['POST'])
def convert_():
    req_data = request.get_json()

    text = req_data['text']

    # from here the function will be called which will check and convert the text

    return "Response: "+ trn.transform(text)

eng_dict = enchant.Dict('en_US')
hin_dict = enchant.Dict('hi_IN')
trn = Transliterator(source='eng', target='hin')
classifier = LanguageIdentifier.from_modelstring(model, norm_probs=True)

if __name__ == "__main__":
    app.run()