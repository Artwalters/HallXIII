export interface ServiceData {
  id: string;
  category: string;
  title: string;
  description: string;
  benefits: string[];
}

export const servicesData: ServiceData[] = [
  {
    id: 'training-begeleiding',
    category: 'Training Begeleiding',
    title: 'Zelfstandig trainen met ondersteuning',
    description: 'Bij Trainingsbegeleiding krijg je alles wat je nodig hebt om zelfstandig aan de slag te gaan, mét de steun van jouw persoonlijke coach. Je ontvangt een op maat gemaakt trainingsplan dat aansluit op jouw niveau, wensen, behoeften en doelen. We starten met een uitgebreide intake waarin we precies in kaart brengen waar je nu staat en waar je naartoe wilt. Op basis hiervan stellen we een trainingsschema samen dat perfect bij jou past. Of je nu wilt afvallen, spiermassa wilt opbouwen, sterker wilt worden of gewoon fitter wilt worden: wij zorgen ervoor dat je trainingen effectief en efficiënt zijn. Tijdens je traject blijf je in contact met je coach via wekelijkse check-ins. Hierin bespreken we je voortgang, passen we waar nodig het schema aan en zorgen we ervoor dat je gemotiveerd blijft. Je traint zelfstandig, maar je staat er nooit alleen voor.',
    benefits: [
      'Uitgebreide intake en doelstellingen',
      'Persoonlijk trainingsplan op maat',
      'Wekelijkse check-ins met je coach',
      'Aanpassingen op basis van voortgang',
      'Toegang tot de gym tijdens openingstijden',
      'Online begeleiding en ondersteuning',
      'Maandelijkse voortgangsevaluaties',
      'Video-instructies van oefeningen',
      'Toegang tot onze online community',
      'Periodieke trainingsplan updates',
      'Basisvoedingsadvies',
      'Motivatie en accountability'
    ]
  },
  {
    id: 'open-gym',
    category: 'Open Gym',
    title: 'Train wanneer het jou uitkomt',
    description: 'Met een Open Gym abonnement heb je onbeperkte toegang tot onze volledig uitgeruste gym. Train op jouw eigen tempo, volg je eigen schema en gebruik alle faciliteiten die we te bieden hebben. Perfect voor de zelfstandige sporter die weet wat hij of zij wil. Onze gym is uitgerust met alles wat je nodig hebt: van free weights tot machines, van cardio-apparatuur tot functionele trainingstools. Je kunt komen en gaan wanneer het jou uitkomt binnen onze ruime openingstijden. Geen vaste afspraken, geen druk, gewoon jouw training wanneer het jou past. De gym biedt een inspirerende omgeving waar gemotiveerde sporters samenkomen. Of je nu een ochtendmens bent die graag vroeg start, of liever\'s avonds na je werk komt: er is altijd ruimte voor jou. Met je Open Gym membership maak je onderdeel uit van een community die elkaar vooruit helpt en motiveert.',
    benefits: [
      'Onbeperkte toegang tijdens openingstijden',
      'Volledige beschikking over alle apparatuur',
      'Toegang tot kleedkamers en douches',
      'Gratis wifi en parkeren',
      'Community van gemotiveerde sporters',
      'Optioneel: persoonlijke locker',
      'Moderne cardio-apparatuur',
      'Uitgebreid aanbod free weights',
      'Functionele trainingszone',
      'Veilige en schone omgeving',
      'Flexibele openingstijden',
      'Geen bindingsperiode'
    ]
  },
  {
    id: 'personal-training',
    category: 'Personal Training',
    title: 'Één-op-één trainen onder begeleiding',
    description: 'Bij Personal Training ligt de focus volledig op één-op-één trainen onder begeleiding van jouw coach. Alle aandacht gaat naar jou: hoe jij traint, hoe jij beweegt en hoe jij het meeste uit jezelf haalt. Je coach zorgt ervoor dat je oefeningen altijd correct en veilig worden uitgevoerd. Tijdens elke sessie staat jouw coach naast je om je door de training te begeleiden. Dit betekent dat elk aspect van je training wordt gemonitord en waar nodig bijgestuurd. Van de warming-up tot de cooling-down, van techniek tot intensiteit: alles wordt nauwkeurig in de gaten gehouden. Dit zorgt niet alleen voor veiligheid, maar ook voor maximale effectiviteit. Je trainingsplan wordt speciaal voor jou ontworpen en wordt voortdurend aangepast op basis van jouw voortgang en feedback. Geen generieke schema\'s, maar een volledig gepersonaliseerde aanpak die past bij jouw lichaam, jouw doelen en jouw leven.',
    benefits: [
      'Persoonlijke begeleiding tijdens elke sessie',
      'Trainingsplan volledig op maat',
      'Directe feedback en correctie',
      'Flexibele planning afgestemd op jouw agenda',
      'Maximale focus en motivatie',
      'Snellere resultaten door individuele aandacht',
      'Techniekscholing en bewegingsanalyse',
      'Voedingsadvies op maat',
      'Continue monitoring van je voortgang',
      'Aanpassing van oefeningen bij blessures',
      'Mentale coaching en mindset training',
      'Toegang tot exclusieve trainingsmomenten'
    ]
  },
  {
    id: 'leefstijl-coaching',
    category: 'Leefstijl Coaching',
    title: 'Het aanpakken van jouw leefstijl',
    description: 'Leefstijlcoaching gaat verder dan alleen trainen en voeding. Met dit abonnement werk je aan álle leefstijlfactoren die invloed hebben op jouw gezondheid en prestaties: stress, slaap, herstel, je privéleven én natuurlijk beweging en voeding. We nemen de tijd om jouw hele levensstijl in kaart te brengen. Hoe ziet je dagelijkse routine eruit? Hoe ga je om met stress? Hoe is je slaapkwaliteit? Wat eet je en wanneer? Al deze factoren spelen een cruciale rol in hoe je je voelt en presteert. Samen stellen we een plan op dat niet alleen gericht is op korte termijn resultaten, maar op duurzame verandering. We werken aan gewoontes die je een leven lang kunt volhouden. Kleine stappen die samen een groot verschil maken. Je coach begeleidt je bij elke stap en helpt je obstakels te overwinnen.',
    benefits: [
      'Uitgebreide intake en analyse',
      'Persoonlijk leefstijlplan op maat',
      'Wekelijkse check-ins met je coach',
      'Focus op stress, slaap en herstel',
      'Voedings- en bewegingsadvies',
      'Aanpasbaar schema naarmate je vordert',
      'Toegang tot de gym tijdens openingstijden',
      'Stressmanagement technieken',
      'Slaapoptimalisatie strategieën',
      'Educatie over gezonde gewoontes',
      'Ondersteuning bij gedragsverandering',
      'Maandelijkse evaluaties en bijsturing'
    ]
  },
  {
    id: 'performance-coaching',
    category: 'Performance Coaching',
    title: 'Haal het maximale uit je prestaties',
    description: 'Bij Performance Begeleiding staat alles in het teken van het verbeteren van jouw prestaties. Of dit nu sportspecifiek is, powerlifting, krachtsport of conditietraining: het maakt niet uit. Afhankelijk van jouw niveau, doelstellingen en wensen stellen we de programmering samen die het beste bij jou past. Denk bijvoorbeeld aan een schema op basis van RIR of RPE. We werken met de nieuwste trainingsmethodieken en wetenschappelijke inzichten om jouw prestaties naar een hoger niveau te tillen. Of je nu meedoet aan wedstrijden, een PR wilt halen of gewoon sterker wilt worden: we zorgen ervoor dat je training optimaal is afgestemd. Je krijgt niet alleen een trainingsschema, maar een complete performance plan waarin training, voeding, herstel en mentale voorbereiding samenkomen. We monitoren je voortgang nauwkeurig en passen je programma wekelijks aan op basis van hoe je reageert op de training.',
    benefits: [
      'Uitgebreide intake',
      'Persoonlijk leefstijlplan én trainingsplan op maat',
      'Eenmalige technieksessie met uitleg van de oefeningen',
      'Wekelijks online contactmoment met je coach',
      'Feedback op beeldmateriaal van je trainingen',
      'Plan wordt wekelijks bijgesteld en doorgeprogrammeerd',
      'Maandelijkse fysieke evaluatie inclusief voortgangsmetingen',
      'Onbeperkte vrije toegang tot de gym binnen de openingstijden',
      'Periodisatie en peak planning',
      'Competitie voorbereiding',
      'Krachtmetingen en testing',
      'Supplementatie advies',
      'Herstel monitoring en optimalisatie',
      'Videoanalyse van techniek'
    ]
  },
  {
    id: 'leefstijl-coaching-2',
    category: 'Leefstijl Coaching',
    title: 'Holistische benadering van gezondheid',
    description: 'Leefstijlcoaching biedt een complete aanpak waarbij we kijken naar jou als geheel. We richten ons niet alleen op fysieke training, maar ook op voeding, mentale veerkracht, slaap en stressmanagement. Samen bouwen we aan een duurzame, gezonde levensstijl die past bij jouw persoonlijke situatie en ambities. Bij deze vorm van coaching krijg je toegang tot alle aspecten die bijdragen aan een gezond en energiek leven. We helpen je niet alleen met wat je in de gym doet, maar ook met hoe je leeft buiten de sportschool. Van je dagelijkse routines tot je sociale gewoontes: alles komt aan bod. Het doel is om een balans te vinden die voor jou werkt, waarbij je je vitaal voelt en doelen bereikt zonder dat het ten koste gaat van je levenskwaliteit. We begeleiden je stap voor stap naar een levensstijl die je kunt volhouden, omdat het aanvoelt als een natuurlijk onderdeel van wie je bent.',
    benefits: [
      'Holistische intake en doelstellingen',
      'Maatwerk leefstijlplan inclusief voeding',
      'Wekelijkse coaching sessies',
      'Focus op duurzame gewoontes',
      'Mentale coaching en mindset training',
      'Toegang tot alle gym faciliteiten',
      'Maandelijkse voortgangsevaluaties',
      'Stressreductie en energiemanagement',
      'Slaapoptimalisatie programma',
      'Werk-leven balans coaching',
      'Sociale steun en accountability',
      'Gezondheidsrisico analyse en preventie',
      'Leefstijl educatie en workshops'
    ]
  },
  {
    id: 'fysiotherapie',
    category: 'Fysiotherapie',
    title: 'Herstel en preventie zonder beperkingen',
    description: 'Bij MAE Fysiotherapie kijken we anders naar revalidatie. Waar veel zorgprofessionals vooral beperkingen opleggen, geloven wij in een doelgerichte, persoonlijke en stapsgewijze aanpak. Het doel: jou weer laten functioneren zonder belemmeringen. We werken met bewezen behandelmethoden en richten ons op het herstel van blessures, maar ook op het voorkomen ervan. Of je nu last hebt van een acute blessure, chronische klachten of gewoon wilt werken aan preventie: we stellen een behandelplan op dat past bij jouw situatie. Onze fysiotherapeuten werken nauw samen met de coaches in de gym, zodat je behandeling en training optimaal op elkaar aansluiten. We geloven in een actieve aanpak waarbij je zelf een belangrijke rol speelt in je herstel. Door middel van hands-on therapie, oefenprogramma\'s en educatie helpen we je weer terug te keren naar wat je graag doet, of dat nu sport is of dagelijkse activiteiten.',
    benefits: [
      'Grondige intake en bewegingsanalyse',
      'Persoonlijk behandelplan',
      'Hands-on therapie en oefenprogramma',
      'Preventie en hersteladvies',
      'Samenwerking met coaches voor optimaal herstel',
      'Behandeling in de gym of aparte behandelruimte',
      'Focus op terug naar sport of dagelijks leven',
      'Manuele therapie en mobilisaties',
      'Dry needling en tape technieken',
      'Sportspecifieke revalidatie',
      'Pre- en post-operatieve begeleiding',
      'Chronische pijnbehandeling',
      'Bewegingsscreening en analyse',
      'Ergonomisch advies'
    ]
  },
  {
    id: 'voeding-begeleiding',
    category: 'Voeding Begeleiding',
    title: 'Voeding die bijdraagt aan je doelen',
    description: 'Heb jij je training goed onder controle en wil je vooral ondersteuning op het gebied van voeding? Dan sluit dit pakket perfect bij jou aan. Na een uitgebreide intake stellen we een persoonlijk plan van aanpak op, volledig afgestemd op jouw situatie en doelen. We gaan samen kijken naar jouw huidige eetgewoontes, je dagelijkse routine en je persoonlijke voorkeuren. Op basis hiervan ontwerpen we voedingsschema\'s die niet alleen effectief zijn, maar ook haalbaar en lekker. Want voeding moet geen straf zijn, maar een tool om je doelen te bereiken terwijl je geniet van wat je eet. Tijdens het traject krijg je wekelijkse begeleiding waarbij we je voortgang monitoren en waar nodig bijsturen. Je leert niet alleen wat je moet eten, maar ook waarom. We geven je de kennis en tools om zelfstandig gezonde keuzes te maken, ook in uitdagende situaties zoals sociale gelegenheden of tijdens vakanties. Het doel is dat je na afloop van de begeleiding zelfstandig verder kunt met een gezonde voedingspatroon dat bij jou past.',
    benefits: [
      'Uitgebreide voedingsintake',
      'Twee voedingsschema\'s op maat',
      'Wekelijkse check-ins en bijsturing',
      'Praktische recepten en maaltijdideeën',
      'Macro- en calorieadvies',
      'Educatie over voeding en supplementen',
      'Ondersteuning bij sociale situaties',
      'Flexibele voedingsopties',
      'Boodschappenlijsten en meal prep tips',
      'Portie controle en timing strategieën',
      'Supplementatie protocollen',
      'Voedingsdagboek analyse',
      'Periodieke metingen en evaluaties',
      'Levenslange voedingskennis'
    ]
  }
];
