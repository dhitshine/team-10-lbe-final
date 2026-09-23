import HeroImage from "/assets/sayaganteng.png";

const Image = {
  HeroImage,
};

export default Image;

import Tools1 from "/assets/tools/vscode.png";
import Tools2 from "/assets/tools/reactjs.png";
import Tools3 from "/assets/tools/nextjs.png";
import Tools4 from "/assets/tools/tailwind.png";
import Tools6 from "/assets/tools/js.png";
import Tools7 from "/assets/tools/nodejs.png";
import Tools8 from "/assets/tools/github.png";
import Tools10 from "/assets/tools/canva.png";
import Tools11 from "/assets/tools/figma.png";

export const listTools = [
  {
    id: 1,
    gambar: Tools1,
    nama: "Visual Studio Code",
    ket: "Code Editor",
    dad: "100",
  },
  {
    id: 2,
    gambar: Tools2,
    nama: "React JS",
    ket: "Framework",
    dad: "200",
  },
  {
    id: 3,
    gambar: Tools3,
    nama: "Next JS",
    ket: "Framework",
    dad: "300",
  },
  {
    id: 4,
    gambar: Tools4,
    nama: "Tailwind CSS",
    ket: "Framework",
    dad: "400",
  },
  {
    id: 6,
    gambar: Tools6,
    nama: "Javascript",
    ket: "Language",
    dad: "600",
  },
  {
    id: 7,
    gambar: Tools7,
    nama: "Node JS",
    ket: "Javascript Runtime",
    dad: "700",
  },
  {
    id: 8,
    gambar: Tools8,
    nama: "Github",
    ket: "Repository",
    dad: "800",
  },
  {
    id: 10,
    gambar: Tools10,
    nama: "Canva",
    ket: "Design App",
    dad: "1000",
  },
  {
    id: 11,
    gambar: Tools11,
    nama: "Figma",
    ket: "Design App",
    dad: "1100",
  },
];

import Proyek1 from "/assets/proyek/image.png";
import Proyek2 from "/assets/proyek/image1.png";
import Proyek3 from "/assets/proyek/image2.png";

export const listProyek = [
  {
    id: 1,
    gambar: Proyek1,
    nama: "CV Digital",
    desk: "CV sederhana dengan html dan css",
    tools: ["HTML", "CSS"],
    dad: "200",
    link: "https://first-digital-profile.vercel.app/"
  },
  {
    id: 2,
    gambar: Proyek2,
    nama: "Website Sekolah",
    desk: "Website sekolah sederhana yang terdiri atas 3 halaman",
    tools: ["HTML", "CSS"],
    dad: "300",
    link: "https://website-sma-asal-benedictus.vercel.app/",
  },
  {
    id: 3,
    gambar: Proyek3,
    nama: "Digital Profile",
    desk: "Membuat digital profile dengan sedikit animasi",
    tools: ["Vite", "ReactJS", "TailwindCSS", "AOS"],
    dad: "400",
    link: "https://portofoliopribadi-pied.vercel.app/",
  },
];
