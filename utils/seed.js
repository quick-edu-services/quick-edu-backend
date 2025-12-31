
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Course } from '../features/courses/course.schema.js';
import { Instructor } from '../features/instructors/instructor.schema.js';

dotenv.config();

const coursesData = [
    {
        "id": "test-payment",
        "title": "Payment Test Course - Rs 1 Only",
        "slug": "payment-test-course",
        "category": "Test",
        "level": "Beginner",
        "rating": 5.0,
        "reviews": 1,
        "students": 1,
        "price": 1,
        "originalPrice": 100,
        "image": "course-web-bootcamp.jpg",
        "instructor": "Suresh Gangavarapu",
        "instructorId": "instructor-1",
        "duration": "1 hour",
        "lectures": 1,
        "description": "Test course for payment gateway integration. Only Rs 1 to test Cashfree payment flow.",
        "highlights": [
            "Test Cashfree payment",
            "Verify payment flow",
            "Check course access"
        ],
        "curriculum": [
            {
                "section": "Test Section",
                "lectures": 1,
                "duration": "1h"
            }
        ]
    },
    {
        "id": "web-dev-bootcamp",
        "title": "Complete Web Development Bootcamp",
        "slug": "web-development-bootcamp",
        "category": "Web Development",
        "level": "Beginner",
        "rating": 4.8,
        "reviews": 12453,
        "students": 45678,
        "price": 42125,
        "originalPrice": 63188,
        "image": "course-web-bootcamp.jpg",
        "instructor": "Suresh Gangavarapu",
        "instructorId": "instructor-1",
        "duration": "42 hours",
        "lectures": 156,
        "description": "Master modern web development with HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and launch your career.",
        "highlights": [
            "Build 15+ real-world projects",
            "Master HTML5, CSS3, JavaScript ES6+",
            "Learn React, Node.js, Express, MongoDB",
            "Responsive design & mobile-first development",
            "Deploy to production with confidence"
        ],
        "curriculum": [
            {
                "section": "Introduction to Web Development",
                "lectures": 12,
                "duration": "2h 30m"
            },
            {
                "section": "HTML & CSS Fundamentals",
                "lectures": 24,
                "duration": "5h 15m"
            },
            {
                "section": "JavaScript Mastery",
                "lectures": 32,
                "duration": "8h 45m"
            },
            {
                "section": "React Development",
                "lectures": 28,
                "duration": "7h 20m"
            },
            {
                "section": "Backend with Node.js",
                "lectures": 26,
                "duration": "6h 30m"
            },
            {
                "section": "Database & MongoDB",
                "lectures": 18,
                "duration": "4h 45m"
            },
            {
                "section": "Deployment & Production",
                "lectures": 16,
                "duration": "3h 15m"
            }
        ]
    },
    {
        "id": "data-science-ai",
        "title": "Data Science & AI Masterclass",
        "slug": "data-science-ai-masterclass",
        "category": "Data Science",
        "level": "Intermediate",
        "rating": 4.9,
        "reviews": 8932,
        "students": 32145,
        "price": 57375,
        "originalPrice": 65000,
        "image": "course-data-science-masterclass.jpg",
        "instructor": "Gutlapalli Ramarao",
        "instructorId": "instructor-2",
        "duration": "56 hours",
        "lectures": 198,
        "description": "Become a data scientist with Python, machine learning, deep learning, and AI. Work on real datasets and build predictive models.",
        "highlights": [
            "Python for data science",
            "Machine learning algorithms",
            "Deep learning with TensorFlow",
            "Natural Language Processing",
            "Computer Vision projects"
        ],
        "curriculum": [
            {
                "section": "Python Fundamentals",
                "lectures": 18,
                "duration": "4h 20m"
            },
            {
                "section": "Data Analysis with Pandas",
                "lectures": 24,
                "duration": "6h 15m"
            },
            {
                "section": "Data Visualization",
                "lectures": 20,
                "duration": "5h 30m"
            },
            {
                "section": "Machine Learning",
                "lectures": 36,
                "duration": "10h 45m"
            },
            {
                "section": "Deep Learning",
                "lectures": 32,
                "duration": "9h 20m"
            },
            {
                "section": "NLP & Computer Vision",
                "lectures": 28,
                "duration": "8h 15m"
            },
            {
                "section": "Real-World Projects",
                "lectures": 24,
                "duration": "7h 30m"
            }
        ]
    },
    {
        "id": "digital-marketing",
        "title": "Digital Marketing Mastery 2024",
        "slug": "digital-marketing-mastery",
        "category": "Marketing",
        "level": "Beginner",
        "rating": 4.7,
        "reviews": 15678,
        "students": 58942,
        "price": 34500,
        "originalPrice": 51750,
        "image": "course-digital-marketing.jpg",
        "instructor": "Suresh Gangavarapu",
        "instructorId": "instructor-1",
        "duration": "38 hours",
        "lectures": 142,
        "description": "Master SEO, social media marketing, email marketing, content creation, and paid advertising to grow any business online.",
        "highlights": [
            "SEO & Google Analytics",
            "Social media marketing strategies",
            "Facebook & Instagram ads",
            "Email marketing automation",
            "Content marketing mastery"
        ],
        "curriculum": [
            {
                "section": "Digital Marketing Foundations",
                "lectures": 16,
                "duration": "3h 45m"
            },
            {
                "section": "SEO Mastery",
                "lectures": 26,
                "duration": "6h 20m"
            },
            {
                "section": "Social Media Marketing",
                "lectures": 28,
                "duration": "7h 15m"
            },
            {
                "section": "Paid Advertising",
                "lectures": 24,
                "duration": "6h 30m"
            },
            {
                "section": "Email Marketing",
                "lectures": 20,
                "duration": "5h 10m"
            },
            {
                "section": "Content Strategy",
                "lectures": 18,
                "duration": "4h 45m"
            },
            {
                "section": "Analytics & Optimization",
                "lectures": 10,
                "duration": "2h 30m"
            }
        ]
    },
    {
        "id": "ui-ux-design",
        "title": "UI/UX Design Complete Course",
        "slug": "ui-ux-design-complete",
        "category": "Design",
        "level": "Beginner",
        "rating": 4.8,
        "reviews": 9876,
        "students": 38421,
        "price": 49750,
        "originalPrice": 65000,
        "image": "course-ui-ux-design.jpg",
        "instructor": "Gutlapalli Ramarao",
        "instructorId": "instructor-2",
        "duration": "44 hours",
        "lectures": 168,
        "description": "Learn user interface and user experience design with Figma. Create stunning mobile apps and websites that users love.",
        "highlights": [
            "Master Figma from scratch",
            "User research & personas",
            "Wireframing & prototyping",
            "Design systems & components",
            "Portfolio-ready projects"
        ],
        "curriculum": [
            {
                "section": "UX Design Fundamentals",
                "lectures": 22,
                "duration": "5h 30m"
            },
            {
                "section": "User Research",
                "lectures": 18,
                "duration": "4h 45m"
            },
            {
                "section": "Wireframing",
                "lectures": 24,
                "duration": "6h 15m"
            },
            {
                "section": "UI Design with Figma",
                "lectures": 32,
                "duration": "8h 20m"
            },
            {
                "section": "Prototyping & Testing",
                "lectures": 26,
                "duration": "6h 45m"
            },
            {
                "section": "Design Systems",
                "lectures": 20,
                "duration": "5h 10m"
            },
            {
                "section": "Portfolio Projects",
                "lectures": 26,
                "duration": "7h 30m"
            }
        ]
    },
    {
        "id": "course-001",
        "title": "React & Next.js Build Projects",
        "slug": "react-nextjs-projects",
        "category": "Web Development",
        "level": "Intermediate",
        "rating": 4.8,
        "reviews": 3245,
        "students": 10234,
        "price": 26875,
        "originalPrice": 40313,
        "image": "course-react-nextjs.jpg",
        "instructor": "Suresh Gangavarapu",
        "instructorId": "instructor-1",
        "duration": "28 hours",
        "lectures": 72,
        "description": "Build production-ready React and Next.js applications with routing, SSR, and API integration.",
        "highlights": [
            "Next.js routing & API routes",
            "Server-side rendering",
            "Authentication & deployment"
        ],
        "curriculum": [
            {
                "section": "Projects",
                "lectures": 12,
                "duration": "6h"
            },
            {
                "section": "SSR & SSG",
                "lectures": 8,
                "duration": "4h"
            }
        ]
    },
    {
        "id": "course-002",
        "title": "Advanced Node.js & Express APIs",
        "slug": "advanced-nodejs-express",
        "category": "Web Development",
        "level": "Advanced",
        "rating": 4.7,
        "reviews": 2100,
        "students": 8740,
        "price": 34500,
        "originalPrice": 51750,
        "image": "course-nodejs-express.jpg",
        "instructor": "Karthik Thanikonda",
        "instructorId": "instructor-3",
        "duration": "32 hours",
        "lectures": 88,
        "description": "Design and build scalable RESTful APIs with Node.js, Express, and best practices for production.",
        "highlights": [
            "API design",
            "Authentication",
            "Performance tuning"
        ],
        "curriculum": [
            {
                "section": "Basics",
                "lectures": 10,
                "duration": "3h"
            },
            {
                "section": "Scaling",
                "lectures": 10,
                "duration": "5h"
            }
        ]
    },
    {
        "id": "course-003",
        "title": "Python for Data Analysis with Pandas",
        "slug": "python-data-analysis-pandas",
        "category": "Data Science",
        "level": "Beginner",
        "rating": 4.9,
        "reviews": 5400,
        "students": 15432,
        "price": 19250,
        "originalPrice": 28875,
        "image": "course-pandas-analysis.jpg",
        "instructor": "Gutlapalli Ramarao",
        "instructorId": "instructor-2",
        "duration": "24 hours",
        "lectures": 48,
        "description": "Learn data manipulation and analysis using Pandas and NumPy with real-world datasets.",
        "highlights": [
            "Pandas basics",
            "Data cleaning",
            "Time series analysis"
        ],
        "curriculum": [
            {
                "section": "Pandas intro",
                "lectures": 8,
                "duration": "3h"
            },
            {
                "section": "Analysis",
                "lectures": 12,
                "duration": "5h"
            }
        ]
    },
    {
        "id": "course-004",
        "title": "Full Stack with MERN",
        "slug": "fullstack-mern",
        "category": "Web Development",
        "level": "Intermediate",
        "rating": 4.7,
        "reviews": 4100,
        "students": 13840,
        "price": 42125,
        "originalPrice": 63188,
        "image": "course-mern-stack.jpg",
        "instructor": "Kavitha Nair",
        "instructorId": "instructor-13",
        "duration": "45 hours",
        "lectures": 110,
        "description": "Build end-to-end applications using MongoDB, Express, React and Node.js with deployment workflows.",
        "highlights": [
            "MERN stack",
            "Authentication",
            "Deployment"
        ],
        "curriculum": [
            {
                "section": "Frontend",
                "lectures": 30,
                "duration": "12h"
            },
            {
                "section": "Backend",
                "lectures": 24,
                "duration": "10h"
            }
        ]
    },
    {
        "id": "course-006",
        "title": "Kotlin Android App Development",
        "slug": "kotlin-android-development",
        "category": "Mobile",
        "level": "Intermediate",
        "rating": 4.8,
        "reviews": 1500,
        "students": 6900,
        "price": 31450,
        "originalPrice": 47175,
        "image": "course-kotlin-android.jpg",
        "instructor": "Srinivas Reddy",
        "instructorId": "instructor-5",
        "duration": "36 hours",
        "lectures": 90,
        "description": "Build native Android apps using Kotlin with modern architecture and Jetpack components.",
        "highlights": [
            "Kotlin basics",
            "Jetpack",
            "App architecture"
        ],
        "curriculum": [
            {
                "section": "Kotlin",
                "lectures": 14,
                "duration": "6h"
            },
            {
                "section": "UI",
                "lectures": 12,
                "duration": "5h"
            }
        ]
    },
    {
        "id": "course-007",
        "title": "Flutter Cross-Platform Apps",
        "slug": "flutter-cross-platform",
        "category": "Mobile",
        "level": "Beginner",
        "rating": 4.7,
        "reviews": 1780,
        "students": 8300,
        "price": 26875,
        "originalPrice": 40313,
        "image": "course-flutter-mobile.jpg",
        "instructor": "Srinivas Reddy",
        "instructorId": "instructor-5",
        "duration": "30 hours",
        "lectures": 72,
        "description": "Create fast cross-platform mobile apps with Flutter and Dart, covering layouts, state and deployment.",
        "highlights": [
            "Flutter widgets",
            "State management",
            "Publishing apps"
        ],
        "curriculum": [
            {
                "section": "Dart & Flutter",
                "lectures": 20,
                "duration": "8h"
            },
            {
                "section": "State",
                "lectures": 10,
                "duration": "4h"
            }
        ]
    },
    {
        "id": "course-008",
        "title": "SEO & Content Strategy for Indian Businesses",
        "slug": "seo-content-india",
        "category": "Marketing",
        "level": "Beginner",
        "rating": 4.6,
        "reviews": 3320,
        "students": 11200,
        "price": 11625,
        "originalPrice": 17438,
        "image": "course-seo-content.jpg",
        "instructor": "Suresh Gangavarapu",
        "instructorId": "instructor-1",
        "duration": "18 hours",
        "lectures": 40,
        "description": "Learn SEO and content strategies tuned for Indian audiences and small businesses.",
        "highlights": [
            "Local SEO",
            "Content planning",
            "Analytics"
        ],
        "curriculum": [
            {
                "section": "SEO basics",
                "lectures": 10,
                "duration": "4h"
            },
            {
                "section": "Content",
                "lectures": 8,
                "duration": "3h"
            }
        ]
    },
    {
        "id": "course-009",
        "title": "UX Design for Mobile Apps",
        "slug": "ux-mobile-apps",
        "category": "Design",
        "level": "Intermediate",
        "rating": 4.8,
        "reviews": 2100,
        "students": 7200,
        "price": 34500,
        "originalPrice": 51750,
        "image": "course-ux-mobile.jpg",
        "instructor": "Divya Krishnan",
        "instructorId": "instructor-6",
        "duration": "28 hours",
        "lectures": 64,
        "description": "Design user-friendly mobile interfaces with research-driven patterns and prototyping.",
        "highlights": [
            "Mobile patterns",
            "Prototyping",
            "Testing"
        ],
        "curriculum": [
            {
                "section": "Research",
                "lectures": 10,
                "duration": "4h"
            },
            {
                "section": "Prototyping",
                "lectures": 10,
                "duration": "4h"
            }
        ]
    },
    {
        "id": "course-010",
        "title": "Data Visualization with D3 & Tableau",
        "slug": "data-visualization-d3-tableau",
        "category": "Data Science",
        "level": "Intermediate",
        "rating": 4.7,
        "reviews": 1750,
        "students": 6100,
        "price": 22300,
        "originalPrice": 33450,
        "image": "course-d3-tableau.jpg",
        "instructor": "Gutlapalli Ramarao",
        "instructorId": "instructor-2",
        "duration": "22 hours",
        "lectures": 56,
        "description": "Create compelling data stories using D3 for web and Tableau for dashboards.",
        "highlights": [
            "D3 charts",
            "Tableau dashboards",
            "Storytelling"
        ],
        "curriculum": [
            {
                "section": "D3",
                "lectures": 12,
                "duration": "6h"
            },
            {
                "section": "Tableau",
                "lectures": 10,
                "duration": "4h"
            }
        ]
    },
    {
        "id": "course-011",
        "title": "Intro to Machine Learning with Scikit-Learn",
        "slug": "ml-scikit-learn",
        "category": "Data Science",
        "level": "Beginner",
        "rating": 4.8,
        "reviews": 4020,
        "students": 15230,
        "price": 28400,
        "originalPrice": 42600,
        "image": "course-scikit-learn.jpg",
        "instructor": "Venkatesh Iyer",
        "instructorId": "instructor-9",
        "duration": "34 hours",
        "lectures": 88,
        "description": "Understand supervised and unsupervised algorithms and build models using Scikit-Learn.",
        "highlights": [
            "Regression",
            "Classification",
            "Pipelines"
        ],
        "curriculum": [
            {
                "section": "Basics",
                "lectures": 14,
                "duration": "6h"
            },
            {
                "section": "Models",
                "lectures": 16,
                "duration": "8h"
            }
        ]
    },
    {
        "id": "course-012",
        "title": "Deep Learning with TensorFlow & Keras",
        "slug": "deep-learning-tensorflow-keras",
        "category": "Data Science",
        "level": "Advanced",
        "rating": 4.9,
        "reviews": 2980,
        "students": 11200,
        "price": 65000,
        "originalPrice": 66000,
        "image": "course-tensorflow-keras.jpg",
        "instructor": "Venkatesh Iyer",
        "instructorId": "instructor-9",
        "duration": "50 hours",
        "lectures": 140,
        "description": "Build deep learning models for computer vision and NLP using TensorFlow and Keras.",
        "highlights": [
            "CNNs",
            "RNNs",
            "Transfer learning"
        ],
        "curriculum": [
            {
                "section": "Foundations",
                "lectures": 20,
                "duration": "8h"
            },
            {
                "section": "Projects",
                "lectures": 24,
                "duration": "12h"
            }
        ]
    },
    {
        "id": "course-013",
        "title": "Product Management Essentials",
        "slug": "product-management-essentials",
        "category": "Product",
        "level": "Beginner",
        "rating": 4.6,
        "reviews": 1200,
        "students": 5400,
        "price": 19250,
        "originalPrice": 28875,
        "image": "course-product-management.jpg",
        "instructor": "Divya Krishnan",
        "instructorId": "instructor-6",
        "duration": "20 hours",
        "lectures": 48,
        "description": "Learn product discovery, roadmap, and metrics to ship impactful products.",
        "highlights": [
            "Roadmapping",
            "User research",
            "Prioritization"
        ],
        "curriculum": [
            {
                "section": "Discovery",
                "lectures": 8,
                "duration": "3h"
            },
            {
                "section": "Metrics",
                "lectures": 6,
                "duration": "2h"
            }
        ]
    },
    {
        "id": "course-015",
        "title": "Cybersecurity Fundamentals",
        "slug": "cybersecurity-fundamentals",
        "category": "Security",
        "level": "Beginner",
        "rating": 4.6,
        "reviews": 980,
        "students": 4300,
        "price": 11625,
        "originalPrice": 17438,
        "image": "course-cybersecurity-fundamentals.jpg",
        "instructor": "Rajesh Naidu",
        "instructorId": "instructor-14",
        "duration": "16 hours",
        "lectures": 36,
        "description": "Learn secure coding practices, threat modelling, and basics of defensive security.",
        "highlights": [
            "Threat modeling",
            "Secure coding",
            "OWASP"
        ],
        "curriculum": [
            {
                "section": "Basics",
                "lectures": 8,
                "duration": "3h"
            },
            {
                "section": "Practices",
                "lectures": 8,
                "duration": "3h"
            }
        ]
    },
    {
        "id": "course-016",
        "title": "SQL & Database Design",
        "slug": "sql-database-design",
        "category": "Data Science",
        "level": "Beginner",
        "rating": 4.7,
        "reviews": 2710,
        "students": 10250,
        "price": 16200,
        "originalPrice": 24300,
        "image": "course-sql-database.jpg",
        "instructor": "Ananya Patel",
        "instructorId": "instructor-10",
        "duration": "20 hours",
        "lectures": 44,
        "description": "Master SQL queries, schema design, and optimization techniques for relational databases.",
        "highlights": [
            "Queries",
            "Normalization",
            "Indexing"
        ],
        "curriculum": [
            {
                "section": "SQL",
                "lectures": 12,
                "duration": "4h"
            },
            {
                "section": "Design",
                "lectures": 8,
                "duration": "3h"
            }
        ]
    },
    {
        "id": "course-017",
        "title": "Introduction to Blockchain Development",
        "slug": "blockchain-development-intro",
        "category": "Technology",
        "level": "Beginner",
        "rating": 4.5,
        "reviews": 760,
        "students": 3900,
        "price": 19250,
        "originalPrice": 28875,
        "image": "course-blockchain-intro.jpg",
        "instructor": "Ramesh Kumar",
        "instructorId": "instructor-12",
        "duration": "18 hours",
        "lectures": 40,
        "description": "Understand blockchain concepts and build simple smart contracts and DApps.",
        "highlights": [
            "Smart contracts",
            "Ethereum basics",
            "DApp architecture"
        ],
        "curriculum": [
            {
                "section": "Blockchain basics",
                "lectures": 8,
                "duration": "3h"
            },
            {
                "section": "Smart contracts",
                "lectures": 10,
                "duration": "5h"
            }
        ]
    }
];

const instructorsData = [
    {
        "id": "instructor-1",
        "name": "Suresh Gangavarapu",
        "title": "Senior Web Developer & Tech Educator",
        "avatar": "SG",
        "rating": 4.8,
        "students": 84620,
        "courses": 8,
        "bio": "Suresh is a web developer and educator with 12 years of experience. He has worked with leading Indian startups and enterprises and focuses on practical, project-driven learning.",
        "expertise": ["Web Development", "JavaScript", "React", "Node.js", "Digital Marketing"],
        "social": {
            "twitter": "https://twitter.com/suresh_gangavarapu",
            "linkedin": "https://linkedin.com/in/sureshgangavarapu",
            "website": "https://sureshgangavarapu.dev"
        }
    },
    {
        "id": "instructor-2",
        "name": "Gutlapalli Ramarao",
        "title": "Data Scientist & AI Researcher",
        "avatar": "GR",
        "rating": 4.9,
        "students": 76543,
        "courses": 6,
        "bio": "Ramarao is a data scientist with a strong background in machine learning and AI. He has led analytics teams at Indian product companies and teaches practical ML for business impact.",
        "expertise": ["Data Science", "Machine Learning", "Python", "AI", "Data Visualization"],
        "social": {
            "twitter": "https://twitter.com/ramarao_gutlapalli",
            "linkedin": "https://linkedin.com/in/ramaraogutlapalli",
            "website": "https://ramaraogutlapalli.ai"
        }
    }
    ,
    {
        "id": "instructor-3",
        "name": "Karthik Thanikonda",
        "title": "Frontend Engineer",
        "avatar": "KT",
        "rating": 4.7,
        "students": 34210,
        "courses": 4,
        "bio": "Karthik specializes in frontend performance and accessibility. He mentors students on building production-ready web apps using modern frameworks.",
        "expertise": ["Frontend", "React", "TypeScript", "Accessibility", "Performance"],
        "social": {
            "twitter": "",
            "linkedin": "",
            "website": ""
        }
    },
    {
        "id": "instructor-5",
        "name": "Srinivas Reddy",
        "title": "Mobile Developer",
        "avatar": "SR",
        "rating": 4.8,
        "students": 19500,
        "courses": 5,
        "bio": "Srinivas builds native and cross-platform mobile apps and teaches practical app development with Kotlin and Flutter.",
        "expertise": ["Mobile", "Kotlin", "Flutter", "Android", "iOS"],
        "social": {
            "twitter": "",
            "linkedin": "",
            "website": ""
        }
    },
    {
        "id": "instructor-6",
        "name": "Divya Krishnan",
        "title": "Product Manager & Designer",
        "avatar": "DK",
        "rating": 4.7,
        "students": 16045,
        "courses": 2,
        "bio": "Divya focuses on product thinking, UX and research. She helps learners bridge design and business through practical product projects.",
        "expertise": ["Product", "UX", "Research", "Design Thinking", "Roadmapping"],
        "social": {
            "twitter": "",
            "linkedin": "",
            "website": ""
        }
    }
    ,
    {
        "id": "instructor-7",
        "name": "Aditya Sharma",
        "title": "Frontend Developer",
        "avatar": "AS",
        "rating": 4.6,
        "students": 12034,
        "courses": 3,
        "bio": "Aditya builds performant UIs and teaches animations, accessibility and modern frontend workflows.",
        "expertise": ["React", "Next.js", "CSS", "Accessibility"],
        "social": { "twitter": "", "linkedin": "", "website": "" }
    },
    {
        "id": "instructor-8",
        "name": "Priya Menon",
        "title": "Backend Developer",
        "avatar": "PM",
        "rating": 4.5,
        "students": 9800,
        "courses": 4,
        "bio": "Priya specializes in scalable backend systems and databases for high-traffic applications.",
        "expertise": ["Node.js", "Databases", "API Design", "Scalability"],
        "social": { "twitter": "", "linkedin": "", "website": "" }
    },
    {
        "id": "instructor-9",
        "name": "Venkatesh Iyer",
        "title": "Machine Learning Engineer",
        "avatar": "VI",
        "rating": 4.8,
        "students": 14220,
        "courses": 5,
        "bio": "Venkatesh works on production ML systems and teaches model deployment and lifecycle management.",
        "expertise": ["ML Ops", "TensorFlow", "PyTorch", "Model Deployment"],
        "social": { "twitter": "", "linkedin": "", "website": "" }
    },
    {
        "id": "instructor-10",
        "name": "Ananya Patel",
        "title": "Data Engineer",
        "avatar": "AP",
        "rating": 4.6,
        "students": 8700,
        "courses": 3,
        "bio": "Ananya focuses on data pipelines, ETL and cloud data architectures used in Indian enterprises.",
        "expertise": ["ETL", "Big Data", "Airflow", "Data Warehousing"],
        "social": { "twitter": "", "linkedin": "", "website": "" }
    },
    {
        "id": "instructor-11",
        "name": "Sneha Desai",
        "title": "UX Researcher",
        "avatar": "SD",
        "rating": 4.7,
        "students": 7400,
        "courses": 2,
        "bio": "Sneha teaches user research methods and usability testing tailored for product teams.",
        "expertise": ["User Research", "Usability", "Prototyping", "Testing"],
        "social": { "twitter": "", "linkedin": "", "website": "" }
    },
    {
        "id": "instructor-12",
        "name": "Ramesh Kumar",
        "title": "Cloud Architect",
        "avatar": "RK",
        "rating": 4.9,
        "students": 15890,
        "courses": 6,
        "bio": "Ramesh architects cloud-native systems and teaches cost-optimized cloud patterns for startups.",
        "expertise": ["AWS", "Azure", "Cloud Architecture", "Security"],
        "social": { "twitter": "", "linkedin": "", "website": "" }
    },
    {
        "id": "instructor-13",
        "name": "Kavitha Nair",
        "title": "Full Stack Instructor",
        "avatar": "KN",
        "rating": 4.8,
        "students": 13200,
        "courses": 5,
        "bio": "Kavitha teaches end-to-end product development, from UI to backend and deployment.",
        "expertise": ["Full Stack", "React", "Node.js", "DevOps"],
        "social": { "twitter": "", "linkedin": "", "website": "" }
    },
    {
        "id": "instructor-14",
        "name": "Rajesh Naidu",
        "title": "Cybersecurity Specialist",
        "avatar": "RN",
        "rating": 4.6,
        "students": 6800,
        "courses": 2,
        "bio": "Rajesh focuses on secure coding, threat modeling, and defensive security practices.",
        "expertise": ["Security", "Secure Coding", "Threat Modeling"],
        "social": { "twitter": "", "linkedin": "", "website": "" }
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        // Clear existing data
        await Course.deleteMany({});
        await Instructor.deleteMany({});

        // Import Courses
        await Course.insertMany(coursesData);
        console.log("Courses Imported!");

        // Import Instructors
        await Instructor.insertMany(instructorsData);
        console.log("Instructors Imported!");

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
