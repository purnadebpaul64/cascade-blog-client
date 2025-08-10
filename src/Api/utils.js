import axios from "axios";

// upload image and return image url
export const imageUpload = async (imageData) => {
  try {
    const imageFormData = new FormData();
    imageFormData.append("image", imageData);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      imageFormData
    );
    return data?.data?.display_url;
  } catch (error) {
    console.error("Image upload failed:", error);
    return null;
  }
};
