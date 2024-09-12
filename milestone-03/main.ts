document.getElementById('resumeForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const contact = (document.getElementById('contact') as HTMLInputElement).value;
    const dob = (document.getElementById('dob') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const position = (document.getElementById('position') as HTMLInputElement).value;
    const company = (document.getElementById('company') as HTMLInputElement).value;
    const duration = (document.getElementById('duration') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');
    const profilePicture = (document.getElementById('profilePicture') as HTMLInputElement).files?.[0];

    const resume = document.getElementById('resume')!;
    resume.innerHTML = ''; 
    

    const reader = new FileReader();
    reader.onload = function (e) {
        const profilePicUrl = e.target?.result as string;

        const resumeHTML = `
            <div class="resume-header">
                <img src="${profilePicUrl}" alt="Profile Picture">
                <h1>${name}</h1>
                <p>Email: ${email}</p>
                <p>Contact: ${contact}</p>
                <p>Date of Birth: ${dob}</p>
            </div>

            <div class="resume-section">
                <h3>Education</h3>
                <p>${education}</p>
            </div>

            <div class="resume-section">
                <h3>Work Experience</h3>
                <p><strong>Position:</strong> ${position}</p>
                <p><strong>Company:</strong> ${company}</p>
                <p><strong>Duration:</strong> ${duration}</p>
            </div>

            <div class="resume-section">
                <h3>Skills</h3>
                <ul>
                    ${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}
                </ul>
            </div>
        `;

        resume.innerHTML = resumeHTML;
    };

    if (profilePicture) {
        reader.readAsDataURL(profilePicture);
    }
});
