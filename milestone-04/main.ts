document.addEventListener('DOMContentLoaded', () => {
    function makeEditable(element, saveButton, editButton) {
        const currentValue = element.textContent?.trim() || '';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentValue;
        input.style.width = 'calc(100% - 90px)';
        input.style.padding = '10px';
        input.style.borderRadius = '5px';
        input.style.border = '1px solid #ced6e0';

        element.replaceWith(input);
        editButton.style.display = 'none';
        saveButton.style.display = 'inline-block';

        saveButton.addEventListener(
            'click',
            () => {
                const newValue = input.value.trim();
                input.replaceWith(element);
                element.textContent = newValue;
                saveButton.style.display = 'none';
                editButton.style.display = 'inline-block';
            },
            { once: true }
        );
    }

    function makeProfilePictureEditable(profileImageElement, saveButton, editButton) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'block';
        input.style.margin = '10px 0';

        profileImageElement.replaceWith(input);
        editButton.style.display = 'none';
        saveButton.style.display = 'inline-block';

        saveButton.addEventListener('click', function () {
            const file = input.files?.[0];
            if (file) {
                const newImageURL = URL.createObjectURL(file);
                const imgElement = document.createElement('img');
                imgElement.src = newImageURL;
                imgElement.alt = 'Profile Picture';
                imgElement.className = profileImageElement.className;
                imgElement.style.width = '120px';
                imgElement.style.height = '120px';
                imgElement.style.objectFit = 'cover';
                imgElement.style.borderRadius = '50%';

                input.replaceWith(imgElement);
                profileImageElement = imgElement;
            }
            saveButton.style.display = 'none';
            editButton.style.display = 'inline-block';
            editButton.addEventListener('click', function () {
                makeProfilePictureEditable(profileImageElement, saveButton, editButton);
            });
        });
    }

    const resumeForm = document.getElementById('resumeForm');

    if (resumeForm) {
        resumeForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = (document.getElementById('name') as HTMLInputElement)?.value || '';
            const email = (document.getElementById('email') as HTMLInputElement)?.value || '';
            const contact = (document.getElementById('contact') as HTMLInputElement)?.value || '';
            const dob = (document.getElementById('dob') as HTMLInputElement)?.value || '';
            const education = (document.getElementById('education') as HTMLInputElement)?.value || '';
            const position = (document.getElementById('position') as HTMLInputElement)?.value || '';
            const company = (document.getElementById('company') as HTMLInputElement)?.value || '';
            const duration = (document.getElementById('duration') as HTMLInputElement)?.value || '';
            const skills = (document.getElementById('skills') as HTMLInputElement)?.value || '';
            const profilePicture = (document.getElementById('profilePicture') as HTMLInputElement)?.files?.[0];

            const resumeSection = document.getElementById('resume');

            if (resumeSection) {
                resumeSection.innerHTML = `
                    <div class="resume-header">
                        <img src="${
                            profilePicture ? URL.createObjectURL(profilePicture) : 'https://via.placeholder.com/120'
                        }" alt="Profile Picture" id="profile-image" style="width: 120px; height: 120px; object-fit: cover; border-radius: 50%;">
                        <div class="personal-info">
                            <div class="personal-info-item">
                                <span>Name: <span class="editable" id="name-text">${name}</span></span>
                                <div class="button-container">
                                    <button class="edit-btn">Edit</button>
                                    <button class="save-btn" style="display: none;">Save</button>
                                </div>
                            </div>
                            <div class="personal-info-item">
                                <span>Email: <span class="editable" id="email-text">${email}</span></span>
                                <div class="button-container">
                                    <button class="edit-btn">Edit</button>
                                    <button class="save-btn" style="display: none;">Save</button>
                                </div>
                            </div>
                            <div class="personal-info-item">
                                <span>Contact: <span class="editable" id="contact-text">${contact}</span></span>
                                <div class="button-container">
                                    <button class="edit-btn">Edit</button>
                                    <button class="save-btn" style="display: none;">Save</button>
                                </div>
                            </div>
                            <div class="personal-info-item">
                                <span>Date of Birth: <span class="editable" id="dob-text">${dob}</span></span>
                                <div class="button-container">
                                    <button class="edit-btn">Edit</button>
                                    <button class="save-btn" style="display: none;">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="resume-section">
                        <h3>Education</h3>
                        <p class="editable" id="education-text">${education}</p>
                        <div class="button-container">
                            <button class="edit-btn">Edit</button>
                            <button class="save-btn" style="display: none;">Save</button>
                        </div>
                    </div>
                    <div class="resume-section" id="work-experience">
                        <h3>Work Experience</h3>
                        <div class="work-item">
                            <span>Position: <span class="editable" id="position-text">${position}</span></span>
                            <div class="button-container">
                                <button class="edit-btn">Edit</button>
                                <button class="save-btn" style="display: none;">Save</button>
                            </div>
                        </div>
                        <div class="work-item">
                            <span>Company: <span class="editable" id="company-text">${company}</span></span>
                            <div class="button-container">
                                <button class="edit-btn" id="company-edit-btn">Edit</button>
                                <button class="save-btn" id="company-save-btn" style="display: none;">Save</button>
                            </div>
                        </div>
                        <div class="work-item">
                            <span>Duration: <span class="editable" id="duration-text">${duration}</span></span>
                            <div class="button-container">
                                <button class="edit-btn" id="duration-edit-btn">Edit</button>
                                <button class="save-btn" id="duration-save-btn" style="display: none;">Save</button>
                            </div>
                        </div>
                    </div>
                    <div class="resume-section">
                        <h3>Skills</h3>
                        <p class="editable" id="skills-text">${skills}</p>
                        <div class="button-container">
                            <button class="edit-btn">Edit</button>
                            <button class="save-btn" style="display: none;">Save</button>
                        </div>
                    </div>`;

                document.querySelectorAll('.personal-info-item, .resume-section').forEach((item) => {
                    const span = item.querySelector('.editable');
                    const editButton = item.querySelector('.edit-btn');
                    const saveButton = item.querySelector('.save-btn');
                    if (span && editButton && saveButton) {
                        editButton.addEventListener('click', function () {
                            makeEditable(span, saveButton, editButton);
                        });
                    }
                });

                const companyText = document.getElementById('company-text');
                const companyEditBtn = document.getElementById('company-edit-btn');
                const companySaveBtn = document.getElementById('company-save-btn');

                if (companyText && companyEditBtn && companySaveBtn) {
                    companyEditBtn.addEventListener('click', function () {
                        makeEditable(companyText, companySaveBtn, companyEditBtn);
                    });
                }

                const durationText = document.getElementById('duration-text');
                const durationEditBtn = document.getElementById('duration-edit-btn');
                const durationSaveBtn = document.getElementById('duration-save-btn');

                if (durationText && durationEditBtn && durationSaveBtn) {
                    durationEditBtn.addEventListener('click', function () {
                        makeEditable(durationText, durationSaveBtn, durationEditBtn);
                    });
                }

                const profileImageElement = document.getElementById('profile-image');
                const editProfilePictureButton = document.createElement('button');
                const saveProfilePictureButton = document.createElement('button');

                editProfilePictureButton.textContent = 'Edit Profile Picture';
                editProfilePictureButton.className = 'edit-btn';
                saveProfilePictureButton.textContent = 'Save Profile Picture';
                saveProfilePictureButton.className = 'save-btn';
                saveProfilePictureButton.style.display = 'none';

                if (profileImageElement) {
                    resumeSection.querySelector('.resume-header')?.append(editProfilePictureButton, saveProfilePictureButton);
                    editProfilePictureButton.addEventListener('click', function () {
                        makeProfilePictureEditable(profileImageElement, saveProfilePictureButton, editProfilePictureButton);
                    });
                }
            }
        });
    }
});
