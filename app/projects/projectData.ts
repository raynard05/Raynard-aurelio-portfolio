export type ProjectType = "mobile" | "desktop";

export interface ProjectData {
    slug: string;
    title: string;
    category: string;
    year: string;
    description: string;
    details: string; // Longer description for the detail page
    images: string[]; // First image is main thumbnail, others for gallery/mockup
    icon: string; // Original icon/thumbnail for the menu
    type: ProjectType;
}
export const projects: ProjectData[] = [
    {
        slug: "smarthouse-app",
        title: "Smarthouse App",
        category: "Mobile App",
        year: "2024",
        description:
            "A mobile application for monitoring home security and environmental conditions.",
        details:
            "A university project developed in the 3rd semester focusing on smart home security monitoring. The application monitors fire smoke detection, door status, smoke indicator lights, and real-time weather conditions using a weather API. It utilizes MQTT broker for real-time device communication, Firebase for data handling, and Flutter for cross-platform mobile development. Built using Android Studio with a strong focus on real-time monitoring and reliability.",
        images: [
            "/Project/Smarthouse/screen1.png",
            "/Project/Smarthouse/screen2.png",
            "/Project/Smarthouse/screen3.png",
            "/Project/Smarthouse/screen4.png",
            "/Project/Smarthouse/screen5.png"
        ],
        icon: "/project1.png",
        type: "mobile",
    },
    {
        slug: "shrimpscale",
        title: "ShrimpScale ",
        category: "Desktop App",
        year: "2025",
        description:
            "Enterprise desktop application for industrial data management at PT Wirontono Baru.",
        details:
            "An enterprise-level desktop application developed for PT Wirontono Baru Jakarta. The system is used for comprehensive data management including payroll processing, work tracking, employee account management, inventory of incoming and outgoing goods, and other operational management features. Designed with a minimalist user interface while maintaining complex and efficient business logic. Developed using Java (NetBeans) and MySQL for robust data handling.",
        images: [
            "/Project/Shrimpscale/screen1.png",
            "/Project/Shrimpscale/screen2.png",
            "/Project/Shrimpscale/screen3.png",
            "/Project/Shrimpscale/screen4.png",
            "/Project/Shrimpscale/screen5.png",
            "/Project/Shrimpscale/screen6.png",
            "/Project/Shrimpscale/screen7.png",
            "/Project/Shrimpscale/screen8.png"
        ],
        icon: "/project2.png",
        type: "desktop",
    },
    {
        slug: "unesa-eco-edu",
        title: "Unesa Eco-edu",
        category: "Web Development",
        year: "2025",
        description:
            "Tourism website for cultural destinations in Lidah Wetan developed with Next.js. ",
        details:
            "A web-based tourism platform developed for two cultural tourism destinations in Lidah Wetan: Makam Sawunggaling and Pasar Lidah Ndonowati. The website allows visitors to access information easily, including through QR code scanning on-site. Built using Next.js with TypeScript, styled with Tailwind CSS, and deployed on Vercel for optimal performance and scalability. visit on desawisatabudayalidahwetan.site",
        images: [
            "/Project/eco-eduunesa/screen1.png",
            "/Project/eco-eduunesa/screen2.png",
            "/Project/eco-eduunesa/screen3.png",
            "/Project/eco-eduunesa/screen4.png",
            "/Project/eco-eduunesa/screen5.png"
        ],
        icon: "/project3.png",
        type: "desktop",
    },
    {
        slug: "talent-go",
        title: "Talent-Go",
        category: "Web Platform",
        year: "2025",
        description:
            "Internship for PT Vascomm Sidoarjo – Laravel + MySQL website",
        details:
            "A robust talent management platform built during an internship at PT Vascomm. This web application streamlines the recruitment and talent acquisition process. Backend powered by Laravel and MySQL ensures data integrity and scalability, while the frontend provides an intuitive interface for both HR managers and candidates.",
        images: [
            "/Project/talentgo/screen1.png",
            "/Project/talentgo/screen2.png",
            "/Project/talentgo/screen3.png",
            "/Project/talentgo/screen4.png",
            "/Project/talentgo/screen5.png"
        ],
        icon: "/project4.png",
        type: "desktop",
    },
    {
        slug: "one-click",
        title: "One-Click",
        category: "Inventory System",
        year: "2025",
        description:
            "Mobile healthcare service application with patient and payment management.",
        details:
            "A collaborative project developed for Health Information Management students. In this project, I contributed to solving complex application flows related to payment systems and patient management. The application functions as an online dental service booking system, allowing dentists to visit patients directly. Developed using Supabase, Next.js, and MIT Inventory, with a focus on improving system usability and workflow efficiency.",
        images: [
            "/Project/one-click/screen1.png",
            "/Project/one-click/screen2.png",
            "/Project/one-click/screen3.png",
            "/Project/one-click/screen4.png",
            "/Project/one-click/screen5.png"
        ],
        icon: "/project5.jpg",
        type: "mobile",
    },
];
