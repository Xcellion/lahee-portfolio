export default function Skills() {
  return (
    <div className="container-lg mb-32 md:mb-40">
      <h2 className="font-bold font-garamond leading-[1.25em] text-[2.5rem] md:text-[4rem] mb-10">
        What I Bring to the Table
      </h2>
      <div className="flex flex-col md:flex-row gap-10 md:gap-20">
        <div className="flex-1">
          <h3 className="text-sm md:text-base font-bold mb-4">Soft Skills</h3>
          <div className="text-sm md:text-base font-semibold flex flex-wrap gap-2">
            <p className="bg-white rounded-full px-4 py-1">Cross-Functional Collaboration</p>
            <p className="bg-white rounded-full px-4 py-1">User-Centered Problem Solving</p>
            <p className="bg-white rounded-full px-4 py-1">Creative Direction & Branding</p>
            <p className="bg-white rounded-full px-4 py-1">Mentorship & Team Growth</p>
            <p className="bg-white rounded-full px-4 py-1">Communication & Stakeholder Management</p>
            <p className="bg-white rounded-full px-4 py-1">Adaptability & Global Perspective</p>
            <p className="bg-white rounded-full px-4 py-1">Multilingual Proficiency (Korean, Japanese, English)</p>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm md:text-base font-bold mb-4">Hands-On Skills</h3>
          <div className="text-sm md:text-base font-semibold flex flex-wrap gap-2">   
            <p className="bg-white rounded-full px-4 py-1">Figma, Framer, Adobe Creative Suite</p>
            <p className="bg-white rounded-full px-4 py-1">UI/UX Design & Design Systems</p>
            <p className="bg-white rounded-full px-4 py-1">Wireframing & Prototyping</p>
            <p className="bg-white rounded-full px-4 py-1">User Research & Data Synthesis</p>
            <p className="bg-white rounded-full px-4 py-1">Interaction Design & Motion</p>
            <p className="bg-white rounded-full px-4 py-1">HTML, CSS</p>
          </div>
        </div>
      </div>
    </div>
  )
}
