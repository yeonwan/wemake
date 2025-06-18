-- Insert categories
INSERT INTO categories (name, description) VALUES
('AI & Machine Learning', 'Products and tools powered by artificial intelligence and machine learning'),
('Developer Tools', 'Tools and utilities for developers'),
('Productivity', 'Apps and tools to boost productivity'),
('Design', 'Design tools and resources'),
('Analytics', 'Data analytics and visualization tools'),
('Security', 'Security and privacy tools'),
('DevOps', 'DevOps and infrastructure tools'),
('Mobile', 'Mobile development tools and apps');

-- Insert products
INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id)
VALUES
(
  'CodeGPT',
  'AI-powered code completion and generation',
  'An AI tool that helps developers write better code faster by providing intelligent code suggestions and completions.',
  '{"steps": ["Install the extension", "Connect your IDE", "Start coding with AI assistance"]}'::jsonb,
  '🤖',
  'https://codegpt.example.com',
  '{"views": 100, "reviews": 5}'::jsonb,
  '30c44e88-d7f7-4da0-b8e6-13705f238c54',
  1
),
(
  'DevFlow',
  'Streamline your development workflow',
  'A comprehensive development workflow tool that helps teams collaborate and ship faster.',
  '{"steps": ["Set up your project", "Invite team members", "Start tracking progress"]}'::jsonb,
  '⚡',
  'https://devflow.example.com',
  '{"views": 75, "reviews": 3}'::jsonb,
  '30c44e88-d7f7-4da0-b8e6-13705f238c54',
  2
),
(
  'SecureCode',
  'Automated security scanning for your codebase',
  'A security tool that automatically scans your code for vulnerabilities and suggests fixes.',
  '{"steps": ["Connect your repository", "Configure scan settings", "Review and fix issues"]}'::jsonb,
  '🔒',
  'https://securecode.example.com',
  '{"views": 120, "reviews": 8}'::jsonb,
  '30c44e88-d7f7-4da0-b8e6-13705f238c54',
  6
),
(
  'CloudDeploy',
  'One-click deployment to any cloud',
  'Simplify your cloud deployment process with automated pipelines and infrastructure management.',
  '{"steps": ["Connect your cloud provider", "Define your infrastructure", "Deploy with one click"]}'::jsonb,
  '☁️',
  'https://clouddeploy.example.com',
  '{"views": 90, "reviews": 4}'::jsonb,
  '30c44e88-d7f7-4da0-b8e6-13705f238c54',
  7
),
(
  'MobileKit',
  'Cross-platform mobile development toolkit',
  'Build beautiful mobile apps faster with our comprehensive development toolkit.',
  '{"steps": ["Choose your platform", "Use our components", "Build and deploy"]}'::jsonb,
  '📱',
  'https://mobilekit.example.com',
  '{"views": 150, "reviews": 12}'::jsonb,
  '30c44e88-d7f7-4da0-b8e6-13705f238c54',
  8
);

-- Insert topics
INSERT INTO topics (name, slug) VALUES
('Product Development', 'product-development'),
('Startup Life', 'startup-life'),
('Tech News', 'tech-news'),
('Career Advice', 'career-advice'),
('AI & ML', 'ai-ml'),
('Web Development', 'web-development'),
('Mobile Development', 'mobile-development'),
('DevOps & Cloud', 'devops-cloud');

-- Insert posts
INSERT INTO posts (title, content, topic_id, profile_id) VALUES
(
  'Building a Successful SaaS Product',
  'Here are my key learnings from building and scaling a SaaS product...',
  1,
  '30c44e88-d7f7-4da0-b8e6-13705f238c54'
),
(
  'The Future of AI in Development',
  'Exploring how AI is transforming the way we write and maintain code...',
  5,
  '30c44e88-d7f7-4da0-b8e6-13705f238c54'
),
(
  'Essential DevOps Practices for Startups',
  'Learn the crucial DevOps practices that can help your startup scale efficiently...',
  8,
  '30c44e88-d7f7-4da0-b8e6-13705f238c54'
),
(
  'Mobile App Development Trends 2024',
  'Discover the latest trends and technologies shaping mobile app development...',
  7,
  '30c44e88-d7f7-4da0-b8e6-13705f238c54'
),
(
  'Web Development Best Practices',
  'A comprehensive guide to modern web development practices and tools...',
  6,
  '30c44e88-d7f7-4da0-b8e6-13705f238c54'
);

-- Insert GPT ideas
INSERT INTO gpt_ideas (title, description, views, claimed_by) VALUES
(
  'AI-Powered Code Review Assistant',
  'An AI tool that automatically reviews code changes and suggests improvements',
  150,
  '30c44e88-d7f7-4da0-b8e6-13705f238c54'
),
(
  'Smart Documentation Generator',
  'Automatically generate and maintain documentation from code comments',
  120,
  NULL
),
(
  'Automated Testing Framework',
  'AI-driven testing framework that writes and maintains test cases',
  200,
  NULL
),
(
  'Code Security Scanner',
  'Real-time security scanning and vulnerability detection',
  180,
  NULL
),
(
  'Performance Optimization Tool',
  'Automated performance analysis and optimization suggestions',
  160,
  NULL
);

-- Insert teams
INSERT INTO teams (product_name, product_stage, team_size, equity_split, roles, description)
VALUES
(
  'CodeAI',
  'MVP',
  3,
  33,
  'Full Stack Developer, ML Engineer, Product Designer',
  'Building the next generation of AI-powered development tools'
),
(
  'SecureCloud',
  'Beta',
  4,
  25,
  'Security Engineer, DevOps Engineer, Backend Developer, Frontend Developer',
  'Creating a secure cloud infrastructure platform'
),
(
  'MobileFirst',
  'Launched',
  5,
  20,
  'Mobile Developer, UI/UX Designer, Backend Developer, QA Engineer, Product Manager',
  'Developing cross-platform mobile applications'
),
(
  'DevOpsPro',
  'Scaling',
  6,
  16,
  'DevOps Engineer, Cloud Architect, Security Specialist, SRE, Backend Developer, Frontend Developer',
  'Building enterprise-grade DevOps solutions'
),
(
  'WebFlow',
  'Idea',
  2,
  50,
  'Full Stack Developer, UI/UX Designer',
  'Creating a no-code web development platform'
);

-- Insert jobs
INSERT INTO jobs (job_id, position, overview, qualifications, responsibilities, benefits, skills, company_name, company_logo_url, company_location, apply_url, job_type, location, salary_range)
VALUES
(
  1,
  'Senior Full Stack Developer',
  'Join our team to build the future of development tools',
  '5+ years of experience with React, Node.js, and TypeScript',
  'Lead development of new features, mentor junior developers',
  'Competitive salary, remote work, health insurance',
  'React, Node.js, TypeScript, AWS',
  'TechCorp',
  'https://techcorp.example.com/logo.png',
  'San Francisco, CA',
  'https://techcorp.example.com/jobs/senior-dev',
  'full-time',
  'remote',
  '$150,000-200,000'
),
(
  2,
  'DevOps Engineer',
  'Help us build and maintain our cloud infrastructure',
  '3+ years of experience with AWS, Kubernetes, and CI/CD',
  'Manage cloud infrastructure, implement automation, ensure security',
  'Competitive salary, remote work, health insurance, learning budget',
  'AWS, Kubernetes, Docker, Terraform',
  'CloudTech',
  'https://cloudtech.example.com/logo.png',
  'New York, NY',
  'https://cloudtech.example.com/jobs/devops',
  'full-time',
  'hybrid',
  '$100,000-150,000'
),
(
  3,
  'Mobile Developer',
  'Build next-generation mobile applications',
  '4+ years of experience with React Native and iOS/Android development',
  'Develop and maintain mobile apps, work with cross-functional teams',
  'Competitive salary, remote work, health insurance, device budget',
  'React Native, Swift, Kotlin, Firebase',
  'MobileFirst',
  'https://mobilefirst.example.com/logo.png',
  'Austin, TX',
  'https://mobilefirst.example.com/jobs/mobile-dev',
  'full-time',
  'on-site',
  '$50,000-100,000'
),
(
  4,
  'Security Engineer',
  'Help secure our platform and customer data',
  '3+ years of experience in application security and cloud security',
  'Implement security measures, conduct audits, respond to incidents',
  'Competitive salary, remote work, health insurance, security certifications',
  'Security, AWS, Python, Incident Response',
  'SecureCorp',
  'https://securecorp.example.com/logo.png',
  'Boston, MA',
  'https://securecorp.example.com/jobs/security',
  'full-time',
  'hybrid',
  '$200,000-250,000'
),
(
  5,
  'Product Designer',
  'Design beautiful and intuitive user experiences',
  '4+ years of experience in product design, strong portfolio required',
  'Create user interfaces, conduct user research, work with development team',
  'Competitive salary, remote work, health insurance, design tools budget',
  'Figma, Sketch, User Research, Prototyping',
  'DesignHub',
  'https://designhub.example.com/logo.png',
  'Seattle, WA',
  'https://designhub.example.com/jobs/designer',
  'full-time',
  'remote',
  '$250,000+'
);

-- Insert post replies
INSERT INTO post_replies (post_id, profile_id, reply, parent_id)
VALUES
-- Replies for "Building a Successful SaaS Product"
(
  1,
  '30c44e88-d7f7-4da0-b8e6-13705f238c54',
  'Great insights! I especially agree with the focus on customer feedback early in the development process.',
  NULL
),
(
  1,
  '30c44e88-d7f7-4da0-b8e6-13705f238c54',
  'Would love to hear more about your pricing strategy and how you determined the different tiers.',
  NULL
),

-- Replies for "The Future of AI in Development"
(
  2,
  '30c44e88-d7f7-4da0-b8e6-13705f238c54',
  'AI pair programming tools have completely transformed my development workflow. They help catch bugs early and suggest better patterns.',
  NULL
),
(
  2,
  '30c44e88-d7f7-4da0-b8e6-13705f238c54',
  'Have you tried using GPT-4 for code reviews? I''d be interested in hearing your experience.',
  NULL
),

-- Replies for "Essential DevOps Practices for Startups"
(
  3,
  '30c44e88-d7f7-4da0-b8e6-13705f238c54',
  'Continuous Integration is definitely key. We saw a huge improvement in deployment reliability after implementing proper CI/CD.',
  NULL
),
(
  3,
  '30c44e88-d7f7-4da0-b8e6-13705f238c54',
  'Infrastructure as Code was a game changer for us. Terraform made our deployments so much more reliable.',
  NULL
),

-- Nested replies (using parent_id) for the first post
(
  1,
  '30c44e88-d7f7-4da0-b8e6-13705f238c54',
  'We started with a simple freemium model and adjusted based on usage patterns.',
  2
),
(
  1,
  '30c44e88-d7f7-4da0-b8e6-13705f238c54',
  'That makes sense. How long did it take to find the right balance?',
  1
);

