import Image from 'next/image'

export default function Detail() {
  return (
    <div className="mb-32 md:mb-40">
      <div className="container md:flex mb-32 md:mb-40 md:pr-12">
        <div className="flex-1 font-garamond text-lg md:text-3xl !leading-normal">
          <p className="mb-12 md:mb-0">
            <span className="font-bold text-2xl md:text-[2.5rem]">Hi there!</span><br />
            <br />
            I’m a Product Designer & Art Director crafting intuitive, user-centered digital experiences for brands across New York, Tokyo, and Seoul. I blend strategy, creativity, and system thinking to build scalable, high-impact solutions—whether it’s an AI-powered platform, a SaaS product, or an interactive experience.<br />
            <br />
            When I’m not designing, I’m probably camping, tending to flowers, or getting lost in a good board game. I believe the best ideas come from stepping away from the screen—observing, experimenting, and staying curious. My approach to design is the same: thoughtful, exploratory, and always people-first.
          </p>
        </div>
        <div className="flex-0 font-garamond font-bold text-5xl md:ml-32 !leading-snug mb-20 md:mb-0 w-fit">
          I love<br />
          E.T.<br />
          Board Games<br />
          Flowers<br />
          Cats<br />
          Travel<br />
          Camping<br />
        </div>
      </div>
      <div className="container mb-32 md:mb-40">
        <h2 className="font-bold mb-6">EXPERIENCE</h2>
        <div className="flex flex-col gap-6 max-w-[53.75rem]">
          <div className="flex gap-4 md:gap-8">
            <div className="min-w-10 max-w-10 h-10 md:min-w-14 md:max-w-14 md:h-14">
              <Image src={require('public/img/about/pidasaku.png')} className="w-full h-full object-contain" alt="" />
            </div>
            <div>
              <h3 className="pb-1 font-semibold">Product Designer & Consultant</h3>
              <h4 className="pb-2 font-semibold text-sm">PIDASAKU / Jan 2018 - Present</h4>
              <ul className="text-sm list-disc pl-4 leading-relaxed">
                <li>15+ years in UI/UX, corporate branding, and digital strategy, leading end-to-end product design for global brands.</li>
                <li>Led cross-functional teams across engineering, marketing, and business, ensuring seamless execution.</li>
                <li>Mentored designers, fostering growth and design excellence.</li>
                <li>Drove business impact, achieving:</li>
                <ul className="list-disc pl-5">
            <li>140%+ revenue growth in 2 years (Pocket Change, retail finance startup).</li>
            <li>40% increase in average order value (Aww, e-commerce site).</li>
            <li>300K+ units sold across 160+ facilities (Bunshi Mask, e-commerce site)</li>
                </ul>
                <li>Scaled engagement & adoption, delivering:</li>
                <ul className="list-disc pl-5">
            <li>1,500+ businesses onboarded (Astream, Japan’s first SNS marketing tool).</li>
            <li>3x membership growth (point0 marunouchi, co-working space).</li>
            <li>80% adoption in luxury apartments (Will TAP, smart home app).</li>
                </ul>
              </ul>
            </div>
          </div>
          <div className="flex gap-4 md:gap-8">
            <div className="min-w-10 max-w-10 h-10 md:min-w-14 md:max-w-14 md:h-14">
              <Image src={require('public/img/about/goodpatch.png')} className="w-full h-full object-contain" alt="" />
            </div>
            <div>
              <h3 className="pb-1 font-semibold">Senior Product Designer, Art Director</h3>
              <h4 className="pb-2 font-semibold text-sm"><a className="underline hover-opacity" target="_blank" rel="noreferrer noopener" href="https://goodpatch.com/">Goodpatch</a> / Sep 2021 - Present</h4>
              <p className="text-sm">Lead UX/UI & Art Direction, delivering SaaS, B2B, and B2C solutions for major enterprises.</p>
              <ul className="text-sm list-disc pl-4 leading-relaxed">
                <li>63% sales growth from identity and values rebranding (Japan’s leading food delivery service).</li>
                <li>Enhanced UX/UI by designing a scalable design system (top Japanese telecom provider).</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-4 md:gap-8">
            <div className="min-w-10 max-w-10 h-10 md:min-w-14 md:max-w-14 md:h-14">
              <Image src={require('public/img/about/btwn.png')} className="w-full h-full object-contain" alt="" />
            </div>
            <div>
              <h3 className="pb-1 font-semibold">Lead Product Designer</h3>
              <h4 className="pb-2 font-semibold text-sm"><a className="underline hover-opacity" target="_blank" rel="noreferrer noopener" href="https://www.btwnapp.us/about-us-consumer">btwn</a> / Jun 2020 - Dec 2024</h4>
              <ul className="text-sm list-disc pl-4 leading-relaxed">
                <li>Led product design & UX/UI for btwn, a referral-based marketing platform.</li>
                <li>Drove 65% MAU growth & 5K+ downloads through strategic, user-centric design.</li>
                <li>Designed an intuitive B2B dashboard & consumer app, improving adoption and retention.</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-4 md:gap-8">
            <div className="min-w-10 max-w-10 h-10 md:min-w-14 md:max-w-14 md:h-14">
              <Image src={require('public/img/about/sothebys.png')} className="w-full h-full object-contain" alt="" />
            </div>
            <div>
              <h3 className="pb-1 font-semibold">Senior Product Designer, Consultant</h3>
              <h4 className="pb-2 font-semibold text-sm"><a className="underline hover-opacity" target="_blank" rel="noreferrer noopener" href="https://www.sothebys.com/en/">Sotheby&apos;s</a> / Apr 2022 - Apr 2023</h4>
              <ul className="text-sm list-disc pl-4 leading-relaxed">
                <li>Optimized UX/UI at Sotheby&apos;s, improving engagement and keeping online sales above pre-pandemic levels.</li>
                <li>Built a scalable design system, ensuring consistency and supporting future growth.</li>
                <li>Enhanced platform usability, streamlining payments, accounts, and shipping.</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-4 md:gap-8">
            <div className="min-w-10 max-w-10 h-10 md:min-w-14 md:max-w-14 md:h-14">
              <Image src={require('public/img/about/teamlab.png')} className="w-full h-full object-contain" alt="" />
            </div>
            <div>
              <h3 className="pb-1 font-semibold">Senior Product Designer</h3>
              <h4 className="pb-2 font-semibold text-sm"><a className="underline hover-opacity" target="_blank" rel="noreferrer noopener" href="https://www.team-lab.com/">teamLab</a> / Sep 2015 - Apr 2018</h4>
              <ul className="text-sm list-disc pl-4 leading-relaxed">
                <li>Led UX/UI for large-scale B2C digital experiences, collaborating with global enterprises across various industries.</li>
                <li>Designed cross-industry digital solutions spanning aviation, entertainment, beauty, and art.</li>
                <li>Immersed in teamLab’s innovative culture, developing a unique approach that blends art, technology, and user experience to create high-impact digital products.</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-4 md:gap-8">
            <div className="min-w-10 max-w-10 h-10 md:min-w-14 md:max-w-14 md:h-14">
              <Image src={require('public/img/about/oro.png')} className="w-full h-full object-contain" alt="" />
            </div>
            <div>
              <h3 className="pb-1 font-semibold">Senior Web Designer</h3>
              <h4 className="pb-2 font-semibold text-sm"><a className="underline hover-opacity" target="_blank" rel="noreferrer noopener" href="https://www.oro.com/en/">ORO</a> / Apr 2010 - Aug 2015</h4>
              <ul className="text-sm list-disc pl-4 leading-relaxed">
                <li>Led web design and digital strategy for major Japanese brands, including Lion, Kirin, AEON, and Yakult.</li>
                <li>Created engaging digital experiences, integrating branding, UX/UI, and marketing strategies.</li>
                <li>Enhanced brand presence through optimized website development and graphic design.</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-4 md:gap-8">
            <div className="min-w-10 max-w-10 h-10 md:min-w-14 md:max-w-14 md:h-14">
              <Image src={require('public/img/about/omdr.png')} className="w-full h-full object-contain" alt="" />
            </div>
            <div>
              <h3 className="pb-1 font-semibold">Web Designer, Graphic Designer</h3>
              <h4 className="pb-2 font-semibold text-sm"><a className="underline hover-opacity" target="_blank" rel="noreferrer noopener" href="https://omdr.co.jp/">omdr</a> / Apr 2012 - Apr 2013</h4>
              <ul className="text-sm list-disc pl-4 leading-relaxed">
                <li>Created luxury brand marketing designs for Franck Muller, Cartier, and Loewe at omdr.</li>
                <li>Specialized in high-end visual communication with a focus on elegance and clarity.</li>
                <li>Designed premium physical and digital assets that enhanced luxury branding.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-32 md:mb-40">
        <h2 className="font-bold mb-6">SKILLS</h2>
        <div className="flex flex-col md:flex-row gap-10 md:gap-[7.5rem]">
          <div>
            <h3 className="text-sm font-bold">Soft Skills</h3>
            <ul className="text-sm list-disc pl-4 leading-relaxed">
              <li>Cross-Functional Collaboration</li>
              <li>User-Centered Problem Solving</li>
              <li>Creative Direction & Branding</li>
              <li>Mentorship & Team Growth</li>
              <li>Communication & Stakeholder Management</li>
              <li>Adaptability & Global Perspective</li>
              <li>Multilingual Proficiency (Korean, Japanese, English)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold">Hands-On Skills</h3>
            <ul className="text-sm list-disc pl-4 leading-relaxed">   
              <li>Figma, Framer, Adobe Creative Suite</li>
              <li>UI/UX Design & Design Systems</li>
              <li>Wireframing & Prototyping</li>
              <li>User Research & Data Synthesis</li>
              <li>Interaction Design & Motion</li>
              <li>HTML, CSS</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mb-32 md:mb-40">
        <h2 className="font-bold mb-6">EDUCATION</h2>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="pb-2 font-semibold">
              <a className="underline hover-opacity" target="_blank" rel="noreferrer noopener" href="http://www.tamabi.ac.jp/index_j.htm">
                Tama Art Univerity
              </a>
            </h3>
            <div className="text-sm">
              <p>Apr 2006 - Mar 2010 / Tokyo, Japan</p>
              <p>Bachelor of Design - Graphic Design</p>
            </div>
          </div>
          <div>
            <h3 className="pb-2 font-semibold">
              <a className="underline hover-opacity" target="_blank" rel="noreferrer noopener" href="https://www.artcenter.edu/">
              ArtCenter College of Design
              </a>
            </h3>
            <div className="text-sm">
              <p>Sep 2008 - Mar 2009 / Pasadena, US</p>
              <p>International Exchange Program &quot;Pacific Rim&quot; </p>
              <p>Industrial and Product Design</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
