from indictrans import Transliterator
import enchant
from difflib import get_close_matches
from langid.langid import LanguageIdentifier, model


def translate_in_hindi(trans_obj, word, hin_dict):
    hindi_word = trans_obj.transform(word)
    if hin_dict.check(hindi_word):
        return hindi_word, []
    else:
        matches = get_close_matches(hindi_word, hin_dict.suggest(hindi_word), n=1, cutoff=0.7)

    return hindi_word, matches


def translate(trans_obj, word, eng_dict, hin_dict, classifier, flag):

    hindi_word, hindi_match = translate_in_hindi(trans_obj, word, hin_dict)
    print('hin_word, hindi_matches', hindi_word, hindi_match)
    suggested_words = [[hindi_word, 1]]
    print('s', suggested_words)
    prob = classifier.classify(word)
    if not flag:
        if eng_dict.check(word) or (prob[0] == 'en' and prob[1] > 0.5):
            print('here')
            suggested_words = [[word, 0]] + suggested_words
            print('s', suggested_words)

    else:
        suggested_words.append([word, 0])
    print(suggested_words)
    if hindi_match:
        suggested_words.append([hindi_match[0], 1])

    return suggested_words


if __name__ == '__main__':
    eng_dict = enchant.Dict('en_US')
    hin_dict = enchant.Dict('hi_IN')
    trn = Transliterator(source='eng', target='hin')
    classifier = LanguageIdentifier.from_modelstring(model, norm_probs=True)
    sentence = list(input().split())
    for word in sentence:
        print(translate(trn, word, eng_dict, hin_dict, classifier, 0))








