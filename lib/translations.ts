export const translations = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
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
      p1: "I build systems at the intersection of network engineering and software development, where infrastructure, automation, and backend architecture converge. My methodology is grounded in a comprehensive understanding of data flow across networks, inter-system communication, and the engineering of resilient platforms from the foundational level.",
      p2: "Rather than treating software and infrastructure as separate entities, I regard both as integral components of a unified ecosystem. From scalable backend services to secure network environments, my emphasis is on constructing reliable, efficient, and cohesively integrated systems that are designed for optimal performance and enduring stability.",
      pillar1Title: "Software Developer",
      pillar1Desc: "The focus of my work involves the design of backend systems and applications that are informed by infrastructure considerations, emphasizing scalability, performance, and a well-structured architecture. My expertise spans systems programming, automation, application programming interface (API) engineering, and the development of reliable software, all underpinned by an infrastructure-first engineering philosophy.",
      pillar2Title: "Network Engineer",
      pillar2Desc: "Designing secure, resilient, and scalable network environments with a pronounced emphasis on routing, infrastructure reliability, and operational efficiency. Engaging in enterprise networking, systems administration, automation, and infrastructure design through practical engineering and real-world laboratory environments."
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
      badge: "04 / Open Connection",
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
      name: "Bonheur Emmanuel",
      email: "bonheur.ndeze@example.com)",
      subject: "Backend Architecture / Network Infrastructure",
      message: "Tell me about your project, technical challenges, infrastructure goals, or scaling requirements..."
      },

      infos: {
        title: "Contact Information",
        description:
          "Whether you need a software developer, a network engineer, or a professional who can bridge both worlds, I help design reliable, scalable, and efficient solutions tailored to real operational needs. From backend systems and API architecture to secure network infrastructure, automation, and hybrid environments, I can contribute independently on either side or work on projects where both disciplines intersect. If you’re building something meaningful, let’s start the conversation.",
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
      intro: "Interested in the systems I engineer? Discover some of the platforms, toolkits, and automation ecosystems l've developed, bridging clean backend software, enterprise networking, and robust infrastructure.",
      boutika: {
        badge: "Multi-Tenant SaaS Platform",
        title: "Boutika Platform",
        p1: "Boutika is a modern SaaS ecosystem integrating inventory, customer management, secure payments, and sales orchestration into a unified digital platform.",
        p2: "I engineered the scalable backend APIs, caching layers, role-based ACLs, and production deployment workflows using Django and Next.js.",
        p3: "Explore the organization below to view the clean, modular system architecture and codebase in detail.",
        detailedP1: "Boutika is a modern SaaS platform designed to help businesses manage operations through a unified digital ecosystem. It integrates customer management, inventory tracking, payments, analytics, sales orchestration, and reliable, scalable architecture.",
        detailedP2: "I work on the engineering and infrastructure aspects, focusing on backend systems, APIs, access control, caching strategies, and deployment workflows. The platform features a Django backend, a Next.js dashboard, mobile apps, and tools for scalable production.",
        detailedP3: "The project emphasizes clean architecture, modular engineering, security, multi-currency support, and high-integrity transactions.",
        arch: "System Architecture",
        tag1: "Multi-Tenant Engine",
        tag2: "Django REST API",
        tag3: "Next.js Admin",
        tag4: "Role-Based ACL",
        tag5: "Caching Layers",
        tag6: "CI/CD Docker",
        ctaOrg: "View Organization"
      },
      netpulse: {
        badge: "Networking & CLI Automation",
        title: "NetPulse Toolkit",
        p1: "NetPulse is an extensible Python CLI toolkit designed to facilitate network diagnostics, high-speed port scanning, connectivity testing, and infrastructure analysis for systems engineers.",
        p2: "Powered by a high-performance async IO engine. View the repository or PyPI package below to read the comprehensive technical documentation.",
        detailedP1: "NetPulse is a toolkit developed in Python, designed to facilitate network diagnostics, monitoring, and operational visibility specifically for engineers and administrators. It provides a range of tools for network discovery, connectivity testing, and infrastructure analysis, all accessible through a lightweight and extensible command-line interface.",
        detailedP2: "Emphasizing performance, usability, and cross-platform compatibility, NetPulse reflects a commitment to networking, systems engineering, and automation, merging in-depth infrastructure expertise with sound software engineering practices.",
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
        title: "More projects. More experiments. More ideas.",
        desc: "Explore additional work on GitHub and dedicated project pages.",
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
        promoTitle: "Discover Boutika",
        promoDesc: "Boutika is a modern digital marketplace that helps businesses showcase products, connect with customers, and grow their presence through a seamless online experience.",
        promoBtn: "Visit Boutika",
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
        promoTitle: "Discover Boutika",
        promoDesc: "Boutika is a modern digital marketplace that helps businesses showcase products, connect with customers, and grow their presence through a seamless online experience.",
        promoBtn: "Visit Boutika",
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
      projects: "Projets",
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
      p1: "Je conçois des systèmes à l’intersection de l’ingénierie réseau et du développement logiciel, là où l’infrastructure, l’automatisation et les architectures backend se rejoignent. Mon approche repose sur une compréhension approfondie des flux de données, de la communication entre systèmes et de la conception de plateformes fiables, pensées dès leur fondation pour répondre aux exigences de performance et de résilience.",
      p2: "Plutôt que d’opposer logiciel et infrastructure, je les considère comme les composantes d’un même écosystème technique. Des services backend évolutifs aux environnements réseau sécurisés, mon travail consiste à construire des systèmes cohérents, performants et durables, capables de répondre efficacement aux réalités opérationnelles modernes.",
      pillar1Title: "Développeur Logiciel",
      pillar1Desc: "Conception de systèmes backend et d’applications pensées avec une approche orientée infrastructure, en mettant l’accent sur la scalabilité, la performance et la qualité architecturale. Mon travail couvre l’ingénierie logicielle, l’automatisation, la conception d’API ainsi que le développement de solutions fiables et maintenables adaptées aux environnements techniques modernes.",
      pillar2Title: "Ingénieur Réseau",
      pillar2Desc: "Conception d’environnements réseau sécurisés, résilients et évolutifs avec une attention particulière portée au routage, à la fiabilité des infrastructures et à l’efficacité opérationnelle. Intervention sur les réseaux d’entreprise, l’administration système, l’automatisation et l’architecture d’infrastructure à travers une approche pratique basée sur l’ingénierie et les environnements de laboratoire.",
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
      title: "Construisons quelque chose d’exceptionnel",
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
      message: "Parlez-moi de votre projet, de vos défis techniques ou de votre infrastructure actuelle..."
      },

      infos: {
        title: "Restons en contact",
        description:"Vous avez besoin d’un développeur logiciel, d’un ingénieur réseau, ou d’un profil capable de faire le lien entre les deux ? Je vous accompagne dans la conception de solutions fiables, performantes et évolutives; qu’il s’agisse de développement backend, d’architecture réseau, d’automatisation ou d’infrastructures hybrides. Que votre projet soit déjà lancé ou encore à l’étape d’idée, échangeons ensemble et construisons une solution adaptée à vos besoins.",
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
      intro: "Intéressé par les systèmes que je conçois ? Découvrez quelques-unes des plateformes, boîtes à outils et écosystèmes d'automatisation que j'ai développés, reliant logiciel backend propre, réseaux d'entreprise et infrastructure robuste.",
      boutika: {
        badge: "Plateforme SaaS Multi-Tenant",
        title: "Plateforme Boutika",
        p1: "Boutika est un écosystème SaaS moderne qui intègre le suivi des stocks, la gestion client, les paiements multi-devises sécurisés et l'orchestration des ventes au sein d'une plateforme numérique unifiée.",
        p2: "J'ai conçu l'architecture de l'API backend, les systèmes de cache, les contrôles d'accès et les workflows de déploiement avec Django et Next.js.",
        p3: "Explorez l'organisation ci-dessous pour découvrir en détail le code et cette architecture modulaire propre.",
        detailedP1: "Boutika est une plateforme SaaS moderne conçue pour aider les entreprises à gérer leurs opérations à travers un écosystème numérique unifié. La plateforme intègre la gestion des clients, le suivi des stocks, les paiements, les analyses de données ainsi que l’orchestration des ventes au sein d’une architecture fiable et évolutive.",
        detailedP2: "Je contribue principalement aux aspects liés à l’ingénierie logicielle et à l’infrastructure, notamment sur les systèmes backend, les APIs, la gestion des accès, les stratégies de cache ainsi que les workflows de déploiement. L’écosystème repose sur un backend développé avec Django, un tableau de bord administratif sous Next.js, des applications mobiles ainsi que des outils pensés pour des environnements de production évolutifs.",
        detailedP3: "Le projet met un accent particulier sur une architecture propre et modulaire, la sécurité, la gestion multi-devises ainsi que l’intégrité des transactions.",
        arch: "Architecture Système",
        tag1: "Moteur Multi-Tenant",
        tag2: "API REST Django",
        tag3: "Admin Next.js",
        tag4: "ACL Rôle",
        tag5: "Couches de Cache",
        tag6: "Docker CI/CD",
        ctaOrg: "Voir l'Organisation"
      },
      netpulse: {
        badge: "Réseau et Automatisation CLI",
        title: "Boîte à Outils NetPulse",
        p1: "NetPulse est une boîte à outils CLI extensible développée en Python, conçue pour offrir aux ingénieurs et administrateurs des diagnostics réseau profonds, un scanner de ports asynchrone et des tests de connectivité ICMP.",
        p2: "Propulsé par un moteur asynchrone ultra-performant. Explorez le dépôt ou le package sur PyPI ci-dessous pour accéder à la documentation technique complète.",
        detailedP1: "NetPulse est une boîte à outils développée en Python, conçue pour faciliter le diagnostic réseau, la supervision et la visibilité opérationnelle destinés aux ingénieurs et administrateurs systèmes et réseaux. Elle propose un ensemble d’outils dédiés à la découverte réseau, aux tests de connectivité ainsi qu’à l’analyse des infrastructures, le tout accessible via une interface en ligne de commande légère, flexible et extensible.",
        detailedP2: "Axé sur les performances, la simplicité d’utilisation et la compatibilité multiplateforme, NetPulse reflète une véritable passion pour le networking, l’ingénierie des systèmes et l’automatisation, en combinant une expertise approfondie des infrastructures avec des pratiques solides de développement logiciel.",
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
        title: "Plus de projets. Plus d’expérimentations. Plus d’idées.",
        desc: "Découvrez d’autres réalisations, outils et travaux disponibles sur GitHub ainsi que sur les pages dédiées aux projets.",
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
        promoTitle: "Découvrez Boutika",
        promoDesc: "Boutika est une place de marché numérique moderne qui aide les entreprises à présenter leurs produits, à se connecter avec leurs clients et à développer leur présence grâce à une expérience en ligne transparente.",
        promoBtn: "Visiter Boutika",
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
        promoTitle: "Découvrez Boutika",
        promoDesc: "Boutika est une place de marché numérique moderne qui aide les entreprises à présenter leurs produits, à se connecter avec leurs clients et à développer leur présence grâce à une expérience en ligne transparente.",
        promoBtn: "Visiter Boutika",
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
