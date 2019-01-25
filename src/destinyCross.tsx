import * as React from 'react';
import * as moment from 'moment';
import { NameNumerology } from './numerologyName'
import { string, object, number } from 'prop-types';
import * as diacritics from 'diacritics'

interface DestinyCrossProps {
        name: string
}

interface DestinyCrossState {
        firstName: string,
        lastName: string
}


const alphabetMatrix: { [name: string]: number | undefined } = {
        A: 1, J: 1, S: 1,
        B: 2, K: 2, T: 2,
        C: 3, L: 3, U: 3,
        D: 4, M: 4, V: 4,
        E: 5, Ö: 5, N: 5, W: 5,
        F: 6, O: 6, X: 6,
        G: 7, P: 7, Y: 7,
        H: 8, Q: 8, Z: 8,
        I: 9, Ü: 9, R: 9
}


let messages = [
        { id: 1, text: "Charakterizuje osobnost člověka, jeho ´já´, projevuje se touha vést a být první. Pokud se toto číslo objeví v pozici některé světové strany, člověk má šanci zde vyniknout jako osobnost. Bude prakticky nepřehlédnutelný." },
        { id: 2, text: "Vztahy k druhým lidem, dualita, snášenlivost, diplomacie. Soudržnost s přáteli. Nejsou problémy s komunikací, s navazováním nových kontaktů." },
        { id: 3, text: "Umělecké ambice, ale také možná přelétavost ve všem. Vnímáme, že se kolem nás pořád něco děje. Nenudíme se. Rychle může přicházet štěstí, ale na druhou stranu si člověk neštěstí může člověk přivodit svou nestálostí." },
        { id: 4, text: "Fyzická stránka života, materiálno a konservatismus. Člověk s tímto číslem je oběma nohama na zemi. Pokud má toto číslo člověk v pozici některé světové strany, bude tam pravděpodobně hodně podsaditý, ale také klidný. Bude si schraňovat svůj majetek. Určitě bude víc dbát na peníze než na umění." },
        { id: 5, text: "Pohyb, aktivita, flexibilita, někdy také nervní povaha. Člověk s tímto číslem bude mít spíše sklony k hubnutí. Tělesná konstituce bude křehčí, bude plný nových myšlenek, které mohou mít celkově obrovský rozsah." },
        { id: 6, text: "Klid, láska a harmonie. Někdy lidé s tímto číslem mohou mít problémy s obezitou. Ovšem čistá šestka představuje nádheru, je to tzv. andělské číslo." },
        { id: 7, text: "Touha po nepoznaném, ztížená pozice, někdy mysticismus. Člověk se mění v duchovním směru. Ovšem pokud neslyší vnitřní volání a jde pouze za majetkem, trpí. Nedaří se mu ve firmě. Kdo chce podnikat, neměl by jít na tu světovou stranu, kde má ve vzorci osudu sedmičku." },
        { id: 8, text: "Materialismus, otročení zvykům, pohyb v kruhu, někdy bludném. Člověk prochází neustále se opakujícími cestami. Opakuje stejné chyby, prožívá komplikované vztahy se stále stejnými partnery." },
        { id: 9, text: "Vítězství. Dosažení cíle, konec všeho špatného a začátek nového. Splnění přání." },
        { id: 10, text: "Ztížené emoce nebo orientace v citech, nula působí rušivě." },
        { id: 11, text: "Zdvojené ego, které může být využito i v dobrém." },
        { id: 12, text: "Obětavost, člověk se k cíli dostává přes překážky. Pokud se ve vzorci objeví dvě a více dvanáctek, člověk inklinuje k oběti pro druhé až v extrémní podobě, časté jsou sebevraždy." },
        { id: 13, text: "Proměna myšlenky v čin, flexibilita ve všem, co člověka baví." },
        { id: 14, text: "Omezení, nervnost." },
        { id: 15, text: "Toto číslo představuje doslova směr hlavou proti zdi. Zahrnuje vášeň a nadšení, které je třeba brzdit. City převládají nad logikou i rozumem. Nedoporučuji pěstovat závislosti na ničem, ani na nikom. Pozor na zdraví. Nelehké osobní vztahy. Touha po harmonii je často brzděna." },
        { id: 16, text: "Rozporuplné číslo. Extrémy, velká námaha dobrat se ke štěstí. Přemýšlivost, ale je třeba nastoupit odlišný vývoj. Nehody, rizika, pády či osamění se střídají stejně jako den a noc. Pokud má člověk i špatné datum narození, určitě doporučuji změnu jména." },
        { id: 17, text: "V tomto čísle jsme odkázáni většinou sami na sebe. Ale skrývá v sobě také obrovskou výkonnost, touhu uskutečňovat, budovat. Člověk se může dobrat slávy, ale i závisti. Jen je nutné zachovávat rovnováhu, nejít do extrémů." },
        { id: 18, text: "Citlivost, snivost, jasnovidectví. Někdy člověk může sklouznout až k nereálným iluzím. Měl by pracovat na sobě, jinak bude zklamán životem i lidmi. Najít vhodného partnera nebude lehké. Ale poměrně snadno lze člověka s osmnáctkou ošálit, pozor na to." },
        { id: 19, text: "Aktivita a spousta energie. Člověk s tímto číslem má rysy vůdce, je schopen lidi někam dovést. Jeho osud určuje tvořivá energie. Má cit pro krásu. Provázejí ho úspěchy, ale na druhou stranu je třeba dát pozor na sobectví." },
        { id: 20, text: "Ztížená dvojka. Ke ztížení dochází vždy přítomností nuly. Člověk s dvacítkou ve vzorci osudu je citlivý, chápe druhé, ale sám prochází nelehkým vývojem. Vnímá osobní rozporuplnost. Obvykle trvá dlouho, než člověk někam dojde, než se k něčemu dopracuje. Životní pouť je doprovázena také šrámy na duši." },
        { id: 21, text: "Snadná komunikace s lidmi, cestování. Škodu může přivodit roztržitost. Člověk s tímto číslem ve vzorci osudu si dokáže dobře nalinkovat svůj život, má dobré, reálné plány. Jen někdy je třeba zvolit těžší cestu ke štěstí." },
        { id: 22, text: "Mohutná energie osobnosti, která může být použita k dobru i zlu. Kariéra, chladná logika, intuice je překřičena rozumem. Člověk ale má zůstat člověkem. Peníze nejsou všechno. Toto číslo je jako supernova. Osobnost může zničit člověka samého. Měl by se naučit klidu a lásce, chvíli se zastavit a pomoci slabším." },
        { id: 23, text: "Člověk s tímto číslem postupuje, je úspěšný. Zahrnuje spoustu zájmů. Pohyblivost. Objevuje-li se ve vzorci osudu vícekrát, znamená ale už nerovnost, často i psychickou poruchu." },
        { id: 24, text: "Láska, výbušnost zkrotí sám život, potom následuje harmonie a touha po rodinném krbu, obětavost." },
        { id: 25, text: "Někdy těžkosti, stagnace a nerozhodnost. Rozený lékař či pečovatelka. Je vhodné zaměřit studium tímto směrem. Ovšem vlastní zdraví je slabší." },
        { id: 26, text: "Touha po hmotných statcích či slávě může přivolávat neporozumění. Nehnat nic do extrémů a vše bude v pořádku. Vyplácí se myslet na druhé." },
        { id: 27, text: "Číslo 27 představuje nelehkou káru v životě, kterou člověk musí táhnout. Pokud číslo dvacet sedm vlastníte ve jméně, doporučuji změnit alespoň jedno písmenko." },
        { id: 28, text: "Velmi namáhavé číslo. Člověk s tímto číslem ve vzorci osudu musí vynaložit spoustu úsilí a vůle, aby se dobral k cíli. Čekají na něho překážky, konkurence. Nic není zadarmo." },
        { id: 29, text: "Osudové číslo slabší psychiky. Člověk narozený v tomto dni je náladový, těžko se podrobuje jakýmkoliv omezením. Problematické vztahy většinou končí osaměním. Ale může se narodit skutečný spisovatel, či dramaturg." },
        { id: 30, text: "Bezprostřední komunikace s lidmi, úspěšné číslo. Život přináší šance, nabízí hodně, co může člověk využít. Číslo třicet bojuje a také vyhrává." },
        { id: 31, text: "Oblíbenost je polovinou úspěchu. Hezká tvář polovinou druhou. Člověk narozený pod tímto číslem má vůli i talent zvítězit." },
        { id: 32, text: "Někdy náladovost, ale většinou se v životě hodně podaří. Člověk se vývojem a postupným zráním stává úspěšným." },
        { id: 33, text: "Radost, rodina, děti, smyslnost a touha po lásce většinou bývá naplněna. Potom klid, harmonie." },
        { id: 34, text: "Je třeba překonat problémy a bloky nejen v sobě, ale i v okolí, v rodině. Po zvládnutí se může dostavit pohoda či úspěch. Vše ale závisí na okolnostech. Hodně práce." },
        { id: 35, text: "Vitální a úspěšný člověk. Jeho silou je neposednost a vnitřní zvědavost. Musí se nutně soustředit při jednání s lidmi, vztahy jsou pro něho někdy hodně náročné." },
        { id: 36, text: "Tvůrčí typ, úspěšný, inteligentní. Dobré cesty i životní putování." },
        { id: 37, text: "Talent, hodně přátel, směřování k umění v oblasti zpěvu, malířství či literární tvorbě. Vždy má dobrou oporu nebo zázemí." },
        { id: 38, text: "Sobectví, ego, problémy s uspořádáním vlastního života, hodně aktivity a energie. Inteligence." },
        { id: 39, text: "Úspěšné komunikování s druhými, hodně přátel. Pozor na zklamání, citové problémy, vždy musí člověk něco obětovat. Opatrnost v přátelství neuškodí. Většinou sportovní založení." },
        { id: 40, text: "Číslo ztrát ve všech oblastech. Těžký život s neviditelnými okovy a horšícím se zdravím. Osamělost, nelehké osobní soužití. Důrazně v tomto případě doporučuji změnit jméno či bydliště." },
        { id: 41, text: "Číslo změn, cestování, touha po dobrodružství, po poznání. Plodný život v pohybu." },
        { id: 42, text: "Odpovědnost ve vztazích. Rodné hnízdo představuje jistotu, je nade vše. Sklon starat se o své milované, opečovávat je může vést k nemírnému rozmazlování." },
        { id: 43, text: "Vysoce nepříznivé číslo. Pokud se vyskytne jako součet v datu narození, čeká člověka nelehká cesta životem. Pokud se toto číslo objeví ve jméně, doporučuji změnu! Ušetří se tím spousta smůly a zklamání." },
        { id: 44, text: "Úspěchy, dobré zdraví, spolehlivě a dobře plynoucí život, někdy se lze dobrat i slávy." },
        { id: 45, text: "Touha dokončit své snažení, změny v povaze, panovačnost, někdy zvláštní zásady, které ale druzí nemusejí chápat. Je nutná práce na sobě." },
        { id: 46, text: "Pro člověka s tímto číslem ve vzorce jména platí, že by měl nejdříve uvažovat a teprve potom jednat. Je zde zakódována zbrklost a citovost. Obojím si může znepříjemnit život. Jsou na něho nakládány nelehké povinnosti i odpovědnost." },
        { id: 47, text: "Slabší zdraví, ale celkem normálně plynoucí život. Nositel tohoto čísla ve vzorci by se měl vyvarovat vzteklosti z bezmoci." },
        { id: 48, text: "Více nepřátel než přátel, člověku s tímto číslem ve vzorci osudu budou házeny klacky pod nohy. Chce to najít rovnováhu v meditaci či umění." },
        { id: 49, text: "Nestabilita. Ztráta smyslu pro reálný život. Dobré možná jen v umění, ale život s tímto číslem bude nesmírně těžký. Doporučuji změnu jména nebo čísla domu." },
        { id: 50, text: "Nápaditost, flexibilita, člověk se řídí heslem, že nic není nemožné, vše jde nějak zařídit. Velmi dobré číslo pro současnou dobu." },
        { id: 51, text: "Neklidné číslo. Člověk s tímto číslem ve vzorci osudu touží zároveň po dobrodružství, úspěchu i harmonii. Pozor by si měl dávat nejen v rodinných vztazích." },
        { id: 52, text: "Konflikty, nestálost, někdy až zlo. S tímto číslem je zapotřebí se velmi ovládat. Nelehké partnerské vztahy." },
        { id: 53, text: "Číslo, které přináší spokojenost, žádné velké problémy, nenáročnost. Velmi snášenlivé a harmonické se vztahem k umění a cestování." },
        { id: 54, text: "Opatrnost. Člověk s tímto číslem ve vzorci jména by neměl slibovat nic,  co nemůže splnit. Obtíže, nespokojenost." },
        { id: 55, text: "S tímto číslem ve vzorci může mít člověk pocit, jako by byl jednou nahoře a podruhé dole. To může vést ke zlosti a zklamání. Začíná často několikrát v životě." },
        { id: 56, text: "Problematické osobní vztahy, někdy podezíravost či hádavost, nedůvěra v druhé lidi." },
        { id: 57, text: "Sopečné číslo. Nejdřív vyletí oheň a kameny. Nutno se ovládat. Hodně cest, nejen u nás, ale i po světě." },
        { id: 58, text: "Rizikovost ve všem. Pozor na úrazy, nehody i finanční ztráty. Člověk s tímto číslem ve vzorci by nikdy neměl jít do extrémů, to může být i životu nebezpečné. Pozor na adrenalinové sporty." },
        { id: 59, text: "Časté cesty do zahraničí, dobré kontakty s lidmi, smlouvy a jednání. Nezapomínat ale na opatrnost." },
        { id: 60, text: "Ztížený soukromý život, povinnosti, pocit okovů a vězení. Jako by byl člověk v kleci, neví, co by měl udělat. Připadá mu, že každý jeho krok je zbytečný a bezvýznamný." },
        { id: 61, text: "U člověka s tímto číslem osudu střídají dobrá období horší. Láska je vážný pojem, komplikace. Obvykle delší hledání partnera, protože má na něho vysoké nároky." },
        { id: 62, text: "Dobrý citový život, rodinné zázemí. Spokojenost a láska." },
        { id: 63, text: "Klidné a harmonické číslo, většinou úspěšné." },
        { id: 64, text: "Hodně povinností. Pozor na rychlé a někdy i mylné úsudky. Každý krok je třeba nejdřív dobře promyslet." },
        { id: 65, text: "Silné prožívání všech životních událostí, nervní napětí. Je důležité nalézt klid a rovnováhu v životě." },
        { id: 66, text: "Číslo oddané druhým lidem. Charakterizuje člověka s vlastním světem, introverta. Někdy má těžkosti na duši. Většinou obětuje své cíle ve prospěch druhých." },
        { id: 67, text: "Nebezpečí rozvodů, nespokojenost v osobních vztazích, ale i se sebou samým. Pozor na nehody." },
        { id: 68, text: "Finanční nesnáze, starosti. Nelehké osobní vztahy. Neurózy." },
        { id: 69, text: "Číslo plné vášně a citu. Celkem úspěšné." },
        { id: 70, text: "Magické číslo, které nabádá k ezoterním naukám. Úspěšné a vytrvalé." },
        { id: 71, text: "Překonávání překážek, následné úspěchy." },
        { id: 72, text: "K úspěchu dopomůže někdo druhý, schopnost jednat." },
        { id: 73, text: "Tvůrčí osobnost, v citovém životě mohou nastat potíže. Je to číslo, které v životě něco dokáže." },
        { id: 74, text: "Vývoj tak dobrý, že může přílišným sebevědomím mnoho zkazit. Člověk by neměl ztratit cit a soudnost. Varuji před přílišnou oblibou alkoholu." },
        { id: 75, text: "Cesty a dobrodružství člověka s tímto číslem ve vzorci osudu provázejí občasné úrazy i ztráty hmotných věcí. V životě hrozí také ztráty partnerů." },
        { id: 76, text: "Stejné jako u čísla 67. Nebezpečí rozvodů, nespokojenost v osobních vztazích, ale i se sebou samým. Pozor na nehody." },
        { id: 77, text: "Vysoké napětí. Dvojitý Saturn dokáže napáchat hodně zla. Doporučuji změnit jméno." },
        { id: 78, text: "Číslo obchodníků, kteří mají občas i úspěch. Finance přicházejí pozvolna, ale jistě." },
        { id: 79, text: "Problémové a ztrátové číslo. Hrozí náhlé nehody, komplikace, ztráty." },
        { id: 80, text: "Úspěšnost ve velkolepých plánech. Ctižádost bude uspokojena i finančně." },
        { id: 81, text: "Úspěch přichází často na úkor citu. Člověk s tímto číslem ve vzorci osudu by se neměl nechat zaslepit, jinak by totiž mohl přijít o víc než o peníze." },
        { id: 82, text: "Číslo kariéry. Vzrůst úspěchu a osobnosti." },
        { id: 83, text: "Stejné jako u čísla 38. Sobectví, ego, problémy s uspořádáním vlastního života, hodně aktivity a energie. Inteligence." },
        { id: 84, text: "Číslo pro obchodování a úspěšná jednání ve všech sférách." },
        { id: 85, text: "Stejné jako u čísla 58. Rizikovost ve všem. Pozor na úrazy, nehody i finanční ztráty. Člověk s tímto číslem ve vzorci by nikdy neměl jít do extrémů, to může být i životu nebezpečné. Pozor na adrenalinové sporty." },
        { id: 86, text: "Stejné jako u čísla 68. Finanční nesnáze, starosti. Nelehké osobní vztahy. Neurózy." },
        { id: 87, text: "Stejné jako u čísla 78. Číslo obchodníků, kteří mají občas i úspěch. Finance přicházejí pozvolna, ale jistě." },
        { id: 88, text: "Ohromná energie, které může člověka dovézt buď k maximálnímu vrcholu, nebo naopak úplnému pádu, na dno. Extrémy." },
        { id: 89, text: "Po starostech, kterými si člověk s tímto číslem ve vzorci osudu musí projít, přijde zasloužené uklidnění." },
        { id: 90, text: "Velké srdce touží vítězit pro druhé. Charita a touha pomáhat slabším či bezmocným." },
        { id: 91, text: "Životní zkušenosti budou tvrdé, doporučuji změnu nebo alespoň úpravu jména." },
        { id: 92, text: "Stejné jako u čísla 29. Osudové číslo slabší psychiky. Člověk narozený v tomto dni je náladový, těžko se podrobuje jakýmkoliv omezením. Problematické vztahy většinou končí osaměním. Ale může se narodit skutečný spisovatel, či dramaturg." },
        { id: 93, text: "Sportovní či umělecký duch, stejné jako u čísla 39. Úspěšné komunikování s druhými, hodně přátel. Pozor na zklamání, citové problémy, vždy musí člověk něco obětovat. Opatrnost v přátelství neuškodí. Většinou sportovní založení." },
        { id: 94, text: "Stejné jako u čísla 49. Nestabilita. Ztráta smyslu pro reálný život. Dobré možná jen v umění, ale život s tímto číslem bude nesmírně těžký. Doporučuji změnu jména nebo čísla domu." },
        { id: 95, text: "Stejné jako u čísla 59. Časté cesty do zahraničí, dobré kontakty s lidmi, smlouvy a jednání. Nezapomínat ale na opatrnost." },
        { id: 96, text: "Sobectví, hádky a neschopnost poznat sebe sama." },
        { id: 97, text: "Špatná souřadnice by nemohla vést k dobrému osudu. Doporučuji změnit jméno." },
        { id: 98, text: "S tímto číslem ve vzorci osudu to člověk nebude mít jednoduché. Určitě by neměl propadat euforii, naopak by měl pracovat a pracovat." },
        { id: 99, text: "Nestačí snít s otevřenýma očima, je třeba sny také realizovat." },
        { id: 100, text: "Stovka představuje absolutní Boží ochranu, možnost průniku do jiných dimenzí a práce v nich. Obrovské ambice, které ochraňují i při tzv. karmickém trojúhelníku či kvadrátu." }
];

function reduceNumber(n: number): number {
        if (n < 10) {
                return n;
        }

        let result = 0;
        while (n > 0) {
                result += n % 10;
                n = Math.floor(n / 10);
        }

        console.log(result);


        return reduceNumber(result);
}

function getNumberFromAlphabetChar(ch: string) {
        return alphabetMatrix[ch] || alphabetMatrix[diacritics.remove(ch)] || 0;
}

function getNumberFromAlphabet(name: string) {
        name = name.toUpperCase();
        let rawNumber = 0
        for (let ch of name) {
                rawNumber += getNumberFromAlphabetChar(ch);
        }

        const initialLetterNumber = name.length > 0 ? getNumberFromAlphabetChar(name[0]) : 0;


        console.log("reduce", rawNumber);

        return {
                reducedNumber: reduceNumber(rawNumber), rawNumber, initialLetterNumber
        }
}

function getMessage(n: number) {
        if (!number) {
                return "";
        }
        return n > 1 && n <= 100 ? messages[n - 1].text : ""
}

function createMessage(n: number) {
        return <span>{n}: {getMessage(n)}</span>
}

export class DestinyCross extends React.Component<DestinyCrossProps, DestinyCrossState> {

        private getNames(name: string) {
                return name.split(" ").filter((name) => name.length > 0);
        }

        render() {
                const names = this.getNames(this.props.name); const nameNumbers = names.map((name) => getNumberFromAlphabet(name));
                const destinyNumber = nameNumbers.map(number => number.initialLetterNumber)
                        .reduce((previous, current) => previous + current, 0); const firstCoordinate = nameNumbers.map(number => number.rawNumber)
                                .reduce((previous, current) => previous + current, 0);
                const secondCoordinate = destinyNumber + firstCoordinate;
                const thirdCoordinate = firstCoordinate + names.length * destinyNumber; return (<div>

                        <div> {names.toString()} </div>
                        <div> {nameNumbers.map((x) => JSON.stringify(x)).toString()} </div>
                        <div>{destinyNumber}</div>
                        <div>{createMessage(firstCoordinate)}</div>
                        <div>{createMessage(secondCoordinate)}</div>
                        <div>{createMessage(thirdCoordinate)}</div>
                        <div></div>

                        <svg width="640" height="480" >
                                <g layout-css="height: 30; justifyContent: center; flexDirection: row">
                                        <text textAnchor="middle" fontFamily="serif" fontSize="24" id="svg_3" strokeWidth="0" stroke="#000000" fill="#000000">michaela</text>
                                </g>         <g layout-css="height: 30; justifyContent: center; flexDirection: row">             <text textAnchor="middle" fontFamily="serif" fontSize="24" id="svg_4" strokeWidth="0" stroke="#000000" fill="#000000">jahodova</text>
                                </g>         <line id="svg_1" y2="148" x2="428" y1="150" x1="180" strokeWidth="1" stroke="#000000" fill="none" />
                                <line id="svg_2" y2="198" x2="305" y1="166" x1="305" strokeWidth="1" stroke="#000000" fill="none" />     </svg>     <svg id="chart" style={({ height: "100%", width: "100%", margin: "10px" })} >         <g layout-css="height: 30; justifyContent: center; flexDirection: row" layout-width="460" layout-height="30" transform="translate(0, 0)">
                                        <text layout-css="width: 0;" text-anchor="middle" dy="1em" font-size="20" layout-width="0" layout-height="30" transform="translate(230, 0)">
                                                Awesome Chart Layout Example!</text>
                                </g>         <g layout-css="flex: 1; flexDirection: row; marginLeft: 20" layout-width="440" layout-height="170" transform="translate(20, 30)">             <g layout-css="flex: 1;" className="plotArea" layout-width="360" layout-height="170" transform="translate(0, 0)"><rect fill="#1f77b4"></rect>
                                        <g className="line-series"><path d="M5.145920190589637,146L10.291840381179274,155L15.43776057176891,145L20.583680762358547,73L25.729600952948186,123L41.167361524717094,139L46.31328171530673,140L51.45920190589637,153L56.605122096486,77L61.75104228707564,98L77.18880285884455,120L82.33472304943419,85L87.48064324002382,75L92.62656343061346,65L97.77248362120311,50L113.210244192972,88L118.35616438356163,95L123.50208457415128,110L128.6480047647409,79L133.79392495533057,43L149.23168552709947,49L154.3776057176891,75L159.52352590827874,104L164.66944609886838,94L169.815366289458,81L185.25312686122692,127L190.39904705181655,124L195.54496724240622,116L200.69088743299582,63L205.83680762358549,119L221.2745681953544,138L226.420488385944,114L231.56640857653366,79L236.71232876712327,105L241.85824895771293,115L257.2960095294818,149L262.44192972007147,113L267.58784991066113,124L272.73377010125074,103L277.8796902918404,76L293.3174508636093,90L298.46337105419894,78L303.60929124478855,71L308.7552114353782,125L313.9011316259678,141L329.33889219773675,130L334.4848123883264,113L339.630732578916,123L344.7766527695057,85L349.9225729600953,84"></path></g></g>             <g layout-css="width: 50;" className="axis right" layout-width="50" layout-height="170" transform="translate(360, 0)"><rect fill="#ff7f0e"></rect>
                                                <g className="tick" style={{ opacity: 1 }} transform="translate(0,146)"><line x2="6" y2="0"></line><text dy=".32em" style={{ textAnchor: "start" }} x="9" y="0">100.0</text></g>
                                                <g className="tick" style={{ opacity: 1 }} transform="translate(0,115)"><line x2="6" y2="0"></line><text dy=".32em" style={{ textAnchor: "start" }} x="9" y="0">100.5</text></g>
                                                <g className="tick" style={{ opacity: 1 }} transform="translate(0,85)"><line x2="6" y2="0"></line><text dy=".32em" style={{ textAnchor: "start" }} x="9" y="0">101.0</text></g>
                                                <g className="tick" style={{ opacity: 1 }} transform="translate(0,55)"><line x2="6" y2="0"></line><text dy=".32em" style={{ textAnchor: "start" }} x="9" y="0">101.5</text></g>
                                                <g className="tick" style={{ opacity: 1 }} transform="translate(0,24)"><line x2="6" y2="0"></line><text dy=".32em" style={{ textAnchor: "start" }} x="9" y="0">102.0</text></g>
                                                <path className="domain" d="M6,0H0V170H6"></path></g>             <g layout-css="width: 30; justifyContent: center;" layout-width="30" layout-height="170" transform="translate(410, 0)">                 <g layout-css="height: 0;" layout-width="30" layout-height="0" transform="translate(0, 85)">
                                                        <text transform="rotate(90)">Price</text>
                                                </g>
                                        </g>
                                </g>         <g layout-css="height: 30; flexDirection: row" layout-width="460" layout-height="30" transform="translate(0, 200)">             <g layout-css="flex: 1; marginRight: 80; marginLeft: 20" className="axis bottom" layout-width="360" layout-height="30" transform="translate(20, 0)"><rect fill="#2ca02c"></rect>
                                        <g className="tick" style={{ opacity: 1 }} transform="translate(0,0)"><line y2="6" x2="0"></line><text dy=".71em" style={{ textAnchor: "middle" }} y="9" x="0">Feb 02</text></g>
                                        <g className="tick" style={{ opacity: 1 }} transform="translate(36.02144133412746,0)"><line y2="6" x2="0"></line><text dy=".71em" style={{ textAnchor: "middle" }} y="9" x="0">Feb 09</text></g>
                                        <g className="tick" style={{ opacity: 1 }} transform="translate(72.04288266825492,0)"><line y2="6" x2="0"></line><text dy=".71em" style={{ textAnchor: "middle" }} y="9" x="0">Feb 16</text></g>
                                        <g className="tick" style={{ opacity: 1 }} transform="translate(108.06432400238238,0)"><line y2="6" x2="0"></line><text dy=".71em" style={{ textAnchor: "middle" }} y="9" x="0">Feb 23</text></g>
                                        <g className="tick" style={{ opacity: 1 }} transform="translate(144.08576533650984,0)"><line y2="6" x2="0"></line><text dy=".71em" style={{ textAnchor: "middle" }} y="9" x="0">Mar 02</text></g>
                                        <g className="tick" style={{ opacity: 1 }} transform="translate(180.10720667063725,0)"><line y2="6" x2="0"></line><text dy=".71em" style={{ textAnchor: "middle" }} y="9" x="0">Mar 09</text></g>
                                        <g className="tick" style={{ opacity: 1 }} transform="translate(216.12864800476476,0)"><line y2="6" x2="0"></line><text dy=".71em" style={{ textAnchor: "middle" }} y="9" x="0">Mar 16</text></g>
                                        <g className="tick" style={{ opacity: 1 }} transform="translate(252.1500893388922,0)"><line y2="6" x2="0"></line><text dy=".71em" style={{ textAnchor: "middle" }} y="9" x="0">Mar 23</text></g>
                                        <g className="tick" style={{ opacity: 1 }} transform="translate(288.1715306730197,0)"><line y2="6" x2="0"></line><text dy=".71em" style={{ textAnchor: "middle" }} y="9" x="0">Mar 30</text></g>                 <g className="tick" style={{ opacity: 1 }} transform="translate(323.9785586658725,0)"><line y2="6" x2="0"></line><text dy=".71em" style={{ textAnchor: "middle" }} y="9" x="0">Apr 06</text></g>
                                        <g className="tick" style={{ opacity: 1 }} transform="translate(360,0)"><line y2="6" x2="0"></line><text dy=".71em" style={{ textAnchor: "middle" }} y="9" x="0">Apr 13</text></g>
                                        <path className="domain" d="M0,6V0H360V6"></path></g>
                                </g>         <g layout-css="height: 30; justifyContent: center; flexDirection: row" layout-width="460" layout-height="30" transform="translate(0, 230)">
                                        <text layout-css="width: 0; marginRight: 80" text-anchor="middle" dy="1em" layout-width="0" layout-height="30" transform="translate(190, 0)">Date</text>
                                </g>
                        </svg>
                </div >);

        }
}
