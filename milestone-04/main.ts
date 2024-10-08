document.addEventListener('DOMContentLoaded', () => {
    function makeEditable() {
        console.log("makeEditable function triggered");
    
        const profileImageElement = document.getElementById('profile-image') as HTMLImageElement;
        if (profileImageElement) {
            const input = document.createElement('input') as HTMLInputElement;
            input.type = 'file';
            input.accept = 'image/*';
            input.style.display = 'block';
            input.style.margin = '10px 0';
    
            profileImageElement.classList.add('original');
            profileImageElement.replaceWith(input);
        }
    
        const editableElements = document.querySelectorAll('.editable');
        editableElements.forEach((element) => {
            const currentValue = element.textContent?.trim() || '';
            const input = document.createElement('input') as HTMLInputElement;
            input.type = 'text';
            input.value = currentValue;
            input.className = 'form-control'; 
            element.replaceWith(input);
        });
    
        document.querySelectorAll('.edit-btn').forEach((button) => {
            (button as HTMLButtonElement).style.display = 'none';
        });
    
        document.querySelectorAll('.save-btn').forEach((button) => {
            (button as HTMLButtonElement).style.display = 'inline-block';
        });
    
        document.querySelectorAll('.save-btn').forEach((button) => {
            (button as HTMLButtonElement).addEventListener('click', () => {
                const fileInput = document.querySelector('#resume input[type="file"]') as HTMLInputElement;
                if (fileInput && fileInput.files?.[0]) {
                    const newImageURL = URL.createObjectURL(fileInput.files[0]);
                    const imgElement = document.createElement('img') as HTMLImageElement;
                    imgElement.src = newImageURL;
                    imgElement.alt = 'Profile Picture';
                    imgElement.className = 'editable';
                    imgElement.style.width = '120px';
                    imgElement.style.height = '120px';
                    imgElement.style.objectFit = 'cover';
                    imgElement.style.borderRadius = '50%';
    
                    fileInput.replaceWith(imgElement);
                } else {
                    const originalImage = document.querySelector('#resume img.original') as HTMLImageElement;
                    if (originalImage) {
                        originalImage.classList.remove('original');
                    }
                }
    
                const inputs = document.querySelectorAll('#resume input[type="text"]');
                inputs.forEach((input) => {
                    const newValue = (input as HTMLInputElement).value.trim();
                    const span = document.createElement('span');
                    span.className = 'editable';
                    span.textContent = newValue;
                    input.replaceWith(span);
                });
    
                document.querySelectorAll('.edit-btn').forEach((button) => {
                    (button as HTMLButtonElement).style.display = 'inline-block';
                });
    
                document.querySelectorAll('.save-btn').forEach((button) => {
                    (button as HTMLButtonElement).style.display = 'none';
                });
            });
        });
    }

    const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;

    if (resumeForm) {
        resumeForm.addEventListener('submit', function (event) {
            event.preventDefault();

            console.log("Form submitted");

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
                                <span>Name: <span class="editable">${name}</span></span>
                            </div>
                            <div class="personal-info-item">
                                <span>Email: <span class="editable">${email}</span></span>
                            </div>
                            <div class="personal-info-item">
                                <span>Contact: <span class="editable">${contact}</span></span>
                            </div>
                            <div class="personal-info-item">
                                <span>Date of Birth: <span class="editable">${dob}</span></span>
                            </div>
                        </div>
                    </div>
                    <div class="resume-section">
                        <h3>Education</h3>
                        <p class="editable">${education}</p>
                    </div>
                    <div class="resume-section" id="work-experience">
                        <h3>Work Experience</h3>
                        <div class="work-item">
                            <span>Position: <span class="editable">${position}</span></span>
                        </div>
                        <div class="work-item">
                            <span>Company: <span class="editable">${company}</span></span>
                        </div>
                        <div class="work-item">
                            <span>Duration: <span class="editable">${duration}</span></span>
                        </div>
                    </div>
                    <div class="resume-section">
                        <h3>Skills</h3>
                        <p class="editable">${skills}</p>
                    </div>
                    <div class="resume-actions">
                        <button class="edit-btn">Edit</button>
                        <button class="save-btn" style="display: none;">Save</button>
                    </div>
                `;

                document.querySelector('.edit-btn')?.addEventListener('click', makeEditable);
            } else {
                console.error("Resume section not found");
            }
        });
    } else {
        console.error("Resume form not found");
    }
});
