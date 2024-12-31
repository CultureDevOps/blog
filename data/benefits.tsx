import {
  CheckBadgeIcon,
  RocketLaunchIcon,
  LinkIcon,
  ServerStackIcon,
  PresentationChartLineIcon,
} from '@heroicons/react/24/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsSpin, faHandshake, faSackDollar } from '@fortawesome/free-solid-svg-icons'

const benefitOneImg = '/static/images/assets/team-meeting-06.png'
const benefitTwoImg = '/static/images/assets/data-center-04.png'
const benefitThreeImg = '/static/images/assets/developer-desktop-01.png'
const benefitFourImg = '/static/images/assets/team-board-office-01.png'

const devOps = {
  en: {
    title: 'DevOps is about...',
    desc: 'DevOps is a culture that brings together development and operations teams to deliver software faster, more reliably, and more efficiently.',
    image: benefitOneImg,
    bullets: [
      {
        title: 'Improving collaboration',
        desc: 'DevOps breaks down the barriers between development (Dev) and operations (Ops) teams, enabling closer and more integrated collaboration.',
        icon: <FontAwesomeIcon icon={faHandshake} />,
      },
      {
        title: 'Accelerating the software lifecycle',
        desc: 'Automate development, testing, and deployment processes to deliver updates faster and more frequently.',
        icon: <FontAwesomeIcon icon={faArrowsSpin} />,
      },
      {
        title: 'Increasing software quality',
        desc: "With practices like Continuous Integration (CI) and Continuous Deployment (CD), DevOps allows for earlier detection and correction of errors, ensuring better code quality.",
        icon: <CheckBadgeIcon />,
      },
      {
        title: 'Reducing time-to-market',
        desc: "DevOps enables teams to release new features or products faster while remaining agile in responding to user needs.",
        icon: <RocketLaunchIcon />,
      },
    ],
  },
  fr: {
    title: 'Le DevOps c\'est...',
    desc: 'Le DevOps, c\'est une culture qui réunit les équipes de développement et d\'exploitation pour livrer des logiciels plus rapidement, plus fiablement et de manière plus efficace.',
    image: benefitOneImg,
    bullets: [
      {
        title: 'Améliorer la collaboration',
        desc: 'DevOps casse les barrières entre les équipes de développement (Dev) et d\'opérations (Ops), permettant une collaboration plus étroite et intégrée.',
        icon: <FontAwesomeIcon icon={faHandshake} />,
      },
      {
        title: 'Accélérer le cycle de vie du logiciel',
        desc: 'Automatisez les processus de développement, de test et de déploiement pour livrer des mises à jour plus rapides et fréquentes.',
        icon: <FontAwesomeIcon icon={faArrowsSpin} />,
      },
      {
        title: 'Augmenter la qualité du software',
        desc: "Avec des pratiques comme l\'intégration continue (CI) et le déploiement continu (CD), le DevOps permet de détecter et corriger les erreurs plus tôt, garantissant une meilleure qualité du code.",
        icon: <CheckBadgeIcon />,
      },
      {
        title: 'Réduire le time-to-market',
        desc: "Libérez le potentiel de votre équipe pour sortir de nouvelles fonctionnalités ou produits plus rapidement, tout en répondant plus agilement aux besoins des utilisateurs.",
        icon: <RocketLaunchIcon />,
      },
    ],
  },
}

const cloud = {
  en: {
    title: 'DevOps is also...',
    desc: 'DevOps helps optimize not only software development but also infrastructure management through automation and configuration management.',
    image: benefitTwoImg,
    bullets: [
      {
        title: 'Optimizing infrastructure management',
        desc: 'Infrastructure as Code (IaC) tools make infrastructure management and provisioning more efficient and reproducible.',
        icon: <ServerStackIcon />,
      },
      {
        title: 'Improving reliability and resilience',
        desc: 'DevOps implements monitoring and incident management systems to ensure the stability and resilience of applications in production.',
        icon: <LinkIcon />,
      },
      {
        title: 'Reducing costs',
        desc: 'Automation and better resource management help reduce operational costs while maintaining quality.',
        icon: <FontAwesomeIcon icon={faSackDollar} />,
      },
      {
        title: 'Promoting a culture of feedback',
        desc: 'Continuous feedback between all stakeholders drives continuous improvement of products and processes, creating a culture of ongoing progress.',
        icon: <PresentationChartLineIcon />,
      },
    ],
  },
  fr: {
    title: 'Le DevOps, c\'est aussi...',
    desc: 'DevOps permet d\'optimiser non seulement le développement logiciel, mais aussi la gestion des infrastructures grâce à l\'automatisation et à la gestion des configurations.',
    image: benefitTwoImg,
    bullets: [
      {
        title: 'Optimiser la gestion des infrastructures',
        desc: 'Les outils d\'infrastructure en tant que code (IaC) rendent la gestion et le provisionnement des infrastructures plus efficaces et reproductibles.',
        icon: <ServerStackIcon />,
      },
      {
        title: 'Améliorer la fiabilité et la résilience',
        desc: 'Le DevOps met en place des systèmes de monitoring et de gestion des incidents pour assurer la stabilité et la résilience des applications en production.',
        icon: <LinkIcon />,
      },
      {
        title: 'Réduire les coûts',
        desc: 'L\'automatisation et une meilleure gestion des ressources permettent de diminuer les coûts opérationnels tout en maintenant la qualité.',
        icon: <FontAwesomeIcon icon={faSackDollar} />,
      },
      {
        title: 'Favoriser la culture du feedback',
        desc: 'Le feedback continu entre toutes les parties prenantes favorise l\'amélioration constante des produits et des processus, créant ainsi une culture de progrès continu.',
        icon: <PresentationChartLineIcon />,
      },
    ],
  },
}

const services = {
  en: {
    title: 'What I can do for you',
    desc: 'I optimize your IT processes to make your teams more agile, collaborative, and efficient through a tailored DevOps approach.',
    image: benefitThreeImg,
    bullets: [
      {
        title: 'CI/CD pipeline optimization',
        desc: 'Improve speed and reliability in your software deliveries.',
        icon: <RocketLaunchIcon />, 
      },
      {
        title: 'Cloud infrastructure automation',
        desc: 'Deploy scalable and reproducible environments using Infrastructure as Code.',
        icon: <ServerStackIcon />, 
      },
      {
        title: 'DevOps training for teams',
        desc: 'Empower your teams with best practices for adopting DevOps.',
        icon: <PresentationChartLineIcon />, 
      },
      {
        title: 'DevOps process audit and improvement',
        desc: 'Identify bottlenecks and optimize your IT workflows.',
        icon: <FontAwesomeIcon icon={faArrowsSpin} />, 
      },
    ],
  },
  fr: {
    title: 'Ce que je peux faire pour vous',
    desc: 'J\'optimise vos processus IT pour rendre vos équipes plus agiles, collaboratives et performantes grâce à une approche DevOps sur-mesure.',
    image: benefitThreeImg,
    bullets: [
      {
        title: 'Optimisation des pipelines CI/CD',
        desc: 'Gagnez en rapidité et en fiabilité dans vos livraisons logicielles.',
        icon: <RocketLaunchIcon />, 
      },
      {
        title: 'Automatisation de vos infrastructures Cloud',
        desc: 'Déployez des environnements reproductibles et scalables grâce à l\'Infrastructure As Code (IaC).',
        icon: <ServerStackIcon />, 
      },
      {
        title: 'Formation DevOps pour vos équipes',
        desc: 'Accompagnez vos équipes dans l\'adoption des bonnes pratiques DevOps.',
        icon: <PresentationChartLineIcon />, 
      },
      {
        title: 'Audit et amélioration de vos process DevOps',
        desc: 'Identifiez les freins et optimisez vos workflows IT.',
        icon: <FontAwesomeIcon icon={faArrowsSpin} />, 
      },
    ],
  },
}

const experience = {
  en: {
    title: 'DevOps Expertise Backed by Certification',
    desc: "With over 17 years in IT and a DevOps Foundation certification from the DevOps Institute (2021), I bring a unique blend of experience and continuous learning to help your business innovate and scale.",
    image: benefitFourImg,
    bullets: [
      {
        title: 'Certified DevOps Professional',
        desc: 'DevOps Foundation certification obtained in 2021 from the DevOps Institute.',
        icon: <CheckBadgeIcon />,
      },
      {
        title: 'DevOps Specialist since 2018',
        desc: 'Transforming IT workflows with hands-on expertise in CI/CD and automation.',
        icon: <RocketLaunchIcon />,
      },
      {
        title: 'Versatility and Adaptability',
        desc: 'Broad technical foundation across Ansible, Javascript, Java, Python, Docker, and more.',
        icon: <PresentationChartLineIcon />,
      }, 
    ],
  },
  fr: {
    title: 'Expertise DevOps Certifiée',
    desc: "Fort de plus de 17 ans dans l'IT et d'une certification DevOps Foundation délivrée par le DevOps Institute (2021), j'apporte un mélange unique d'expérience et d'apprentissage continu pour aider votre entreprise à innover et évoluer.",
    image: benefitFourImg,
    bullets: [
      {
        title: 'Professionnel certifié DevOps',
        desc: 'Certification DevOps Foundation obtenue en 2021 auprès du DevOps Institute.',
        icon: <CheckBadgeIcon />,
      },
      {
        title: 'Spécialiste DevOps depuis 2018',
        desc: 'Transformation des workflows IT grâce à une expertise pratique en CI/CD et automatisation.',
        icon: <RocketLaunchIcon />,
      },
      {
        title: 'Polyvalence et adaptabilité',
        desc: 'Base technique étendue couvrant Ansible, Javascript, Java, Python, Docker et plus encore.',
        icon: <PresentationChartLineIcon />,
      },
    ],
  },
};


export { devOps, cloud, services, experience }
