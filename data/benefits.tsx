// import benefitOneImg from '../public/static/images/benefit-one.png'
import benefitOneImg from '../public/static/images/team-03.png'
import benefitTwoImg from '../public/static/images/infra-05.png'
import {
  CheckBadgeIcon,
  RocketLaunchIcon,
  LinkIcon,
  ServerStackIcon,
  PresentationChartLineIcon,
} from '@heroicons/react/24/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsSpin, faHandshake, faSackDollar } from '@fortawesome/free-solid-svg-icons'

const devOps = {
  en: {
    title: 'DevOps is about...',
    desc: '',
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
    desc: '',
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
    desc: '',
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
    title: 'Le DevOps, c’est aussi...',
    desc: '',
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

export { devOps, cloud }
