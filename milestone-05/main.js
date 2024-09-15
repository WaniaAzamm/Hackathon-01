document.addEventListener('DOMContentLoaded', function () {
    function makeEditable() {
        var profileImageElement = document.getElementById('profile-image');
        if (profileImageElement) {
            var input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.style.display = 'block';
            input.style.margin = '10px 0';
            profileImageElement.classList.add('original');
            profileImageElement.replaceWith(input);
        }
        var editableElements = document.querySelectorAll('.editable');
        editableElements.forEach(function (element) {
            var _a;
            var currentValue = ((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
            var input = document.createElement('input');
            input.type = 'text';
            input.value = currentValue;
            input.className = 'form-control';
            element.replaceWith(input);
        });
        document.querySelectorAll('.edit-btn').forEach(function (button) {
            button.style.display = 'none';
        });
        document.querySelectorAll('.save-btn').forEach(function (button) {
            button.style.display = 'inline-block';
        });
        document.querySelectorAll('.save-btn').forEach(function (button) {
            button.addEventListener('click', function () {
                var _a;
                var fileInput = document.querySelector('#resume input[type="file"]');
                if (fileInput && ((_a = fileInput.files) === null || _a === void 0 ? void 0 : _a[0])) {
                    var newImageURL = URL.createObjectURL(fileInput.files[0]);
                    var imgElement = document.createElement('img');
                    imgElement.src = newImageURL;
                    imgElement.alt = 'Profile Picture';
                    imgElement.className = 'editable';
                    imgElement.style.width = '120px';
                    imgElement.style.height = '120px';
                    imgElement.style.objectFit = 'cover';
                    imgElement.style.borderRadius = '50%';
                    fileInput.replaceWith(imgElement);
                }
                else {
                    var originalImage = document.querySelector('#resume img.original');
                    if (originalImage) {
                        originalImage.classList.remove('original');
                    }
                }
                var inputs = document.querySelectorAll('#resume input[type="text"]');
                inputs.forEach(function (input) {
                    var newValue = input.value.trim();
                    var span = document.createElement('span');
                    span.className = 'editable';
                    span.textContent = newValue;
                    input.replaceWith(span);
                });
                document.querySelectorAll('.edit-btn').forEach(function (button) {
                    button.style.display = 'inline-block';
                });
                document.querySelectorAll('.save-btn').forEach(function (button) {
                    button.style.display = 'none';
                });
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
            var resumeActions = document.getElementById('resume-actions');
            if (resumeSection && resumeActions) {
                resumeSection.innerHTML = "\n                    <div class=\"resume-header\">\n                        <img src=\"".concat(profilePicture ? URL.createObjectURL(profilePicture) : 'https://via.placeholder.com/120', "\" alt=\"Profile Picture\" id=\"profile-image\" style=\"width: 120px; height: 120px; object-fit: cover; border-radius: 50%; margin-bottom: 15px; border: 3px solid #007bff;\">\n                        <div class=\"personal-info\">\n                            <div class=\"personal-info-item\">\n                                <span>Name: <span class=\"editable\">").concat(name, "</span></span>\n                            </div>\n                            <div class=\"personal-info-item\">\n                                <span>Email: <span class=\"editable\">").concat(email, "</span></span>\n                            </div>\n                            <div class=\"personal-info-item\">\n                                <span>Contact: <span class=\"editable\">").concat(contact, "</span></span>\n                            </div>\n                            <div class=\"personal-info-item\">\n                                <span>Date of Birth: <span class=\"editable\">").concat(dob, "</span></span>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"resume-section\">\n                        <h3>Education</h3>\n                        <p class=\"editable\">").concat(education, "</p>\n                    </div>\n                    <div class=\"resume-section\" id=\"work-experience\">\n                        <h3>Work Experience</h3>\n                        <div class=\"work-item\">\n                            <span>Position: <span class=\"editable\">").concat(position, "</span></span>\n                        </div>\n                        <div class=\"work-item\">\n                            <span>Company: <span class=\"editable\">").concat(company, "</span></span>\n                        </div>\n                        <div class=\"work-item\">\n                            <span>Duration: <span class=\"editable\">").concat(duration, "</span></span>\n                        </div>\n                    </div>\n                    <div class=\"resume-section\">\n                        <h3>Skills</h3>\n                        <p class=\"editable\">").concat(skills, "</p>\n                    </div>\n                ");
                resumeActions.style.display = 'block';
                resumeActions.innerHTML += "\n                    <button class=\"edit-btn\">Edit</button>\n                    <button class=\"save-btn\" style=\"display: none;\">Save</button>\n                ";
                var downloadBtn = document.getElementById('downloadBtn');
                var shareBtn = document.getElementById('shareBtn');
                if (downloadBtn) {
                    downloadBtn.style.display = 'inline-block';
                    downloadBtn.addEventListener('click', function () {
                        var printWindow = window.open('', '', 'width=800,height=600');
                        if (printWindow) {
                            printWindow.document.write("\n                                <html>\n                                <head>\n                                    <title>Print Resume</title>\n                                    <style>\n                                        body { font-family: Arial, sans-serif; margin: 20px; }\n                                        .resume-header img { width: 120px; height: 120px; object-fit: cover; border-radius: 50%; }\n                                        .resume-section { margin: 20px 0; }\n                                        .editable { display: block; margin-bottom: 10px; }\n                                    </style>\n                                </head>\n                                <body>\n                                    ".concat(resumeSection.innerHTML, "\n                                    <script>\n                                        window.onload = function() {\n                                            window.print();\n                                            window.onafterprint = function() {\n                                                window.close();\n                                            };\n                                        };\n                                    </script>\n                                </body>\n                                </html>\n                            "));
                            printWindow.document.close();
                        }
                    });
                }
                if (shareBtn) {
                    shareBtn.style.display = 'inline-block';
                    shareBtn.addEventListener('click', function () {
                        var _a;
                        var username = (_a = document.getElementById('username')) === null || _a === void 0 ? void 0 : _a.value.trim();
                        if (username) {
                            var currentURL = "".concat(window.location.origin).concat(window.location.pathname, "?user=").concat(username, "#resume");
                            navigator.clipboard.writeText(currentURL).then(function () {
                                alert('Resume link copied to clipboard');
                            });
                        }
                    });
                }
                (_m = document.querySelector('.edit-btn')) === null || _m === void 0 ? void 0 : _m.addEventListener('click', makeEditable);
            }
        });
    }
});
