import Terminal from "../ui/terminal"

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="flex min-h-[60vh] items-center justify-center px-8 py-24"
    >
    <h2 id="about-heading" className="sr-only">
        About Me
    </h2>
      <div className="w-full max-w-5xl">
        <Terminal
            command="cat about_me.txt"
            commandClassName="text-emerald-700 dark:text-emerald-400"
            outputClassName="text-slate-700 dark:text-slate-200"
            fontClassName="font-mono"
          steps={[
                { text: "\nHi, I'm Bonheur Ndeze Emmanuel\n", bold: true },
              
                {
                  text:
                    "Cisco Network Engineer • Backend Software Engineer (Python)\n\n",
                },
              
                { text: "Overview:\n", bold: true },
                {
                  text:
                    "System-oriented engineer with a strong professional foundation in computer networking " +
                    "and a growing specialization in backend software development. " +
                    "I work at the intersection of networks, infrastructure, and application logic.\n\n",
                },
              
                { text: "Networking Expertise:\n", bold: true },
                {
                  text:
                    "- Designing and implementing network architectures\n" +
                    "- Routing & switching (Cisco-based environments)\n" +
                    "- VPNs, ACLs, NAT, and network security fundamentals\n" +
                    "- Network troubleshooting and performance analysis\n" +
                    "- Network automation using scripting and tools\n\n",
                },
              
                { text: "Backend & Systems Development:\n", bold: true },
                {
                  text:
                    "- Python backend development (Django, Flask)\n" +
                    "- RESTful API design and backend architecture\n" +
                    "- Authentication, authorization, and secure systems\n" +
                    "- Database design, optimization, and data modeling\n" +
                    "- Infrastructure-aware application development\n\n",
                },
              
                { text: "DevOps & Infrastructure:\n", bold: true },
                {
                  text:
                    "- Application deployment and environment configuration\n" +
                    "- Understanding CI/CD pipelines and system reliability\n" +
                    "- Bridging software behavior with underlying infrastructure\n\n",
                },
              
                { text: "Current Direction:\n", bold: true },
                {
                  text:
                    "Actively expanding my backend engineering skillset with DevOps practices, " +
                    "network-driven system design, and applied AI/ML to enhance backend intelligence " +
                    "and automation.\n\n",
                },
              
                { text: "Engineering Philosophy:\n", bold: true },
                {
                  text:
                    "I believe reliable software starts with a deep understanding of networks, systems, " +
                    "and constraints. I enjoy working close to the system layer — where architecture, " +
                    "infrastructure, and code meet.\n",
                },
              ]}
          pulseInterval={80}
          showLocalhost={false}
        />
      </div>
    </section>
  )
}
