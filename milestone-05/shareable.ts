document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const username = params.get("username");

  if (username) {
    const resumeData = localStorage.getItem(username);
    if (resumeData) {
      const data = JSON.parse(resumeData);

      const resumeSection = document.getElementById("resume");
      if (resumeSection) {
        resumeSection.innerHTML = `
                    <div class="resume-header">
                        <img src="${
                          data.profilePicture ||
                          "https://via.placeholder.com/120"
                        }" alt="Profile Picture" id="profile-image" style="width: 120px; height: 120px; object-fit: cover; border-radius: 50%; margin-bottom: 15px; border: 3px solid #007bff;">
                        <div class="personal-info">
                            <div class="personal-info-item">
                                <span>Name: <span class="editable">${
                                  data.name
                                }</span></span>
                            </div>
                            <div class="personal-info-item">
                                <span>Email: <span class="editable">${
                                  data.email
                                }</span></span>
                            </div>
                            <div class="personal-info-item">
                                <span>Contact: <span class="editable">${
                                  data.contact
                                }</span></span>
                            </div>
                            <div class="personal-info-item">
                                <span>Date of Birth: <span class="editable">${
                                  data.dob
                                }</span></span>
                            </div>
                        </div>
                    </div>
                    <div class="resume-section">
                        <h3>Education</h3>
                        <p class="editable">${data.education}</p>
                    </div>
                    <div class="resume-section" id="work-experience">
                        <h3>Work Experience</h3>
                        <div class="work-item">
                            <span>Position: <span class="editable">${
                              data.position
                            }</span></span>
                        </div>
                        <div class="work-item">
                            <span>Company: <span class="editable">${
                              data.company
                            }</span></span>
                        </div>
                        <div class="work-item">
                            <span>Duration: <span class="editable">${
                              data.duration
                            }</span></span>
                        </div>
                    </div>
                    <div class="resume-section">
                        <h3>Skills</h3>
                        <p class="editable">${data.skills}</p>
                    </div>
                `;
      }
    } else {
      document.body.innerHTML = "<p>No resume found.</p>";
    }
  } else {
    document.body.innerHTML = "<p>Invalid URL.</p>";
  }
});
//
