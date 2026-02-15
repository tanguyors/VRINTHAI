export interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  imageAlt: string;
  content: ArticleSection[];
}

export const categories = [
  "Tous",
  "Guides Pratiques",
  "Culture & Lifestyle",
  "Légal & Admin",
  "Santé & Bien-être",
  "Digital Nomad",
];

export const categoryColors: Record<string, string> = {
  "Guides Pratiques": "bg-blue-500/80",
  "Culture & Lifestyle": "bg-purple-500/80",
  "Légal & Admin": "bg-amber-500/80",
  "Santé & Bien-être": "bg-emerald-500/80",
  "Digital Nomad": "bg-cyan-500/80",
};

export const articles: Article[] = [
  {
    slug: "ouvrir-compte-bancaire-thailande",
    title: "Ouvrir un compte bancaire en Thaïlande",
    excerpt:
      "Documents requis, meilleures banques et étapes pour démarrer votre vie financière en tant qu\u2019expatrié. De l\u2019ouverture aux virements internationaux, tout ce que vous devez savoir.",
    category: "Guides Pratiques",
    readTime: "8 min",
    date: "15 février 2026",
    image:
      "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&q=80",
    imageAlt: "Banque et finances",
    content: [
      {
        heading: "Pourquoi ouvrir un compte en Thaïlande ?",
        paragraphs: [
          "Vivre en Thaïlande sans compte bancaire local est possible, mais rapidement limitant. Paiement du loyer, factures d\u2019électricité, abonnement téléphonique : tout devient plus simple avec un compte thaïlandais.",
          "Les frais de conversion et de retrait aux distributeurs s\u2019accumulent vite si vous restez sur votre compte français. Un compte local vous permet aussi de recevoir un salaire thaïlandais et de faciliter les transferts via Wise ou Revolut.",
        ],
      },
      {
        heading: "Les meilleures banques pour les expatriés",
        paragraphs: [
          "Bangkok Bank est la plus ouverte aux étrangers. Avec un passeport et un justificatif de domicile (contrat de bail), vous pouvez ouvrir un compte en une heure dans certaines agences. L\u2019application mobile est disponible en anglais.",
          "Kasikorn Bank (KBank) est très populaire pour son application moderne et ses QR codes de paiement omniprésents. SCB (Siam Commercial Bank) offre un bon service client en anglais dans les agences touristiques.",
          "Évitez les petites banques régionales : leur réseau de distributeurs est limité et le support en anglais quasi inexistant.",
        ],
      },
      {
        heading: "Documents nécessaires",
        paragraphs: [
          "Le minimum requis est votre passeport avec un visa valide (pas un tampon d\u2019exemption de 30 jours). Certaines agences demandent un permis de travail ou un justificatif de domicile.",
          "Conseil : apportez votre contrat de bail, une lettre de votre employeur si vous travaillez, et votre numéro de téléphone thaïlandais. Plus vous avez de documents, plus l\u2019ouverture sera facile.",
          "Si une agence refuse, essayez-en une autre. Les politiques varient d\u2019une branche à l\u2019autre, même au sein de la même banque.",
        ],
      },
      {
        heading: "Les virements internationaux",
        paragraphs: [
          "Pour transférer de l\u2019argent depuis la France, Wise (anciennement TransferWise) offre les meilleurs taux avec des frais transparents. Le transfert arrive en 1 à 2 jours ouvrés directement sur votre compte thaïlandais.",
          "Revolut est une alternative intéressante si vous avez déjà un compte. Les taux de change sont compétitifs en semaine.",
          "Évitez les virements bancaires classiques SWIFT : les frais peuvent atteindre 30 à 50 € par transfert, avec un taux de change défavorable.",
        ],
      },
      {
        heading: "Conseils pratiques",
        paragraphs: [
          "Gardez toujours une copie de votre livret bancaire (le petit carnet bleu ou rose remis à l\u2019ouverture). Il vous sera demandé pour de nombreuses démarches administratives.",
          "Activez les notifications SMS ou via l\u2019application pour surveiller vos transactions. Les fraudes à la carte bancaire existent, même en Thaïlande.",
          "Enfin, conservez un compte en France actif pour vos obligations fiscales et comme solution de secours.",
        ],
      },
    ],
  },
  {
    slug: "transports-thailande-bts-taxi-location",
    title: "Transports en Thaïlande : BTS, taxi et location",
    excerpt:
      "BTS, taxis, motos-taxis et location de véhicules : toutes les options de transport, les coûts réels et les astuces pour vos trajets quotidiens à Bangkok et ailleurs.",
    category: "Guides Pratiques",
    readTime: "7 min",
    date: "10 février 2026",
    image:
      "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80",
    imageAlt: "Transport Bangkok BTS",
    content: [
      {
        heading: "Le BTS et le MRT : le métro de Bangkok",
        paragraphs: [
          "Le BTS (Skytrain) et le MRT (métro souterrain) sont les moyens de transport les plus fiables de Bangkok. Climatisés, rapides et ponctuels, ils couvrent les principaux quartiers d\u2019affaires et résidentiels.",
          "Un trajet coûte entre 16 et 62 bahts (0,40 € à 1,60 €). Investissez dans une carte Rabbit (BTS) ou une carte MRT pour éviter les files d\u2019attente aux guichets.",
          "Les horaires vont de 6h à minuit. Aux heures de pointe (7h30-9h et 17h-19h), les rames sont bondées. Privilégiez les heures creuses si possible.",
        ],
      },
      {
        heading: "Taxis et Grab : les trajets à la demande",
        paragraphs: [
          "Les taxis à Bangkok sont très abordables : la prise en charge est de 35 bahts et le compteur monte lentement. Un trajet de 30 minutes coûte rarement plus de 150 bahts (4 €).",
          "Exigez toujours le compteur (« meter, please »). Certains chauffeurs tentent de négocier un prix fixe, surtout près des zones touristiques — c\u2019est toujours plus cher.",
          "L\u2019application Grab (l\u2019Uber de l\u2019Asie du Sud-Est) est votre meilleure alliée. Prix fixe affiché avant la course, paiement par carte possible, et pas de négociation.",
        ],
      },
      {
        heading: "Motos-taxis et tuk-tuks",
        paragraphs: [
          "Les motos-taxis (reconnaissables à leur gilet orange) sont parfaits pour les courts trajets dans les ruelles (sois). Comptez 10 à 40 bahts selon la distance.",
          "Les tuk-tuks sont une expérience touristique mais un moyen de transport cher. Négociez toujours avant de monter. Un trajet de 5 minutes ne devrait pas dépasser 100 bahts.",
        ],
      },
      {
        heading: "Louer un scooter ou une voiture",
        paragraphs: [
          "La location de scooter est courante hors de Bangkok : entre 200 et 300 bahts par jour (5-8 €). Vérifiez toujours l\u2019état du véhicule et prenez des photos avant de partir.",
          "Le permis de conduire international est théoriquement obligatoire. Sans permis, votre assurance ne couvrira pas les accidents — et les accidents de scooter sont la première cause d\u2019hospitalisation des expatriés.",
          "Pour la voiture, les tarifs de location démarrent à 800 bahts/jour. La conduite se fait à gauche, ce qui demande un temps d\u2019adaptation.",
        ],
      },
    ],
  },
  {
    slug: "forfait-telephonique-ais-dtac-true-move",
    title: "Forfait téléphonique : AIS, Dtac ou True Move ?",
    excerpt:
      "Comparatif des trois opérateurs principaux. Comment obtenir votre SIM thaïlandaise et choisir le meilleur forfait pour rester connecté avec la France.",
    category: "Guides Pratiques",
    readTime: "6 min",
    date: "5 février 2026",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    imageAlt: "Smartphone forfait mobile",
    content: [
      {
        heading: "Les trois opérateurs majeurs",
        paragraphs: [
          "La Thaïlande compte trois opérateurs principaux : AIS (le plus grand réseau), True Move H (meilleur en zones urbaines) et Dtac (bon rapport qualité-prix). Tous offrent une couverture 4G/5G excellente dans les grandes villes.",
          "AIS domine en termes de couverture rurale. Si vous voyagez souvent dans les provinces éloignées ou les îles, c\u2019est le choix le plus sûr.",
        ],
      },
      {
        heading: "Comment obtenir une SIM",
        paragraphs: [
          "Vous pouvez acheter une SIM prépayée dès l\u2019aéroport de Suvarnabhumi ou Don Mueang. Les comptoirs des trois opérateurs sont ouverts 24h/24. Comptez 300 à 600 bahts pour un pack avec data.",
          "Pour un forfait mensuel (postpaid), vous aurez besoin de votre passeport et d\u2019un justificatif de domicile. Les boutiques en centre commercial sont les plus efficaces pour cette démarche.",
        ],
      },
      {
        heading: "Comparatif des forfaits",
        paragraphs: [
          "Pour un forfait prépayé avec 30 Go de data et appels illimités, comptez environ 300 à 500 bahts par mois (8 à 13 €). C\u2019est considérablement moins cher qu\u2019en France.",
          "Les forfaits postpaid offrent plus de data et une meilleure vitesse. Chez AIS, le forfait à 599 bahts/mois inclut 50 Go de data 5G, les appels illimités et l\u2019accès aux lounges AIS dans les centres commerciaux.",
          "True Move propose des offres intéressantes couplées avec True WiFi, un réseau de hotspots gratuits dans tout Bangkok.",
        ],
      },
      {
        heading: "Rester connecté avec la France",
        paragraphs: [
          "Pour appeler la France, utilisez WhatsApp, LINE ou FaceTime plutôt que les appels classiques. Les appels internationaux via opérateur coûtent entre 3 et 9 bahts la minute.",
          "La qualité du réseau pour les appels vidéo est excellente dans les grandes villes. Le décalage horaire de 6h (5h en été) permet des appels le matin thaïlandais ou le soir français.",
        ],
      },
    ],
  },
  {
    slug: "assurance-sante-expatrie-comparatif",
    title: "Assurance santé expatrié : Comparatif 2025",
    excerpt:
      "Comparatif des meilleures couvertures privées, pourquoi les hôpitaux privés sont préférés et comment choisir la protection adaptée à votre famille et votre budget.",
    category: "Santé & Bien-être",
    readTime: "9 min",
    date: "30 janvier 2026",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    imageAlt: "Hôpital moderne",
    content: [
      {
        heading: "Pourquoi une assurance privée est indispensable",
        paragraphs: [
          "La Thaïlande dispose d\u2019excellents hôpitaux privés (Bumrungrad, Bangkok Hospital, Samitivej), mais les coûts peuvent être élevés. Une consultation de spécialiste coûte entre 1 000 et 3 000 bahts, et une hospitalisation peut atteindre plusieurs centaines de milliers de bahts.",
          "Le système public est abordable mais la qualité et les temps d\u2019attente varient considérablement. La plupart des expatriés choisissent le privé pour le confort, la langue (anglais courant) et la rapidité.",
          "Sans assurance, un accident grave ou une maladie sérieuse peut coûter des dizaines de milliers d\u2019euros. C\u2019est le premier poste budgétaire à ne pas négliger.",
        ],
      },
      {
        heading: "Les meilleures assurances pour expatriés",
        paragraphs: [
          "April International propose des formules à partir de 150 €/mois avec une couverture hospitalisation + consultations. Leur réseau inclut les meilleurs hôpitaux thaïlandais.",
          "Cigna Global offre une couverture mondiale avec un excellent service client. Comptez 200 à 400 €/mois selon votre âge et la couverture choisie.",
          "Pour les budgets plus serrés, la CFE (Caisse des Français de l\u2019Étranger) offre une couverture de base à partir de 80 €/mois, mais les remboursements sont calculés sur la base des tarifs français.",
        ],
      },
      {
        heading: "Que couvrir en priorité",
        paragraphs: [
          "L\u2019hospitalisation est la priorité absolue : c\u2019est là que les frais explosent. Assurez-vous d\u2019avoir au moins 1 million d\u2019euros de couverture hospitalisation.",
          "Les soins courants (consultations, médicaments) sont suffisamment abordables en Thaïlande pour être payés de votre poche si nécessaire.",
          "Le rapatriement médical est crucial. Un vol sanitaire vers la France peut coûter 50 000 € ou plus. Vérifiez que votre assurance le couvre sans franchise.",
        ],
      },
      {
        heading: "Conseils pour réduire les coûts",
        paragraphs: [
          "Choisissez une franchise élevée (1 000 à 2 000 €) pour réduire votre prime mensuelle. Vous paierez les petits frais de votre poche mais serez couvert pour les gros coups durs.",
          "Certains visas (comme le OA ou le LTR) exigent une assurance santé avec un minimum de couverture. Vérifiez les exigences avant de souscrire.",
        ],
      },
    ],
  },
  {
    slug: "bangkok-vs-chiang-mai-ou-installer",
    title: "Bangkok vs Chiang Mai : Où s\u2019installer ?",
    excerpt:
      "Coût de la vie, atmosphère, communauté française : analyse complète pour choisir entre la capitale dynamique et la ville des digital nomads au nord.",
    category: "Culture & Lifestyle",
    readTime: "10 min",
    date: "1 février 2026",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80",
    imageAlt: "Bangkok skyline",
    content: [
      {
        heading: "Bangkok : la capitale vibrante",
        paragraphs: [
          "Bangkok est une mégapole de 10 millions d\u2019habitants qui ne dort jamais. Centres commerciaux gigantesques, restaurants de classe mondiale, vie nocturne intense et un réseau de transport moderne (BTS, MRT) en font la ville la plus pratique de Thaïlande.",
          "Le coût de la vie est plus élevé que dans le reste du pays : comptez 1 200 à 2 500 € par mois pour un couple. Les loyers dans les quartiers prisés (Sukhumvit, Silom, Ari) vont de 15 000 à 40 000 bahts pour un T2.",
          "La communauté française est bien établie : Lycée Français International, Alliance Française, restaurants et boulangeries françaises dans tout Sukhumvit.",
        ],
      },
      {
        heading: "Chiang Mai : la douceur du nord",
        paragraphs: [
          "Chiang Mai est la capitale des digital nomads en Asie du Sud-Est. L\u2019atmosphère est détendue, l\u2019air moins pollué qu\u2019à Bangkok (sauf en saison des brûlis, mars-avril) et la nature est à portée de main.",
          "Le coût de la vie est 30 à 40 % moins cher qu\u2019à Bangkok. Un T2 moderne dans le centre se loue entre 8 000 et 15 000 bahts. Les cafés et coworkings sont excellents et abordables.",
          "Le revers : moins de vols internationaux directs, une communauté française plus petite, et un choix de restaurants et de divertissements limité par rapport à Bangkok.",
        ],
      },
      {
        heading: "Qualité de vie au quotidien",
        paragraphs: [
          "Bangkok gagne pour l\u2019accès aux soins (hôpitaux internationaux), le shopping, la diversité culinaire et les connexions internationales. Si vous avez des enfants en âge scolaire, le choix d\u2019écoles internationales est bien plus large.",
          "Chiang Mai gagne pour la nature (montagnes, cascades, parcs nationaux), le rythme de vie paisible, le coût de la vie et la communauté de nomades digitaux très active.",
        ],
      },
      {
        heading: "Notre recommandation",
        paragraphs: [
          "Si vous travaillez en remote et cherchez un cadre de vie calme avec un budget maîtrisé : Chiang Mai. Si vous avez une famille, besoin d\u2019infrastructures complètes ou un emploi local : Bangkok.",
          "Beaucoup d\u2019expatriés commencent par Bangkok pour les démarches administratives (ambassade, immigration), puis déménagent à Chiang Mai une fois installés.",
        ],
      },
    ],
  },
  {
    slug: "cuisine-thailandaise-adaptation-culinaire",
    title: "Cuisine thaïlandaise : Adaptation culinaire",
    excerpt:
      "Comprendre les saveurs locales, trouver des produits français et découvrir les meilleurs restaurants. Les adresses françaises à Bangkok en bonus.",
    category: "Culture & Lifestyle",
    readTime: "8 min",
    date: "25 janvier 2026",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    imageAlt: "Cuisine thaïlandaise street food",
    content: [
      {
        heading: "Les bases de la cuisine thaïlandaise",
        paragraphs: [
          "La cuisine thaï repose sur l\u2019équilibre de quatre saveurs : sucré, salé, acide et piquant. Chaque plat est un ballet de ces quatre éléments, ce qui explique la richesse et la complexité des saveurs.",
          "Les ingrédients de base sont le riz (jasmin ou gluant), les nouilles, le lait de coco, la citronnelle, le galanga, les feuilles de combava et bien sûr le piment. Si vous ne supportez pas le piquant, apprenez la phrase magique : « mai pet » (pas épicé).",
        ],
      },
      {
        heading: "Manger local au quotidien",
        paragraphs: [
          "Le street food et les restaurants locaux (« raan ahaan ») sont une bénédiction pour le budget : un pad thai coûte 40 à 80 bahts (1 à 2 €), un curry sur riz 50 à 70 bahts. Manger dehors est souvent moins cher que cuisiner chez soi.",
          "Les food courts des centres commerciaux offrent un excellent rapport qualité-prix dans un environnement climatisé et propre. MBK, Terminal 21 et Siam Paragon ont d\u2019excellents food courts.",
          "Pour l\u2019hygiène, fiez-vous à l\u2019affluence : un stand avec une file d\u2019attente est généralement un gage de fraîcheur et de qualité.",
        ],
      },
      {
        heading: "Trouver des produits français",
        paragraphs: [
          "Les supermarchés Tops, Villa Market et Gourmet Market (dans les Siam Paragon, EmQuartier) proposent des fromages, vins, charcuteries et produits français. Les prix sont 2 à 3 fois plus élevés qu\u2019en France.",
          "Pour le pain et les viennoiseries, plusieurs boulangeries françaises tiennent la route : Paul, Maison Jean Philippe, et Eric Kayser sont présents à Bangkok.",
        ],
      },
      {
        heading: "Les restaurants français à Bangkok",
        paragraphs: [
          "Le quartier de Sukhumvit concentre la majorité des restaurants français. De la brasserie décontractée au restaurant gastronomique, il y en a pour tous les budgets.",
          "Comptez 300 à 500 bahts pour un déjeuner dans un bistrot français, et 1 500 à 3 000 bahts pour un dîner gastronomique. Nettement moins cher qu\u2019à Paris pour une qualité souvent équivalente.",
        ],
      },
    ],
  },
  {
    slug: "saving-face-guide-culturel-essentiel",
    title: "Le \u2018Saving Face\u2019 : Guide culturel essentiel",
    excerpt:
      "Comprendre le concept crucial de préservation de la dignité, la politesse indirecte et les coutumes sociales pour s\u2019intégrer harmonieusement en Thaïlande.",
    category: "Culture & Lifestyle",
    readTime: "7 min",
    date: "20 janvier 2026",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
    imageAlt: "Temple bouddhiste Thaïlande",
    content: [
      {
        heading: "Qu\u2019est-ce que le \u2018Saving Face\u2019 ?",
        paragraphs: [
          "Le concept de « face » (en thaï : « na ») est central dans la culture thaïlandaise. Il englobe la dignité, la réputation et le respect social. Perdre la face (« sia na ») est considéré comme l\u2019une des pires choses qui puisse arriver.",
          "Concrètement, cela signifie éviter toute confrontation publique, ne jamais élever la voix, et toujours laisser une porte de sortie honorable à votre interlocuteur, même en cas de désaccord.",
        ],
      },
      {
        heading: "La communication indirecte",
        paragraphs: [
          "Les Thaïlandais communiquent de manière indirecte. Un « oui » ne signifie pas toujours un accord — il peut simplement signifier « je vous ai entendu » ou « je ne veux pas vous contrarier ».",
          "Si un Thaïlandais sourit face à un problème, ce n\u2019est pas qu\u2019il s\u2019en moque : le sourire est une réponse au stress et à l\u2019embarras. La Thaïlande n\u2019est pas appelée « le pays du sourire » par hasard.",
          "Pour les affaires, ne prenez jamais un refus au pied de la lettre s\u2019il est formulé vaguement. « C\u2019est peut-être difficile » signifie souvent « non ».",
        ],
      },
      {
        heading: "Les règles de base du respect",
        paragraphs: [
          "Ne touchez jamais la tête de quelqu\u2019un, même d\u2019un enfant : la tête est considérée comme la partie la plus sacrée du corps. À l\u2019inverse, les pieds sont la partie la plus basse : ne pointez jamais vos pieds vers une personne ou une image de Bouddha.",
          "Le wai (mains jointes devant le visage) est le salut traditionnel. En tant qu\u2019étranger, vous n\u2019êtes pas tenu de le maîtriser, mais répondre à un wai par un wai est toujours apprécié.",
          "La monarchie est profondément respectée. Les lois de lèse-majesté sont strictement appliquées. Évitez tout commentaire sur la famille royale.",
        ],
      },
      {
        heading: "S\u2019intégrer au quotidien",
        paragraphs: [
          "Apprenez quelques mots de thaï : « sawadee krap/ka » (bonjour), « kop khun krap/ka » (merci). Les Thaïlandais apprécient énormément l\u2019effort, même maladroit.",
          "Restez calme en toutes circonstances. S\u2019énerver en public est perçu comme un signe de faiblesse et vous fera perdre le respect de votre entourage. La patience est la vertu cardinale en Thaïlande.",
        ],
      },
    ],
  },
  {
    slug: "visa-thailande-dtv-elite-investisseur",
    title: "Visa Thaïlande 2025 : DTV, Elite, Investisseur",
    excerpt:
      "DTV pour digital nomads, Elite longue durée, Investisseur : tous les types de visa disponibles, conditions d\u2019éligibilité, coûts et procédures depuis la France.",
    category: "Légal & Admin",
    readTime: "12 min",
    date: "8 février 2026",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=800&q=80",
    imageAlt: "Passeport et visa",
    content: [
      {
        heading: "Le visa DTV (Destination Thailand Visa)",
        paragraphs: [
          "Lancé en 2024, le DTV est une révolution pour les travailleurs à distance. Il permet de rester 180 jours en Thaïlande, renouvelable une fois pour un total de 360 jours. Le coût est de 10 000 bahts (environ 260 €).",
          "Conditions : prouver un revenu ou des économies suffisantes, et justifier d\u2019une activité de travail à distance (contrat de freelance, emploi remote, etc.). Aucune exigence de revenu minimum fixe.",
          "Le DTV ne donne pas de permis de travail en Thaïlande. Vous travaillez pour des clients/employeurs étrangers, pas pour des entreprises thaïlandaises.",
        ],
      },
      {
        heading: "Le Thailand Elite Visa",
        paragraphs: [
          "Le visa Elite est un programme premium : 5, 10 ou 20 ans de résidence en Thaïlande. Le prix démarre à 600 000 bahts (environ 15 500 €) pour 5 ans.",
          "Avantages : pas de tracas administratifs, service VIP à l\u2019aéroport (fast-track immigration, limousine), et la tranquillité d\u2019esprit d\u2019un visa longue durée.",
          "C\u2019est le choix idéal pour les retraités avec un bon budget ou les investisseurs qui veulent résider en Thaïlande sans les contraintes d\u2019un visa classique.",
        ],
      },
      {
        heading: "Le visa Non-Immigrant B (travail)",
        paragraphs: [
          "Si vous êtes employé par une entreprise thaïlandaise, vous aurez besoin d\u2019un visa Non-Immigrant B et d\u2019un permis de travail. Votre employeur doit sponsoriser votre visa.",
          "La procédure est plus lourde : documents de l\u2019entreprise, contrat de travail, photos, et souvent un aller-retour au consulat thaïlandais en France ou dans un pays voisin.",
        ],
      },
      {
        heading: "Le visa retraite (Non-Immigrant OA)",
        paragraphs: [
          "Pour les plus de 50 ans, le visa OA permet de résider en Thaïlande à condition de prouver des revenus mensuels de 65 000 bahts (environ 1 700 €) ou un dépôt bancaire de 800 000 bahts.",
          "Ce visa exige une assurance santé couvrant au moins 40 000 bahts en ambulatoire et 400 000 bahts en hospitalisation. Renouvelable chaque année.",
        ],
      },
      {
        heading: "Procédure depuis la France",
        paragraphs: [
          "L\u2019ambassade royale de Thaïlande à Paris et le consulat à Marseille traitent les demandes de visa. Les délais sont généralement de 5 à 10 jours ouvrés.",
          "Préparez : passeport valide 6 mois minimum, photos d\u2019identité, formulaire de demande, justificatifs financiers et tout document spécifique au type de visa choisi.",
          "Alternative : faire une demande e-Visa en ligne sur le site du ministère des Affaires étrangères thaïlandais. Plus simple mais pas disponible pour tous les types de visa.",
        ],
      },
    ],
  },
  {
    slug: "creer-entreprise-thailande",
    title: "Créer son entreprise en Thaïlande",
    excerpt:
      "Exigences légales, différences entre DTV et permis de travail, démarches entrepreneuriales et pièges à éviter pour rester en conformité avec la loi.",
    category: "Légal & Admin",
    readTime: "10 min",
    date: "15 janvier 2026",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    imageAlt: "Bureau entreprise",
    content: [
      {
        heading: "Les structures juridiques disponibles",
        paragraphs: [
          "La forme la plus courante pour les étrangers est la « Thai Limited Company ». Elle nécessite au minimum 3 actionnaires, dont au moins 51 % de parts détenues par des Thaïlandais (sauf dans certaines zones franches comme le BOI).",
          "La « Branch Office » est possible si vous avez déjà une entreprise en France et souhaitez ouvrir une filiale. Les démarches sont plus lourdes mais vous gardez le contrôle total.",
          "Le statut de freelance sous DTV est la solution la plus simple : vous travaillez pour des clients étrangers sans créer de structure locale. Pas de permis de travail nécessaire.",
        ],
      },
      {
        heading: "Le capital social et les coûts",
        paragraphs: [
          "Le capital social minimum est de 2 millions de bahts (environ 52 000 €) pour obtenir un permis de travail en tant que directeur. Ce montant doit être déposé puis peut être utilisé pour les opérations.",
          "Les frais de création varient entre 30 000 et 80 000 bahts selon que vous passez par un avocat ou un cabinet comptable. Comptez 10 000 à 20 000 bahts par mois pour la comptabilité.",
        ],
      },
      {
        heading: "Le permis de travail",
        paragraphs: [
          "Tout étranger travaillant en Thaïlande (y compris le directeur de sa propre entreprise) a besoin d\u2019un permis de travail (« Work Permit »). La demande se fait après la création de l\u2019entreprise.",
          "Règle importante : pour chaque permis de travail étranger, l\u2019entreprise doit employer au moins 4 Thaïlandais. C\u2019est une contrainte à anticiper dans votre business plan.",
        ],
      },
      {
        heading: "Les pièges à éviter",
        paragraphs: [
          "Ne travaillez jamais sans permis de travail si vous exercez une activité locale. Les contrôles existent et les amendes sont sévères, pouvant aller jusqu\u2019à la détention et l\u2019expulsion.",
          "Méfiez-vous des « prête-noms » (nominees) pour contourner la règle des 51 %. Cette pratique est illégale et peut entraîner la dissolution de votre entreprise.",
          "Faites appel à un avocat spécialisé en droit des affaires thaïlandais. L\u2019investissement de départ (50 000 à 100 000 bahts) vous évitera des problèmes bien plus coûteux.",
        ],
      },
    ],
  },
  {
    slug: "sante-bien-etre-hopitaux-yoga-retraites",
    title: "Santé et bien-être : Hôpitaux, yoga et retraites",
    excerpt:
      "Hôpitaux privés de classe mondiale, retraites yoga et méditation, spas authentiques et programmes fitness. Rester en forme sous les tropiques.",
    category: "Santé & Bien-être",
    readTime: "8 min",
    date: "10 janvier 2026",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    imageAlt: "Wellness spa yoga",
    content: [
      {
        heading: "Les hôpitaux privés de classe mondiale",
        paragraphs: [
          "La Thaïlande est une destination de tourisme médical reconnue mondialement. Bumrungrad International Hospital à Bangkok accueille 1,1 million de patients étrangers par an.",
          "Les hôpitaux privés offrent un service hôtelier : chambres individuelles climatisées, interprètes, cuisine de qualité et suivi personnalisé. Tout cela à des tarifs 50 à 80 % inférieurs à ceux de l\u2019Europe.",
          "Pour les urgences, les cliniques de quartier gèrent les problèmes courants. Pour tout ce qui est plus sérieux, dirigez-vous vers un hôpital privé avec votre carte d\u2019assurance.",
        ],
      },
      {
        heading: "Yoga et méditation",
        paragraphs: [
          "La Thaïlande est un paradis pour le yoga et la méditation. Des studios modernes de Bangkok aux retraites en pleine nature à Koh Phangan ou Chiang Mai, les options sont infinies.",
          "Les cours de yoga coûtent entre 200 et 500 bahts (5 à 13 €). Les forfaits mensuels dans les studios de Bangkok tournent autour de 3 000 à 5 000 bahts.",
          "Les retraites de méditation dans les temples bouddhistes sont souvent gratuites (sur donation). Wat Suan Mokkh à Surat Thani propose des retraites de 10 jours très réputées.",
        ],
      },
      {
        heading: "Fitness et sport",
        paragraphs: [
          "Les salles de sport modernes (Fitness First, Virgin Active, Jetts) sont présentes dans tous les grands centres commerciaux. Abonnements entre 1 500 et 3 000 bahts par mois.",
          "Le Muay Thai (boxe thaïlandaise) est une expérience à ne pas manquer. De nombreux camps proposent des cours pour débutants entre 300 et 500 bahts la séance.",
          "La course à pied se pratique dans les parcs (Lumpini Park, Benjakitti Park à Bangkok) tôt le matin ou en fin de journée pour éviter la chaleur.",
        ],
      },
      {
        heading: "Spas et massages thaïlandais",
        paragraphs: [
          "Le massage thaïlandais traditionnel est un art séculaire. Une heure coûte entre 200 et 400 bahts dans un salon de quartier (5 à 10 €). Les spas haut de gamme vont de 1 500 à 5 000 bahts.",
          "Ne quittez pas la Thaïlande sans essayer le massage aux herbes chaudes (luk pra kob) ou le massage à l\u2019huile. Votre corps vous remerciera après l\u2019adaptation aux tropiques.",
        ],
      },
    ],
  },
  {
    slug: "dengue-paludisme-precautions-essentielles",
    title: "Dengue, paludisme : Précautions essentielles",
    excerpt:
      "Risques sanitaires tropicaux, précautions indispensables (moustiquaires, répulsifs, vaccins), reconnaissance des symptômes et quand consulter un médecin.",
    category: "Santé & Bien-être",
    readTime: "6 min",
    date: "5 janvier 2026",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    imageAlt: "Nature tropicale Thaïlande",
    content: [
      {
        heading: "La dengue : le risque numéro un",
        paragraphs: [
          "La dengue est transmise par les moustiques Aedes, actifs pendant la journée. Elle est présente toute l\u2019année mais plus fréquente pendant la saison des pluies (juin à octobre).",
          "Les symptômes apparaissent 4 à 7 jours après la piqûre : fièvre élevée soudaine, maux de tête intenses, douleurs musculaires et articulaires, et parfois une éruption cutanée.",
          "Il n\u2019existe pas de traitement spécifique. Le repos, l\u2019hydratation et le paracétamol sont recommandés. Évitez absolument l\u2019aspirine et l\u2019ibuprofène qui augmentent le risque hémorragique.",
        ],
      },
      {
        heading: "Le paludisme : un risque localisé",
        paragraphs: [
          "Le paludisme est quasi inexistant à Bangkok, Chiang Mai et dans les zones touristiques. Le risque existe principalement dans les zones frontalières avec le Myanmar et le Cambodge.",
          "Si vous voyagez dans ces zones, consultez un médecin pour un traitement préventif. La Malarone ou la Doxycycline sont les prophylaxies les plus courantes.",
        ],
      },
      {
        heading: "Se protéger efficacement",
        paragraphs: [
          "Utilisez un répulsif contenant du DEET (30 à 50 %) ou de l\u2019icaridine. Appliquez-le sur les zones de peau exposées, surtout aux heures critiques (aube et crépuscule pour le paludisme, journée pour la dengue).",
          "Portez des vêtements longs et clairs le soir. Utilisez une moustiquaire imprégnée d\u2019insecticide si votre logement n\u2019est pas climatisé.",
          "Les diffuseurs électriques et les spirales anti-moustiques sont efficaces en complément. Vous les trouverez dans tous les 7-Eleven.",
        ],
      },
      {
        heading: "Quand consulter un médecin",
        paragraphs: [
          "Consultez immédiatement si vous avez une fièvre supérieure à 39°C qui dure plus de 2 jours, des douleurs abdominales intenses, des saignements inhabituels ou une fatigue extrême.",
          "Un test de dépistage de la dengue (NS1) est disponible dans toutes les cliniques et hôpitaux. Le résultat est disponible en quelques heures.",
          "N\u2019attendez pas : la dengue peut évoluer en forme sévère (dengue hémorragique) si elle n\u2019est pas surveillée. Mieux vaut une consultation inutile qu\u2019un retard de diagnostic.",
        ],
      },
    ],
  },
  {
    slug: "digital-nomad-visa-dtv-coworking",
    title: "Digital Nomad : Visa DTV et coworking",
    excerpt:
      "Visa DTV, coût de la vie imbattable, meilleurs espaces de coworking à Bangkok et Chiang Mai, et gestion des fuseaux horaires avec la France.",
    category: "Digital Nomad",
    readTime: "9 min",
    date: "1 janvier 2026",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    imageAlt: "Coworking digital nomad",
    content: [
      {
        heading: "Pourquoi la Thaïlande pour le travail remote",
        paragraphs: [
          "La Thaïlande combine un coût de la vie imbattable, une connexion internet fiable (fibre jusqu\u2019à 1 Gbps pour 600 bahts/mois), un fuseau horaire favorable (GMT+7) et une qualité de vie exceptionnelle.",
          "Avec un budget de 1 000 à 1 500 € par mois, vous vivez confortablement : appartement moderne, repas au restaurant tous les jours, salle de sport et loisirs inclus.",
        ],
      },
      {
        heading: "Le visa DTV en détail",
        paragraphs: [
          "Le Destination Thailand Visa (DTV) est conçu pour les travailleurs à distance. 180 jours, renouvelable une fois, pour 10 000 bahts. C\u2019est le visa le plus adapté aux digital nomads.",
          "Pour l\u2019obtenir, fournissez une preuve de revenu (contrats, fiches de paie, relevés bancaires) et un justificatif d\u2019activité remote. La demande peut se faire en ligne ou à l\u2019ambassade.",
          "Attention : le DTV ne vous autorise pas à travailler pour des entreprises thaïlandaises. Votre employeur ou vos clients doivent être basés à l\u2019étranger.",
        ],
      },
      {
        heading: "Les meilleurs coworkings",
        paragraphs: [
          "À Bangkok, The Hive (Sukhumvit, Sathorn) est le plus populaire : à partir de 5 000 bahts/mois pour un hot desk. AIS Design Center à Siam offre un espace gratuit avec achat de boisson.",
          "À Chiang Mai, Punspace et CAMP (au-dessus du Maya Mall, gratuit avec achat) sont les incontournables de la communauté nomade.",
          "Beaucoup de nomades travaillent depuis les cafés. La Thaïlande regorge de cafés avec WiFi rapide, prises électriques et climatisation. Comptez 100 à 200 bahts de consommation pour y passer la journée.",
        ],
      },
      {
        heading: "Gérer le décalage horaire avec la France",
        paragraphs: [
          "Le décalage est de 6h en hiver et 5h en été (la Thaïlande ne change pas d\u2019heure). Quand il est 9h à Paris, il est 15h à Bangkok.",
          "Stratégie : commencez votre journée thaïlandaise tôt (7h-8h) pour vos tâches solo, et gardez l\u2019après-midi (14h-18h heure locale) pour les meetings avec la France (8h-12h heure française).",
          "Cette organisation vous libère les soirées pour profiter de la vie thaïlandaise : marchés nocturnes, restaurants, ou tout simplement un coucher de soleil sur le rooftop.",
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(currentSlug: string, limit = 3): Article[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return articles.slice(0, limit);
  return articles
    .filter((a) => a.slug !== currentSlug && a.category === current.category)
    .slice(0, limit)
    .concat(
      articles.filter((a) => a.slug !== currentSlug && a.category !== current.category)
    )
    .slice(0, limit);
}
