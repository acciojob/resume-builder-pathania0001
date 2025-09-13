// src/components/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import store, {
  updateProfile,
  addEducation,
  editEducation,
  deleteEducation,
  addSkill,
  editSkill,
  deleteSkill,
  addProject,
  editProject,
  deleteProject,
  addSocial,
  deleteSocial
} from "./store";

const App = () => {
  const dispatch = useDispatch();
  const profile = useSelector((s) => s.profile);
  const education = useSelector((s) => s.education);
  const skills = useSelector((s) => s.skills);
  const projects = useSelector((s) => s.projects);
  const social = useSelector((s) => s.social);

  // step index: 0..5 (0=Profile,1=Education,2=Skills,3=Projects,4=Social,5=Final)
  const [step, setStep] = useState(0);

  // Local inputs for forms
  const [profileForm, setProfileForm] = useState(profile);
  const [eduForm, setEduForm] = useState({ courseName: "", completionYear: "", college: "", percentage: "" });
  const [skillInput, setSkillInput] = useState("");
  const [projForm, setProjForm] = useState({ projectName: "", techStack: "", description: "" });
  const [socialInput, setSocialInput] = useState("");

  useEffect(() => {
    // sync profile slice -> local form
    setProfileForm(profile);
  }, [profile]);

  useEffect(() => {
    // load saved state if present
    store.loadFromLocal();
  }, []);

  // Navigation
  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  // Save resume to localStorage & keep in store
  const saveAll = () => {
    store.saveToLocal();
    // keep UI alerted
    alert("Saved resume to localStorage (demo DB).");
  };

  // Profile handlers
  const handleProfileSave = () => {
    dispatch(updateProfile(profileForm));
    alert("Profile saved");
  };

  // Education handlers
  const handleAddEducation = () => {
    if (!eduForm.courseName) return alert("Enter courseName");
    dispatch(addEducation(eduForm));
    setEduForm({ courseName: "", completionYear: "", college: "", percentage: "" });
  };
  const handleDeleteEducation = (id) => dispatch(deleteEducation(id));
  const handleEditEducation = (item) => {
    const newTitle = prompt("Edit course name", item.courseName);
    if (newTitle != null) {
      dispatch(editEducation({ ...item, courseName: newTitle }));
    }
  };

  // Skills handlers
  const handleAddSkill = () => {
    if (!skillInput) return alert("Enter skill");
    dispatch(addSkill(skillInput));
    setSkillInput("");
  };
  const handleDeleteSkill = (id) => dispatch(deleteSkill(id));
  const handleEditSkill = (item) => {
    const newVal = prompt("Edit skill", item.skill);
    if (newVal != null) dispatch(editSkill({ ...item, skill: newVal }));
  };

  // Projects handlers
  const handleAddProject = () => {
    if (!projForm.projectName) return alert("Enter projectName");
    dispatch(addProject(projForm));
    setProjForm({ projectName: "", techStack: "", description: "" });
  };
  const handleDeleteProject = (id) => dispatch(deleteProject(id));
  const handleEditProject = (item) => {
    const newName = prompt("Edit project name", item.projectName);
    if (newName != null) dispatch(editProject({ ...item, projectName: newName }));
  };

  // Social handlers
  const handleAddSocial = () => {
    if (!socialInput) return alert("Enter social link");
    dispatch(addSocial(socialInput));
    setSocialInput("");
  };
  const handleDeleteSocial = (id) => dispatch(deleteSocial(id));

  // Final resume preview (simple)
  const ResumePreview = () => (
    <div style={{ padding: 20 }}>
      <h2>All steps completed - your resume is ready!!</h2>
      <div style={{ marginTop: 12 }}>
        <button onClick={() => { localStorage.removeItem("resume_builder_v1"); alert("Reset localStorage"); }}>RESET</button>
        <button onClick={() => setStep(0)} style={{ marginLeft: 8 }}>EDIT</button>
        <button onClick={() => { store.saveToLocal(); alert("Saved"); }} id="save_continue" style={{ marginLeft: 16, padding: "10px 16px", background: "#e83e63", color: "#fff", border: "none", borderRadius: 6 }}>DOWNLOAD / PREVIEW</button>
      </div>

      <div style={{ marginTop: 24 }}>
        <div style={{ display: "flex", gap: 30 }}>
          <div style={{ flex: 1 }}>
            <h3>Skills</h3>
            <ul>
              {skills.map((s) => <li key={s.id}>{s.skill}</li>)}
            </ul>
          </div>
          <div style={{ flex: 2 }}>
            <h1>{profileForm.fname} {profileForm.lname}</h1>
            <div>Address : {profileForm.address}</div>
            <div>Phone Number: {profileForm.phone}</div>

            <h2 style={{ marginTop: 24 }}>Education</h2>
            {education.map((e) => (
              <div key={e.id}>
                <h3>{e.college}</h3>
                <div>Graduation Year : {e.completionYear}</div>
                <div>{e.courseName}</div>
                <div>Percentage : {e.percentage}</div>
              </div>
            ))}

            <h2 style={{ marginTop: 24 }}>Mini Projects</h2>
            {projects.map((p) => (
              <div key={p.id}>
                <h4>{p.projectName}</h4>
                <div>{p.description}</div>
                <div>Tech Stack : {p.techStack}</div>
              </div>
            ))}

            <h2 style={{ marginTop: 24 }}>Social Links</h2>
            <ul>
              {social.map((s) => <li key={s.id}><a href={s.url}>{s.url}</a></li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Render page content
  const renderStep = () => {
    switch (step) {
      case 0: // Profile
        return (
          <div style={{ padding: 20 }}>
            <h1 style={{ textAlign: "center", background: "#e83e63", color: "#fff", padding: "20px 0" }}>RESUME GENERATOR</h1>
            <div style={{ marginTop: 20, padding: 20, border: "1px solid #eee", borderRadius: 6 }}>
              <h3 style={{ textAlign: "center" }}>Add your profile details</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                <input name="fname" placeholder="First Name" value={profileForm.fname} onChange={(e) => setProfileForm({ ...profileForm, fname: e.target.value })} />
                <input name="lname" placeholder="Last Name" value={profileForm.lname} onChange={(e) => setProfileForm({ ...profileForm, lname: e.target.value })} />
                <input name="phone" placeholder="Phone Number" value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} />
                <input name="address" placeholder="Address" value={profileForm.address} onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })} />
                <div style={{ gridColumn: "1 / -1" }}>
                  <label>Profile Image</label><br />
                  <input name="url" placeholder="Portfolio URL" value={profileForm.url} onChange={(e) => setProfileForm({ ...profileForm, url: e.target.value })} />
                </div>
              </div>

              <div style={{ marginTop: 18 }}>
                <button onClick={handleProfileSave}>SAVE PROFILE</button>
              </div>
            </div>
          </div>
        );

      case 1: // Education
        return (
          <div style={{ padding: 20 }}>
            <h3 style={{ textAlign: "center" }}>Add your Education Details</h3>
            <div style={{ marginTop: 12, padding: 20, border: "1px solid #eee", borderRadius: 6 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input name="courseName" placeholder="Course Name *" value={eduForm.courseName} onChange={(e) => setEduForm({ ...eduForm, courseName: e.target.value })} />
                <input name="completionYear" placeholder="Completion Year *" value={eduForm.completionYear} onChange={(e) => setEduForm({ ...eduForm, completionYear: e.target.value })} />
                <input name="college" placeholder="College/School *" value={eduForm.college} onChange={(e) => setEduForm({ ...eduForm, college: e.target.value })} />
                <input name="percentage" placeholder="Percentage *" value={eduForm.percentage} onChange={(e) => setEduForm({ ...eduForm, percentage: e.target.value })} />
              </div>

              <div style={{ marginTop: 14 }}>
                <button id="add_education" onClick={handleAddEducation} style={{ marginRight: 8, background: "#3f51b5", color: "#fff", padding: "8px 14px" }}>ADD EDUCATION</button>
                <button id="delete" onClick={() => { if (education.length) handleDeleteEducation(education[education.length - 1].id); }}>DELETE</button>
              </div>

              <ul style={{ marginTop: 16 }}>
                {education.map((e) => (
                  <li key={e.id}>
                    <strong>{e.courseName}</strong> - {e.college} ({e.completionYear})
                    <button id="delete" onClick={() => handleDeleteEducation(e.id)} style={{ marginLeft: 8 }}>Delete</button>
                    <button onClick={() => handleEditEducation(e)} style={{ marginLeft: 8 }}>Edit</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 2: // Skills
        return (
          <div style={{ padding: 20 }}>
            <h3 style={{ textAlign: "center" }}>Add your Skills</h3>
            <div style={{ marginTop: 12, padding: 20, border: "1px solid #eee", borderRadius: 6 }}>
              <input name="skill" placeholder="Skill *" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} />
              <div style={{ marginTop: 12 }}>
                <button id="add_skill" onClick={handleAddSkill} style={{ marginRight: 8, background: "#3f51b5", color: "#fff", padding: "8px 14px" }}>ADD SKILL</button>
                <button id="delete_skill" onClick={() => { if (skills.length) handleDeleteSkill(skills[skills.length - 1].id); }}>DELETE SKILL</button>
              </div>
              <ul style={{ marginTop: 12 }}>
                {skills.map((s) => (
                  <li key={s.id}>
                    {s.skill}
                    <button id="delete_skill" onClick={() => handleDeleteSkill(s.id)} style={{ marginLeft: 8 }}>Delete</button>
                    <button onClick={() => handleEditSkill(s)} style={{ marginLeft: 8 }}>Edit</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 3: // Projects
        return (
          <div style={{ padding: 20 }}>
            <h3 style={{ textAlign: "center" }}>Add your Mini Projects</h3>
            <div style={{ marginTop: 12, padding: 20, border: "1px solid #eee", borderRadius: 6 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <input name="projectName" placeholder="Project Name *" value={projForm.projectName} onChange={(e) => setProjForm({ ...projForm, projectName: e.target.value })} />
                <input name="techStack" placeholder="Tech Stack" value={projForm.techStack} onChange={(e) => setProjForm({ ...projForm, techStack: e.target.value })} />
                <input name="description" placeholder="Description" value={projForm.description} onChange={(e) => setProjForm({ ...projForm, description: e.target.value })} />
              </div>

              <div style={{ marginTop: 14 }}>
                <button id="add_project" onClick={handleAddProject} style={{ marginRight: 8, background: "#3f51b5", color: "#fff", padding: "8px 14px" }}>ADD PROJECT</button>
                <button id="delete" onClick={() => { if (projects.length) handleDeleteProject(projects[projects.length - 1].id); }}>DELETE</button>
              </div>

              <ul style={{ marginTop: 12 }}>
                {projects.map((p) => (
                  <li key={p.id}>
                    <strong>{p.projectName}</strong> ({p.techStack})
                    <button id="delete" onClick={() => handleDeleteProject(p.id)} style={{ marginLeft: 8 }}>Delete</button>
                    <button onClick={() => handleEditProject(p)} style={{ marginLeft: 8 }}>Edit</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 4: // Social
        return (
          <div style={{ padding: 20 }}>
            <h3 style={{ textAlign: "center" }}>Add social links like linkedin , github etc</h3>
            <div style={{ marginTop: 12, padding: 20, border: "1px solid #eee", borderRadius: 6 }}>
              <input name="Social" placeholder="Social Links *" value={socialInput} onChange={(e) => setSocialInput(e.target.value)} />
              <div style={{ marginTop: 12 }}>
                <button id="add_social" onClick={handleAddSocial} style={{ marginRight: 8, background: "#3f51b5", color: "#fff", padding: "8px 14px" }}>ADD SOCIAL</button>
                <button id="delete_social" onClick={() => { if (social.length) handleDeleteSocial(social[social.length - 1].id); }}>DELETE SOCIAL</button>
              </div>

              <ul style={{ marginTop: 12 }}>
                {social.map((s) => (
                  <li key={s.id}>
                    {s.url}
                    <button id="delete" onClick={() => handleDeleteSocial(s.id)} style={{ marginLeft: 8 }}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 5:
        return <ResumePreview />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* top progress indicator (simple) */}
      <div style={{ padding: 10 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center" }}>
          <span style={{ padding: 6, borderRadius: 20, background: step === 0 ? "#3f51b5" : "#ddd", color: step === 0 ? "#fff" : "#333" }}>1</span>
          <span>Profile Section</span>
          <span style={{ padding: 6, borderRadius: 20, background: step === 1 ? "#3f51b5" : "#ddd" }}>2</span>
          <span>Education Section</span>
          <span style={{ padding: 6, borderRadius: 20, background: step === 2 ? "#3f51b5" : "#ddd" }}>3</span>
          <span>Skills Sector</span>
          <span style={{ padding: 6, borderRadius: 20, background: step === 3 ? "#3f51b5" : "#ddd" }}>4</span>
          <span>Mini Project</span>
          <span style={{ padding: 6, borderRadius: 20, background: step === 4 ? "#3f51b5" : "#ddd" }}>5</span>
          <span>Social</span>
        </div>
      </div>

      {/* step content */}
      <div>{renderStep()}</div>

      {/* navigation */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 20, padding: 20 }}>
        <button id="back" onClick={back} disabled={step === 0}>BACK</button>
        <button id="next" onClick={next} disabled={step === 5}>NEXT</button>
        <button id="save_continue" onClick={() => { saveAll(); }} style={{ background: "#e83e63", color: "#fff", padding: "10px 14px", borderRadius: 6 }}>SAVE AND CONTINUE</button>
      </div>
    </div>
  );
};

export default App;
