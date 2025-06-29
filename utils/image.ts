import * as ImagePicker from "expo-image-picker";

function getFormDataImages(
  key: string,
  images: ImagePicker.ImagePickerAsset[]
) {
  const formData = new FormData();

  images.forEach(({ uri, mimeType }) => {
    const file = {
      uri,
      type: mimeType || "image/jpeg",
      name: uri.split("/").pop() || "image.jpg",
    };

    formData.append(key, file as unknown as File);
  });
  return formData;
}

export { getFormDataImages };
