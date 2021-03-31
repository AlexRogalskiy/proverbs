const _ = require('lodash')

const fs = require('fs')
const lunr = require('lunr')
const os = require('os')
const path = require('path')
const boxen = require('boxen')

const afghan = require('../data/afghan_proverbs.json')
const african = require('../data/african_proverbs.json')
const albanian = require('../data/albanian_proverbs.json')
const algerian = require('../data/algerian_proverbs.json')
const american = require('../data/american_proverbs.json')
const andorran = require('../data/andorran_proverbs.json')
const angolan = require('../data/angolan_proverbs.json')
const anii = require('../data/anii_proverbs.json')
const antillean = require('../data/antillean_proverbs.json')
const arabian = require('../data/arabian_proverbs.json')
const argentinian = require('../data/argentinian_proverbs.json')
const armenian = require('../data/armenian_proverbs.json')
const ashanti = require('../data/ashanti_proverbs.json')
const australian = require('../data/australian_proverbs.json')
const austrian = require('../data/austrian_proverbs.json')
const azerbaijani = require('../data/azerbaijani_proverbs.json')
const babylonian = require('../data/babylonian_proverbs.json')
const bahamian = require('../data/bahamian_proverbs.json')
const bambara = require('../data/bambara_proverbs.json')
const bantu = require('../data/bantu_proverbs.json')
const basotho = require('../data/basotho_proverbs.json')
const basque = require('../data/basque_proverbs.json')
const bedouin = require('../data/bedouin_proverbs.json')
const belgian = require('../data/belgian_proverbs.json')
const belizean = require('../data/belizean_proverbs.json')
const bengali = require('../data/bengali_proverbs.json')
const beninese = require('../data/beninese_proverbs.json')
const berber = require('../data/berber_proverbs.json')
const bhutanese = require('../data/bhutanese_proverbs.json')
const bible = require('../data/bible_proverbs.json')
const bolivian = require('../data/bolivian_proverbs.json')
const bosnian = require('../data/bosnian_proverbs.json')
const botswana = require('../data/botswana_proverbs.json')
const brazilian = require('../data/brazilian_proverbs.json')
const breton = require('../data/breton_proverbs.json')
const bugundan = require('../data/bugundan_proverbs.json')
const bulgarian = require('../data/bulgarian_proverbs.json')
const burkinabe = require('../data/burkinabe_proverbs.json')
const burmese = require('../data/burmese_proverbs.json')
const burundian = require('../data/burundian_proverbs.json')
const byzantium = require('../data/byzantium_proverbs.json')
const cambodian = require('../data/cambodian_proverbs.json')
const cameroonian = require('../data/cameroonian_proverbs.json')
const canadian = require('../data/canadian_proverbs.json')
const canaryIslander = require('../data/canary-islander_proverbs.json')
const capeVerdean = require('../data/cape-verdean_proverbs.json')
const catalan = require('../data/catalan_proverbs.json')
const chadian = require('../data/chadian_proverbs.json')
const chilean = require('../data/chilean_proverbs.json')
const chinese = require('../data/chinese_proverbs.json')
const colombian = require('../data/colombian_proverbs.json')
const congolese = require('../data/congolese_proverbs.json')
const corsican = require('../data/corsican_proverbs.json')
const costaRikan = require('../data/costa-rikan_proverbs.json')
const creole = require('../data/creole_proverbs.json')
const cretian = require('../data/cretian_proverbs.json')
const croatian = require('../data/croatian_proverbs.json')
const cuban = require('../data/cuban_proverbs.json')
const cypriot = require('../data/cypriot_proverbs.json')
const czech = require('../data/czech_proverbs.json')
const czechoslovakian = require('../data/czechoslovakian_proverbs.json')
const danish = require('../data/danish_proverbs.json')
const darkovan = require('../data/darkovan_proverbs.json')
const dominican = require('../data/dominican_proverbs.json')
const dutch = require('../data/dutch_proverbs.json')
const dwarven = require('../data/dwarven_proverbs.json')
const eastAfrican = require('../data/east-african_proverbs.json')
const eastAsian = require('../data/east-asian_proverbs.json')
const ecuadorian = require('../data/ecuadorian_proverbs.json')
const egyptian = require('../data/egyptian_proverbs.json')
const english = require('../data/english_proverbs.json')
const eritrean = require('../data/eritrean_proverbs.json')
const eskimo = require('../data/eskimo_proverbs.json')
const estonian = require('../data/estonian_proverbs.json')
const ethiopian = require('../data/ethiopian_proverbs.json')
const faroese = require('../data/faroese_proverbs.json')
const fijian = require('../data/fijian_proverbs.json')
const filipino = require('../data/filipino_proverbs.json')
const finnish = require('../data/finnish_proverbs.json')
const flemish = require('../data/flemish_proverbs.json')
const frenchGuianese = require('../data/french-guianese_proverbs.json')
const french = require('../data/french_proverbs.json')
const gabonese = require('../data/gabonese_proverbs.json')
const gaelic = require('../data/gaelic_proverbs.json')
const gambian = require('../data/gambian_proverbs.json')
const georgian = require('../data/georgian_proverbs.json')
const german = require('../data/german_proverbs.json')
const ghanaian = require('../data/ghanaian_proverbs.json')
const goan = require('../data/goan_proverbs.json')
const greek = require('../data/greek_proverbs.json')
const guadeloupe = require('../data/guadeloupe_proverbs.json')
const guatemalan = require('../data/guatemalan_proverbs.json')
const guinean = require('../data/guinean_proverbs.json')
const guyanese = require('../data/guyanese_proverbs.json')
const gypsy = require('../data/gypsy_proverbs.json')
const haitian = require('../data/haitian_proverbs.json')
const hasidic = require('../data/hasidic_proverbs.json')
const hawaiian = require('../data/hawaiian_proverbs.json')
const hebrew = require('../data/hebrew_proverbs.json')
const hindu = require('../data/hindu_proverbs.json')
const honduran = require('../data/honduran_proverbs.json')
const hungarian = require('../data/hungarian_proverbs.json')
const icelandic = require('../data/icelandic_proverbs.json')
const indian = require('../data/indian_proverbs.json')
const indonesian = require('../data/indonesian_proverbs.json')
const iranian = require('../data/iranian_proverbs.json')
const iraqi = require('../data/iraqi_proverbs.json')
const irish = require('../data/irish_proverbs.json')
const islamic = require('../data/islamic_proverbs.json')
const israeli = require('../data/israeli_proverbs.json')
const italian = require('../data/italian_proverbs.json')
const ivorian = require('../data/ivorian_proverbs.json')
const jamaican = require('../data/jamaican_proverbs.json')
const japanese = require('../data/japanese_proverbs.json')
const jewish = require('../data/jewish_proverbs.json')
const jordanian = require('../data/jordanian_proverbs.json')
const kanuri = require('../data/kanuri_proverbs.json')
const kashmiri = require('../data/kashmiri_proverbs.json')
const kenyan = require('../data/kenyan_proverbs.json')
const kikuyu = require('../data/kikuyu_proverbs.json')
const klingon = require('../data/klingon_proverbs.json')
const koran = require('../data/koran_proverbs.json')
const korean = require('../data/korean_proverbs.json')
const kurdish = require('../data/kurdish_proverbs.json')
const kyrgyzstani = require('../data/kyrgyzstani_proverbs.json')
const laotian = require('../data/laotian_proverbs.json')
const latinAmerican = require('../data/latin-american_proverbs.json')
const latin = require('../data/latin_proverbs.json')
const latvian = require('../data/latvian_proverbs.json')
const lebanese = require('../data/lebanese_proverbs.json')
const lesotho = require('../data/lesotho_proverbs.json')
const liberian = require('../data/liberian_proverbs.json')
const libyan = require('../data/libyan_proverbs.json')
const lithuanian = require('../data/lithuanian_proverbs.json')
const luxembourgish = require('../data/luxembourgish_proverbs.json')
const macedonian = require('../data/macedonian_proverbs.json')
const malagasy = require('../data/malagasy_proverbs.json')
const malawian = require('../data/malawian_proverbs.json')
const malay = require('../data/malay_proverbs.json')
const malaysian = require('../data/malaysian_proverbs.json')
const malian = require('../data/malian_proverbs.json')
const maltese = require('../data/maltese_proverbs.json')
const maori = require('../data/maori_proverbs.json')
const martiniquais = require('../data/martiniquais_proverbs.json')
const massai = require('../data/massai_proverbs.json')
const mauritanian = require('../data/mauritanian_proverbs.json')
const mauritian = require('../data/mauritian_proverbs.json')
const mexican = require('../data/mexican_proverbs.json')
const mongolian = require('../data/mongolian_proverbs.json')
const montenegro = require('../data/montenegro_proverbs.json')
const moorish = require('../data/moorish_proverbs.json')
const moroccan = require('../data/moroccan_proverbs.json')
const mozambican = require('../data/mozambican_proverbs.json')
const myanmar = require('../data/myanmar_proverbs.json')
const namibian = require('../data/namibian_proverbs.json')
const navajo = require('../data/navajo_proverbs.json')
const nepalese = require('../data/nepalese_proverbs.json')
const newZelander = require('../data/new-zelander_proverbs.json')
const nicaraguan = require('../data/nicaraguan_proverbs.json')
const nigerian = require('../data/nigerian_proverbs.json')
const pakistani = require('../data/pakistani_proverbs.json')
const norwegian = require('../data/norwegian_proverbs.json')
const omani = require('../data/omani_proverbs.json')
const palestinian = require('../data/palestinian_proverbs.json')
const panamanian = require('../data/panamanian_proverbs.json')
const paraguayan = require('../data/paraguayan_proverbs.json')
const persian = require('../data/persian_proverbs.json')
const peruvian = require('../data/peruvian_proverbs.json')
const philippine = require('../data/philippine_proverbs.json')
const polish = require('../data/polish_proverbs.json')
const portuguese = require('../data/portuguese_proverbs.json')
const puertoRikan = require('../data/puerto-rikan_proverbs.json')
const romanian = require('../data/romanian_proverbs.json')
const russian = require('../data/russian_proverbs.json')
const rwandan = require('../data/rwandan_proverbs.json')
const salvadorian = require('../data/salvadorian_proverbs.json')
const samoan = require('../data/samoan_proverbs.json')
const sanskrit = require('../data/sanskrit_proverbs.json')
const sardinian = require('../data/sardinian_proverbs.json')
const scottish = require('../data/scottish_proverbs.json')
const senegalese = require('../data/senegalese_proverbs.json')
const serbian = require('../data/serbian_proverbs.json')
const sicilian = require('../data/sicilian_proverbs.json')
const sierraLeonean = require('../data/sierra-leonean_proverbs.json')
const singaporean = require('../data/singaporean_proverbs.json')
const sinhalese = require('../data/sinhalese_proverbs.json')
const slovakian = require('../data/slovakian_proverbs.json')
const slovenian = require('../data/slovenian_proverbs.json')
const solomonIslander = require('../data/solomon-islander_proverbs.json')
const somali = require('../data/somali_proverbs.json')
const southAfrican = require('../data/south-african_proverbs.json')
const spanish = require('../data/spanish_proverbs.json')
const sriLankan = require('../data/sri-lankan_proverbs.json')
const sudanese = require('../data/sudanese_proverbs.json')
const sumerian = require('../data/sumerian_proverbs.json')
const surinamese = require('../data/surinamese_proverbs.json')
const swahili = require('../data/swahili_proverbs.json')
const swedish = require('../data/swedish_proverbs.json')
const swiss = require('../data/swiss_proverbs.json')
const syrian = require('../data/syrian_proverbs.json')
const tahitian = require('../data/tahitian_proverbs.json')
const taiwanese = require('../data/taiwanese_proverbs.json')
const tajikistani = require('../data/tajikistani_proverbs.json')
const talmud = require('../data/talmud_proverbs.json')
const tamilan = require('../data/tamilan_proverbs.json')
const tanzanian = require('../data/tanzanian_proverbs.json')
const thai = require('../data/thai_proverbs.json')
const tibetan = require('../data/tibetan_proverbs.json')
const togolese = require('../data/togolese_proverbs.json')
const tongan = require('../data/tongan_proverbs.json')
const trinidadian = require('../data/trinidadian_proverbs.json')
const tuareg = require('../data/tuareg_proverbs.json')
const tunisian = require('../data/tunisian_proverbs.json')
const turkish = require('../data/turkish_proverbs.json')
const ugandan = require('../data/ugandan_proverbs.json')
const uighur = require('../data/uighur_proverbs.json')
const ukrainian = require('../data/ukrainian_proverbs.json')
const uruguayan = require('../data/uruguayan_proverbs.json')
const venezuelan = require('../data/venezuelan_proverbs.json')
const vermont = require('../data/vermont_proverbs.json')
const vietnamese = require('../data/vietnamese_proverbs.json')
const virginIslander = require('../data/virgin-islander_proverbs.json')
const walloon = require('../data/walloon_proverbs.json')
const welsh = require('../data/welsh_proverbs.json')
const westAfrican = require('../data/west-african_proverbs.json')
const yemeni = require('../data/yemeni_proverbs.json')
const yiddish = require('../data/yiddish_proverbs.json')
const yugoslavian = require('../data/yugoslavian_proverbs.json')
const zaire = require('../data/zaire_proverbs.json')
const zambian = require('../data/zambian_proverbs.json')
const zanzibar = require('../data/zanzibar_proverbs.json')
const zen = require('../data/zen_proverbs.json')
const zimbabwean = require('../data/zimbabwean_proverbs.json')
const zulu = require('../data/zulu_proverbs.json')

function getConfig() {
    return process.env.AWS_LAMBDA_FUNCTION_VERSION
        ? { path: '.cache', name: 'proverbs-lunr-index.json', delimiter: '__' }
        : { path: '.cache', name: 'proverbs-lunr-index.json', delimiter: '_' }
}

function filePath() {
    return path.join(os.tmpdir(), `${getConfig().path}`)
}

function getIndexPath(filePath) {
    return path.join(filePath, `${getConfig().name}`)
}

function loadIndex(obj, args) {
    obj.field('text')
    obj.field('category')

    for (const category of Object.keys(args)) {
        for (const [index, value] of Object.entries(args[category])) {
            value.id = `${category}${getConfig().delimiter}${index}`
            obj.add(value)
        }
    }

    return obj.build()
}

function createIndex(args) {
    const args_ = _.merge(...args)
    return lunr(obj => loadIndex(obj, args_))
}

function ensureDirExists(dir) {
    fs.existsSync(dir) || fs.mkdirSync(dir, { recursive: true })
}

;( function () {
    try {
        const path = filePath()
        ensureDirExists(path)

        const values = [
            afghan,
            african,
            albanian,
            algerian,
            american,
            andorran,
            angolan,
            anii,
            antillean,
            arabian,
            argentinian,
            armenian,
            ashanti,
            australian,
            austrian,
            azerbaijani,
            babylonian,
            bahamian,
            bambara,
            bantu,
            basotho,
            basque,
            bedouin,
            belgian,
            belizean,
            bengali,
            beninese,
            berber,
            bhutanese,
            bible,
            bolivian,
            bosnian,
            botswana,
            brazilian,
            breton,
            bugundan,
            bulgarian,
            burkinabe,
            burmese,
            burundian,
            byzantium,
            cambodian,
            cameroonian,
            canadian,
            canaryIslander,
            capeVerdean,
            catalan,
            chadian,
            chilean,
            chinese,
            colombian,
            congolese,
            corsican,
            costaRikan,
            creole,
            cretian,
            croatian,
            cuban,
            cypriot,
            czech,
            czechoslovakian,
            danish,
            darkovan,
            dominican,
            dutch,
            dwarven,
            eastAfrican,
            eastAsian,
            ecuadorian,
            egyptian,
            english,
            eritrean,
            eskimo,
            estonian,
            ethiopian,
            faroese,
            fijian,
            filipino,
            finnish,
            flemish,
            frenchGuianese,
            french,
            gabonese,
            gaelic,
            gambian,
            georgian,
            german,
            ghanaian,
            goan,
            greek,
            guadeloupe,
            guatemalan,
            guinean,
            guyanese,
            gypsy,
            haitian,
            hasidic,
            hawaiian,
            hebrew,
            hindu,
            honduran,
            hungarian,
            icelandic,
            indian,
            indonesian,
            iranian,
            iraqi,
            irish,
            islamic,
            israeli,
            italian,
            ivorian,
            jamaican,
            japanese,
            jewish,
            jordanian,
            kanuri,
            kashmiri,
            kenyan,
            kikuyu,
            klingon,
            koran,
            korean,
            kurdish,
            kyrgyzstani,
            laotian,
            latinAmerican,
            latin,
            latvian,
            lebanese,
            lesotho,
            liberian,
            libyan,
            lithuanian,
            luxembourgish,
            macedonian,
            malagasy,
            malawian,
            malay,
            malaysian,
            malian,
            maltese,
            maori,
            martiniquais,
            massai,
            mauritanian,
            mauritian,
            mexican,
            mongolian,
            montenegro,
            moorish,
            moroccan,
            mozambican,
            myanmar,
            namibian,
            navajo,
            nepalese,
            newZelander,
            nicaraguan,
            nigerian,
            norwegian,
            omani,
            pakistani,
            palestinian,
            panamanian,
            paraguayan,
            persian,
            peruvian,
            philippine,
            polish,
            portuguese,
            puertoRikan,
            romanian,
            russian,
            rwandan,
            salvadorian,
            samoan,
            sanskrit,
            sardinian,
            scottish,
            senegalese,
            serbian,
            sicilian,
            sierraLeonean,
            singaporean,
            sinhalese,
            slovakian,
            slovenian,
            solomonIslander,
            somali,
            southAfrican,
            spanish,
            sriLankan,
            sudanese,
            sumerian,
            surinamese,
            swahili,
            swedish,
            swiss,
            syrian,
            tahitian,
            taiwanese,
            tajikistani,
            talmud,
            tamilan,
            tanzanian,
            thai,
            tibetan,
            togolese,
            tongan,
            trinidadian,
            tuareg,
            tunisian,
            turkish,
            ugandan,
            uighur,
            ukrainian,
            uruguayan,
            venezuelan,
            vermont,
            vietnamese,
            virginIslander,
            walloon,
            welsh,
            westAfrican,
            yemeni,
            yiddish,
            yugoslavian,
            zaire,
            zambian,
            zanzibar,
            zen,
            zimbabwean,
            zulu,
        ]
        const searchIndex = createIndex(values)
        const index = getIndexPath(path)

        console.log(
            boxen(`Storing index file by path=${index}`, {
                padding: 1,
                margin: 1,
                borderStyle: 'single',
                borderColor: 'yellow',
            })
        )

        fs.writeFileSync(index, JSON.stringify(searchIndex))
    } catch (e) {
        console.error(
            boxen(`Failed to store index file, message=${e.message}`, {
                padding: 1,
                margin: 1,
                borderStyle: 'double',
                borderColor: 'red',
            })
        )
        throw e
    }
} )()
