export enum MessageType {
    negative,
    neutral,
    positive
}

let messages = [
    { id: 0, type: MessageType.neutral, text: "" },
    { id: 1, type: MessageType.neutral, text: "Charakterizuje osobnost člověka, jeho 'já', projevuje se touha vést a být první. Pokud se toto číslo objeví v pozici některé světové strany, člověk má šanci zde vyniknout jako osobnost. Bude prakticky nepřehlédnutelný." },
    { id: 2, type: MessageType.neutral, text: "Vztahy k druhým lidem, dualita, snášenlivost, diplomacie. Soudržnost s přáteli. Nejsou problémy s komunikací, s navazováním nových kontaktů." },
    { id: 3, type: MessageType.neutral, text: "Umělecké ambice, ale také možná přelétavost ve všem. Vnímáme, že se kolem nás pořád něco děje. Nenudíme se. Rychle může přicházet štěstí, ale na druhou stranu si člověk neštěstí může člověk přivodit svou nestálostí." },
    { id: 4, type: MessageType.neutral, text: "Fyzická stránka života, materiálno a konservatismus. Člověk s tímto číslem je oběma nohama na zemi. Pokud má toto číslo člověk v pozici některé světové strany, bude tam pravděpodobně hodně podsaditý, ale také klidný. Bude si schraňovat svůj majetek. Určitě bude víc dbát na peníze než na umění." },
    { id: 5, type: MessageType.neutral, text: "Pohyb, aktivita, flexibilita, někdy také nervní povaha. Člověk s tímto číslem bude mít spíše sklony k hubnutí. Tělesná konstituce bude křehčí, bude plný nových myšlenek, které mohou mít celkově obrovský rozsah." },
    { id: 6, type: MessageType.neutral, text: "Klid, láska a harmonie. Někdy lidé s tímto číslem mohou mít problémy s obezitou. Ovšem čistá šestka představuje nádheru, je to tzv. andělské číslo." },
    { id: 7, type: MessageType.neutral, text: "Touha po nepoznaném, ztížená pozice, někdy mysticismus. Člověk se mění v duchovním směru. Ovšem pokud neslyší vnitřní volání a jde pouze za majetkem, trpí. Nedaří se mu ve firmě. Kdo chce podnikat, neměl by jít na tu světovou stranu, kde má ve vzorci osudu sedmičku." },
    { id: 8, type: MessageType.neutral, text: "Materialismus, otročení zvykům, pohyb v kruhu, někdy bludném. Člověk prochází neustále se opakujícími cestami. Opakuje stejné chyby, prožívá komplikované vztahy se stále stejnými partnery." },
    { id: 9, type: MessageType.neutral, text: "Vítězství. Dosažení cíle, konec všeho špatného a začátek nového. Splnění přání." },
    { id: 10, type: MessageType.neutral, text: "Ztížené emoce nebo orientace v citech, nula působí rušivě." },
    { id: 11, type: MessageType.neutral, text: "Zdvojené ego, které může být využito i v dobrém." },
    { id: 12, type: MessageType.neutral, text: "Obětavost, člověk se k cíli dostává přes překážky. Pokud se ve vzorci objeví dvě a více dvanáctek, člověk inklinuje k oběti pro druhé až v extrémní podobě, časté jsou sebevraždy." },
    { id: 13, type: MessageType.neutral, text: "Proměna myšlenky v čin, flexibilita ve všem, co člověka baví." },
    { id: 14, type: MessageType.neutral, text: "Omezení, nervnost." },
    { id: 15, type: MessageType.neutral, text: "Toto číslo představuje doslova směr hlavou proti zdi. Zahrnuje vášeň a nadšení, které je třeba brzdit. City převládají nad logikou i rozumem. Nedoporučuji pěstovat závislosti na ničem, ani na nikom. Pozor na zdraví. Nelehké osobní vztahy. Touha po harmonii je často brzděna." },
    { id: 16, type: MessageType.negative, text: "Rozporuplné číslo. Extrémy, velká námaha dobrat se ke štěstí. Přemýšlivost, ale je třeba nastoupit odlišný vývoj. Nehody, rizika, pády či osamění se střídají stejně jako den a noc. Pokud má člověk i špatné datum narození, určitě doporučuji změnu jména." },
    { id: 17, type: MessageType.neutral, text: "V tomto čísle jsme odkázáni většinou sami na sebe. Ale skrývá v sobě také obrovskou výkonnost, touhu uskutečňovat, budovat. Člověk se může dobrat slávy, ale i závisti. Jen je nutné zachovávat rovnováhu, nejít do extrémů." },
    { id: 18, type: MessageType.neutral, text: "Citlivost, snivost, jasnovidectví. Někdy člověk může sklouznout až k nereálným iluzím. Měl by pracovat na sobě, jinak bude zklamán životem i lidmi. Najít vhodného partnera nebude lehké. Ale poměrně snadno lze člověka s osmnáctkou ošálit, pozor na to." },
    { id: 19, type: MessageType.neutral, text: "Aktivita a spousta energie. Člověk s tímto číslem má rysy vůdce, je schopen lidi někam dovést. Jeho osud určuje tvořivá energie. Má cit pro krásu. Provázejí ho úspěchy, ale na druhou stranu je třeba dát pozor na sobectví." },
    { id: 20, type: MessageType.neutral, text: "Ztížená dvojka. Ke ztížení dochází vždy přítomností nuly. Člověk s dvacítkou ve vzorci osudu je citlivý, chápe druhé, ale sám prochází nelehkým vývojem. Vnímá osobní rozporuplnost. Obvykle trvá dlouho, než člověk někam dojde, než se k něčemu dopracuje. Životní pouť je doprovázena také šrámy na duši." },
    { id: 21, type: MessageType.neutral, text: "Snadná komunikace s lidmi, cestování. Škodu může přivodit roztržitost. Člověk s tímto číslem ve vzorci osudu si dokáže dobře nalinkovat svůj život, má dobré, reálné plány. Jen někdy je třeba zvolit těžší cestu ke štěstí." },
    { id: 22, type: MessageType.neutral, text: "Mohutná energie osobnosti, která může být použita k dobru i zlu. Kariéra, chladná logika, intuice je překřičena rozumem. Člověk ale má zůstat člověkem. Peníze nejsou všechno. Toto číslo je jako supernova. Osobnost může zničit člověka samého. Měl by se naučit klidu a lásce, chvíli se zastavit a pomoci slabším." },
    { id: 23, type: MessageType.neutral, text: "Člověk s tímto číslem postupuje, je úspěšný. Zahrnuje spoustu zájmů. Pohyblivost. Objevuje-li se ve vzorci osudu vícekrát, znamená ale už nerovnost, často i psychickou poruchu." },
    { id: 24, type: MessageType.neutral, text: "Láska, výbušnost zkrotí sám život, potom následuje harmonie a touha po rodinném krbu, obětavost." },
    { id: 25, type: MessageType.neutral, text: "Někdy těžkosti, stagnace a nerozhodnost. Rozený lékař či pečovatelka. Je vhodné zaměřit studium tímto směrem. Ovšem vlastní zdraví je slabší." },
    { id: 26, type: MessageType.neutral, text: "Touha po hmotných statcích či slávě může přivolávat neporozumění. Nehnat nic do extrémů a vše bude v pořádku. Vyplácí se myslet na druhé." },
    { id: 27, type: MessageType.neutral, text: "Číslo 27 představuje nelehkou káru v životě, kterou člověk musí táhnout. Pokud číslo dvacet sedm vlastníte ve jméně, doporučuji změnit alespoň jedno písmenko." },
    { id: 28, type: MessageType.neutral, text: "Velmi namáhavé číslo. Člověk s tímto číslem ve vzorci osudu musí vynaložit spoustu úsilí a vůle, aby se dobral k cíli. Čekají na něho překážky, konkurence. Nic není zadarmo." },
    { id: 29, type: MessageType.neutral, text: "Osudové číslo slabší psychiky. Člověk narozený v tomto dni je náladový, těžko se podrobuje jakýmkoliv omezením. Problematické vztahy většinou končí osaměním. Ale může se narodit skutečný spisovatel, či dramaturg." },
    { id: 30, type: MessageType.neutral, text: "Bezprostřední komunikace s lidmi, úspěšné číslo. Život přináší šance, nabízí hodně, co může člověk využít. Číslo třicet bojuje a také vyhrává." },
    { id: 31, type: MessageType.neutral, text: "Oblíbenost je polovinou úspěchu. Hezká tvář polovinou druhou. Člověk narozený pod tímto číslem má vůli i talent zvítězit." },
    { id: 32, type: MessageType.neutral, text: "Někdy náladovost, ale většinou se v životě hodně podaří. Člověk se vývojem a postupným zráním stává úspěšným." },
    { id: 33, type: MessageType.neutral, text: "Radost, rodina, děti, smyslnost a touha po lásce většinou bývá naplněna. Potom klid, harmonie." },
    { id: 34, type: MessageType.neutral, text: "Je třeba překonat problémy a bloky nejen v sobě, ale i v okolí, v rodině. Po zvládnutí se může dostavit pohoda či úspěch. Vše ale závisí na okolnostech. Hodně práce." },
    { id: 35, type: MessageType.neutral, text: "Vitální a úspěšný člověk. Jeho silou je neposednost a vnitřní zvědavost. Musí se nutně soustředit při jednání s lidmi, vztahy jsou pro něho někdy hodně náročné." },
    { id: 36, type: MessageType.neutral, text: "Tvůrčí typ, úspěšný, inteligentní. Dobré cesty i životní putování." },
    { id: 37, type: MessageType.neutral, text: "Talent, hodně přátel, směřování k umění v oblasti zpěvu, malířství či literární tvorbě. Vždy má dobrou oporu nebo zázemí." },
    { id: 38, type: MessageType.neutral, text: "Sobectví, ego, problémy s uspořádáním vlastního života, hodně aktivity a energie. Inteligence." },
    { id: 39, type: MessageType.neutral, text: "Úspěšné komunikování s druhými, hodně přátel. Pozor na zklamání, citové problémy, vždy musí člověk něco obětovat. Opatrnost v přátelství neuškodí. Většinou sportovní založení." },
    { id: 40, type: MessageType.negative, text: "Číslo ztrát ve všech oblastech. Těžký život s neviditelnými okovy a horšícím se zdravím. Osamělost, nelehké osobní soužití. Důrazně v tomto případě doporučuji změnit jméno či bydliště." },
    { id: 41, type: MessageType.neutral, text: "Číslo změn, cestování, touha po dobrodružství, po poznání. Plodný život v pohybu." },
    { id: 42, type: MessageType.neutral, text: "Odpovědnost ve vztazích. Rodné hnízdo představuje jistotu, je nade vše. Sklon starat se o své milované, opečovávat je může vést k nemírnému rozmazlování." },
    { id: 43, type: MessageType.negative, text: "Vysoce nepříznivé číslo. Pokud se vyskytne jako součet v datu narození, čeká člověka nelehká cesta životem. Pokud se toto číslo objeví ve jméně, doporučuji změnu! Ušetří se tím spousta smůly a zklamání." },
    { id: 44, type: MessageType.positive, text: "Úspěchy, dobré zdraví, spolehlivě a dobře plynoucí život, někdy se lze dobrat i slávy." },
    { id: 45, type: MessageType.neutral, text: "Touha dokončit své snažení, změny v povaze, panovačnost, někdy zvláštní zásady, které ale druzí nemusejí chápat. Je nutná práce na sobě." },
    { id: 46, type: MessageType.neutral, text: "Pro člověka s tímto číslem ve vzorce jména platí, že by měl nejdříve uvažovat a teprve potom jednat. Je zde zakódována zbrklost a citovost. Obojím si může znepříjemnit život. Jsou na něho nakládány nelehké povinnosti i odpovědnost." },
    { id: 47, type: MessageType.neutral, text: "Slabší zdraví, ale celkem normálně plynoucí život. Nositel tohoto čísla ve vzorci by se měl vyvarovat vzteklosti z bezmoci." },
    { id: 48, type: MessageType.neutral, text: "Více nepřátel než přátel, člověku s tímto číslem ve vzorci osudu budou házeny klacky pod nohy. Chce to najít rovnováhu v meditaci či umění." },
    { id: 49, type: MessageType.negative, text: "Nestabilita. Ztráta smyslu pro reálný život. Dobré možná jen v umění, ale život s tímto číslem bude nesmírně těžký. Doporučuji změnu jména nebo čísla domu." },
    { id: 50, type: MessageType.neutral, text: "Nápaditost, flexibilita, člověk se řídí heslem, že nic není nemožné, vše jde nějak zařídit. Velmi dobré číslo pro současnou dobu." },
    { id: 51, type: MessageType.neutral, text: "Neklidné číslo. Člověk s tímto číslem ve vzorci osudu touží zároveň po dobrodružství, úspěchu i harmonii. Pozor by si měl dávat nejen v rodinných vztazích." },
    { id: 52, type: MessageType.neutral, text: "Konflikty, nestálost, někdy až zlo. S tímto číslem je zapotřebí se velmi ovládat. Nelehké partnerské vztahy." },
    { id: 53, type: MessageType.neutral, text: "Číslo, které přináší spokojenost, žádné velké problémy, nenáročnost. Velmi snášenlivé a harmonické se vztahem k umění a cestování." },
    { id: 54, type: MessageType.neutral, text: "Opatrnost. Člověk s tímto číslem ve vzorci jména by neměl slibovat nic,  co nemůže splnit. Obtíže, nespokojenost." },
    { id: 55, type: MessageType.neutral, text: "S tímto číslem ve vzorci může mít člověk pocit, jako by byl jednou nahoře a podruhé dole. To může vést ke zlosti a zklamání. Začíná často několikrát v životě." },
    { id: 56, type: MessageType.neutral, text: "Problematické osobní vztahy, někdy podezíravost či hádavost, nedůvěra v druhé lidi." },
    { id: 57, type: MessageType.neutral, text: "Sopečné číslo. Nejdřív vyletí oheň a kameny. Nutno se ovládat. Hodně cest, nejen u nás, ale i po světě." },
    { id: 58, type: MessageType.neutral, text: "Rizikovost ve všem. Pozor na úrazy, nehody i finanční ztráty. Člověk s tímto číslem ve vzorci by nikdy neměl jít do extrémů, to může být i životu nebezpečné. Pozor na adrenalinové sporty." },
    { id: 59, type: MessageType.neutral, text: "Časté cesty do zahraničí, dobré kontakty s lidmi, smlouvy a jednání. Nezapomínat ale na opatrnost." },
    { id: 60, type: MessageType.neutral, text: "Ztížený soukromý život, povinnosti, pocit okovů a vězení. Jako by byl člověk v kleci, neví, co by měl udělat. Připadá mu, že každý jeho krok je zbytečný a bezvýznamný." },
    { id: 61, type: MessageType.neutral, text: "U člověka s tímto číslem osudu střídají dobrá období horší. Láska je vážný pojem, komplikace. Obvykle delší hledání partnera, protože má na něho vysoké nároky." },
    { id: 62, type: MessageType.neutral, text: "Dobrý citový život, rodinné zázemí. Spokojenost a láska." },
    { id: 63, type: MessageType.neutral, text: "Klidné a harmonické číslo, většinou úspěšné." },
    { id: 64, type: MessageType.neutral, text: "Hodně povinností. Pozor na rychlé a někdy i mylné úsudky. Každý krok je třeba nejdřív dobře promyslet." },
    { id: 65, type: MessageType.neutral, text: "Silné prožívání všech životních událostí, nervní napětí. Je důležité nalézt klid a rovnováhu v životě." },
    { id: 66, type: MessageType.neutral, text: "Číslo oddané druhým lidem. Charakterizuje člověka s vlastním světem, introverta. Někdy má těžkosti na duši. Většinou obětuje své cíle ve prospěch druhých." },
    { id: 67, type: MessageType.neutral, text: "Nebezpečí rozvodů, nespokojenost v osobních vztazích, ale i se sebou samým. Pozor na nehody." },
    { id: 68, type: MessageType.neutral, text: "Finanční nesnáze, starosti. Nelehké osobní vztahy. Neurózy." },
    { id: 69, type: MessageType.neutral, text: "Číslo plné vášně a citu. Celkem úspěšné." },
    { id: 70, type: MessageType.neutral, text: "Magické číslo, které nabádá k ezoterním naukám. Úspěšné a vytrvalé." },
    { id: 71, type: MessageType.neutral, text: "Překonávání překážek, následné úspěchy." },
    { id: 72, type: MessageType.neutral, text: "K úspěchu dopomůže někdo druhý, schopnost jednat." },
    { id: 73, type: MessageType.neutral, text: "Tvůrčí osobnost, v citovém životě mohou nastat potíže. Je to číslo, které v životě něco dokáže." },
    { id: 74, type: MessageType.neutral, text: "Vývoj tak dobrý, že může přílišným sebevědomím mnoho zkazit. Člověk by neměl ztratit cit a soudnost. Varuji před přílišnou oblibou alkoholu." },
    { id: 75, type: MessageType.neutral, text: "Cesty a dobrodružství člověka s tímto číslem ve vzorci osudu provázejí občasné úrazy i ztráty hmotných věcí. V životě hrozí také ztráty partnerů." },
    { id: 76, type: MessageType.neutral, text: "Stejné jako u čísla 67. Nebezpečí rozvodů, nespokojenost v osobních vztazích, ale i se sebou samým. Pozor na nehody." },
    { id: 77, type: MessageType.negative, text: "Vysoké napětí. Dvojitý Saturn dokáže napáchat hodně zla. Doporučuji změnit jméno." },
    { id: 78, type: MessageType.neutral, text: "Číslo obchodníků, kteří mají občas i úspěch. Finance přicházejí pozvolna, ale jistě." },
    { id: 79, type: MessageType.neutral, text: "Problémové a ztrátové číslo. Hrozí náhlé nehody, komplikace, ztráty." },
    { id: 80, type: MessageType.neutral, text: "Úspěšnost ve velkolepých plánech. Ctižádost bude uspokojena i finančně." },
    { id: 81, type: MessageType.neutral, text: "Úspěch přichází často na úkor citu. Člověk s tímto číslem ve vzorci osudu by se neměl nechat zaslepit, jinak by totiž mohl přijít o víc než o peníze." },
    { id: 82, type: MessageType.neutral, text: "Číslo kariéry. Vzrůst úspěchu a osobnosti." },
    { id: 83, type: MessageType.neutral, text: "Stejné jako u čísla 38. Sobectví, ego, problémy s uspořádáním vlastního života, hodně aktivity a energie. Inteligence." },
    { id: 84, type: MessageType.neutral, text: "Číslo pro obchodování a úspěšná jednání ve všech sférách." },
    { id: 85, type: MessageType.neutral, text: "Stejné jako u čísla 58. Rizikovost ve všem. Pozor na úrazy, nehody i finanční ztráty. Člověk s tímto číslem ve vzorci by nikdy neměl jít do extrémů, to může být i životu nebezpečné. Pozor na adrenalinové sporty." },
    { id: 86, type: MessageType.neutral, text: "Stejné jako u čísla 68. Finanční nesnáze, starosti. Nelehké osobní vztahy. Neurózy." },
    { id: 87, type: MessageType.neutral, text: "Stejné jako u čísla 78. Číslo obchodníků, kteří mají občas i úspěch. Finance přicházejí pozvolna, ale jistě." },
    { id: 88, type: MessageType.neutral, text: "Ohromná energie, které může člověka dovézt buď k maximálnímu vrcholu, nebo naopak úplnému pádu, na dno. Extrémy." },
    { id: 89, type: MessageType.neutral, text: "Po starostech, kterými si člověk s tímto číslem ve vzorci osudu musí projít, přijde zasloužené uklidnění." },
    { id: 90, type: MessageType.neutral, text: "Velké srdce touží vítězit pro druhé. Charita a touha pomáhat slabším či bezmocným." },
    { id: 91, type: MessageType.negative, text: "Životní zkušenosti budou tvrdé, doporučuji změnu nebo alespoň úpravu jména." },
    { id: 92, type: MessageType.neutral, text: "Stejné jako u čísla 29. Osudové číslo slabší psychiky. Člověk narozený v tomto dni je náladový, těžko se podrobuje jakýmkoliv omezením. Problematické vztahy většinou končí osaměním. Ale může se narodit skutečný spisovatel, či dramaturg." },
    { id: 93, type: MessageType.neutral, text: "Sportovní či umělecký duch, stejné jako u čísla 39. Úspěšné komunikování s druhými, hodně přátel. Pozor na zklamání, citové problémy, vždy musí člověk něco obětovat. Opatrnost v přátelství neuškodí. Většinou sportovní založení." },
    { id: 94, type: MessageType.negative, text: "Stejné jako u čísla 49. Nestabilita. Ztráta smyslu pro reálný život. Dobré možná jen v umění, ale život s tímto číslem bude nesmírně těžký. Doporučuji změnu jména nebo čísla domu." },
    { id: 95, type: MessageType.neutral, text: "Stejné jako u čísla 59. Časté cesty do zahraničí, dobré kontakty s lidmi, smlouvy a jednání. Nezapomínat ale na opatrnost." },
    { id: 96, type: MessageType.neutral, text: "Sobectví, hádky a neschopnost poznat sebe sama." },
    { id: 97, type: MessageType.negative, text: "Špatná souřadnice by nemohla vést k dobrému osudu. Doporučuji změnit jméno." },
    { id: 98, type: MessageType.neutral, text: "S tímto číslem ve vzorci osudu to člověk nebude mít jednoduché. Určitě by neměl propadat euforii, naopak by měl pracovat a pracovat." },
    { id: 99, type: MessageType.neutral, text: "Nestačí snít s otevřenýma očima, je třeba sny také realizovat." },
    { id: 100, type: MessageType.positive, text: "Stovka představuje absolutní Boží ochranu, možnost průniku do jiných dimenzí a práce v nich. Obrovské ambice, které ochraňují i při tzv. karmickém trojúhelníku či kvadrátu." }
];

export function getMessage(n: number) {
    return n >= 0 && n < messages.length ? messages[n] : messages[0]
}