from difflib import get_close_matches

import enchant
from indictrans import Transliterator
from langid.langid import LanguageIdentifier, model


def transliterate_in_hindi(trans_obj, word, hin_dict):
    """
    Transliterate the given word into devanagari script
    :param trans_obj: Object for Transliterator class from indictrans
    :param word: User input word
    :param hin_dict: Object for Hindi dictionary
    :return: Transliterated word and its close matches
    """
    hindi_word = trans_obj.transform(word)

    # if word is legitimate hindi word (present in hindi dictionary)
    if hin_dict.check(hindi_word):
        # only return the exact hindi word, no close matches
        return hindi_word, []
    else:
        # get words related to the transliterated word
        matches = get_close_matches(hindi_word, hin_dict.suggest(hindi_word), n=1, cutoff=0.7)
        return hindi_word, matches


def generate_predictions(trans_obj, word, eng_dict, hin_dict, classifier, flag):
    """
    Generates the list of predictions for the given word
    :param trans_obj: Object for Transliterator class from indictrans
    :param word: User input word
    :param eng_dict: Object for english dictionary
    :param hin_dict: Object for Hindi dictionary
    :param classifier: Object for language classifier class
    :param flag: 1 If previous word was hindi
    :return: List of predictions to be shown to the user with each word containing its flag
    """
    # get transliterated word and its close matches
    hindi_word, hindi_match = transliterate_in_hindi(trans_obj, word, hin_dict)

    # insert the hindi word at top of the predictions list (flag is 1 as it is hindi word)
    suggested_words = [[hindi_word, 1]]

    # Determine the language of the user input word
    prob = classifier.classify(word)

    # Check if previous word was not hindi and it is a legitimate english word
    if not flag and (eng_dict.check(word) or (prob[0] == 'en' and prob[1] > 0.5)):
        # As it is legitimate english word, keep the english word on top of predictions list
        suggested_words = [[word, 0]] + suggested_words

    else:
        # As it is not a legitimate english word or the user last prediction was hindi word add the user input at the
        # end of predictions list
        suggested_words.append([word, 0])

    # If transliterated word is not a legitimate hindi word, add the closest hindi match to the predictions list
    if hindi_match:
        suggested_words.append([hindi_match[0], 1])

    return suggested_words


if __name__ == '__main__':
    # sample test script to test this program logic
    # initialize english and hindi dictionary object
    eng_dict = enchant.Dict('en_US')
    hin_dict = enchant.Dict('hi_IN')

    # initialize objects for language classifier and indictrans class
    trn = Transliterator(source='eng', target='hin')
    classifier = LanguageIdentifier.from_modelstring(model, norm_probs=True)

    # take sample sentence from the user
    sentence = list(input().split())

    # transliterate every word in the sentence
    for word in sentence:
        print(transliterate_in_hindi(trn, word, eng_dict, hin_dict, classifier, 0))








