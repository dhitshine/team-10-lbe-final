import DataImage from "./data";
import { listTools, listProyek } from "./data";


function App() {
  return (
    <>
    <div className="hero grid md:grid-cols-2 items-center pt-10 xl:gap-0 gap-6 grid-cols-1">
      <div className="animate__animated animate__fadeInUp animate__delay-2s">
        <div className="flex items-center gap-3 mb-6 bg-zinc-800 w-fit p-4 rounded-2xl">
          <img src={DataImage.HeroImage} alt="Hero Image" className="w-[50px] rounded-md" loading="lazy" />
          <q>There is no yesterday, no tomorrow, only now.</q>
        </div>
        <h1 className="text-5xl/tight font-bold mb-6">Hello, I'm <span className="text-blue-500">Benedictus </span></h1>
        <p className="text-base/loose mb-6 opacity-50">
          A developer interested in Web Development, Cyber Security, and Data Analysis. My interest and experience in these fields have been developing for the past year.
        </p>
        <div className="flex item-center sm:gap-4 gap-2">
          <a href="/" className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-400 transition-colors">
            Download CV <i className="ri-download-fill ri-lg"></i>
          </a>
          <a href="#proyek" className="bg-gray-800 text-white p-4 rounded-2xl hover:bg-gray-700 transition-colors">
            My Project <i className="ri-arrow-down-line ri-lg"></i>
          </a>
        </div>
      </div>
      
      <img src={DataImage.HeroImage} alt="Hero Image" className="w-[500px] md:ml-auto animate__animated animate__fadeInUp animate__delay-3s" loading="lazy"/>
    </div>

    {/* About page*/}
    <div className="about mt-32 py-20" id="tentang">
      <div className="xl:w-2/3 lg:3/4 w-full mx-auto p-7 bg-gray-800 rounded-lg" data-aos="fade-up" data-aos-duration="1000">
        <img src={DataImage.HeroImage} alt="About Image" className="w-12 rounded-md sm:hidden mb-10" />
        <p className="text-base/loose mb-10">
          Hi, my name is Benedictus Imanuel Wicaksono. I am a student at Institut Teknologi Sepuluh Nopember Surabaya, majoring in Informatics Engineering. I have a strong interest in web development, cyber security, and data analysis. I have been actively learning and gaining experience in these fields for the past year. My goal is to become a skilled professional in these areas and contribute to innovative projects that make a positive impact on society.
        </p>
        <div className="flex item-center justify-between">
          <img src={DataImage.HeroImage} alt="About Image" className="w-12 rounded-md sm:block hidden" loading="lazy"/>
          <div className="flex item-center gap-6">
            <div>
              <h1 className="text-4xl mb-1 font-bold">
                3<span className="text-blue-500">+</span>
              </h1>
              <p >Finished Project</p>
            </div>
            <div>
              <h1 className="text-4xl mb-1 font-bold">
                1<span className="text-blue-500">+</span>
              </h1>
              <p>Years Experience</p>
            </div>
          </div>
        </div>
      </div>

      <div className="tools mt-32">
        <h1 className="text-4xl/snug font-bold mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-="true">Used tools</h1>
        <p className="w-2/5 text-base/loose opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">These are tools that often used</p>
        <div className="tool-box mt-14 grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {listTools.map(tool => (
            <div className="flex items-center gap-2 p-3 border border-gray-600 rounded-md hover:bg-gray-600 group" key={tool.id} data-aos="fade-up" data-aos-duration="1000" data-aos-delay={tool.dad}>
            <img src={tool.gambar} alt="Tools Image" className="w-14 bg-gray-800 p-1 group-hover:bg-gray-600" />
            <div>
              <h4 className= "font-bold">{tool.nama}</h4>
              <p className="opacity-50">{tool.kategori}</p>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
    {/*about*/}


    {/*Proyek*/}
    <div className="proyek mt-32 py-10" id="proyek">
      <h1 className="text-center text-4xl font-bold mb-2" data-aos="fade-up" data-aos-duration="1000">Project</h1>
      <p className="text-center text-base/loose opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">These are projects that i've finisheds</p>
      <div className="proyek-box mt-14 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {listProyek.map(proyek => (
          <div key={proyek.id} className="p-4 bg-gray-800 rounded-md group" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={proyek.dad}>
            <img src={proyek.gambar} alt="Proyek Image" className="w-full h-auto rounded-md" />
            <div>
              <h1 className="text-2xl font-bold my-4">{proyek.nama}</h1>
              <p className="text-base/loose mb-4 opacity-50">{proyek.desk}</p>
              <div className="flex flex-wrap gap-2">
                {proyek.tools.map((tool, index) => (
                  <p key={index} className="py-1 px-3 border border-gray-600 rounded-md bg-gray-800 rounded-md font-semibold">{tool}</p>
                ))}
              </div>
              <div className="mt-8 text-center">
                <a 
            href={proyek.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-gray-600 p-3 rounded-lg block border border-gray-400 hover:bg-gray-800"
          >
            Check it now
          </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/*Proyek*/}

    {/*Kontak*/}
        <div className="kontak mt-32 sm:p-10 p-0" id="kontak">
          <h1 className="text-center text-4xl font-bold mb-2" data-aos="fade-up" data-aos-duration="1000">Contact</h1>
          <p className="text-base/loose text-center mb-10 opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000">Let's connect with me</p>
          <form action="https://formsubmit.co/13bxn05@gmail.com" method="POST" className="bg-gray-800 p-10 lg:w-fit w-full mx-auto rounded-md" autoComplete="off" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000">
            <div className="flex flex-col gap-6"> 
              <div className="flex flex-col gap-2">
                <label className="font-semibold ">Full Name</label>
                <input type="text" name="nama" placeholder="Input your name..." className="bg-gray-600 p-2 rounded-md" required/>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold ">Email</label>
                <input type="email" name="email" placeholder="Input your email..." className="bg-gray-600 p-2 rounded-md" required/>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold " htmlFor="pesan">Message</label>
                <textarea name="pesan" id="pesan" cols="45" rows="7" placeholder="Input your message..." className="bg-gray-600 p-2 rounded-md" required></textarea>
              </div>
              <div className="text-center">
                <button className="bg-blue-500 p-3 rounded-lg w-full cursor-pointer border border-gray-400 hover:bg-gray-800" type="submit">Send</button>
              </div>
            </div>
          </form>
        </div>
    {/*Kontak*/}
    </>
  )
}

export default App
