import * as Yup from "yup";

const newSurveySchema = Yup.object().shape({
    name: Yup.string().min(2).max(100).required("Required"),
    description: Yup.string().min(2).max(2000).required("Required"),
    imageUrl: Yup.string().min(2).max(255).required("Insert Image Url")
})

export default newSurveySchema;