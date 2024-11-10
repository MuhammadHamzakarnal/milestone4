interface ResumeData {
  name: string;
  email: string;
  phone: string;
  religion: string;
  education: string;
  experience: string;
  skills: string;
  profilePicture: string | null;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resumeform") as HTMLFormElement;
  const resumeOutput = document.getElementById("resumeOutput") as HTMLElement;
  const profilePictureInput = document.getElementById(
    "profilepicture"
  ) as HTMLInputElement;
  const editButton = document.getElementById("editButton") as HTMLButtonElement;

  form.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const resumeData: ResumeData = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      phone: (document.getElementById("phone") as HTMLInputElement).value,
      religion: (document.getElementById("rel") as HTMLInputElement).value,
      education: (document.getElementById("education") as HTMLTextAreaElement)
        .value,
      experience: (document.getElementById("experience") as HTMLTextAreaElement)
        .value,
      skills: (document.getElementById("skills") as HTMLTextAreaElement).value,
      profilePicture: "",
    };

    generateResume(resumeData);
  });

  profilePictureInput.addEventListener("change", function () {
    const file = profilePictureInput.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgSrc = e.target?.result as string;
        const profilePicSection = document.getElementById(
          "profile-picture"
        ) as HTMLElement;
        profilePicSection.innerHTML = `<img src="${imgSrc}" alt="Profile Picture" style="max-width: 150px; border-radius: 50%;">`;
      };
      reader.readAsDataURL(file);
    }
  });

  function generateResume(data: ResumeData): void {
    let profilePictureHtml = "";
    if (profilePictureInput.files?.[0]) {
      profilePictureHtml = `
        <div id="profile-picture">
          <img src="${URL.createObjectURL(
            profilePictureInput.files[0]
          )}" alt="Profile Picture" style="max-width: 150px; border-radius: 50%;">
        </div>
      `;
    }

    const resumeHtml = `
      <h2>Resume</h2>
      ${profilePictureHtml}
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Contact:</strong> ${data.phone}</p>
      <p><strong>Religion:</strong> ${data.religion}</p>
      
      <h3>Education</h3>
      <p>${data.education}</p>

      <h3>Experience</h3>
      <p>${data.experience}</p>

      <h3>Skills</h3>
      <p>${data.skills}</p>
    `;

    resumeOutput.innerHTML = resumeHtml;
    resumeOutput.style.display = "block";

    form.style.display = "none";
    editButton.style.display = "block";
  }

  editButton.addEventListener("click", () => {
    form.style.display = "block";
    resumeOutput.innerHTML = "";
    resumeOutput.style.display = "none";
    editButton.style.display = "none";
  });
});
