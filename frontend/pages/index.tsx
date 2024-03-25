import { Welcome } from '../src/components/Welcome/Welcome';
import { ColorSchemeToggle } from '../src/components/ColorSchemeToggle/ColorSchemeToggle';
import { HeroImageRight } from '../src/components/HeroImageRight/HeroImageRight';
import { FeaturesTitle } from '../src/components/FeaturesTitle/FeaturesTitle';
import { FooterLinks } from '../src/components/FooterLinks/FooterLinks';
import footer from '../config/footer.json';
import { FeaturesCards } from '../src/components/FeaturesCards/FeaturesCards';
import { FaqSimple } from '../src/components/FaqSimple/FaqSimple';
import { HeroBullets } from '../src/components/HeroBullets/HeroBullets';

export default function HomePage() {
  return (
    <>
      <HeroImageRight />
      <FeaturesCards />
      <FaqSimple/>
      <FooterLinks {...footer.props}/>
    </>
  );
}
