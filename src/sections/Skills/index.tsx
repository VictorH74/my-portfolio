import { skills } from "./data";

const Skills = () => (
  <section id="skills" className="pt-24 text-center">
    <h1 className="section-title">Conhecimentos</h1>
    <div className="mt-12 flex justify-center flex-wrap gap-5">
      {skills.map((s, i) => (
        <div
          className="border-2 border-main-color rounded-md p-2 min-[500px]:grow-0 min-[500px]:shrink-0 min-[500px]:basis-[300px] max-[500px]:w-full"
          key={i}
        >
          <h3>{s.title}</h3>
          <p>{s.inf}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
