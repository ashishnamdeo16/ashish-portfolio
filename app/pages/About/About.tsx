import Link from "next/link";
import { useState } from "react";

const About = (darkModeFlag : any) => {
  console.log(darkModeFlag);

    const aboutImages = ['/assets/Greece.webp', '/assets/larc.webp', '/assets/caltech.webp'];

     const [currentImg, setCurrentImg] = useState(0);

       const nextImage = () => setCurrentImg((prev) => (prev + 1) % aboutImages.length);
       const prevImage = () => setCurrentImg((prev) => (prev - 1 + aboutImages.length) % aboutImages.length);
     

    return (
        <>
         <section id="about" className="space-y-6">
          <h2 className="text-2xl font-bold">About Me</h2>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
               <p className="mb-4">
                  I&apos;m an engineer with passion for creating intuitive,
                  accessible, and beautifully crafted user interfaces that
                  seamlessly blend thoughtful design with robust engineering. I
                  thrive at the intersection of design and development, where I
                  can build experiences that not only look stunning but are also
                  meticulously optimized for performance and usability.
                </p>
                <p className="mb-4">
                  Currently, I&apos;m Graduate Student at{" "}
                  <Link
                    className={`font-medium ${darkModeFlag ? 'text-teal-500 hover:text-teal-400' : 'text-black hover:text-teal-300'} focus-visible:text-teal-300`}
                    href="https://w2.csun.edu/"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="CSUN (opens in Link new tab)"
                  >
                    California State University, Northridge
                  </Link>
                  , specializing in Computer Engineering. With strong focus
                  on computer science disciplines such as AI, machine learning,
                  and software development. My journey has been shaped by
                  combination of professional experience, academic achievements,
                  online certifications, and hands-on learning through building
                  impactful projects.
                </p>
                <p className="mb-4">
                  In the past, I’ve had the chance to work on variety of
                  exciting projects, from building dashboards and CMS platforms
                  at{" "}
                  <Link
                    className={`font-medium ${darkModeFlag ? 'text-teal-500 hover:text-teal-400' : 'text-black hover:text-teal-300'} focus-visible:text-teal-300`}
                    href="https://www.loginextsolutions.com/"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="LogiNext Solutions (opens in Link new tab)"
                  >
                    LogiNext Solutions.{" "}
                  </Link>
                  I love creating accessible, high-performing web experiences
                  and enjoy working across both front-end and back-end
                  technologies like ReactJS, NodeJS, and MongoDB. Beyond coding,
                  I&apos;ve always been passionate about sharing
                  knowledge—whether it&apos;s as {" "}
                  <Link
                    className={`font-medium ${darkModeFlag ? 'text-teal-500 hover:text-teal-400' : 'text-black hover:text-teal-300'} focus-visible:text-teal-300`}
                    href="https://www.csun.edu/counseling/peer-education"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="CSUN Peer Educator (opens in Link new tab)"
                  >
                    CSUN Peer Educator{" "}
                  </Link>{" "}
                  or through my involvement in the{" "}
                  <Link
                    className={`font-medium ${darkModeFlag ? 'text-teal-500 hover:text-teal-400' : 'text-black hover:text-teal-300'} focus-visible:text-teal-300`}
                    href="https://www.csunentrepreneurs.org/"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="CSUN Entrepreneurs Club (opens in Link new tab)"
                  >
                    CSUN Entrepreneurs Club
                  </Link>{" "}
                  , where I find joy in collaborating with others and exploring
                  new ideas.
                </p>
                <p>
                  In my spare time, I love immersing myself in nature through
                  hiking, diving into captivating books, spending quality time
                  with my friends, cooking, and creating joyful moments with my
                  three playful pet dogs.
                </p>
            </div>
            <div className="relative">
              <img src={aboutImages[currentImg]} alt={`About ${currentImg}`} className="w-full rounded-2xl object-cover h-64 md:h-auto" />
              <button onClick={prevImage} className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-300 p-2 rounded-full opacity-80 hover:opacity-100">‹</button>
              <button onClick={nextImage} className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-300 p-2 rounded-full opacity-80 hover:opacity-100">›</button>
            </div>
          </div>
        </section>
        </>
    )
}

export default About;