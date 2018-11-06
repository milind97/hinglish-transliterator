import json

import enchant
from flask import Flask, render_template
from flask import request, send_from_directory
from indictrans import Transliterator
from langid.langid import LanguageIdentifier, model
from transliterator import generate_predictions

app = Flask(__name__, static_url_path='', template_folder='templates')


@app.route('/js/<path:path>')
def send_js(path):
    """
    Redirects the control to javascript file
    """
    return send_from_directory('templates/js', path)


@app.route('/css/<path:path>')
def send_css(path):
    """
    Redirects the control to css files
    """
    return send_from_directory('templates/css', path)


@app.route('/images/<path:path>')
def send_images(path):
    """
    Redirects the control to image folder
    """
    return send_from_directory('templates/images', path)


@app.route("/")
def index():
    """
    Render the home page
    :return:
    """
    return render_template("index.html")


@app.route("/convert", methods=['POST', 'GET'])
def convert():
    """
    Receives the string through post method and call the function to process it
    :return: list of translated predictions to be shown to the user
    """
    if request.method == "POST":
        user_string = request.json['text']
        # flag stores whether previous translated word was hindi or not
        flag = request.json['flag']

        if user_string:
            # Call to translate function to process the string
            predictions = generate_predictions(transliterator_obj, user_string, eng_dict, hin_dict, classifier, flag)
            return json.dumps({"lists": predictions})

        else:
            # return empty list if user sends empty string
            return json.dumps({"lists": []})


if __name__ == "__main__":
    # initializing english and hindi dictionaries
    eng_dict = enchant.Dict('en_US')
    hin_dict = enchant.Dict('hi_IN')

    # initializing object of Transliterator class
    transliterator_obj = Transliterator(source='eng', target='hin')

    # initializing object for language classifier
    classifier = LanguageIdentifier.from_modelstring(model, norm_probs=True)

    # run flask app
    app.run('0.0.0.0', debug=True)
