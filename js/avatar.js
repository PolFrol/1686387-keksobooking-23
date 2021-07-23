const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
const previewPhoto = document.querySelector('.ad-form__photo img');

const getChooserChangeHandler = (chooser, preview) => () => {
  const file = chooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

const onAvatarChange = getChooserChangeHandler(fileChooserAvatar, previewAvatar);
const onPhotoChange = getChooserChangeHandler(fileChooserPhoto, previewPhoto);
fileChooserAvatar.addEventListener('change', onAvatarChange);
fileChooserPhoto.addEventListener('change', onPhotoChange);
