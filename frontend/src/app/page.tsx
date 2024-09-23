import CallToActionSection from "@/containers/Home/callToActionSection";
import { HeroSection } from "@/containers/Home/heroSection";
import JobCarrouselSection from "@/containers/Home/jobCarrouselSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <JobCarrouselSection />
      <CallToActionSection />
    </>
  );
}
