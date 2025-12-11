export interface ServiceData {
  id: string;
  category: string;
  title: string;
  price?: string;
  description: string;
  benefits: string[];
}

export const servicesData: ServiceData[] = [
  {
    id: 'dagpas',
    category: 'Dagpas',
    title: 'Eén dag trainen bij Hal13',
    price: '€10,-',
    description: 'Met een dagpas heb je één dag toegang tot de gym. Perfect als je een keer wilt proberen hoe het is om bij Hal13 te trainen, of als je op doorreis bent en toch je training niet wilt missen.\n\nJe krijgt toegang tot alle faciliteiten en hoogwaardige materialen: Gymleco, ATX, Strength-Shop, Kingsbox, Concept 2 en verschillende cardiomachines. Daarnaast vind je bij ons dumbbells tot 50 kg, meerdere squatrekken, comboracks, powerlifting barbells, speciality barbells, gekalibreerde schijven en nog veel meer.\n\nOf je nu gaat voor Hyrox, Powerlifting, Bodybuilding, sportspecifieke prestaties, conditie of simpelweg meer vitaliteit: bij ons vind je de juiste omgeving én de juiste materialen.',
    benefits: [
      'Eén dag volledige toegang tot de gym',
      'Gebruik van premium materiaal',
      'Mogelijkheid tot het kopen van sportdranken en supplementen',
      'Een motiverende omgeving om te trainen'
    ]
  },
  {
    id: 'open-gym',
    category: 'Open Gym',
    title: 'Train wanneer het jou uitkomt',
    price: 'vanaf €60,- p.m.',
    description: 'Bij een Open Gym-abonnement heb je onbeperkt toegang tot de gym binnen de openingstijden: maandag t/m vrijdag van 07.00 tot 22.00 uur, zaterdag van 08.00 tot 15.00 uur en zondag van 08.00 tot 13.00 uur.\n\nJe traint zelfstandig, maar nooit alleen: je bent omringd door gemotiveerde sporters en hebt alle ruimte om op jouw manier te werken aan je doelen. Met hoogwaardige materialen haal je meer uit elke training: Gymleco, ATX, Strength-Shop, Kingsbox, Concept 2 en verschillende cardiomachines. Daarnaast vind je bij ons dumbbells tot 50 kg, meerdere squatrekken, comboracks, powerlifting barbells, speciality barbells, gekalibreerde schijven en nog veel meer.\n\nOf je nu gaat voor Hyrox, Powerlifting, Bodybuilding, sportspecifieke prestaties, conditie, simpelweg meer vitaliteit of als je helemaal nieuw bent: bij ons vind je de juiste omgeving én de juiste materialen om stap voor stap dichter bij jouw doel te komen.',
    benefits: [
      'Onbeperkte vrije toegang tot de gym binnen de openingstijden',
      'Gebruik van premium materiaal',
      'Mogelijkheid tot het kopen van sportdranken en supplementen',
      'Een motiverende omgeving waar jij het maximale uit jezelf kunt halen'
    ]
  },
  {
    id: 'training-begeleiding',
    category: 'Trainingsbegeleiding',
    title: 'Zelfstandig trainen met ondersteuning',
    price: 'vanaf €85,- p.m.',
    description: 'Bij Trainingsbegeleiding krijg je alles wat je nodig hebt om zelfstandig aan de slag te gaan, mét de steun van jouw persoonlijke coach. Je ontvangt een op maat gemaakt trainingsplan dat aansluit bij jouw niveau, wensen, behoeften en doelen.\n\nVoordat je zelf aan de slag gaat, neemt je coach de oefeningen met je door in een technieksessie. Zo weet je precies hoe je ze moet uitvoeren en start je met zelfvertrouwen aan je trainingen. Je voortgang houd je overzichtelijk bij in jouw persoonlijke logboek.\n\nElke vier weken heb je een coachingsgesprek van circa 30 minuten. Tijdens dit gesprek bespreken we je progressie, beantwoorden we je vragen, maken we nieuwe afspraken voor het vervolg en wordt je schema opnieuw doorgeprogrammeerd.\n\nDit pakket is ideaal als je zelfstandig wilt trainen, maar graag een stok achter de deur hebt met een persoonlijk schema, technieksessie en regelmatige check-ins met je coach.',
    benefits: [
      'Intakegesprek',
      'Persoonlijk, op maat gemaakt trainingsschema',
      'Eenmalige technieksessie met uitleg van de oefeningen',
      'Elke vier weken een fysiek evaluatiegesprek met jouw persoonlijke coach',
      'Open Gym inbegrepen: onbeperkte toegang tot de gym'
    ]
  },
  {
    id: 'performance-coaching',
    category: 'Performance Coaching',
    title: 'Haal het maximale uit je prestaties',
    price: 'vanaf €85,- p.m.',
    description: 'Bij Performance Begeleiding staat alles in het teken van het verbeteren van jouw prestaties. Of dit nu sportspecifiek is, powerlifting, krachtsport of conditietraining: het maakt niet uit. Afhankelijk van jouw niveau, doelstellingen en wensen stellen we de programmering samen die het beste bij jou past. Denk bijvoorbeeld aan een schema op basis van RIR of RPE.\n\nVoordat je zelfstandig aan de slag gaat, neemt je coach de oefeningen met je door in een technieksessie. Zo weet je precies hoe je de bewegingen correct uitvoert en kun je met vertrouwen starten.\n\nDaarnaast heb je wekelijks contact met je coach. Op basis van de gesprekken en de video\'s die jij instuurt, krijg je uitgebreide feedback op je techniek. Jouw trainingsschema wordt continu doorgeprogrammeerd en bijgesteld, zodat je altijd uitgedaagd blijft en stap voor stap progressie boekt.\n\nNa een uitgebreide intake stellen we een persoonlijk plan van aanpak op, volledig afgestemd op jouw situatie en doelen. Je ontvangt twee voedingsschema\'s waarmee je direct praktisch aan de slag kunt.\n\nElke twee weken heb je een coachingsgesprek van circa 30 minuten. Tijdens dit gesprek doen we een meting, kijken we terug op de afgelopen periode en bespreken we waar je eventueel tegenaan loopt.\n\nDit pakket is ideaal als je jouw voeding wilt verbeteren, resultaatgericht wilt leren eten en praktische handvatten zoekt die passen bij jouw levensstijl.',
    benefits: [
      'Intakegesprek',
      '0-meting',
      'Twee persoonlijke voedingsschema\'s',
      'Elke twee weken een persoonlijk coachgesprek',
      'Open Gym inbegrepen: onbeperkte toegang tot de gym'
    ]
  },
  {
    id: 'voeding-begeleiding',
    category: 'Voedingsbegeleiding',
    title: 'Voeding die bijdraagt aan je doelen',
    price: 'vanaf €75,- p.m.',
    description: 'Heb jij je training goed onder controle en wil je vooral ondersteuning op het gebied van voeding? Dan sluit dit pakket perfect bij jou aan. Na een uitgebreide intake stellen we een persoonlijk plan van aanpak op, volledig afgestemd op jouw situatie en doelen. Je ontvangt twee voedingsschema\'s waarmee je direct praktisch aan de slag kunt.\n\nElke twee weken heb je een coachingsgesprek van circa 30 minuten. Tijdens dit gesprek doen we een meting, kijken we terug op de afgelopen periode en bespreken we waar je eventueel tegenaan loopt.\n\nDit pakket is ideaal als je jouw voeding wilt verbeteren, resultaatgericht wilt leren eten en praktische handvatten zoekt die passen bij jouw levensstijl.',
    benefits: [
      'Intakegesprek',
      '0-meting',
      'Twee persoonlijke voedingsschema\'s',
      'Elke twee weken een persoonlijk coachgesprek',
      'Open Gym inbegrepen: onbeperkte toegang tot de gym'
    ]
  },
  {
    id: 'leefstijl-coaching',
    category: 'Leefstijlcoaching',
    title: 'Het aanpakken van jouw leefstijl',
    price: 'vanaf €150,- p.m.',
    description: 'Leefstijlcoaching gaat verder dan alleen trainen en voeding. Met dit abonnement werk je aan álle leefstijlfactoren die invloed hebben op jouw gezondheid en prestaties: stress, slaap, herstel, je privéleven én natuurlijk beweging en voeding. We kijken dus niet alleen naar je schema, maar naar jou als persoon.\n\nWe starten met een uitgebreide intake om jouw beginsituatie helder in kaart te brengen. Vanuit die inzichten maken we een persoonlijk leefstijlplan en trainingsplan, gericht op de lange termijn. Geen korte hype, maar een aanpak die écht bij jou past en vol te houden is.\n\nJe krijgt een technieksessie zodat je vol vertrouwen in de gym aan de slag gaat met je persoonlijke trainingsschema. Tijdens de wekelijkse online contactmomenten bespreken we jouw progressie, stuur je videobeelden in voor feedback en wordt je plan direct bijgestuurd. Zo blijft het altijd maatwerk.\n\nDaarnaast plannen we elke maand een fysieke evaluatie op locatie, waarbij we jouw voortgang monitoren met o.a. omtrekmetingen, vetpercentage, foto\'s en gewicht.\n\nDoor de combinatie van leefstijl, voeding, training én aandacht voor stress, slaap en balans in je privéleven pak je alle factoren aan die cruciaal zijn om het maximale uit jouw leven te halen.\n\nDit pakket is perfect als jij je leefstijl wilt verbeteren, op zoek bent naar een gelukkigere versie van jezelf en het maximale uit je leven én sportprestaties wilt halen.',
    benefits: [
      'Uitgebreide intake',
      'Persoonlijk leefstijlplan én trainingsplan op maat',
      'Eenmalige technieksessie met uitleg van de oefeningen',
      'Wekelijks online contactmoment met je coach',
      'Feedback op beeldmateriaal van je trainingen',
      'Plan wordt wekelijks bijgesteld en doorgeprogrammeerd',
      'Maandelijkse fysieke evaluatie inclusief voortgangsmetingen',
      'Open Gym inbegrepen: onbeperkte toegang tot de gym'
    ]
  },
  {
    id: 'personal-training',
    category: 'Personal Training',
    title: 'Eén-op-één trainen onder begeleiding',
    price: 'prijs op aanvraag',
    description: 'Bij Personal Training ligt de focus volledig op één-op-één trainen onder begeleiding van jouw coach. Alle aandacht gaat naar jou: hoe jij traint, hoe jij beweegt en hoe jij het meeste uit jezelf haalt. Je coach zorgt ervoor dat je oefeningen altijd correct en veilig worden uitgevoerd, geeft je een duwtje waar nodig of trapt juist even op de rem als dat beter is. Zo haal je elke sessie het maximale uit je training.\n\nHet is meer dan een uur sporten. Je ziet je trainer wekelijks en bouwt samen een vertrouwensband op. Er wordt niet alleen gekeken naar je training, maar ook naar voeding, slaap, herstel en je dagelijkse leven. Iedere sessie wordt afgestemd op wat jij op dat moment nodig hebt: techniek verbeteren, kennis opdoen, reflecteren of gewoon keihard knallen.\n\nNaast de persoonlijke begeleiding ontvang je een uitgebreid trainingsschema en logboek waarmee je ook zelfstandig aan de slag kunt. Dankzij de combinatie van sessies in de gym, continue bijsturing en feedback op ingestuurd beeldmateriaal ben je verzekerd van constante progressie.\n\nDit pakket is ideaal als je maximale persoonlijke aandacht wilt, een vertrouwensband met je coach belangrijk vindt en alles uit je trainingen én je leven wilt halen.',
    benefits: [
      'Intakegesprek',
      '0-meting',
      'Persoonlijk, op maat gemaakt trainingsschema + logboek',
      'Eenmalige technieksessie met uitleg van de oefeningen',
      'Wekelijkse personal training sessies (of vaker)',
      'Wekelijks online feedbackmoment met je coach (incl. feedback op ingestuurde trainingsvideo\'s)',
      'Trainingsplan wordt wekelijks bijgesteld en doorgeprogrammeerd',
      'Elke 4 weken een evaluatiegesprek op locatie inclusief voortgangsmeting',
      'Open Gym inbegrepen: onbeperkte toegang tot de gym'
    ]
  },
  {
    id: 'personal-training-leefstijl',
    category: 'Personal Training & Leefstijlcoaching',
    title: 'Het complete pakket',
    price: 'prijs op aanvraag',
    description: 'Ons meest intensieve pakket: de perfecte combinatie van Personal Training en Leefstijlcoaching. Hier krijg je maximale één-op-één begeleiding én een compleet plan voor jouw leefstijl. Alles staat in het teken van het verbeteren van jouw gezondheid, prestaties en kwaliteit van leven.\n\nTijdens de wekelijkse personal training sessies ligt de focus volledig op jou. Je coach zorgt dat je oefeningen altijd correct en veilig worden uitgevoerd, pusht je op de juiste momenten en helpt je grenzen verleggen. Iedere sessie wordt afgestemd op wat jij nodig hebt: techniek verfijnen, kennis opdoen, reflecteren of simpelweg het uiterste uit jezelf halen.\n\nNaast de trainingen werk je met een uitgebreid leefstijlplan en voedingsplan. Dit is geen tijdelijk schema, maar een traject waarin jij leert hoe je van A tot Z je doelen kunt behalen én volhouden. Elke week wordt je plan geëvalueerd en bijgesteld, zodat je leert omgaan met alle situaties die op je pad komen.\n\nMet dit pakket pak je dus álle factoren aan die bepalend zijn voor jouw succes: training, voeding, slaap, stress, herstel en balans in je privéleven. Dankzij regelmatige evaluaties en de continue bijsturing van je coach blijft jouw plan altijd maatwerk.\n\nDit pakket is ideaal als je écht alles wilt aanpakken: persoonlijke training, voeding, leefstijl, stress, slaap en herstel. Voor wie maximale begeleiding wil en stap voor stap wil leren hoe je dit in elke situatie volhoudt en blijvend resultaat behaalt.',
    benefits: [
      'Intakegesprek',
      '0-meting',
      'Persoonlijk leefstijlplan én voedingsplan + trainingsplan op maat + logboek',
      'Eenmalige technieksessie met uitleg van de oefeningen',
      'Wekelijkse personal training sessies (of vaker)',
      'Wekelijks online contactmoment met je coach',
      'Feedback op ingestuurd beeldmateriaal van je trainingen',
      'Leefstijl-, voedings- en trainingsplan worden wekelijks geëvalueerd en bijgesteld',
      'Maandelijkse fysieke evaluatie inclusief voortgangsmetingen',
      'Open Gym inbegrepen: onbeperkte toegang tot de gym'
    ]
  },
  {
    id: 'fysiotherapie',
    category: 'Fysiotherapie & Fysiocoaching',
    title: 'Herstel en preventie zonder beperkingen',
    price: 'prijs op aanvraag',
    description: 'Bij M.A.E. Fysiotherapie kijken we anders naar revalidatie. Waar veel zorgprofessionals vooral beperkingen opleggen, geloven wij in een doelgerichte, persoonlijke en stapsgewijze aanpak. Het doel: jou weer laten functioneren zonder belemmeringen.\n\nSamen met jou stellen we een revalidatieplan op dat volledig aansluit op jouw lichaam, klachten en doelen. We beginnen niet telkens opnieuw, maar bouwen stap voor stap je belastbaarheid op. Zo werk je gestructureerd en doelgericht aan herstel.\n\nJe staat er nooit alleen voor. Met wekelijkse contactmomenten en regelmatige feedback blijf je gemotiveerd en uitgedaagd. Je stuurt video\'s van je oefeningen in, zodat je fysiotherapeut direct feedback kan geven op je uitvoering en je plan kan bijstellen waar nodig. Daarnaast heb je maandelijks een afspraak op locatie om je voortgang uitgebreid te bespreken en nieuwe stappen te zetten.\n\nDit pakket is ideaal als je doelgericht wilt revalideren met maximale begeleiding, je belastbaarheid veilig wilt opbouwen en op een persoonlijke manier wilt toewerken naar pijnvrij bewegen en presteren.',
    benefits: [
      'Uitgebreide intake, screening en onderzoek',
      'Persoonlijk revalidatieplan, eenvoudig online te volgen',
      'Wekelijkse online contactmomenten met je fysiotherapeut',
      'Feedback op ingestuurde trainingsvideo\'s',
      'Maandelijkse afspraak op locatie (in overleg vaker mogelijk)'
    ]
  }
];
