import Contact from "@/components/home/Contact";
import Experience from "@/components/home/Experience";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Loader from "@/components/home/Loader";
import Works from "@/components/home/Works";

export default function Home() {
  return (
    <main>
      <Loader />
      <Hero />
      <Intro />
      <Experience />
      <Works />
      <Contact />
    </main>
  );
}
