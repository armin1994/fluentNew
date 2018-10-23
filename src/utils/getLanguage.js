import _ from 'lodash';

const ln = {
    "af": "af_ZA",
    "ar": "ar",
    "bg": "bg_BG",
    "ca": "ca_AD",
    "cs": "cs_CZ",
    "cy": "cy_GB",
    "da": "da_DK",
    "de": "de_DE",
    "el": "el_GR",
    "en": "en_US",
    "es": "es_ES",
    "et": "et_EE",
    "eu": "eu",
    "fa": "fa_IR",
    "fi": "fi_FI",
    "fr": "fr_FR",
    "he": "he_IL",
    "hr": "hr_HR",
    "hu": "hu_HU",
    "id": "id_ID",
    "is": "is_IS",
    "it": "it_IT",
    "ja": "ja_JP",
    "km": "km_KH",
    "ko": "ko_KR",
    "lt": "lt_LT",
    "lv": "lv_LV",
    "mn": "mn_MN",
    "nb": "nb_NO",
    "nl": "nl_NL",
    "nn": "nn_NO",
    "pl": "pl_PL",
    "pt": "pt_PT",
    "ro": "ro_RO",
    "ru": "ru_RU",
    "sk": "sk_SK",
    "sl": "sl_SI",
    "sr": "sr_RS",
    "sv": "sv_SE",
    "th": "th_TH",
    "tr": "tr_TR",
    "uk": "uk_UA",
    "vi": "vi_VN",
    "zh": "zh_CN"
}
const getLanguage = (query, cookie) => {
    const {
        lang
    } = query;
    const i18n = ln[lang] || cookie || "en_US"
    return i18n;
}

export default getLanguage;