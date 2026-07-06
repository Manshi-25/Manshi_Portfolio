export type Paper = {
  slug: string;
  status: string;
  title: string;
  venue: string;
  tags: string[];
  accent: string;
  abstract: string;
  contributions: string[];
  methods: string[];
  takeaway: string;
  link?: string;
  linkLabel?: string;
  /** Photos from the presentation / work — shown as a gallery on the paper page. */
  images?: string[];
  /** Certificate images (presentation / publication / participation certificates). */
  certificates?: string[];
};

export const papers: Paper[] = [
  {
    slug: "uhi-predictive-analytics",
    status: "Published · IEEE",
    title: "AI-Powered Predictive Analytics Framework for Urban Heat Island (UHI) Mitigation",
    venue: "IEEE Xplore",
    tags: ["XGBoost", "Explainable AI", "Climate Tech"],
    accent: "bg-sage/30",
    abstract:
      "Cities regularly run more than 10°C hotter than their surroundings, yet most Urban Heat Island responses are reactive rather than predictive. This paper proposes an end-to-end AI framework that fuses satellite imagery, weather data, geospatial layers and socio-demographic data into an XGBoost model for land-surface-temperature prediction, paired with SHAP-based explainability to surface the actual local drivers of heat, and a simulation layer that lets planners test interventions green roofs, reflective pavements, tree planting before committing resources.",
    contributions: [
      "Designed a four-layer framework data ingestion, feature engineering, XGBoost prediction with SHAP explainability, and policy simulation that unifies prediction, causal explanation and what-if scenario testing in one pipeline",
      "Engineered NDVI/NDBI remote-sensing indices and urban-morphology features from multi-source satellite, weather, geospatial and socio-demographic data",
      "Benchmarked XGBoost against Random Forest, SVM, DNN and CNN baselines for land-surface-temperature prediction",
      "Built a scenario simulator comparing green roofs, reflective pavements and tree planting across three neighborhood types, ranking interventions by cooling impact",
    ],
    methods: [
      "XGBoost regression",
      "SHAP explainability",
      "NDVI / NDBI remote-sensing indices",
      "Multi-source data fusion (satellite, IoT, census)",
      "Scenario simulation",
    ],
    takeaway:
      "Predicting where a city will overheat is only half the job pairing the prediction with SHAP-based explanations is what turns a model into something a planner can actually act on.",
    link: "https://ieeexplore.ieee.org/document/11547950",
    linkLabel: "View on IEEE Xplore",
    images: ["/research/UHI-1.png"],
  },
  {
    slug: "metaheuristic-oral-lesion",
    status: "Conference paper",
    title:
      "Metaheuristic Driven Optimization Framework for Deep Learning: Enhancing Diagnostic Efficacy in Oral Pathological Classification",
    venue: "VIPS-TC, GGSIPU",
    tags: ["Deep Learning", "Metaheuristics", "Healthcare AI"],
    accent: "bg-clay/30",
    abstract:
      "Malignant oral lesion diagnosis is critical, but deep learning models trained directly on noisy clinical photographs affected by uneven lighting, saliva and background clutter struggle badly, with baseline accuracy near 55%. We built Meta-X-DTL, a Metaheuristic-Guided Explainable Deep Transfer Learning framework that cascades three nature-inspired optimizers PSO, GWO and the Firefly Algorithm to enhance image quality before classification with a VGG16 backbone, lifting accuracy to 90.38% on a real, noisy 323-image clinical dataset.",
    contributions: [
      "Designed a three-stage metaheuristic cascade PSO for contrast/brightness, GWO for segmentation threshold, FA for super-pixel boundaries that progressively cleans an image before it ever reaches the classifier",
      "Lifted accuracy from a ~55% noisy-image baseline to 90.38% on 323 real clinical photographs (165 benign, 158 malignant)",
      "Integrated Grad-CAM explainability and a Gemini API layer so the diagnostic tool shows clinicians what it focused on, not just a label",
      "Packaged the full pipeline into a deployable React web tool for malignancy detection",
    ],
    methods: [
      "VGG16 transfer learning",
      "Particle Swarm Optimization (Shannon-entropy contrast tuning)",
      "Grey Wolf Optimizer (segmentation threshold)",
      "Firefly Algorithm (SLIC super-pixel tuning)",
      "Grad-CAM explainability",
    ],
    takeaway:
      "On noisy real-world clinical photos not curated histopathology slides pre-processing with metaheuristics mattered more than the classifier itself: smart image preparation closed most of the accuracy gap.",
    link: "https://ieeexplore.ieee.org/document/11564907",
    linkLabel: "View on IEEE Xplore",
    images: ["/research/meta-1.png", "/research/meta-2.png", "/research/meta-3.png"],
    certificates: ["/research/meta-cert.jpg"],
  },
  {
    slug: "adversarial-ml-cybersecurity",
    status: "Book chapter",
    title:
      "Adversarial Machine Learning in Cybersecurity: A Comprehensive Analysis of Threats, Defenses, and Future Directions",
    venue: "VIPS-TC, GGSIPU",
    tags: ["Adversarial ML", "Cybersecurity", "LLM Security"],
    accent: "bg-mustard/30",
    abstract:
      "ML-based intrusion detection and malware classifiers are built on the assumption that test traffic looks like training traffic and attackers exploit exactly that. This chapter works through adversarial machine learning in cybersecurity: the 'inverse feature-mapping problem' that makes discrete domains like malware binaries and network packets harder to attack than images, attack-generation methods such as the genetic-algorithm-based GAMMA and reinforcement-learning evasion, emerging threats like prompt injection and Trojan Puzzle attacks against code-generation LLMs, and a roadmap of defenses adversarial training, certified robustness, neuro-symbolic AI for building cyber-defense systems that survive an adaptive attacker.",
    contributions: [
      "Formalized the inverse feature-mapping problem that makes cybersecurity adversarial examples fundamentally harder to construct than image perturbations",
      "Catalogued a taxonomy of attacks evasion, poisoning, model extraction, membership inference, backdoors, prompt injection mapped to concrete cybersecurity domains",
      "Walked through three case studies: the Cylance/Skylight antivirus bypass, blind-perturbation NIDS evasion, and a federated-learning IoT backdoor, each with measured real-world impact",
      "Compared defense strategies adversarial training, randomized smoothing, neuro-symbolic AI, moving target defense on the robustness–accuracy trade-off",
    ],
    methods: [
      "Threat-model taxonomy (white/grey/black-box)",
      "Genetic-algorithm malware generation (GAMMA)",
      "RL-based evasion (MDP formulation)",
      "Bilevel optimization for data poisoning",
      "Literature & case-study synthesis",
    ],
    takeaway:
      "Adversarial robustness in cybersecurity isn't a smaller version of the computer-vision problem discrete, constrained inputs like binaries and packets make most image-domain attacks unrealizable, and defenses have to be designed around that constraint, not against it.",
  },
  {
    slug: "cognitive-contours",
    status: "Presented · MAIMS",
    title: "Cognitive Contours: Generative AI for Linguistic Modelling",
    venue: "Maharaja Agrasen Institute of Management Studies",
    tags: ["LLMs", "Generative AI", "Ethics"],
    accent: "bg-plum/30",
    abstract:
      "A survey of large language model architectures and the ethical landscape around them bias, hallucination, and the responsibility curve of deployment.",
    contributions: [
      "Mapped the architectural lineage from transformers to modern LLM families",
      "Categorised real-world failure modes (bias, hallucination, jailbreaking)",
      "Outlined a deployment checklist for responsible LLM products",
    ],
    methods: ["Literature synthesis", "Case-study analysis", "Ethical framework comparison"],
    takeaway:
      "The hard problem with LLMs isn't the model it's the gap between capability and accountability.",
    images: ["/research/llm-1.png", "/research/llm-2.png", "/research/llm-3.png"],
    certificates: ["/research/cog-cert.png"],
  },
];

export const paperBySlug = (slug: string) => papers.find((p) => p.slug === slug);