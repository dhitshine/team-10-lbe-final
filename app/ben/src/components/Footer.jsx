const Footer = () => {
    return (
        <div className="mt-32 py-4 flex md:flex-row flex-col gap-6 md:gap-0 justify-between items-center" >
            <h1 className="text-2xl font-bold">Portofolio</h1>
            <div className="flex gap-3">
                <a href="#beranda">Home</a>
                <a href="#tentang">About</a>
                <a href="#proyek">Project</a>
            </div>
            <div className="flex item-center gap-3">
                <a href="https://github.com/xbggnr">
                    <i className="ri-github-fill ri-2x"></i>
                </a>
                <a href="https://www.instagram.com/beastx_xtoo/">
                    <i className="ri-instagram-fill ri-2x"></i>
                </a>
                <a href="https://www.tiktok.com/@brominct">
                    <i className="ri-tiktok-fill ri-2x"></i>
                </a>
            </div>
        </div>
    );
};

export default Footer;