export const translations = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      articles: "Articles",
      posts: "Posts",
      projects: "Projects",
      archives: "Archives",
      tags: "Tags",
      search: "Search",
      blog: "Blog",
      contact: "Contact"
    },
    hero: {
      status: "Available for new projects",
      title: "NDEZE BONHEUR EMMANUEL",
      accent: "Network and Software Engineer building scalable, reliable, and secure systems.",
      centerpiece: "Good engineering is about clarity, scalability, and building solutions that last.",
      ctaBuild: "What I Build",
      ctaInsights: "Insights & Articles",
      welcome: "Hi, I'm",
      roles: ["Network Engineer", "Software Engineer"],
      ctaContact: "Contact Me"
    },
    about: {
      badge: "01 / Architectural Focus",
      title: "Bridging Software And Physical Infrastructure",
      p1: "I build systems where network engineering, automation, and backend architectures converge. Focused on resilient data flows, performant APIs, and low-latency infrastructure.",
      p2: "Software and infrastructure are two sides of the same coin. I engineer unified, scalable systems built for production reliability.",
      pillar1Title: "Software Developer",
      pillar1Desc: "Scalable backend systems, performant APIs, clean architecture, and automation with an infrastructure-first mindset.",
      pillar2Title: "Network Engineer",
      pillar2Desc: "Resilient enterprise routing, switching, secure VPNs, telemetry, and automated network infrastructure."
    },
    skills: {
      badge: "02 / Expert Capabilities",
      title: "Technical Expertise",
      description: "A production-proven skillset balanced between designing robust systems and engineering high-availability network infrastructures.",
      pillars: {
        dev: {
          title: "Software Developer",
          subtitle: "Engineered Backend Architectures & Scalable Systems",
          description: "Designing reliable RESTful APIs, optimizing relational databases, and architecting distributed backend pipelines with low-latency execution.",
          groups: {
            g1: "Languages & Frameworks",
            g2: "Databases & Storage",
            g3: "Infrastructure & Tooling"
          }
        },
        net: {
          title: "Network Engineer",
          subtitle: "High-Availability Enterprise Networking & Security",
          description: "Designing, deploying, and hardening multi-site routing architectures, switching loops, secure VPN tunnels, and automated configurations.",
          groups: {
            g1: "Routing & Switching",
            g2: "Network Security & Hardware",
            g3: "Analysis & Automation"
          }
        }
      }
    },
    contact: {
      badge: "LET'S CONNECT",
      title: "Let’s Build & Engineer Together",

      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",

      send: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "Failed to send message.",

      btnPending: "Establishing Connection...",
      btnTransmit: "Transmit Message",

      placeholders: {
      name: "[NAMES]",
      email: "[EMAIL_ADDRESS]",
      subject: "Backend Architecture / Network Infrastructure",
      message: "Tell me about your project, technical challenges, infrastructure goals, or scaling requirements..."
      },

      infos: {
        title: "Contact Information",
        description:
          "Whether you need a backend developer, a network engineer, or a systems architect to bridge both worlds, I design reliable, scalable, and efficient solutions tailored to real operational needs.",
        location: "Location",
        emailLabel: "Email",

        devFocus: "Software Development",
        devDesc:
          "Scalable backend systems, high-performance APIs, secure database architecture, and maintainable software solutions built for growth.",

        netFocus: "Network Engineering",
        netDesc:
          "Secure and resilient network infrastructure, routing and switching optimization, troubleshooting, automation, and Cisco-based integrations.",
        }
      },
    platforms: {
      badge: "02 / Platforms & Systems I Build",
      intro: "Explore core platforms, toolkits, and automation ecosystems I've engineered across software and network infrastructure.",
      biasharaOne: {
        badge: "Multi-Tenant SaaS Platform",
        title: "BiasharaOne Platform",
        p1: "BiasharaOne is a unified SaaS ecosystem combining multi-store inventory, customer workflows, secure payments, and sales orchestration.",
        p2: "Engineered with modular Django REST APIs, PostgreSQL, Next.js, and automated Docker CI/CD deployments.",
        p3: "Explore the organization and architecture on GitHub.",
        detailedP1: "BiasharaOne provides commerce automation for growing businesses with multi-branch stock tracking and secure transactions.",
        detailedP2: "Built around scalable backend APIs, strict access controls, caching layers, and production deployment workflows.",
        detailedP3: "Designed for high throughput, data integrity, and multi-currency billing.",
        arch: "System Architecture",
        tag1: "Multi-Tenant Engine",
        tag2: "Django REST API",
        tag3: "Next.js Admin",
        tag4: "Role-Based ACL",
        tag5: "Caching Layers",
        tag6: "CI/CD Docker",
        ctaOrg: "View on GitHub"
      },
      netpulse: {
        badge: "Networking & CLI Automation",
        title: "NetPulse Toolkit",
        p1: "NetPulse is an async Python CLI toolkit for network diagnostics, fast port scanning, ICMP telemetry, and infrastructure inspection.",
        p2: "Powered by an async IO engine. Available on PyPI and GitHub with comprehensive technical documentation.",
        detailedP1: "NetPulse provides network diagnostics and device discovery with a lightweight, cross-platform terminal interface.",
        detailedP2: "Engineered for speed, performance, and cross-platform compatibility across systems.",
        diag: "Diagnostics Stack",
        tag1: "Python / PyPI",
        tag2: "Port Scanner",
        tag3: "Async IO Engine",
        tag4: "ICMP / UDP Pings",
        tag5: "DNS Resolution",
        tag6: "CLI Framework",
        ctaRepo: "View Repository",
        ctaPypi: "View on PyPI"
      },
      moreProjects: {
        title: "Explore More Projects & Experiments",
        desc: "Browse open-source repositories, network automation tools, and research notes.",
        ctaGithub: "GitHub Profile",
        ctaPages: "View More"
      }
    },
    blog: {
      badge: "03 / INSIGHTS & ARTICLES",
      title: "Latest Blogs",
      viewBlog: "View blog",
      readBlog: "Read blog",
      featured: "Featured Article",
      searchPlaceholder: "Search articles...",
      noArticlesTitle: "No articles found",
      noArticlesDesc: "No matching posts were found for \"{search}\" in {category}.",
      clearFilters: "Clear all filters",
      categories: {
        all: "All",
        networking: "Networking",
        product: "Product",
        software_dev: "Software dev",
        system_admin: "System Admin",
        all_categories: "all categories"
      },
      reader: {
        copied: "Copied!",
        copy: "Copy",
        back: "Back to blog",
        details: "Article details",
        published: "Published",
        readingTime: "Reading time",
        minRead: "min read",
        category: "Category",
        general: "General",
        inThisArticle: "IN THIS ARTICLE",
        promoTitle: "Discover BiasharaOne",
        promoDesc: "BiasharaOne is a unified digital commerce ecosystem that helps businesses manage inventory, sales, and customer relations with ease.",
        promoBtn: "Visit BiasharaOne",
        clapLabel: "Like Post",
        likedLabel: "Liked!",
        likeSingle: "Like",
        likePlural: "Likes",
        technologies: "Technologies",
        share: "Share Link",
        linkCopied: "Link Copied!",
        fromGoma: "From Goma to the world, engineering scalable backend architectures and robust network infrastructures.",
        shareTitle: "Share Article",
        shareDesc: "Share the article with your network.",
        copyLink: "Copy Link",
        instagramGuide: "Instagram Guide",
        instagramDesc: "Instagram does not support direct link shares. Copy the link using the copy button above and paste it as a sticker in your Stories or add it directly to your Bio!"
      },
      pagination: {
        prev: "Previous",
        next: "Next",
        prev_aria: "Go to previous page",
        next_aria: "Go to next page"
      }
    },
    projects: {
      badge: "02 / EXPERIMENTAL & CORE",
      featuredBadge: "Core Architectures",
      featuredTitle: "Featured Systems & Deployments",
      otherBadge: "Additional Work",
      otherTitle: "Experimental & Utility Repositories",
      featuredLabel: "Featured",
      demoBtn: "Demo",
      codeBtn: "Code",
      clapBtn: "Clap",
      clappedBtn: "Bravo !",
      viewProject: "View project",
      readProject: "Read project",
      featured: "Featured Project",
      searchPlaceholder: "Search projects...",
      noProjectsTitle: "No projects found",
      noProjectsDesc: "No matching projects were found for \"{search}\" in {category}.",
      clearFilters: "Clear all filters",
      categories: {
        all: "All",
        networking: "Networking",
        product: "Product",
        software_dev: "Software dev",
        system_admin: "System Admin",
        all_categories: "all categories"
      },
      reader: {
        copied: "Copied!",
        copy: "Copy",
        back: "Back to projects",
        details: "Project details",
        published: "Published",
        readingTime: "Reading time",
        minRead: "min read",
        category: "Category",
        general: "General",
        inThisArticle: "IN THIS ARTICLE",
        promoTitle: "Discover BiasharaOne",
        promoDesc: "BiasharaOne is a unified digital commerce ecosystem that helps businesses manage inventory, sales, and customer relations with ease.",
        promoBtn: "Visit BiasharaOne",
        clapLabel: "Clap Project",
        likedLabel: "Clapped!",
        likeSingle: "Clap",
        likePlural: "Claps",
        share: "Share Link",
        linkCopied: "Link Copied!",
        fromGoma: "From Goma to the world, engineering scalable backend architectures and robust network infrastructures.",
        shareTitle: "Share Project",
        shareDesc: "Share the project with your network.",
        copyLink: "Copy Link",
        instagramGuide: "Instagram Guide",
        instagramDesc: "Instagram does not support direct link shares. Copy the link using the copy button above and paste it as a sticker in your Stories or add it directly to your Bio!"
      }
    },
    youtube: {
      badge: "04 / MEDIA",
      title: "My Latest Videos",
      viewChannel: "Go to Channel",
    }
  },
  fr: {
    nav: {
      about: "À propos",
      skills: "Compétences",
      articles: "Articles",
      posts: "Publications",
      projects: "Projets",
      archives: "Archives",
      tags: "Tags",
      search: "Recherche",
      blog: "Blog",
      contact: "Contact"
    },
    hero: {
      status: "Disponible pour de nouveaux projets",
      title: "NDEZE BONHEUR EMMANUEL",
      accent: "Ingénieur Réseau et Logiciel concevant des systèmes évolutifs, fiables et sécurisés.",
      centerpiece: "Une bonne ingénierie repose sur la clarté, l'évolutivité et la conception de solutions durables.",
      ctaBuild: "Ce que je conçois",
      ctaInsights: "Articles & Publications",
      welcome: "Salut, je suis",
      roles: ["Ingénieur Réseau", "Ingénieur Logiciel"],
      ctaContact: "Me Contacter"
    },
    about: {
      badge: "01 / Approche Architecturale",
      title: "À La Convergence Du Logiciel Et De L’Infrastructure",
      p1: "Je conçois des systèmes à l'intersection de l'ingénierie réseau et du développement logiciel. Axé sur la résilience des flux de données, des APIs performantes et des infrastructures à faible latence.",
      p2: "Le logiciel et l'infrastructure forment un écosystème unifié. Je bâtis des solutions évolutives, robustes et pensées pour la production.",
      pillar1Title: "Développeur Logiciel",
      pillar1Desc: "Architectures backend modulaires, APIs performantes, conception de bases de données et automatisation orientée infrastructure.",
      pillar2Title: "Ingénieur Réseau",
      pillar2Desc: "Routage d'entreprise, commutation, VPNs sécurisés, télémétrie et automatisation d'infrastructure réseau."
    },
    skills: {
      badge: "02 / Capacités Clés",
      title: "Expertise Technique",
      description: "Des compétences éprouvées en production, équilibrées entre la conception de systèmes robustes et l'ingénierie d'infrastructures réseau hautement disponibles.",
      pillars: {
        dev: {
          title: "Développeur Logiciel",
          subtitle: "Architectures Backend & Systèmes Évolutifs",
          description: "Conception d'API REST fiables, optimisation des bases de données relationnelles et architectures de pipelines backend distribués à faible latence.",
          groups: {
            g1: "Langages & Frameworks",
            g2: "Bases de données & Stockage",
            g3: "Infrastructure & Outils"
          }
        },
        net: {
          title: "Ingénieur Réseau",
          subtitle: "Réseaux d'Entreprise à Haute Disponibilité & Sécurité",
          description: "Conception, déploiement et sécurisation d'architectures de routage multisites, boucles de commutation, tunnels VPN sécurisés et configurations automatisées.",
          groups: {
            g1: "Routage & Commutation",
            g2: "Sécurité Réseau & Matériel",
            g3: "Analyse & Automatisation"
          }
        }
      }
    },
    contact: {
      badge: "04 / Collaboration Ouverte",
      title: "Construisons ensemble",
      name: "Nom complet",
      email: "Adresse e-mail",
      subject: "Sujet",
      message: "Votre message",
      send: "Envoyer le message",
      sending: "Envoi en cours...",
      success: "Votre message a été envoyé avec succès !",
      error: "Impossible d’envoyer le message. Veuillez réessayer.",
      btnPending: "Connexion en cours...",
      btnTransmit: "Transmettre le message",

      placeholders: {
      name: "Bonheur Emmanuel",
      email: "bonheur.ndeze@exemple.com)",
      subject: "Architecture backend / Infrastructure réseau",
      message: "Parlez-moi de votre projet, de vos défis techniques ou de votre infrastructure..."
      },

      infos: {
        title: "Restons en contact",
        description: "Que vous ayez besoin d'un développeur backend, d'un ingénieur réseau ou d'un profil capable de lier les deux mondes, je conçois des solutions fiables, performantes et adaptées à vos défis opérationnels.",
        location: "Localisation",
        emailLabel: "Adresse e-mail",

        devFocus: "Développement Logiciel",
        devDesc:
          "Conception d’API performantes, architectures backend évolutives, bases de données sécurisées et solutions pensées pour la performance et la maintenabilité.",

        netFocus: "Ingénierie Réseau",
        netDesc:
          "Configuration et sécurisation des infrastructures réseau, optimisation du routage, résolution des problèmes de commutation et intégration des environnements Cisco."
        }
      },

    platforms: {
      badge: "02 / Plateformes et Systèmes que je construis",
      intro: "Découvrez les plateformes, boîtes à outils et écosystèmes d'automatisation que j'ai conçus.",
      biasharaOne: {
        badge: "Plateforme SaaS Multi-Tenant",
        title: "Plateforme BiasharaOne",
        p1: "BiasharaOne est un écosystème SaaS unifié intégrant gestion des stocks, workflows clients, paiements sécurisés et orchestration des ventes.",
        p2: "Conçu avec une API REST Django modulaire, PostgreSQL, Next.js et des déploiements automatisés Docker CI/CD.",
        p3: "Explorez l'organisation et l'architecture système sur GitHub.",
        detailedP1: "BiasharaOne automatise les opérations commerciales avec suivi multi-boutiques et transactions sécurisées.",
        detailedP2: "Bâti sur des APIs backend évolutives, contrôles d'accès rigoureux, couches de cache et workflows de production.",
        detailedP3: "Optimisé pour la haute disponibilité, l'intégrité des données et les règlements multi-devises.",
        arch: "Architecture Système",
        tag1: "Moteur Multi-Tenant",
        tag2: "API REST Django",
        tag3: "Admin Next.js",
        tag4: "ACL Rôle",
        tag5: "Couches de Cache",
        tag6: "Docker CI/CD",
        ctaOrg: "Voir sur GitHub"
      },
      netpulse: {
        badge: "Réseau et Automatisation CLI",
        title: "Boîte à Outils NetPulse",
        p1: "NetPulse est une boîte à outils CLI asynchrone en Python pour les diagnostics réseau, scans de ports, tests ICMP et inspection d'infrastructure.",
        p2: "Moteur async IO haute performance. Disponible sur PyPI et GitHub.",
        detailedP1: "NetPulse offre une visibilité opérationnelle et des diagnostics réseau rapides via le terminal.",
        detailedP2: "Conçu pour la performance et l'automatisation sous Linux, macOS et Windows.",
        diag: "Outils de Diagnostic",
        tag1: "Python / PyPI",
        tag2: "Scanner de Ports",
        tag3: "Moteur Async IO",
        tag4: "Pings ICMP / UDP",
        tag5: "Résolution DNS",
        tag6: "Framework CLI",
        ctaRepo: "Voir le Dépôt",
        ctaPypi: "Voir sur PyPI"
      },
      moreProjects: {
        title: "Plus de projets & expérimentations",
        desc: "Explorez mes dépôts open-source, outils d'automatisation et notes de recherche.",
        ctaGithub: "Profil GitHub",
        ctaPages: "Voir plus"
      }
    },
    blog: {
      badge: "03 / ANALYSES & ARTICLES",
      title: "Derniers Blogs",
      viewBlog: "Voir le blog",
      readBlog: "Lire l'article",
      featured: "Article en vedette",
      searchPlaceholder: "Rechercher des articles...",
      noArticlesTitle: "Aucun article trouvé",
      noArticlesDesc: "Aucun article correspondant n'a été trouvé pour \"{search}\" dans {category}.",
      clearFilters: "Effacer tous les filtres",
      categories: {
        all: "Tous",
        networking: "Réseaux",
        product: "Produit",
        software_dev: "Développement logiciel",
        system_admin: "Administration système",
        all_categories: "toutes les catégories"
      },
      reader: {
        copied: "Copié !",
        copy: "Copier",
        back: "Retour au blog",
        details: "Détails de l'article",
        published: "Publié le",
        readingTime: "Temps de lecture",
        minRead: "min de lecture",
        category: "Catégorie",
        general: "Général",
        inThisArticle: "DANS CET ARTICLE",
        promoTitle: "Découvrez BiasharaOne",
        promoDesc: "BiasharaOne est un écosystème de commerce digital unifié facilitant la gestion des stocks, des ventes et des clients.",
        promoBtn: "Visiter BiasharaOne",
        clapLabel: "J'aime",
        likedLabel: "Aimé !",
        likeSingle: "J'aime",
        likePlural: "J'aime",
        share: "Partager",
        linkCopied: "Lien copié !",
        fromGoma: "De Goma au monde entier, concevant des architectures backend évolutives et des infrastructures réseau robustes.",
        shareTitle: "Partager l'article",
        shareDesc: "Partagez cet article avec votre réseau.",
        copyLink: "Copier le lien",
        instagramGuide: "Guide Instagram",
        instagramDesc: "Instagram ne permet pas le partage de liens directs. Copiez le lien de l'article avec le bouton ci-dessus et ajoutez-le en sticker dans vos Stories ou dans votre Bio !"
      },
      pagination: {
        prev: "Précédent",
        next: "Suivant",
        prev_aria: "Aller à la page précédente",
        next_aria: "Aller à la page suivante"
      }
    },
    projects: {
      badge: "02 / EXPÉRIMENTAL & NOYAU",
      featuredBadge: "Architectures principales",
      featuredTitle: "Systèmes et déploiements vedettes",
      otherBadge: "Travail additionnel",
      otherTitle: "Dépôts expérimentaux et utilitaires",
      featuredLabel: "Vedette",
      demoBtn: "Démo",
      codeBtn: "Code",
      clapBtn: "Clap",
      clappedBtn: "Bravo !",
      viewProject: "Voir le projet",
      readProject: "Lire le projet",
      featured: "Projet en vedette",
      searchPlaceholder: "Rechercher des projets...",
      noProjectsTitle: "Aucun projet trouvé",
      noProjectsDesc: "Aucun projet correspondant n'a été trouvé pour \"{search}\" dans {category}.",
      clearFilters: "Effacer tous les filtres",
      categories: {
        all: "Tous",
        networking: "Réseaux",
        product: "Produit",
        software_dev: "Développement logiciel",
        system_admin: "Administration système",
        all_categories: "toutes les catégories"
      },
      reader: {
        copied: "Copié !",
        copy: "Copier",
        back: "Retour aux projets",
        details: "Détails du projet",
        published: "Publié le",
        readingTime: "Temps de lecture",
        minRead: "min de lecture",
        category: "Catégorie",
        technologies: "Technologies",
        general: "Général",
        inThisArticle: "DANS CET ARTICLE",
        promoTitle: "Découvrez BiasharaOne",
        promoDesc: "BiasharaOne est un écosystème de commerce digital unifié facilitant la gestion des stocks, des ventes et des clients.",
        promoBtn: "Visiter BiasharaOne",
        clapLabel: "Clapper",
        likedLabel: "Clappé !",
        likeSingle: "Clap",
        likePlural: "Claps",
        share: "Partager",
        linkCopied: "Lien copié !",
        fromGoma: "De Goma au monde entier, concevant des architectures backend évolutives et des infrastructures réseau robustes.",
        shareTitle: "Partager le projet",
        shareDesc: "Partagez ce projet avec votre réseau.",
        copyLink: "Copier le lien",
        instagramGuide: "Guide Instagram",
        instagramDesc: "Instagram ne permet pas le partage de liens directs. Copiez le lien du projet avec le bouton ci-dessus et ajoutez-le en sticker dans vos Stories ou dans votre Bio !"
      }
    },
    youtube: {
      badge: "04 / MÉDIA",
      title: "Mes Dernières Vidéos",
      viewChannel: "Voir la chaîne",
    }
  }
} as const;

export type Language = "en" | "fr";
export type TranslationKey = typeof translations;
