var _a;
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
        var resumeHTML = "\n            <div class=\"resume-header\">\n                <img src=\"".concat(profilePicUrl, "\" alt=\"Profile Picture\">\n                <h1>").concat(name, "</h1>\n                <p>Email: ").concat(email, "</p>\n                <p>Contact: ").concat(contact, "</p>\n                <p>Date of Birth: ").concat(dob, "</p>\n            </div>\n\n            <div class=\"resume-section\">\n                <h3>Education</h3>\n                <p>").concat(education, "</p>\n            </div>\n\n            <div class=\"resume-section\">\n                <h3>Work Experience</h3>\n                <p><strong>Position:</strong> ").concat(position, "</p>\n                <p><strong>Company:</strong> ").concat(company, "</p>\n                <p><strong>Duration:</strong> ").concat(duration, "</p>\n            </div>\n\n            <div class=\"resume-section\">\n                <h3>Skills</h3>\n                <ul>\n                    ").concat(skills.map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join(''), "\n                </ul>\n            </div>\n        ");
        resume.innerHTML = resumeHTML;
    };
    if (profilePicture) {
        reader.readAsDataURL(profilePicture);
    }
});
