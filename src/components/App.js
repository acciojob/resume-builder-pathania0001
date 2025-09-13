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
import { Button, TextField } from "@material-ui/core";

const App = () => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();

  // Local states for form inputs
  const [edu, setEdu] = useState({
    courseName: "",
    completionYear: "",
    college: "",
    percentage: "",
  });
  const [skillInput, setSkillInput] = useState("");
  const [proj, setProj] = useState({
    projectName: "",
    techStack: "",
    description: "",
  });
  const [socialInput, setSocialInput] = useState("");

  // Redux state
  const profile = useSelector((state) => state.profile);
  const education = useSelector((state) => state.education);
  const skills = useSelector((state) => state.skills);
  const projects = useSelector((state) => state.projects);
  const social = useSelector((state) => state.social);

  // Navigation
  const nextPage = () => setPage((p) => Math.min(p + 1, 5));
  const prevPage = () => setPage((p) => Math.max(p - 1, 0));
  const saveResume = () => {
    const resumeData = { profile, education, skills, projects, social };
    console.log("Final Resume:", resumeData);
    alert("Resume saved! Check console.");
  };

  // Render form pages
  const renderPage = () => {
    switch (page) {
      case 0: // Profile
        return (
          <div>
            <h1>RESUME GENERATOR</h1>
            <h2>Add your profile details</h2>
            <TextField
              name="fname"
              label="First Name"
              value={profile.fname}
              onChange={(e) => dispatch(updateProfile({ fname: e.target.value }))}
            />
            <TextField
              name="lname"
              label="Last Name"
              value={profile.lname}
              onChange={(e) => dispatch(updateProfile({ lname: e.target.value }))}
            />
            <TextField
              name="phone"
              label="Phone"
              value={profile.phone}
              onChange={(e) => dispatch(updateProfile({ phone: e.target.value }))}
            />
            <TextField
              name="address"
              label="Address"
              value={profile.address}
              onChange={(e) => dispatch(updateProfile({ address: e.target.value }))}
            />
            <TextField
              name="url"
              label="Portfolio URL"
              value={profile.url}
              onChange={(e) => dispatch(updateProfile({ url: e.target.value }))}
            />
          </div>
        );

      case 1: // Education
        return (
          <div>
            <h2>Add your Education Details</h2>
            <TextField
              name="courseName"
              label="Course Name"
              value={edu.courseName}
              onChange={(e) => setEdu({ ...edu, courseName: e.target.value })}
            />
            <TextField
              name="completionYear"
              label="Completion Year"
              value={edu.completionYear}
              onChange={(e) => setEdu({ ...edu, completionYear: e.target.value })}
            />
            <TextField
              name="college"
              label="College"
              value={edu.college}
              onChange={(e) => setEdu({ ...edu, college: e.target.value })}
            />
            <TextField
              name="percentage"
              label="Percentage"
              value={edu.percentage}
              onChange={(e) => setEdu({ ...edu, percentage: e.target.value })}
            />
            <Button
              id="add_education"
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(addEducation(edu));
                setEdu({ courseName: "", completionYear: "", college: "", percentage: "" });
              }}
            >
              Add Education
            </Button>
            <ul>
              {education.map((ed, i) => (
                <li key={i}>
                  {ed.courseName} - {ed.college} ({ed.completionYear}){" "}
                  <Button id="delete" variant="contained" onClick={() => dispatch(deleteEducation(i))}>
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        );

      case 2: // Skills
        return (
          <div>
            <h2>Add your Skills</h2>
            <input
              type="text"
              name="skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
            />
            <Button
              id="add_skill"
              variant="contained"
              color="primary"
              onClick={() => {
                if (skillInput) {
                  dispatch(addSkill(skillInput));
                  setSkillInput("");
                }
              }}
            >
              Add Skill
            </Button>
            <ul>
              {skills.map((sk, i) => (
                <li key={i}>
                  {sk}{" "}
                  <Button id="delete_skill" variant="contained" onClick={() => dispatch(deleteSkill(i))}>
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        );

      case 3: // Projects
        return (
          <div>
            <h2>Add your Mini Projects</h2>
            <TextField
              name="projectName"
              label="Project Name"
              value={proj.projectName}
              onChange={(e) => setProj({ ...proj, projectName: e.target.value })}
            />
            <TextField
              name="techStack"
              label="Tech Stack"
              value={proj.techStack}
              onChange={(e) => setProj({ ...proj, techStack: e.target.value })}
            />
            <textarea
              name="description"
              placeholder="Project Description"
              value={proj.description}
              onChange={(e) => setProj({ ...proj, description: e.target.value })}
            />
            <Button
              id="add_project"
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(addProject(proj));
                setProj({ projectName: "", techStack: "", description: "" });
              }}
            >
              Add Project
            </Button>
            <ul>
              {projects.map((p, i) => (
                <li key={i}>
                  {p.projectName} ({p.techStack}){" "}
                  <Button id="delete" variant="contained" onClick={() => dispatch(deleteProject(i))}>
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        );

      case 4: // Social
        return (
          <div>
            <h2>Add Social Media Links</h2>
            <input
              type="text"
              name="Social"
              value={socialInput}
              onChange={(e) => setSocialInput(e.target.value)}
            />
            <Button
              id="add_social"
              variant="contained"
              color="primary"
              onClick={() => {
                if (socialInput) {
                  dispatch(addSocial(socialInput));
                  setSocialInput("");
                }
              }}
            >
              Add Social
            </Button>
            <ul>
              {social.map((s, i) => (
                <li key={i}>
                  {s}{" "}
                  <Button id="delete" variant="contained" onClick={() => dispatch(deleteSocial(i))}>
                    Delete
                  </Button>
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
          <Button id="back" variant="contained" onClick={prevPage}>
            Back
          </Button>
        )}
        {page < 5 && (
          <Button id="next" variant="contained" color="primary" onClick={nextPage}>
            Next
          </Button>
        )}
        {page === 5 && (
          <Button id="save_continue" variant="contained" color="secondary" onClick={saveResume}>
            Save Resume
          </Button>
        )}
      </div>
    </div>
  );
};

export default App;
