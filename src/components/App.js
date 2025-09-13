import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  addEducation,
  deleteEducation,
  addSkill,
  deleteSkill,
  addProject,
  deleteProject,
  addSocial,
  deleteSocial,
} from "./store";

const App = () => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  // Access state
  const profile = useSelector((state) => state.profile);
  const education = useSelector((state) => state.education);
  const skills = useSelector((state) => state.skills);
  const projects = useSelector((state) => state.projects);
  const social = useSelector((state) => state.social);

  // Navigation handlers
  const nextPage = () => setPage((p) => Math.min(p + 1, 5));
  const prevPage = () => setPage((p) => Math.max(p - 1, 0));

  // Save handler (here just log, but you could call API)
  const saveResume = () => {
    const resumeData = { profile, education, skills, projects, social };
    console.log("Final Resume:", resumeData);
    alert("Resume saved! Check console.");
  };

  // ----- PAGE FORMS -----
  const renderPage = () => {
    switch (page) {
      case 0: // Profile
        return (
          <div>
            <h2>Profile</h2>
            <input
              name="fname"
              placeholder="First Name"
              value={profile.fname}
              onChange={(e) =>
                dispatch(updateProfile({ fname: e.target.value }))
              }
            />
            <input
              name="lname"
              placeholder="Last Name"
              value={profile.lname}
              onChange={(e) =>
                dispatch(updateProfile({ lname: e.target.value }))
              }
            />
            <input
              name="phone"
              placeholder="Phone"
              value={profile.phone}
              onChange={(e) =>
                dispatch(updateProfile({ phone: e.target.value }))
              }
            />
            <input
              name="address"
              placeholder="Address"
              value={profile.address}
              onChange={(e) =>
                dispatch(updateProfile({ address: e.target.value }))
              }
            />
            <input
              name="url"
              placeholder="Portfolio URL"
              value={profile.url}
              onChange={(e) => dispatch(updateProfile({ url: e.target.value }))}
            />
          </div>
        );

      case 1: // Education
        return (
          <div>
            <h2>Education</h2>
            <button
              id="add_education"
              onClick={() =>
                dispatch(
                  addEducation({
                    courseName: "Course",
                    completionYear: "2025",
                    college: "My College",
                    percentage: "80%",
                  })
                )
              }
            >
              Add Education
            </button>
            <ul>
              {education.map((edu, i) => (
                <li key={i}>
                  {edu.courseName} - {edu.college} ({edu.completionYear}){" "}
                  <button
                    id="delete"
                    onClick={() => dispatch(deleteEducation(i))}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );

      case 2: // Skills
        return (
          <div>
            <h2>Skills</h2>
            <button
              id="add_skill"
              onClick={() => dispatch(addSkill("JavaScript"))}
            >
              Add Skill
            </button>
            <ul>
              {skills.map((skill, i) => (
                <li key={i}>
                  {skill}{" "}
                  <button
                    id="delete_skill"
                    onClick={() => dispatch(deleteSkill(i))}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );

      case 3: // Projects
        return (
          <div>
            <h2>Projects</h2>
            <button
              id="add_project"
              onClick={() =>
                dispatch(
                  addProject({
                    projectName: "Sample Project",
                    techStack: "React, Redux",
                    description: "Demo project",
                  })
                )
              }
            >
              Add Project
            </button>
            <ul>
              {projects.map((proj, i) => (
                <li key={i}>
                  {proj.projectName} ({proj.techStack}){" "}
                  <button
                    id="delete"
                    onClick={() => dispatch(deleteProject(i))}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );

      case 4: // Social Media
        return (
          <div>
            <h2>Social Media</h2>
            <button
              id="add_social"
              onClick={() => dispatch(addSocial("https://github.com/user"))}
            >
              Add Social
            </button>
            <ul>
              {social.map((s, i) => (
                <li key={i}>
                  {s}{" "}
                  <button id="delete" onClick={() => dispatch(deleteSocial(i))}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );

      case 5: // Final Resume
        return (
          <div>
            <h2>Final Resume Output</h2>
            <pre>{JSON.stringify({ profile, education, skills, projects, social }, null, 2)}</pre>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {renderPage()}

      <div style={{ marginTop: "20px" }}>
        {page > 0 && (
          <button id="back" onClick={prevPage}>
            Back
          </button>
        )}
        {page < 5 && (
          <button id="next" onClick={nextPage}>
            Next
          </button>
        )}
        {page === 5 && (
          <button id="save_continue" onClick={saveResume}>
            Save Resume
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
