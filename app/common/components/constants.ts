export const DESKTOP_MENUS = [
    {
        name: "Products",
        to: "/products",
        items: [
            {
                name: "Leaderboards",
                description: "See the top performers in your community.",
                to: "/products/leaderboards",
            },
            {
                name: "Categories",
                description: "See the top Categories in your community.",
                to: "/products/categories",
            },
            {
                name: "Search",
                description: "Search for products",
                to: "/products/search",
            },
            {
                name: "Submit a Product",
                description: "Submit a product to our community.",
                to: "/products/submit",
            },
            {
                name: "Promote",
                description: "Submit a promote to our community.",
                to: "/products/promote",
            }
        ],
    },
    {
        name: "Jobs",
        to: "/jobs",
        items: [
            {
                name: "Remote Jobs",
                description: "Find a remote job in our community.",
                to: "/jobs?location=remote",
            },
            {
                name: "Full-Time Jobs",
                description: "Find a full-time job in our community.",
                to: "/jobs?location=full-time",
            },
            {
                name: "Freelance Jobs",
                description: "Find a freelance job in our community.",
                to: "/jobs?location=freelance",
            },
            {
                name: "Internships",
                description: "Find an internships in our community.",
                to: "/jobs?location=internship",
            },
            {
                name: "Submit a Job",
                description: "Submit a job to our community.",
                to: "/jobs/submit",
            }
        ]
    },
    {
        name: "Community",
        to: "/community",
        items: [
            {
                name: "All Posts",
                description: "See all posts in our community.",
                to: "/community",
            },
            {
                name: "Top Posts",
                description: "See the top posts in our community.",
                to: "/community?sort=top",
            },
            {
                name: "New Posts",
                description: "See the new posts in our community.",
                to: "/community?sort=new",
            },
            {
                name: "Create a Post",
                description: "Create a post in our community.",
                to: "/community/submit",
            }
        ]
    },
    {
        name: "IdeasGPT",
        to: "/ideas",
        items: [],
    },
    {
        name: "Teams",
        to: "/teams",
        items: [
            {
                name: "All Teams",
                description: "See all teams in our community.",
                to: "/teams",
            },
            {
                name: "Create a Team",
                description: "Create a team in our community.",
                to: "/teams/create",
            }
        ]
    }
] as const;

export const MOBILE_MENUS = [
    {
        name: "Products",
        to: "/products",
        items: [
            { name: "Leaderboards", to: "/products/leaderboards" },
            { name: "Categories", to: "/products/categories" },
            { name: "Search", to: "/products/search" },
            { name: "Submit a Product", to: "/products/submit" },
            { name: "Promote", to: "/products/promote" },
        ],
    },
    {
        name: "Jobs",
        to: "/jobs",
        items: [
            { name: "Remote Jobs", to: "/jobs?location=remote" },
            { name: "Full-Time Jobs", to: "/jobs?location=full-time" },
            { name: "Freelance Jobs", to: "/jobs?location=freelance" },
            { name: "Internships", to: "/jobs?location=internship" },
            { name: "Submit a Job", to: "/jobs/submit" },
        ],
    },
    {
        name: "Community",
        to: "/community",
        items: [
            { name: "All Posts", to: "/community" },
            { name: "Top Posts", to: "/community?sort=top" },
            { name: "New Posts", to: "/community?sort=new" },
            { name: "Create a Post", to: "/community/create" },
        ],
    },
    {
        name: "IdeasGPT",
        to: "/ideas",
        items: [],
    },
    {
        name: "Teams",
        to: "/teams",
        items: [
            { name: "All Teams", to: "/teams" },
            { name: "Create a Team", to: "/teams/create" },
        ],
    },
] as const;