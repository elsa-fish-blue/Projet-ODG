// Données centrales : questions, couleurs, membres du groupe et contenu détaillé

// Structure d'une sous-sous-question (feuille de l'arbre)
export interface SubSubQuestion {
  id: string;
  label: string;
  angle: number;        // angle de positionnement autour du nœud parent (en degrés)
  content: ContentBlock[]; // contenu affiché dans la page de détail
}

// Bloc de contenu : texte simple ou formule LaTeX
export type ContentBlock =
  | { type: "text"; value: string }
  | { type: "latex"; value: string }       // formule inline
  | { type: "latex-block"; value: string }; // formule centrée (display)

// Structure d'une branche principale
export interface Branch {
  id: string;
  label: string;
  color: string;       // couleur principale (branches, bordures)
  colorLight: string;  // couleur claire (fond des nœuds)
  colorDark: string;   // couleur foncée (texte, bordures épaisses)
  angle: number;       // angle de la branche par rapport au centre
  subQuestions: SubSubQuestion[];
}

// Question centrale du projet
export const MAIN_QUESTION =
  "Est-ce crédible de dévier ou faire exploser avec une bombe atomique un astéroïde de la taille du Texas qui se précipite vers la Terre ?";

// Conseil de lecture dans l'ordre logique (déviation avant explosion)
export const READING_ORDER =
  "Nous vous conseillons de commencer par les caractéristiques de l'astéroïde afin de poser les bases physiques du problème. Passez ensuite à la déviation, première stratégie envisagée, puis terminez par l'explosion par bombe atomique, solution plus radicale.";

// Membres du groupe (3 personnes)
export const GROUP_MEMBERS = [
  { name: "Prénom Nom 1" },
  { name: "Prénom Nom 2" },
  { name: "Prénom Nom 3" },
];

// Les trois branches principales
export const BRANCHES: Branch[] = [
  {
    // Branche 1 : caractéristiques physiques de l'astéroïde
    id: "caracteristiques",
    label: "Quelles sont les caractéristiques de cet astéroïde ?",
    color: "#B07D3A",
    colorLight: "#FBF5E9",
    colorDark: "#7A5220",
    angle: 210,
    subQuestions: [
      {
        id: "vitesse",
        label: "Vitesse",
        angle: 245,
        content: [
          {
            type: "text",
            value:
              "La vitesse d'un astéroïde en approche de la Terre est typiquement comprise entre 10 et 70 km/s. Pour un objet géocroiseur, on retient généralement une vitesse relative d'environ 20 km/s au moment de l'impact.",
          },
          {
            type: "text",
            value:
              "Cette vitesse est à comparer à la vitesse d'une balle de fusil (~1 km/s) ou d'un avion de chasse (~0,7 km/s) pour apprécier l'ordre de grandeur.",
          },
          {
            type: "latex-block",
            value: "v \\approx 20 \\text{ km/s} = 2 \\times 10^4 \\text{ m/s}",
          },
        ],
      },
      {
        id: "volume",
        label: "Volume",
        angle: 300,
        content: [
          {
            type: "text",
            value:
              "Le Texas couvre une superficie d'environ 696 000 km². En modélisant l'astéroïde comme une sphère dont le diamètre équivaut à la plus grande dimension du Texas (environ 1 270 km), on obtient un rayon R ≈ 635 km.",
          },
          {
            type: "latex-block",
            value: "V = \\frac{4}{3}\\pi R^3 \\approx \\frac{4}{3}\\pi \\times (6{,}35 \\times 10^5)^3 \\approx 1{,}07 \\times 10^{18} \\text{ m}^3",
          },
          {
            type: "text",
            value:
              "Ce volume est colossal : il représente environ 1/1 000e du volume de la Terre. La modélisation sphérique reste une approximation, les astéroïdes ayant des formes très irrégulières.",
          },
        ],
      },
      {
        id: "masse",
        label: "Masse",
        angle: 165,
        content: [
          {
            type: "text",
            value:
              "Pour estimer la masse de l'astéroïde, on modélise son volume comme celui d'une sphère de rayon R, et on utilise une densité moyenne ρ caractéristique des astéroïdes rocheux (environ 2 500 kg/m³).",
          },
          {
            type: "text",
            value: "Le volume d'une sphère s'écrit :",
          },
          {
            type: "latex-block",
            value: "V = \\frac{4}{3}\\pi R^3",
          },
          {
            type: "text",
            value:
              "La masse est alors obtenue par la relation fondamentale liant masse, densité et volume :",
          },
          {
            type: "latex-block",
            value: "m = \\rho \\cdot V = \\rho \\cdot \\frac{4}{3}\\pi R^3",
          },
          {
            type: "text",
            value:
              "Le Texas s'étend sur environ 1 270 km dans sa plus grande dimension. En assimilant le rayon à R ≈ 635 km = 6,35 × 10⁵ m, et en prenant ρ = 2 500 kg/m³, on obtient :",
          },
          {
            type: "latex-block",
            value:
              "m \\approx 2500 \\times \\frac{4}{3}\\pi \\times (6{,}35\\times10^5)^3 \\approx 2{,}67 \\times 10^{21} \\text{ kg}",
          },
          {
            type: "text",
            value:
              "À titre de comparaison, la masse de la Lune est d'environ 7,3 × 10²² kg. Cet astéroïde représenterait donc environ 3,7 % de la masse lunaire — un objet colossal à l'échelle humaine, mais modeste à l'échelle planétaire.",
          },
        ],
      },
      {
        id: "energie",
        label: "Énergie cinétique",
        angle: 120,
        content: [
          {
            type: "text",
            value:
              "L'énergie cinétique est la grandeur physique centrale de ce problème. Elle traduit la quantité d'énergie qu'il faudrait fournir (ou absorber) pour arrêter ou dévier l'astéroïde.",
          },
          {
            type: "latex-block",
            value: "E_c = \\frac{1}{2}mv^2",
          },
          {
            type: "text",
            value:
              "En prenant m ≈ 2,67 × 10²¹ kg et v = 2 × 10⁴ m/s :",
          },
          {
            type: "latex-block",
            value:
              "E_c = \\frac{1}{2} \\times 2{,}67 \\times 10^{21} \\times (2\\times10^4)^2 \\approx 5{,}3 \\times 10^{29} \\text{ J}",
          },
          {
            type: "text",
            value:
              "À titre de comparaison, la bombe thermonucléaire la plus puissante jamais testée (la Tsar Bomba soviétique, 50 mégatonnes) a libéré environ 2 × 10¹⁷ J. Il faudrait donc l'équivalent de plusieurs milliards de Tsar Bombas pour égaler l'énergie cinétique de cet astéroïde.",
          },
        ],
      },
    ],
  },
  {
    // Branche 2 : explosion par bombe atomique
    id: "explosion",
    label: "Peut-on faire exploser l'astéroïde grâce à une bombe atomique ?",
    color: "#9E3A2F",
    colorLight: "#FBF0EE",
    colorDark: "#6B2218",
    angle: 330,
    subQuestions: [
      {
        id: "puissance",
        label: "Puissance d'une bombe atomique",
        angle: 30,
        content: [
          {
            type: "text",
            value:
              "La puissance d'une bombe nucléaire s'exprime en mégatonnes de TNT (Mt). La Tsar Bomba, l'arme nucléaire la plus puissante jamais testée, avait une puissance d'environ 50 Mt, soit 2,1 × 10¹⁷ J.",
          },
          {
            type: "latex-block",
            value: "1 \\text{ Mt TNT} = 4{,}184 \\times 10^{15} \\text{ J}",
          },
          {
            type: "text",
            value:
              "Les bombes modernes en service ont des puissances de l'ordre de 100 kt à quelques Mt. L'arsenal nucléaire mondial total représente environ 10 000 têtes nucléaires, soit une énergie totale de l'ordre de 10²¹ J.",
          },
        ],
      },
      {
        id: "taille-bombe",
        label: "Taille de la bombe",
        angle: 80,
        content: [
          {
            type: "text",
            value:
              "Une bombe thermonucléaire de type B83 (la plus puissante en service aux États-Unis, 1,2 Mt) pèse environ 1 100 kg pour une longueur de 3,7 m. Elle pourrait théoriquement être emportée par une fusée.",
          },
          {
            type: "text",
            value:
              "La contrainte principale n'est pas la taille physique mais la masse totale à mettre en orbite puis à propulser vers l'astéroïde. Chaque kilogramme en orbite basse coûte actuellement entre 2 000 et 10 000 dollars US.",
          },
        ],
      },
      {
        id: "surface",
        label: "Explosion à la surface",
        angle: 330,
        content: [
          {
            type: "text",
            value:
              "Une explosion en surface crée une onde de choc qui se propage à travers l'astéroïde. Cependant, une grande partie de l'énergie est rayonnée dans l'espace (sans atmosphère pour la confiner).",
          },
          {
            type: "text",
            value:
              "Le résultat le plus probable n'est pas la désintégration mais la fragmentation en plusieurs morceaux, dont certains pourraient continuer sur une trajectoire similaire. Cette technique est donc potentiellement contre-productive.",
          },
        ],
      },
      {
        id: "trou-centre",
        label: "Explosion depuis un trou au centre",
        angle: 285,
        content: [
          {
            type: "text",
            value:
              "L'idée est de forer un tunnel jusqu'au centre de l'astéroïde pour y placer la bombe. L'explosion interne transmettrait l'énergie de façon plus homogène, potentiellement suffisante pour vaporiser ou pulvériser l'objet.",
          },
          {
            type: "text",
            value:
              "La profondeur nécessaire pour un objet de 635 km de rayon est de plusieurs centaines de kilomètres. À titre de comparaison, le forage le plus profond jamais réalisé sur Terre (Kola, Russie) n'a atteint que 12 km en 20 ans.",
          },
        ],
      },
      {
        id: "limites-explosion",
        label: "Limites de cette technique",
        angle: 140,
        content: [
          {
            type: "text",
            value:
              "Les principales limites de l'explosion nucléaire comme méthode de destruction sont : l'énergie disponible (insuffisante de plusieurs ordres de grandeur), la fragmentation non contrôlée, l'absence d'atmosphère qui réduit l'efficacité de l'onde de choc, et les délais de préparation.",
          },
          {
            type: "text",
            value:
              "Le rapport entre l'énergie cinétique de l'astéroïde (≈ 5 × 10²⁹ J) et l'énergie de toutes les bombes nucléaires mondiales (≈ 10²¹ J) est d'environ 10⁸ : il faudrait 100 millions de fois l'arsenal nucléaire mondial.",
          },
          {
            type: "latex-block",
            value:
              "\\frac{E_c}{E_{\\text{nucl. mondial}}} \\approx \\frac{5\\times10^{29}}{10^{21}} = 5\\times10^8",
          },
        ],
      },
      {
        id: "autres-explosion",
        label: "Autres considérations",
        angle: 195,
        content: [
          {
            type: "text",
            value:
              "Le Traité de l'espace extra-atmosphérique de 1967 (signé par plus de 100 pays) interdit formellement le déploiement d'armes nucléaires dans l'espace. Toute mission nucléaire nécessiterait donc un consensus international.",
          },
          {
            type: "text",
            value:
              "Des études de la NASA (programme DART, 2022) et de l'ESA explorent des alternatives : impacteur cinétique, remorqueur gravitationnel, propulsion laser. La déviation semble plus réaliste que la destruction pour des objets de grande taille.",
          },
        ],
      },
    ],
  },
  {
    // Branche 3 : déviation de l'astéroïde
    id: "deviation",
    label: "La déviation de l'astéroïde est-elle envisageable ?",
    color: "#4A7C59",
    colorLight: "#EEF5F1",
    colorDark: "#2E5C3A",
    angle: 90,
    subQuestions: [
      {
        id: "vitesse-fusee",
        label: "Vitesse de la fusée",
        angle: 40,
        content: [
          {
            type: "text",
            value:
              "Une fusée moderne comme Falcon Heavy peut atteindre une vitesse d'environ 11 km/s en orbite d'échappement. Pour rejoindre un astéroïde en approche, il faut calculer une trajectoire de transfert.",
          },
          {
            type: "text",
            value:
              "La vitesse nécessaire pour modifier significativement la trajectoire de l'astéroïde dépend de la masse de celui-ci et du temps disponible. Plus on intervient tôt, moins la variation de vitesse (Δv) nécessaire est grande.",
          },
          {
            type: "latex-block",
            value: "\\Delta v = \\frac{F \\cdot t}{m_{\\text{astéroïde}}}",
          },
        ],
      },
      {
        id: "distance-reperage",
        label: "Distance maximale de repérage",
        angle: 100,
        content: [
          {
            type: "text",
            value:
              "Les télescopes actuels (comme le programme Catalina Sky Survey) peuvent détecter un astéroïde de 1 km à plusieurs années d'avance. Un objet de la taille du Texas serait détecté des décennies à l'avance.",
          },
          {
            type: "text",
            value:
              "La distance maximale de détection dépend de l'albédo (réflectivité) de l'astéroïde et de la sensibilité du télescope. Pour un objet rocheux classique, la détection est possible à plusieurs UA (unités astronomiques, 1 UA ≈ 1,5 × 10⁸ km).",
          },
        ],
      },
      {
        id: "collision-face",
        label: "Collision de face",
        angle: 155,
        content: [
          {
            type: "text",
            value:
              "Un impacteur cinétique envoyé en sens inverse de l'astéroïde maximise le transfert d'impulsion. La vitesse relative lors d'une collision frontale est la somme des deux vitesses.",
          },
          {
            type: "latex-block",
            value: "v_{\\text{rel}} = v_{\\text{astéroïde}} + v_{\\text{fusée}} \\approx 20 + 11 = 31 \\text{ km/s}",
          },
          {
            type: "text",
            value:
              "La quantité de mouvement transférée est p = m_fusée × v_rel. Avec une fusée de 50 000 kg, cela donne environ 1,55 × 10⁹ kg·m/s, à comparer à l'impulsion totale de l'astéroïde : m × v ≈ 5 × 10²⁵ kg·m/s. L'effet est infime.",
          },
        ],
      },
      {
        id: "collision-cote",
        label: "Collision de côté",
        angle: 210,
        content: [
          {
            type: "text",
            value:
              "Une collision latérale vise à dévier légèrement la trajectoire plutôt qu'à l'arrêter. Même un infime changement d'angle, appliqué suffisamment tôt, peut faire manquer la Terre à l'astéroïde.",
          },
          {
            type: "text",
            value:
              "C'est le principe démontré par la mission DART de la NASA (2022), qui a réussi à modifier l'orbite de l'astéroïde Dimorphos de 32 minutes — une variation bien supérieure aux prévisions.",
          },
          {
            type: "latex-block",
            value: "\\delta\\theta \\approx \\frac{m_{\\text{fusée}} \\cdot v_{\\text{rel}}}{m_{\\text{astéroïde}} \\cdot v_{\\text{astéroïde}}}",
          },
        ],
      },
      {
        id: "limites-deviation",
        label: "Limites de la déviation",
        angle: 275,
        content: [
          {
            type: "text",
            value:
              "Pour un astéroïde de la taille du Texas, le rapport de masse entre la fusée et l'astéroïde est de l'ordre de 10⁻¹⁷. La déviation angulaire obtenue par un impacteur cinétique serait de l'ordre de 10⁻¹⁷ radians — totalement insuffisant.",
          },
          {
            type: "text",
            value:
              "Les méthodes de déviation (impacteur cinétique, remorqueur gravitationnel, pression de radiation) sont efficaces pour des astéroïdes de quelques kilomètres avec des décennies d'anticipation. Pour un objet de 1 270 km, elles sont impraticables.",
          },
        ],
      },
      {
        id: "autres-deviation",
        label: "Autres considérations",
        angle: 335,
        content: [
          {
            type: "text",
            value:
              "Parmi les techniques alternatives, le remorqueur gravitationnel consiste à maintenir un engin spatial à proximité de l'astéroïde pendant plusieurs années, en utilisant l'attraction gravitationnelle mutuelle pour le dévier lentement.",
          },
          {
            type: "text",
            value:
              "La pression de radiation (peindre l'astéroïde en blanc pour modifier son albédo et donc l'effet Yarkovsky) ou les lasers spatiaux sont également étudiés. Toutes ces méthodes nécessitent des décennies d'anticipation et sont inapplicables à un objet de la taille du Texas.",
          },
        ],
      },
    ],
  },
];
