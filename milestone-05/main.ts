document.addEventListener("DOMContentLoaded", () => {
  function makeEditable() {
    const profileImageElement = document.getElementById(
      "profile-image"
    ) as HTMLImageElement | null;
    if (profileImageElement) {
      const input = document.createElement("input") as HTMLInputElement;
      input.type = "file";
      input.accept = "image/*";
      input.style.display = "block";
      input.style.margin = "10px 0";

      profileImageElement.classList.add("original");
      profileImageElement.replaceWith(input);
    }

    const editableElements = document.querySelectorAll(".editable");
    editableElements.forEach((element) => {
      const currentValue = element.textContent?.trim() || "";
      const input = document.createElement("input") as HTMLInputElement;
      input.type = "text";
      input.value = currentValue;
      input.className = "form-control";
      element.replaceWith(input);
    });

    document.querySelectorAll(".edit-btn").forEach((button) => {
      (button as HTMLElement).style.display = "none";
    });

    document.querySelectorAll(".save-btn").forEach((button) => {
      (button as HTMLElement).style.display = "inline-block";
    });

    document.querySelectorAll(".save-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const fileInput = document.querySelector(
          '#resume input[type="file"]'
        ) as HTMLInputElement | null;
        if (fileInput && fileInput.files?.[0]) {
          const newImageURL = URL.createObjectURL(fileInput.files[0]);
          const imgElement = document.createElement("img") as HTMLImageElement;
          imgElement.src = newImageURL;
          imgElement.alt = "Profile Picture";
          imgElement.className = "editable";
          imgElement.style.width = "120px";
          imgElement.style.height = "120px";
          imgElement.style.objectFit = "cover";
          imgElement.style.borderRadius = "50%";

          fileInput.replaceWith(imgElement);
        } else {
          const originalImage = document.querySelector(
            "#resume img.original"
          ) as HTMLImageElement | null;
          if (originalImage) {
            originalImage.classList.remove("original");
          }
        }

        const inputs = document.querySelectorAll('#resume input[type="text"]');
        inputs.forEach((input) => {
          const newValue = (input as HTMLInputElement).value.trim();
          const span = document.createElement("span");
          span.className = "editable";
          span.textContent = newValue;
          input.replaceWith(span);
        });

        document.querySelectorAll(".edit-btn").forEach((button) => {
          (button as HTMLElement).style.display = "inline-block";
        });

        document.querySelectorAll(".save-btn").forEach((button) => {
          (button as HTMLElement).style.display = "none";
        });
      });
    });
  }

  const resumeForm = document.getElementById(
    "resumeForm"
  ) as HTMLFormElement | null;
  if (resumeForm) {
    resumeForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name =
        (document.getElementById("name") as HTMLInputElement)?.value || "";
      const email =
        (document.getElementById("email") as HTMLInputElement)?.value || "";
      const contact =
        (document.getElementById("contact") as HTMLInputElement)?.value || "";
      const dob =
        (document.getElementById("dob") as HTMLInputElement)?.value || "";
      const education =
        (document.getElementById("education") as HTMLInputElement)?.value || "";
      const position =
        (document.getElementById("position") as HTMLInputElement)?.value || "";
      const company =
        (document.getElementById("company") as HTMLInputElement)?.value || "";
      const duration =
        (document.getElementById("duration") as HTMLInputElement)?.value || "";
      const skills =
        (document.getElementById("skills") as HTMLInputElement)?.value || "";
      const profilePictureInput = (
        document.getElementById("profilePicture") as HTMLInputElement
      )?.files?.[0];

      const reader = new FileReader();
      reader.onload = function (event) {
        const profilePictureBase64 = event.target?.result;

        const resumeData = {
          name,
          email,
          contact,
          dob,
          education,
          position,
          company,
          duration,
          skills,
          profilePicture: profilePictureBase64,
        };

        const userName = name.toLowerCase().replace(/\s+/g, "");
        localStorage.setItem(userName, JSON.stringify(resumeData));

        const uniqueUrl = `shareable.html?username=${userName}`;
        renderResume(resumeData, uniqueUrl);
      };

      if (profilePictureInput) {
        reader.readAsDataURL(profilePictureInput);
      } else {
        const resumeData = {
          name,
          email,
          contact,
          dob,
          education,
          position,
          company,
          duration,
          skills,
          profilePicture: null,
        };

        const userName = name.toLowerCase().replace(/\s+/g, "");
        localStorage.setItem(userName, JSON.stringify(resumeData));

        const uniqueUrl = `shareable.html?username=${userName}`;
        renderResume(resumeData, uniqueUrl);
      }
    });
  }

  function renderResume(data: any, uniqueUrl: string) {
    const resumeSection = document.getElementById(
      "resume"
    ) as HTMLElement | null;
    const resumeActions = document.getElementById(
      "resume-actions"
    ) as HTMLElement | null;

    if (resumeSection && resumeActions) {
      resumeSection.innerHTML = `
                <div class="resume-header">
                    <img src="${
                      data.profilePicture || "https://via.placeholder.com/120"
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

      resumeActions.style.display = "block";
      resumeActions.innerHTML += `
                <button class="edit-btn">Edit</button>
                <button class="save-btn" style="display: none;">Save</button>
            `;

      const shareableLinkContainer = document.createElement("div");
      shareableLinkContainer.classList.add("open-resume-btn-container");

      const shareableText = document.createElement("div");
      shareableText.classList.add("open-resume-text");
      shareableText.textContent = "Share your Resume";

      const shareableLink = document.createElement("a");
      shareableLink.href = uniqueUrl;
      shareableLink.textContent = window.location.origin + "/" + uniqueUrl;
      shareableLink.classList.add("open-resume-link");

      const copyLinkBtn = document.createElement("button");
      copyLinkBtn.classList.add("copy-link-btn");
      copyLinkBtn.textContent = "Copy Resume Link";
      copyLinkBtn.addEventListener("click", () => {
        navigator.clipboard
          .writeText(shareableLink.href)
          .then(() => alert("Resume link copied to clipboard!"))
          .catch((err) => console.error("Error copying link: ", err));
      });

      shareableLinkContainer.appendChild(copyLinkBtn);
      shareableLinkContainer.appendChild(shareableText);
      shareableLinkContainer.appendChild(shareableLink);
      resumeActions.appendChild(shareableLinkContainer);

      document
        .querySelector(".edit-btn")
        ?.addEventListener("click", makeEditable);

      const downloadBtn = document.getElementById("downloadBtn");
      if (downloadBtn) {
        downloadBtn.style.display = "inline-block";
        downloadBtn.addEventListener("click", function () {
          const opt = {
            margin: 1,
            filename: "Resume.pdf",
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
          };
          (window as any).html2pdf().from(resumeSection).set(opt).save();
        });
      }
    }
  }
});
