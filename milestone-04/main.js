document.addEventListener('DOMContentLoaded', function () {
    function makeEditable(element, saveButton, editButton) {
        var _a;
        var currentValue = ((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
        var input = document.createElement('input');
        input.type = 'text';
        input.value = currentValue;
        input.style.width = 'calc(100% - 90px)';
        input.style.padding = '10px';
        input.style.borderRadius = '5px';
        input.style.border = '1px solid #ced6e0';
        element.replaceWith(input);
        editButton.style.display = 'none';
        saveButton.style.display = 'inline-block';
        saveButton.addEventListener('click', function () {
            var newValue = input.value.trim();
            input.replaceWith(element);
            element.textContent = newValue;
            saveButton.style.display = 'none';
            editButton.style.display = 'inline-block';
        }, { once: true });
    }
    function makeProfilePictureEditable(profileImageElement, saveButton, editButton) {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'block';
        input.style.margin = '10px 0';
        profileImageElement.replaceWith(input);
        editButton.style.display = 'none';
        saveButton.style.display = 'inline-block';
        saveButton.addEventListener('click', function () {
            var _a;
            var file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
            if (file) {
                var newImageURL = URL.createObjectURL(file);
                var imgElement = document.createElement('img');
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
    var resumeForm = document.getElementById('resumeForm');
    if (resumeForm) {
        resumeForm.addEventListener('submit', function (event) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            event.preventDefault();
            var name = ((_a = document.getElementById('name')) === null || _a === void 0 ? void 0 : _a.value) || '';
            var email = ((_b = document.getElementById('email')) === null || _b === void 0 ? void 0 : _b.value) || '';
            var contact = ((_c = document.getElementById('contact')) === null || _c === void 0 ? void 0 : _c.value) || '';
            var dob = ((_d = document.getElementById('dob')) === null || _d === void 0 ? void 0 : _d.value) || '';
            var education = ((_e = document.getElementById('education')) === null || _e === void 0 ? void 0 : _e.value) || '';
            var position = ((_f = document.getElementById('position')) === null || _f === void 0 ? void 0 : _f.value) || '';
            var company = ((_g = document.getElementById('company')) === null || _g === void 0 ? void 0 : _g.value) || '';
            var duration = ((_h = document.getElementById('duration')) === null || _h === void 0 ? void 0 : _h.value) || '';
            var skills = ((_j = document.getElementById('skills')) === null || _j === void 0 ? void 0 : _j.value) || '';
            var profilePicture = (_l = (_k = document.getElementById('profilePicture')) === null || _k === void 0 ? void 0 : _k.files) === null || _l === void 0 ? void 0 : _l[0];
            var resumeSection = document.getElementById('resume');
            if (resumeSection) {
                resumeSection.innerHTML = "\n                    <div class=\"resume-header\">\n                        <img src=\"".concat(profilePicture ? URL.createObjectURL(profilePicture) : 'https://via.placeholder.com/120', "\" alt=\"Profile Picture\" id=\"profile-image\" style=\"width: 120px; height: 120px; object-fit: cover; border-radius: 50%;\">\n                        <div class=\"personal-info\">\n                            <div class=\"personal-info-item\">\n                                <span>Name: <span class=\"editable\" id=\"name-text\">").concat(name, "</span></span>\n                                <div class=\"button-container\">\n                                    <button class=\"edit-btn\">Edit</button>\n                                    <button class=\"save-btn\" style=\"display: none;\">Save</button>\n                                </div>\n                            </div>\n                            <div class=\"personal-info-item\">\n                                <span>Email: <span class=\"editable\" id=\"email-text\">").concat(email, "</span></span>\n                                <div class=\"button-container\">\n                                    <button class=\"edit-btn\">Edit</button>\n                                    <button class=\"save-btn\" style=\"display: none;\">Save</button>\n                                </div>\n                            </div>\n                            <div class=\"personal-info-item\">\n                                <span>Contact: <span class=\"editable\" id=\"contact-text\">").concat(contact, "</span></span>\n                                <div class=\"button-container\">\n                                    <button class=\"edit-btn\">Edit</button>\n                                    <button class=\"save-btn\" style=\"display: none;\">Save</button>\n                                </div>\n                            </div>\n                            <div class=\"personal-info-item\">\n                                <span>Date of Birth: <span class=\"editable\" id=\"dob-text\">").concat(dob, "</span></span>\n                                <div class=\"button-container\">\n                                    <button class=\"edit-btn\">Edit</button>\n                                    <button class=\"save-btn\" style=\"display: none;\">Save</button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"resume-section\">\n                        <h3>Education</h3>\n                        <p class=\"editable\" id=\"education-text\">").concat(education, "</p>\n                        <div class=\"button-container\">\n                            <button class=\"edit-btn\">Edit</button>\n                            <button class=\"save-btn\" style=\"display: none;\">Save</button>\n                        </div>\n                    </div>\n                    <div class=\"resume-section\" id=\"work-experience\">\n                        <h3>Work Experience</h3>\n                        <div class=\"work-item\">\n                            <span>Position: <span class=\"editable\" id=\"position-text\">").concat(position, "</span></span>\n                            <div class=\"button-container\">\n                                <button class=\"edit-btn\">Edit</button>\n                                <button class=\"save-btn\" style=\"display: none;\">Save</button>\n                            </div>\n                        </div>\n                        <div class=\"work-item\">\n                            <span>Company: <span class=\"editable\" id=\"company-text\">").concat(company, "</span></span>\n                            <div class=\"button-container\">\n                                <button class=\"edit-btn\" id=\"company-edit-btn\">Edit</button>\n                                <button class=\"save-btn\" id=\"company-save-btn\" style=\"display: none;\">Save</button>\n                            </div>\n                        </div>\n                        <div class=\"work-item\">\n                            <span>Duration: <span class=\"editable\" id=\"duration-text\">").concat(duration, "</span></span>\n                            <div class=\"button-container\">\n                                <button class=\"edit-btn\" id=\"duration-edit-btn\">Edit</button>\n                                <button class=\"save-btn\" id=\"duration-save-btn\" style=\"display: none;\">Save</button>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"resume-section\">\n                        <h3>Skills</h3>\n                        <p class=\"editable\" id=\"skills-text\">").concat(skills, "</p>\n                        <div class=\"button-container\">\n                            <button class=\"edit-btn\">Edit</button>\n                            <button class=\"save-btn\" style=\"display: none;\">Save</button>\n                        </div>\n                    </div>");
                document.querySelectorAll('.personal-info-item, .resume-section').forEach(function (item) {
                    var span = item.querySelector('.editable');
                    var editButton = item.querySelector('.edit-btn');
                    var saveButton = item.querySelector('.save-btn');
                    if (span && editButton && saveButton) {
                        editButton.addEventListener('click', function () {
                            makeEditable(span, saveButton, editButton);
                        });
                    }
                });
                var companyText_1 = document.getElementById('company-text');
                var companyEditBtn_1 = document.getElementById('company-edit-btn');
                var companySaveBtn_1 = document.getElementById('company-save-btn');
                if (companyText_1 && companyEditBtn_1 && companySaveBtn_1) {
                    companyEditBtn_1.addEventListener('click', function () {
                        makeEditable(companyText_1, companySaveBtn_1, companyEditBtn_1);
                    });
                }
                var durationText_1 = document.getElementById('duration-text');
                var durationEditBtn_1 = document.getElementById('duration-edit-btn');
                var durationSaveBtn_1 = document.getElementById('duration-save-btn');
                if (durationText_1 && durationEditBtn_1 && durationSaveBtn_1) {
                    durationEditBtn_1.addEventListener('click', function () {
                        makeEditable(durationText_1, durationSaveBtn_1, durationEditBtn_1);
                    });
                }
                var profileImageElement_1 = document.getElementById('profile-image');
                var editProfilePictureButton_1 = document.createElement('button');
                var saveProfilePictureButton_1 = document.createElement('button');
                editProfilePictureButton_1.textContent = 'Edit Profile Picture';
                editProfilePictureButton_1.className = 'edit-btn';
                saveProfilePictureButton_1.textContent = 'Save Profile Picture';
                saveProfilePictureButton_1.className = 'save-btn';
                saveProfilePictureButton_1.style.display = 'none';
                if (profileImageElement_1) {
                    (_m = resumeSection.querySelector('.resume-header')) === null || _m === void 0 ? void 0 : _m.append(editProfilePictureButton_1, saveProfilePictureButton_1);
                    editProfilePictureButton_1.addEventListener('click', function () {
                        makeProfilePictureEditable(profileImageElement_1, saveProfilePictureButton_1, editProfilePictureButton_1);
                    });
                }
            }
        });
    }
});
