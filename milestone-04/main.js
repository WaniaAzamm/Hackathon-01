var _a;
function makeEditable(element, saveButton) {
    var _a;
    var currentValue = ((_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '';
    var input = document.createElement('input');
    input.type = 'text';
    input.value = currentValue;
    element.replaceWith(input);
    saveButton.classList.add('show');
    saveButton.addEventListener('click', function () {
        var newValue = input.value.trim();
        input.replaceWith(element);
        element.textContent = newValue;
        saveButton.classList.remove('show');
    });
}
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var contact = document.getElementById('contact').value;
    var dob = document.getElementById('dob').value;
    var education = document.getElementById('education').value;
    var position = document.getElementById('position').value;
    var company = document.getElementById('company').value;
    var duration = document.getElementById('duration').value;
    var skills = document.getElementById('skills').value.split(',');
    var profilePicture = (_a = document.getElementById('profilePicture').files) === null || _a === void 0 ? void 0 : _a[0];
    var resume = document.getElementById('resume');
    resume.innerHTML = '';
    var reader = new FileReader();
    reader.onload = function (e) {
        var _a;
        var profilePicUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        var resumeHTML = "\n            <div class=\"resume-header\">\n                <img src=\"".concat(profilePicUrl, "\" alt=\"Profile Picture\">\n                <h1 class=\"editable\">").concat(name, "</h1>\n                <p class=\"editable\">Email: ").concat(email, "</p>\n                <p class=\"editable\">Contact: ").concat(contact, "</p>\n                <p class=\"editable\">Date of Birth: ").concat(dob, "</p>\n            </div>\n\n            <div class=\"resume-section\">\n                <h3>Education</h3>\n                <p class=\"editable\">").concat(education, "</p>\n            </div>\n\n            <div class=\"resume-section\">\n                <h3>Work Experience</h3>\n                <p class=\"editable\"><strong>Position:</strong> ").concat(position, "</p>\n                <p class=\"editable\"><strong>Company:</strong> ").concat(company, "</p>\n                <p class=\"editable\"><strong>Duration:</strong> ").concat(duration, "</p>\n            </div>\n\n            <div class=\"resume-section\">\n                <h3>Skills</h3>\n                <ul>\n                    ").concat(skills.map(function (skill) { return "<li class=\"editable\">".concat(skill.trim(), "</li>"); }).join(''), "\n                </ul>\n            </div>\n            <button class=\"save-btn\">Save</button>\n        ");
        resume.innerHTML = resumeHTML;
        var editableElements = resume.querySelectorAll('.editable');
        var saveButton = resume.querySelector('.save-btn');
        editableElements.forEach(function (element) {
            element.addEventListener('click', function () { return makeEditable(element, saveButton); });
        });
    };
    if (profilePicture) {
        reader.readAsDataURL(profilePicture);
    }
});
