document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("resumeform");
  var resumeOutput = document.getElementById("resumeOutput");
  var profilePictureInput = document.getElementById("profilepicture");
  var editButton = document.getElementById("editButton");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var resumeData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      religion: document.getElementById("rel").value,
      education: document.getElementById("education").value,
      experience: document.getElementById("experience").value,
      skills: document.getElementById("skills").value,
      profilePicture: "",
    };
    generateResume(resumeData);
  });

  profilePictureInput.addEventListener("change", function () {
    var _a;
    var file =
      (_a = profilePictureInput.files) === null || _a === void 0
        ? void 0
        : _a[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var _a;
        var imgSrc =
          (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        var profilePicSection = document.getElementById("profile-picture");
        profilePicSection.innerHTML = '<img src="'.concat(
          imgSrc,
          '" alt="Profile Picture" style="max-width: 150px; border-radius: 50%;">'
        );
      };
      reader.readAsDataURL(file);
    }
  });

  function generateResume(data) {
    var _a;

    var profilePictureHtml = "";
    if (
      (_a = profilePictureInput.files) === null || _a === void 0
        ? void 0
        : _a[0]
    ) {
      profilePictureHtml =
        '\n        <div id="profile-picture">\n          <img src="'.concat(
          URL.createObjectURL(profilePictureInput.files[0]),
          '" alt="Profile Picture" style="max-width: 150px; border-radius: 50%;">\n        </div>\n      '
        );
    }

    var resumeHtml = "\n      <h2>Resume</h2>\n      "
      .concat(profilePictureHtml, "\n      <p><strong>Name:</strong> ")
      .concat(data.name, "</p>\n      <p><strong>Email:</strong> ")
      .concat(data.email, "</p>\n      <p><strong>Contact:</strong> ")
      .concat(data.phone, "</p>\n      <p><strong>Religion:</strong> ")
      .concat(
        data.religion,
        "</p>\n      \n      <h3>Education</h3>\n      <p>"
      )
      .concat(data.education, "</p>\n\n      <h3>Experience</h3>\n      <p>")
      .concat(data.experience, "</p>\n\n      <h3>Skills</h3>\n      <p>")
      .concat(data.skills, "</p>\n    ");

    resumeOutput.innerHTML = resumeHtml;
    resumeOutput.style.display = "block";

    form.style.display = "none";
    editButton.style.display = "block";
  }

  editButton.addEventListener("click", function () {
    form.style.display = "block";
    resumeOutput.innerHTML = "";
    resumeOutput.style.display = "none";
    editButton.style.display = "none";
  });
});
