function makeEditable(element: HTMLElement, saveButton: HTMLElement) {
    const currentValue = element.textContent?.trim() || '';

    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentValue;

    element.replaceWith(input);
    saveButton.classList.add('show');

    saveButton.addEventListener('click', function () {
        const newValue = input.value.trim();
        input.replaceWith(element);
        element.textContent = newValue;
        saveButton.classList.remove('show');
    });
}

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
                <h1 class="editable">${name}</h1>
                <p class="editable">Email: ${email}</p>
                <p class="editable">Contact: ${contact}</p>
                <p class="editable">Date of Birth: ${dob}</p>
            </div>

            <div class="resume-section">
                <h3>Education</h3>
                <p class="editable">${education}</p>
            </div>

            <div class="resume-section">
                <h3>Work Experience</h3>
                <p class="editable"><strong>Position:</strong> ${position}</p>
                <p class="editable"><strong>Company:</strong> ${company}</p>
                <p class="editable"><strong>Duration:</strong> ${duration}</p>
            </div>

            <div class="resume-section">
                <h3>Skills</h3>
                <ul>
                    ${skills.map(skill => `<li class="editable">${skill.trim()}</li>`).join('')}
                </ul>
            </div>
            <button class="save-btn">Save</button>
        `;

        resume.innerHTML = resumeHTML;

        const editableElements = resume.querySelectorAll('.editable');
        const saveButton = resume.querySelector('.save-btn') as HTMLElement;

        editableElements.forEach((element) => {
            element.addEventListener('click', () => makeEditable(element as HTMLElement, saveButton));
        });
    };

    if (profilePicture) {
        reader.readAsDataURL(profilePicture);
    }
});
