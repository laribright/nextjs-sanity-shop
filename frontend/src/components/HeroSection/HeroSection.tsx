import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import heroClassNames from "./heroClassNames";

const HeroSection: FC<{ showLink?: boolean }> = (props) => {
  const { showLink } = props;

  return (
    <section className={heroClassNames.hero}>
      <div className={heroClassNames.grid}>
        <div className={heroClassNames.content}>
          <h1 className={heroClassNames.heading}>Gaming</h1>
          <h1 className={heroClassNames.ctaText}>
            Unlock Your Gaming Potential
          </h1>
          <p className={heroClassNames.paragraph}>
            Discover, Learn, and Conquer with Our Extensive Collection of Games
          </p>
          {showLink && (
            <div className="mt-8 sm:mt-10 rounded">
              <Link href="#recent-games" className={heroClassNames.button}>
                Find Games
              </Link>
            </div>
          )}
        </div>

        <div className={heroClassNames.imageContainer}>
          <Image
            src="https://images.unsplash.com/photo-1592155931584-901ac15763e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80"
            alt="3D Game Development"
            className={heroClassNames.image}
            width="400"
            height={400}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
