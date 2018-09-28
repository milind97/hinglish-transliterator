from indictrans import Transliterator
import enchant
from difflib import get_close_matches
from langid.langid import LanguageIdentifier, model


def translate(trans_obj, word, eng_dict, hin_dict, classifier):

    if eng_dict.check(word):
        return word
    else:
        prob = classifier.classify(word)
        print(prob)
        if prob[0] == 'en' and prob[1] > 0.5:
            return word
        else:
            print('not english')
            hindi_word = trans_obj.transform(word)
            if hin_dict.check(hindi_word):
                return hindi_word
            else:
                matches = get_close_matches(hindi_word, hin_dict.suggest(hindi_word), cutoff=0.7)
                if matches:
                    return hindi_word
                else:
                    return word


if __name__ == '__main__':
    eng_dict = enchant.Dict('en_US')
    hin_dict = enchant.Dict('hi_IN')
    trn = Transliterator(source='eng', target='hin')
    classifier = LanguageIdentifier.from_modelstring(model, norm_probs=True)
    sentence = list(input().split())
    ts = ''
    for word in sentence:
        ts = ' '.join([ts, translate(trn, word, eng_dict, hin_dict, classifier)])
    print('translated: ', ts)








