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
        description: "Smarthouse mobile application for monitoring home security based on MQTT, Firebase and Flutter",
        details: "A comprehensive smart home security solution. This mobile application allows users to monitor their home security in real-time using MQTT protocol for low-latency communication. It integrates with Firebase for secure authentication and real-time database updates, ensuring that users are always instantly notified of any security events. Built with Flutter for a smooth cross-platform experience.",
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
        title: "ShrimpScale",
        category: "Desktop App",
        year: "2025",
        description: "Freelance Desktop app for Pt. Wirontono Baru Jakarta.",
        details: "A specialized desktop application designed for industrial scale management at PT. Wirontono Baru wkwkwk. This application interfaces with digital scales to automate weight recording, improving accuracy and efficiency in the shrimp processing line. Features include real-time data logging, reporting, and integration with existing inventory systems.",
        images: [
            "/Project/Shrimpscale/screen1.png",
            "/Project/Shrimpscale/screen2.png",
            "/Project/Shrimpscale/screen3.png",
            "/Project/Shrimpscale/screen4.png"
        ],
        icon: "/project2.png",
        type: "desktop",
    },
    {
        slug: "unesa-eco-edu",
        title: "Unesa Eco-edu",
        category: "Web Development",
        year: "2025",
        description: "Freelance Unesa eco-edu tourism website for the cultural village of Lidah Wetan based on Next.js",
        details: "An interactive educational tourism website for the Lidah Wetan Cultural Village. Developed using Next.js for high performance and SEO optimization. The platform showcases the village's cultural heritage, offers booking capabilities for tours, and provides educational resources for visitors. Features a modern, responsive design with rich media galleries.",
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
        description: "Internship for PT Vascomm Sidoarjo – Laravel + MySQL website",
        details: "A robust talent management platform built during an internship at PT Vascomm. This web application streamlines the recruitment and talent acquisition process. Backend powered by Laravel and MySQL ensures data integrity and scalability, while the frontend provides an intuitive interface for both HR managers and candidates.",
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
        description: "Freelance MIT inventory application from health information students",
        details: "A mobile-first inventory management system developed for health information students. 'One-Click' simplifies the tracking of medical supplies and equipment. Designed for speed and ease of use on mobile devices, allowing students to quickly scan and update inventory records in a clinical setting.",
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
