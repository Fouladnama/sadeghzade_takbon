"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { DatePicker } from "zaman";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select, { components } from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer.js";
import logoGif from "../../../public/Assests/Landing/takbon.gif";
import wallpaper from "../../../public/Assests/Collaborate/wallpaper.jpg";
import {
    GlobalStyle,
    CollaborateContainer,
    Main,
    Heading,
    Logo,
    Content,
    Title,
    Field,
    FieldTitle,
    Form,
    InputContainer,
    InputContainerSpecial,
    Input,
    Label,
    Textarea,
    Address,
    DropZone,
    ProgressBarContainer,
    ProgressBar,
    DeleteFile,
    Choose,
    DropInput,
    SubmitButton
} from "./CollaborateStyle.js";

const Collaborate = () => {
    const searchParams = useSearchParams();
    const [language, setLanguage] = useState(null);

    useEffect(() => {
        if (searchParams.get("lang") == "fa" || searchParams.get("lang") == "en")
            setLanguage(searchParams.get("lang"));
        else {
            window.location.href = '/collaboration?lang=fa';
        }
    },  [searchParams, language]);

    // toastify:
    const notifyError = (msg, options) => toast.error(msg, options);
    const notifySuccess = (msg, options) => toast.success(msg, options);

    // form inputs:
    const [name, setName] = useState("");
    const [family, setFamily] = useState("");
    const [phone, setPhone] = useState("");
    const [fieldOfStudy, setFieldOfStudy] = useState("");
    
    const [grade, setGrade] = useState("");
    const gradeOptions = [
        { value: 'کارشناسی', label: 'کارشناسی' },
        { value: 'کارشناسی ارشد', label: 'کارشناسی ارشد' },
        { value: 'دکتری', label: 'دکتری' }
    ];
    const gradeOptionsEN = [
        { value: `Bachelor's degree`, label: `Bachelor's degree` },
        { value: `Master's degree`, label: `Master's degree` },
        { value: `Doctorate`, label: `Doctorate` }
    ];

    const [recentUniversity, setRecentUniversity] = useState("");
    const [educationalStatus, setEducationalStatus] = useState(null);
    const animatedComponents = makeAnimated();
    const [uniqueId] = useState(
        () => 'select_' + Math.random().toFixed(5).slice(2),
    );
    const educationalStatusOptions = [
        { value: 'فارغ التحصیل', label: 'فارغ التحصیل' },
        { value: 'دانشجو', label: 'دانشجو' }
    ];
    const educationalStatusOptionsEN = [
        { value: 'Graduated', label: 'Graduated' },
        { value: 'Student', label: 'Student' }
    ];

    const [favoriteFieldOfWorkStatus, setFavoriteFieldOfWorkStatus] = useState(null);
    const [otherDescription, setOtherDescription] = useState("");
    const favoriteFieldOfWork= [
        { value: 'برنامه ریزی تولید', label: 'برنامه ریزی تولید' },
        { value: 'مدلسازی ریاضی', label: 'مدلسازی ریاضی' },
        { value: 'داده کاوی', label: 'داده کاوی' },
        { value: 'شبیه سازی', label: 'شبیه سازی' },
        { value: 'تحقیقات بازار', label: 'تحقیقات بازار' },
        { value: 'نیازسنجی و برنامه ریزی', label: 'نیازسنجی و برنامه ریزی' },
        { value: 'کنترل موجودی', label: 'کنترل موجودی' },
        { value: 'سایر', label: 'سایر' }
    ];
    const favoriteFieldOfWorkEN = [
        { value: 'Production Planning', label: 'Production Planning' },
        { value: 'Mathematical Modeling', label: 'Mathematical Modeling' },
        { value: 'Data Mining', label: 'Data Mining' },
        { value: 'Simulation', label: 'Simulation' },
        { value: 'Market Research', label: 'Market Research' },
        { value: 'Needs Assessment and Planning', label: 'Needs Assessment and Planning' },
        { value: 'Inventory Control', label: 'Inventory Control' },
        { value: 'Other', label: 'Other' }
    ];

    const [genderStatus, setGenderStatus] = useState(null);
    const genderOptions = [
        { value: 'مرد', label: 'مرد' },
        { value: 'زن', label: 'زن' }
    ];
    const genderOptionsEN = [
        { value: 'male', label: 'male' },
        { value: 'female', label: 'female' }
    ];

    const [militaryStatus, setMilitaryStatus] = useState(null);
    const militaryOptions = [
        { value: 'معافیت تحصیلی', label: 'معافیت تحصیلی' },
        { value: 'مشمول', label: 'مشمول' },
        { value: 'دارای کارت پایان خدمت', label: 'دارای کارت پایان خدمت' }
    ];
    const militaryOptionsEN = [
        { value: 'Educational exemption', label: 'Educational exemption' },
        { value: 'Subject to service', label: 'Subject to service' },
        { value: 'Having a service completion card', label: 'Having a service completion card' }
    ];

    const [marrigeStatus, setMarrigeStatus] = useState(null);
    const marrigeOptions = [
        { value: 'مجرد', label: 'مجرد' },
        { value: 'متاهل', label: 'متاهل' }
    ];
    const marrigeOptionsEN = [
        { value: 'single', label: 'single' },
        { value: 'married', label: 'married' }
    ];

    const [birthDate, setBirthDate] = useState(new Date());
    const [address, setAddress] = useState(null);

    const Persianize_Numbers = (str) => {
        str = str.toString();
        let persianized = "";
        for (let i = 0; i < str.length; i++) {
            switch (str[i]) {
                case "0":
                    persianized += "۰";
                    break;
                case "1":
                    persianized += "۱";
                    break;
                case "2":
                    persianized += "۲";
                    break;
                case "3":
                    persianized += "۳";
                    break;
                case "4":
                    persianized += "۴";
                    break;
                case "5":
                    persianized += "۵";
                    break;
                case "6":
                    persianized += "۶";
                    break;
                case "7":
                    persianized += "۷";
                    break;
                case "8":
                    persianized += "۸";
                    break;
                case "9":
                    persianized += "۹";
                    break;
                default:
                    persianized += str[i];
                    break;
            }
        }
        return persianized;
    }

    const changeValuesToEnglish = (num) => {
        let temp = '';
        for (let i = 0; i < num.length ; i++) {
            if (num[i] === ",") {
                void(0);
            }
            else {
                switch (num[i]) {
                    case "۰":
                        temp += ("0");
                        break;
                    case "۱":
                        temp += ("1");
                        break;
                    case "۲":
                        temp += ("2");
                        break;
                    case "۳":
                        temp += ("3");
                        break;
                    case "۴":
                        temp += ("4");
                        break;
                    case "۵":
                        temp += ("5");
                        break;
                    case "۶":
                        temp += ("6");
                        break;
                    case "۷":
                        temp += ("7");
                        break;
                    case "۸":
                        temp += ("8");
                        break;
                    case "۹":
                        temp += ("9");
                        break;
                    default:
                        temp += num[i];
                        break;
                }
            }
        }

        return temp;
    }

    const isNumber = (evt) => {
        if (evt.inputType === "deleteContentBackward" || evt.inputType === "deleteWordBackward") {
            return true;
        }
        else if (evt.data != null) {
            evt = evt.data.toString();
            const temp = changeValuesToEnglish(evt);
            if ((evt.charCodeAt(0) >= 48 && evt.charCodeAt(0) <= 57) || (temp.charCodeAt(0) >= 48 && temp.charCodeAt(0) <= 57))
                return true;

            return false;
        }

        return false;
    }

    const handleInput = (e) => {
        const name = e.target.className;
        const value = e.target.value;

        if (name.includes("name")) {
            setName(value);
        }
        else if (name.includes("family")) {
            setFamily(value);
        }
        else if (name.includes("phone")) {
            if (language == 'fa') {
                if(isNumber(e.nativeEvent) && value.length <= 11) {
                    setPhone(Persianize_Numbers(value));
                }
            }
            else {
                if(isNumber(e.nativeEvent) && value.length <= 11) {
                    setPhone(changeValuesToEnglish(Persianize_Numbers(value)));
                }
            }
        }
        else if (name.includes("field_of_Study")) {
            setFieldOfStudy(value);
        }
        else if (name.includes("otherDescription")){
            setOtherDescription(value);
        }
        else if (name.includes("recentUniversity")) {
            setRecentUniversity(value);
        }
        else if (name.includes("address")) {
            setAddress(value);
        }
    }

    // drop zone:
    const [resumeFile, setResumeFile] = useState("");
    const [uploadedResume, setUploadedResume] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'application/pdf': []
        },
        onDropRejected: (rejectedFiles) => {
            if (language == "fa") {
                notifyError("فقط می توانید فایل با فرمت pdf آپلود کنید!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    limit: 1
                });
            }
            else {
                notifyError("You can only upload files in pdf format!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    limit: 1
                });
            }
        },
        onDropAccepted: (acceptedFiles) => {
            if (language == "fa") {
                if (acceptedFiles.length > 1) {
                    notifyError("فقط می‌توانید ۱ فایل آپلود کنید!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        limit: 1
                    });
    
                    return;
                }
    
                if (acceptedFiles[0].size > 204800) {
                    notifyError("فایل انتخابی باید کمتر از 200 کیلوبایت حجم داشته باشد!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        limit: 1
                    });
    
                    return;
                }
            }
            else {
                if (acceptedFiles.length > 1) {
                    notifyError("You can only upload 1 file!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        limit: 1
                    });
    
                    return;
                }
    
                if (acceptedFiles[0].size > 204800) {
                    notifyError("The chosen file must be less than 200 kilobytes in size!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        limit: 1
                    });
    
                    return;
                }
            }

            document.getElementsByClassName("resume")[0].value = acceptedFiles[0].name;
            setResumeFile(acceptedFiles[0]);
        },
    });

    const handleDeleteFile = (e) => {
        e.preventDefault();
        setResumeFile("");
        setUploadedResume("");
        document.getElementsByClassName("resume")[0].value = '';
    }

    useEffect(() => {
        const upload = async () => {
            if (resumeFile == "")
                return;
            
            try {
                setUploading(true);
                const formData = new FormData();
                formData.append('file', resumeFile);
        
                const response = await axios.post('https://takbon.biz:3402/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        const progress = (progressEvent.loaded / progressEvent.total) * 100;
                        setProgress(progress);
                    },
                });
        
                if (response.status === 200) {
                    setUploadedResume(response.data.key);
                    if (language == "fa") {
                        notifySuccess("فایل با موفقیت آپلود شد!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            limit: 1
                        });
                    }
                    else {
                        notifySuccess("The file is uploaded successfully!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            limit: 1
                        });
                    }
                } else {
                    setUploadedResume("");
                    if (language == "fa") {
                        notifyError("مشکلی رخ داده لطفا دوباره تلاش کنید.", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            limit: 1
                        });
                    }
                    else {
                        notifyError("An error has occurred. Please try again.", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            limit: 1
                        });
                    }
                }
            }
            catch (error) {
                setUploadedResume("");
                if (language == "fa") {
                    notifyError("مشکلی رخ داده لطفا دوباره تلاش کنید.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        limit: 1
                    });
                }
                else {
                    notifyError("An error has occurred. Please try again.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        limit: 1
                    });
                }
            }
            finally {
                setUploading(false);
                setTimeout(() => {
                    document.getElementsByClassName("resume")[0].value = resumeFile.name;
                    setProgress(0);
                }, 100);
            }
        }

        upload();
}, [resumeFile, language]); // ✅ اصلاح شده

    const handleSubmit = async () => {
        if ((genderStatus?.label == "مرد" || genderStatus?.label == "male") && (militaryStatus?.label == "" || militaryStatus == null)) {
            if (language == "fa") {
                notifyError("لطفا وضعیت نظام وظیفه را انتخاب کنید.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    limit: 1
                });
            }
            else {
                notifyError("Please select the military service status.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    limit: 1
                });
            }
            return;
        }
        if ((family == "" || family == null) || (phone == "" || phone == null) || (fieldOfStudy == "" || fieldOfStudy == null)
        || (educationalStatus?.label == "" || educationalStatus?.label == null) || (grade?.label == "" || grade?.label == null) || (recentUniversity == "" || recentUniversity == null)
        || (genderStatus?.label == "" || genderStatus?.label == null) || (marrigeStatus?.label == "" || marrigeStatus?.label == null)
        || (address == "" || address == null) || (family == "" || family == null) || (resumeFile == "" || resumeFile == null) || (uploadedResume == "" || uploadedResume == null)) {
            if (language == "fa") {
                notifyError("لطفا تمامی فیلدها را پر کنید.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    limit: 1
                });
            }
            else {
                notifyError("Please fill in all fields.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    limit: 1
                });
            }
            return;
        }

        if (isSubmitting)
            return

        try {
            setIsSubmitting(true);

            const formData = new FormData();
            formData.append('name', name);
            formData.append('family', family);
            formData.append('phonenumber', changeValuesToEnglish(phone));
            formData.append('field', fieldOfStudy);
            formData.append('Educational_status', educationalStatus ? educationalStatus.label : "");
            formData.append('grade', grade ? grade : "");
            formData.append('university', recentUniversity);
            formData.append('favorits', favoriteFieldOfWorkStatus ? favoriteFieldOfWorkStatus.map((obj) => obj.value) : "");
            formData.append('other', otherDescription);
            formData.append('sex', genderStatus ? genderStatus.label : "");
            formData.append('military_status', militaryStatus ? militaryStatus.label : "");
            formData.append('marital_status', marrigeStatus ? marrigeStatus.label : "");
            formData.append('birtday', language == "fa" ? changeValuesToEnglish(birthDate) : changeValuesToEnglish(birthDate.toLocaleDateString('fa-IR')));
            formData.append('address', address);
            formData.append('upload_file', uploadedResume);

            const response = await axios.post('https://takbon.biz:3402/collaborate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                if (language == "fa") {
                    notifySuccess("درخواست شما با موفقیت ثبت شد.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        limit: 1
                    });
                }
                else {
                    notifySuccess("Your request has been submitted successfully.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        limit: 1
                    });
                }
            }
            else {
                if (language == "fa") {
                    notifyError("مشکلی رخ داده لطفا دوباره تلاش کنید.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        limit: 1
                    });
                }
                else {
                    notifyError("An error has occurred. Please try again.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        limit: 1
                    });
                }
            }
        }
        catch(error) {
            console.log(error);
            if (language == "fa") {
                notifyError("مشکلی رخ داده لطفا دوباره تلاش کنید.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    limit: 1
                });
            }
            else {
                notifyError("An error has occurred. Please try again.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    limit: 1
                });
            }
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {
                language == "fa" &&
                <CollaborateContainer direction={"rtl"} >
                    <GlobalStyle direction={"rtl"} />
                    <ToastContainer />
                    <Navbar />
                    <Main image={wallpaper} direction={"rtl"} >
                        <Heading>
                            <Logo href={`/landing?lang=${language}`} hover={logoGif} />
                        </Heading>
                        <Content>
                            <Title $adjust={language == 'fa'} >درخواست همکاری</Title>
                            <Field>
                                <FieldTitle $adjust={language == 'fa'} >اطلاعات شخصی</FieldTitle>
                                <Form>
                                    <InputContainer>
                                        <Input $font={language == "fa"} className="name" type="text" value={name} onChange={(e) => {handleInput(e)}} />
                                        <Label>
                                            نام
                                        </Label>
                                    </InputContainer>

                                    <InputContainer>
                                        <Input $font={language == "fa"} className="family" type="text" value={family} required onChange={(e) => {handleInput(e)}} />
                                        <Label>
                                            نام خانوادگی<span className="star" />
                                        </Label>
                                    </InputContainer>

                                    <InputContainer>
                                        <Input $font={language == "fa"} className="phone" type="text" value={phone} required onChange={(e) => {handleInput(e)}} />
                                        <Label>
                                            شماره تماس<span className="star" />
                                        </Label>
                                    </InputContainer>

                                    <InputContainer>
                                        <Input $font={language == "fa"} className="field_of_Study" type="text" value={fieldOfStudy} required onChange={(e) => {handleInput(e)}} />
                                        <Label>
                                            رشته تحصیلی<span className="star" />
                                        </Label>
                                    </InputContainer>

                                    <InputContainer>
                                        <Select
                                            defaultValue={educationalStatus}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderRadius: "10px",
                                                    backdropFilter: "blur(5px)",
                                                    borderColor: state.isFocused ? '#fff' : '#adb1b8',
                                                    width: '100%',
                                                    height: '100%',
                                                    '&:hover': {
                                                        borderColor: '#fff', // Set the hover border color here
                                                    },
                                                }),
                                                option: base => ({
                                                    ...base,
                                                    height: '100%',
                                                    color: "#fff",
                                                    cursor: "pointer",
                                                })
                                            }}
                                            components={{
                                                Menu: (props) => <components.Menu {...props} className="menu" />
                                            }}
                                            id={uniqueId}
                                            theme={theme => ({
                                                ...theme,
                                                colors: {
                                                ...theme.colors,
                                                primary25: '#1469d2',
                                                primary50: '#1469d2',
                                                primary: 'transparent',
                                                neutral90: '#fff',
                                                neutral80: '#fff',
                                                neutral70: '#fff',
                                                neutral60: '#fff',
                                                neutral50: '#fff',
                                                neutral0: 'rgba(0, 0, 0, 0.2)'
                                                },
                                            })}
                                            onChange={setEducationalStatus}
                                            className="EducationalStatus"
                                            onBlur={(e) => {e.preventDefault()}}
                                            options={educationalStatusOptions}
                                            placeholder={"یک مورد را انتخاب کنید."}
                                        />
                                        <Label>
                                            وضعیت تحصیلی<span className="star" />
                                        </Label>
                                    </InputContainer>

                                    <InputContainer>
                                        <Select
                                            defaultValue={grade}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderRadius: "10px",
                                                    backdropFilter: "blur(5px)",
                                                    borderColor: state.isFocused ? '#fff' : '#adb1b8',
                                                    width: "100%",
                                                    height: "100%",
                                                    '&:hover': {
                                                        borderColor: '#fff', // Set the hover border color here
                                                    },
                                                }),
                                                option: base => ({
                                                    ...base,
                                                    height: '100%',
                                                    color: "#fff",
                                                    cursor: "pointer",
                                                })
                                            }}
                                            components={{
                                                Menu: (props) => <components.Menu {...props} className="menu" />
                                            }}
                                            id={uniqueId}
                                            theme={theme => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: '#1469d2',
                                                    primary50: '#1469d2',
                                                    primary: 'transparent',
                                                    neutral90: '#fff',
                                                    neutral80: '#fff',
                                                    neutral70: '#fff',
                                                    neutral60: '#fff',
                                                    neutral50: '#fff',
                                                    neutral0: 'rgba(0, 0, 0, 0.2)'
                                                },
                                            })}
                                            onChange={setGrade}
                                            onBlur={(e) => {e.preventDefault()}}
                                            options={gradeOptions}
                                            className="Grade"
                                            placeholder={"یک مورد را انتخاب کنید."}
                                        />
                                        <Label>
                                            مقطع تحصیلی<span className="star" />
                                        </Label>
                                    </InputContainer>
                                    
                                    <InputContainer>
                                        <Input $font={language == "fa"} className="recentUniversity" type="text" value={recentUniversity} required onChange={(e) => {handleInput(e)}} />
                                        <Label>
                                            آخرین دانشگاه مقطع تحصیلی<span className="star" />
                                        </Label>
                                    </InputContainer>

                                    <InputContainer>
                                        <Textarea $font={language == "fa"} className="otherDescription" onChange={(e) => {handleInput(e)}} show={favoriteFieldOfWorkStatus?.findIndex(item => {
                                            return item.label == "سایر"
                                        }) > -1} placeholder="درصورت انتخاب سایر توضیحاتی در این قسمت درج کنید." />
                                        <Select
                                            defaultValue={favoriteFieldOfWorkStatus}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderRadius: "10px",
                                                    backdropFilter: "blur(5px)",
                                                    borderColor: state.isFocused ? '#fff' : '#adb1b8',
                                                    width: '100%',
                                                    minHeight: '50px',
                                                    '&:hover': {
                                                        borderColor: '#fff', // Set the hover border color here
                                                    },
                                                }),
                                                option: base => ({
                                                    ...base,
                                                    height: '100%',
                                                    color: "#fff",
                                                    cursor: "pointer",
                                                })
                                            }}
                                            components={
                                                {
                                                    ...animatedComponents,
                                                    Menu: (props) => <components.Menu {...props} className="menu" />
                                                }
                                            }
                                            id={uniqueId}
                                            theme={theme => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: '#1469d2',
                                                    primary50: '#1469d2',
                                                    primary: 'transparent',
                                                    neutral90: '#fff',
                                                    neutral80: '#000',
                                                    neutral70: '#fff',
                                                    neutral60: '#fff',
                                                    neutral50: '#fff',
                                                    neutral0: 'rgba(0, 0, 0, 0.2)'
                                                },
                                            })}
                                            isMulti
                                            closeMenuOnSelect={true}
                                            onChange={(e) => {setFavoriteFieldOfWorkStatus(e)}}
                                            onBlur={(e) => {e.preventDefault()}}
                                            options={favoriteFieldOfWork}
                                            className="FavoriteFieldOfWork"
                                            placeholder={"حداقل یک مورد را انتخاب کنید."}
                                        />
                                        <Label>
                                            حوزه ی کاری مورد علاقه
                                        </Label>
                                    </InputContainer>

                                    <InputContainer>
                                        <Select
                                            defaultValue={genderStatus}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderRadius: "10px",
                                                    backdropFilter: "blur(5px)",
                                                    borderColor: state.isFocused ? '#fff' : '#adb1b8',
                                                    width: "100%",
                                                    height: "100%",
                                                    '&:hover': {
                                                        borderColor: '#fff', // Set the hover border color here
                                                    },
                                                }),
                                                option: base => ({
                                                    ...base,
                                                    height: '100%',
                                                    color: "#fff",
                                                    cursor: "pointer",
                                                })
                                            }}
                                            components={{
                                                Menu: (props) => <components.Menu {...props} className="menu" />
                                            }}
                                            id={uniqueId}
                                            theme={theme => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: '#1469d2',
                                                    primary50: '#1469d2',
                                                    primary: 'transparent',
                                                    neutral90: '#fff',
                                                    neutral80: '#fff',
                                                    neutral70: '#fff',
                                                    neutral60: '#fff',
                                                    neutral50: '#fff',
                                                    neutral0: 'rgba(0, 0, 0, 0.2)'
                                                },
                                            })}
                                            onChange={setGenderStatus}
                                            onBlur={(e) => {e.preventDefault()}}
                                            options={genderOptions}
                                            className="Gender"
                                            placeholder={"یک مورد را انتخاب کنید."}
                                        />
                                        <Label>
                                            جنسیت<span className="star" />
                                        </Label>
                                    </InputContainer>

                                    <InputContainerSpecial $show={genderStatus?.label == "مرد"} >
                                        <Select
                                            defaultValue={militaryStatus}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderRadius: "10px",
                                                    backdropFilter: "blur(5px)",
                                                    borderColor: state.isFocused ? '#fff' : '#adb1b8',
                                                    width: "100%",
                                                    height: "100%",
                                                    '&:hover': {
                                                        borderColor: '#fff', // Set the hover border color here
                                                    },
                                                }),
                                                option: base => ({
                                                    ...base,
                                                    height: '100%',
                                                    color: "#fff",
                                                    cursor: "pointer",
                                                })
                                            }}
                                            components={{
                                                Menu: (props) => <components.Menu {...props} className="menu" />
                                            }}
                                            id={uniqueId}
                                            theme={theme => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: '#1469d2',
                                                    primary50: '#1469d2',
                                                    primary: 'transparent',
                                                    neutral90: '#fff',
                                                    neutral80: '#fff',
                                                    neutral70: '#fff',
                                                    neutral60: '#fff',
                                                    neutral50: '#fff',
                                                    neutral0: 'rgba(0, 0, 0, 0.2)'
                                                },
                                            })}
                                            onChange={setMilitaryStatus}
                                            onBlur={(e) => {e.preventDefault()}}
                                            options={militaryOptions}
                                            className="Military"
                                            placeholder={"یک مورد را انتخاب کنید."}
                                        />
                                        <Label>
                                            وضعیت نظام وظیفه<span className="star" />
                                        </Label>
                                    </InputContainerSpecial>

                                    <InputContainer>
                                        <Select
                                            defaultValue={marrigeStatus}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderRadius: "10px",
                                                    backdropFilter: "blur(5px)",
                                                    borderColor: state.isFocused ? '#fff' : '#adb1b8',
                                                    width: "100%",
                                                    height: "100%",
                                                    '&:hover': {
                                                        borderColor: '#fff', // Set the hover border color here
                                                    },
                                                }),
                                                option: base => ({
                                                    ...base,
                                                    height: '100%',
                                                    color: "#fff",
                                                    cursor: "pointer",
                                                })
                                            }}
                                            components={{
                                                Menu: (props) => <components.Menu {...props} className="menu" />
                                            }}
                                            id={uniqueId}
                                            theme={theme => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: '#1469d2',
                                                    primary50: '#1469d2',
                                                    primary: 'transparent',
                                                    neutral90: '#fff',
                                                    neutral80: '#fff',
                                                    neutral70: '#fff',
                                                    neutral60: '#fff',
                                                    neutral50: '#fff',
                                                    neutral0: 'rgba(0, 0, 0, 0.2)'
                                                },
                                            })}
                                            onChange={setMarrigeStatus}
                                            onBlur={(e) => {e.preventDefault()}}
                                            options={marrigeOptions}
                                            className="Marrige"
                                            placeholder={"یک مورد را انتخاب کنید."}
                                        />
                                        <Label>
                                            وضعیت تاهل<span className="star" />
                                        </Label>
                                    </InputContainer>

                                    <InputContainer $adjust={language == 'fa'} >
                                        <DatePicker
                                            round="x2"
                                            defaultValue={birthDate}
                                            position="center"
                                            customShowDateFormat="YYYY/MM/DD"
                                            inputClass="birthDate"
                                            className="birthDateMenu"
                                            onChange={(e) => {setBirthDate(e.value.toLocaleDateString('fa-IR')); document.querySelector(".birthDateMenu").style.display = "none"}}
                                        />
                                        <Label>
                                            تاریخ تولد<span className="star" />
                                        </Label>
                                    </InputContainer>

                                    <InputContainer>
                                        <Address $font={language == "fa"}  className="address" type="text" value={address ?? ""} required onChange={(e) => {handleInput(e)}} />
                                        <Label>
                                            آدرس محل سکونت<span className="star" />
                                        </Label>
                                    </InputContainer>

                                    <InputContainer>
                                        <DropZone>
                                            {
                                                uploading ?
                                                <ProgressBarContainer>
                                                    <ProgressBar $adjust={language == 'fa'} width={progress.toFixed(1)} >
                                                        <p>{progress.toFixed(1)}%</p>
                                                    </ProgressBar>
                                                </ProgressBarContainer>
                                                :
                                                <>
                                                    <DropInput $adjust={language == 'fa'} className="resume" type="text" readOnly />
                                                    <DeleteFile show={resumeFile.name != null & resumeFile != ''} onClick={handleDeleteFile} >X</DeleteFile>
                                                    <div {...getRootProps({className: 'dropzone'})} >
                                                        <input {...getInputProps()} />
                                                        <Choose $adjust={language == 'fa'} >انتخاب فایل</Choose>
                                                    </div>
                                                </>
                                            }
                                        </DropZone>
                                        <Label>
                                            آپلود فایل رزومه<span className="star" />
                                        </Label>
                                    </InputContainer>
                                </Form>
                            </Field>
                            <SubmitButton onClick={handleSubmit} $isSubmitting={isSubmitting} >
                                {
                                    isSubmitting ?
                                    <div className={"spinner"}>
                                        <svg
                                            width="30"
                                            height="30"
                                            viewBox="0 0 13 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.38798 12.616C3.36313 12.2306 2.46328 11.5721 1.78592 10.7118C1.10856 9.85153 0.679515 8.82231   0.545268 7.73564C0.411022 6.64897 0.576691 5.54628 1.02433 4.54704C1.47197 3.54779 2.1845 2.69009 3.08475   2.06684C3.98499 1.4436 5.03862 1.07858 6.13148 1.01133C7.22435 0.944078 8.31478 1.17716 9.28464    1.68533C10.2545 2.19349 11.0668 2.95736 11.6336 3.89419C12.2004 4.83101 12.5 5.90507 12.5 7"
                                            />
                                        </svg>
                                    </div>
                                    :
                                    "ثبت درخواست"
                                }
                            </SubmitButton>
                        </Content>
                    </Main>
                    <Footer />
                </CollaborateContainer>
            }
            {
                language == "en" &&
                <CollaborateContainer direction={"ltr"} >
                    <GlobalStyle direction={"ltr"} />
                    <ToastContainer />
                    <Navbar />
                    <Main image={wallpaper} direction={"ltr"} >
                        <Heading>
                            <Logo href={`/landing?lang=${language}`} hover={logoGif} />
                        </Heading>
                        <Content>
                            <Title $adjust={language == 'fa'} >Collaboration Request</Title>
                            <Field>
                                <FieldTitle $adjust={language == 'fa'} >Personal Information</FieldTitle>
                                <Form>
                                    <InputContainer>
                                        <Input $font={language == "fa"} className="name" type="text" value={name} required onChange={(e) => {handleInput(e)}} />
                                        <Label>
                                            Name
                                        </Label>
                                    </InputContainer>

                                    <InputContainer>
                                        <Input $font={language == "fa"} className="family" type="text" value={family} required onChange={(e) => {handleInput(e)}} />
                                        <Label>
                                            Family Name<span className="star" />
                                        </Label>
                                    </InputContainer>

                                    <InputContainer>
                                        <Input $font={language == "fa"} className="phone" type="text" value={phone} required onChange={(e) => {handleInput(e)}} />
                                        <Label>
                                            Phone Number<span className="star" />
                                        </Label>
                                    </InputContainer>

                                    <InputContainer>
                                        <Input $font={language == "fa"} className="field_of_Study" type="text" value={fieldOfStudy} required onChange={(e) => {handleInput(e)}} />
                                        <Label>
                                            Field of Study<span className="star" />
                                        </Label>
                                    </InputContainer>

                                    <InputContainer>
                                        <Select
                                            defaultValue={educationalStatus}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderRadius: "10px",
                                                    backdropFilter: "blur(5px)",
                                                    borderColor: state.isFocused ? '#fff' : '#adb1b8',
                                                    width: '100%',
                                                    height: '100%',
                                                    '&:hover': {
                                                        borderColor: '#fff', // Set the hover border color here
                                                    },
                                                }),
                                                option: base => ({
                                                    ...base,
                                                    height: '100%',
                                                    color: "#fff",
                                                    cursor: "pointer",
                                                })
                                            }}
                                            components={{
                                                Menu: (props) => <components.Menu {...props} className="menu" />
                                            }}
                                            id={uniqueId}
                                            theme={theme => ({
                                                ...theme,
                                                colors: {
                                                ...theme.colors,
                                                primary25: '#1469d2',
                                                primary50: '#1469d2',
                                                primary: 'transparent',
                                                neutral90: '#fff',
                                                neutral80: '#fff',
                                                neutral70: '#fff',
                                                neutral60: '#fff',
                                                neutral50: '#fff',
                                                neutral0: 'rgba(0, 0, 0, 0.2)'
                                                },
                                            })}
                                            onChange={setEducationalStatus}
                                            className="EducationalStatus"
                                            onBlur={(e) => {e.preventDefault()}}
                                            options={educationalStatusOptionsEN}
                                            placeholder={"Select one option."}
                                        />
                                        <Label>
                                            Educational Status<span className="star" />
                                        </Label>
                                    </InputContainer>

                                    <InputContainer>
                                        <Select
                                            defaultValue={grade}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderRadius: "10px",
                                                    backdropFilter: "blur(5px)",
                                                    borderColor: state.isFocused ? '#fff' : '#adb1b8',
                                                    width: "100%",
                                                    height: "100%",
                                                    '&:hover': {
                                                        borderColor: '#fff', // Set the hover border color here
                                                    },
                                                }),
                                                option: base => ({
                                                    ...base,
                                                    height: '100%',
                                                    color: "#fff",
                                                    cursor: "pointer",
                                                })
                                            }}
                                            components={{
                                                Menu: (props) => <components.Menu {...props} className="menu" />
                                            }}
                                            id={uniqueId}
                                            theme={theme => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: '#1469d2',
                                                    primary50: '#1469d2',
                                                    primary: 'transparent',
                                                    neutral90: '#fff',
                                                    neutral80: '#fff',
                                                    neutral70: '#fff',
                                                    neutral60: '#fff',
                                                    neutral50: '#fff',
                                                    neutral0: 'rgba(0, 0, 0, 0.2)'
                                                },
                                            })}
                                            onChange={setGrade}
                                            onBlur={(e) => {e.preventDefault()}}
                                            options={gradeOptionsEN}
                                            className="Grade"
                                            placeholder={"Select one option."}
                                        />
                                        <Label>
                                            Educational Level<span className="star" />
                                        </Label>
                                    </InputContainer>

                                    <InputContainer>
                                        <Input $font={language == "fa"} className="recentUniversity" type="text" value={recentUniversity} required onChange={(e) => {handleInput(e)}} />
                                        <Label>
                                            The last academic institution<span className="star" />
                                        </Label>
                                    </InputContainer>

                                    <InputContainer>
                                        <Textarea $font={language == "fa"} className="otherDescription" onChange={(e) => {handleInput(e)}} show={favoriteFieldOfWorkStatus?.findIndex(item => {
                                            return item.label == "Other"
                                        }) > -1} placeholder={`If you choose the "Other" option, please provide additional information in this section.`} />
                                        <Select
                                            defaultValue={favoriteFieldOfWorkStatus}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderRadius: "10px",
                                                    backdropFilter: "blur(5px)",
                                                    borderColor: state.isFocused ? '#fff' : '#adb1b8',
                                                    width: '100%',
                                                    minHeight: '50px',
                                                    '&:hover': {
                                                        borderColor: '#fff', // Set the hover border color here
                                                    },
                                                }),
                                                option: base => ({
                                                    ...base,
                                                    height: '100%',
                                                    color: "#fff",
                                                    cursor: "pointer",
                                                })
                                            }}
                                            components={
                                                {
                                                    ...animatedComponents,
                                                    Menu: (props) => <components.Menu {...props} className="menu" />
                                                }
                                            }
                                            id={uniqueId}
                                            theme={theme => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: '#1469d2',
                                                    primary50: '#1469d2',
                                                    primary: 'transparent',
                                                    neutral90: '#fff',
                                                    neutral80: '#000',
                                                    neutral70: '#fff',
                                                    neutral60: '#fff',
                                                    neutral50: '#fff',
                                                    neutral0: 'rgba(0, 0, 0, 0.2)'
                                                },
                                            })}
                                            isMulti
                                            closeMenuOnSelect={true}
                                            onChange={(e) => {setFavoriteFieldOfWorkStatus(e)}}
                                            onBlur={(e) => {e.preventDefault()}}
                                            options={favoriteFieldOfWorkEN}
                                            className="FavoriteFieldOfWork"
                                            placeholder={"Select at least one option."}
                                        />
                                        <Label>
                                            Field of Interest
                                        </Label>
                                    </InputContainer>

                                    <InputContainer>
                                        <Select
                                            defaultValue={genderStatus}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderRadius: "10px",
                                                    borderColor: state.isFocused ? '#fff' : '#adb1b8',
                                                    width: "100%",
                                                    height: "100%",
                                                    '&:hover': {
                                                        borderColor: '#fff', // Set the hover border color here
                                                    },
                                                }),
                                                option: base => ({
                                                    ...base,
                                                    height: '100%',
                                                    color: "#fff",
                                                    cursor: "pointer",
                                                })
                                            }}
                                            components={{
                                                Menu: (props) => <components.Menu {...props} className="menu" />
                                            }}
                                            id={uniqueId}
                                            theme={theme => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: '#1469d2',
                                                    primary50: '#1469d2',
                                                    primary: 'transparent',
                                                    neutral90: '#fff',
                                                    neutral80: '#fff',
                                                    neutral70: '#fff',
                                                    neutral60: '#fff',
                                                    neutral50: '#fff',
                                                    neutral0: 'rgba(0, 0, 0, 0.2)'
                                                },
                                            })}
                                            onChange={setGenderStatus}
                                            onBlur={(e) => {e.preventDefault()}}
                                            options={genderOptionsEN}
                                            className="Gender"
                                            placeholder={"Select one option."}
                                        />
                                        <Label>
                                            Gender<span className="star" />
                                        </Label>
                                    </InputContainer>

                                    <InputContainerSpecial show={genderStatus?.label == "male"} >
                                        <Select
                                            defaultValue={militaryStatus}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderRadius: "10px",
                                                    backdropFilter: "blur(5px)",
                                                    borderColor: state.isFocused ? '#fff' : '#adb1b8',
                                                    width: "100%",
                                                    height: "100%",
                                                    '&:hover': {
                                                        borderColor: '#fff', // Set the hover border color here
                                                    },
                                                }),
                                                option: base => ({
                                                    ...base,
                                                    height: '100%',
                                                    color: "#fff",
                                                    cursor: "pointer",
                                                })
                                            }}
                                            components={{
                                                Menu: (props) => <components.Menu {...props} className="menu" />
                                            }}
                                            id={uniqueId}
                                            theme={theme => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: '#1469d2',
                                                    primary50: '#1469d2',
                                                    primary: 'transparent',
                                                    neutral90: '#fff',
                                                    neutral80: '#fff',
                                                    neutral70: '#fff',
                                                    neutral60: '#fff',
                                                    neutral50: '#fff',
                                                    neutral0: 'rgba(0, 0, 0, 0.2)'
                                                },
                                            })}
                                            onChange={setMilitaryStatus}
                                            onBlur={(e) => {e.preventDefault()}}
                                            options={militaryOptionsEN}
                                            className="Military"
                                            placeholder={"Select one option."}
                                        />
                                        <Label>
                                            Military Service Status<span className="star" />
                                        </Label>
                                    </InputContainerSpecial>

                                    <InputContainer>
                                        <Select
                                            defaultValue={marrigeStatus}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderRadius: "10px",
                                                    borderColor: state.isFocused ? '#fff' : '#adb1b8',
                                                    width: "100%",
                                                    height: "100%",
                                                    '&:hover': {
                                                        borderColor: '#fff', // Set the hover border color here
                                                    },
                                                }),
                                                option: base => ({
                                                    ...base,
                                                    height: '100%',
                                                    color: "#fff",
                                                    cursor: "pointer",
                                                })
                                            }}
                                            components={{
                                                Menu: (props) => <components.Menu {...props} className="menu" />
                                            }}
                                            id={uniqueId}
                                            theme={theme => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: '#1469d2',
                                                    primary50: '#1469d2',
                                                    primary: 'transparent',
                                                    neutral90: '#fff',
                                                    neutral80: '#fff',
                                                    neutral70: '#fff',
                                                    neutral60: '#fff',
                                                    neutral50: '#fff',
                                                    neutral0: 'rgba(0, 0, 0, 0.2)'
                                                },
                                            })}
                                            onChange={setMarrigeStatus}
                                            onBlur={(e) => {e.preventDefault()}}
                                            options={marrigeOptionsEN}
                                            className="Marrige"
                                            placeholder={"Select one option."}
                                        />
                                        <Label>
                                            Marital Status<span className="star" />
                                        </Label>
                                    </InputContainer>

                                    <InputContainer $adjust={language == 'fa'} >
                                        <DatePicker
                                            round="x2"
                                            defaultValue={birthDate}
                                            locale="en"
                                            position="center"
                                            customShowDateFormat="YYYY/MM/DD"
                                            inputClass="birthDate"
                                            className="birthDateMenu"
                                            onChange={(e) => {setBirthDate(e.value); document.querySelector(".birthDateMenu").style.display = "none"}}
                                        />
                                        <Label>
                                            Birth Date<span className="star" />
                                        </Label>
                                    </InputContainer>

                                    <InputContainer>
                                        <Address $font={language == "fa"}  className="address" type="text" value={address} required onChange={(e) => {handleInput(e)}} />
                                        <Label>
                                            Residential Address<span className="star" />
                                        </Label>
                                    </InputContainer>

                                    <InputContainer>
                                        <DropZone>
                                            {
                                                uploading ?
                                                <ProgressBarContainer>
                                                    <ProgressBar $adjust={language == 'fa'} width={progress.toFixed(1)} >
                                                        <p>{progress.toFixed(1)}%</p>
                                                    </ProgressBar>
                                                </ProgressBarContainer>
                                                :
                                                <>
                                                    <DropInput $adjust={language == 'fa'} className="resume" type="text" readOnly />
                                                    <DeleteFile show={resumeFile.name != null & resumeFile != ''} onClick={handleDeleteFile} >X</DeleteFile>
                                                    <div {...getRootProps({className: 'dropzone'})} >
                                                        <input {...getInputProps()} />
                                                        <Choose $adjust={language == 'fa'} >Select File</Choose>
                                                    </div>
                                                </>
                                            }
                                        </DropZone>
                                        <Label>
                                            Upload Resume File<span className="star" />
                                        </Label>
                                    </InputContainer>
                                </Form>
                            </Field>
                            <SubmitButton onClick={handleSubmit} isSubmitting={isSubmitting} >
                                {
                                    isSubmitting ?
                                    <div className={"spinner"}>
                                        <svg
                                            width="30"
                                            height="30"
                                            viewBox="0 0 13 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.38798 12.616C3.36313 12.2306 2.46328 11.5721 1.78592 10.7118C1.10856 9.85153 0.679515 8.82231   0.545268 7.73564C0.411022 6.64897 0.576691 5.54628 1.02433 4.54704C1.47197 3.54779 2.1845 2.69009 3.08475   2.06684C3.98499 1.4436 5.03862 1.07858 6.13148 1.01133C7.22435 0.944078 8.31478 1.17716 9.28464    1.68533C10.2545 2.19349 11.0668 2.95736 11.6336 3.89419C12.2004 4.83101 12.5 5.90507 12.5 7"
                                            />
                                        </svg>
                                    </div>
                                    :
                                    "Submit Application"
                                }
                            </SubmitButton>
                        </Content>
                    </Main>
                    <Footer />
                </CollaborateContainer>
            }
        </>
    )
}

export default Collaborate;
