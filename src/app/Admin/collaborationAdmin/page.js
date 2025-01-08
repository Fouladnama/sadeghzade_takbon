'use client';
import { Grid, Typography} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const CollaboratePage = () => {
  const [resumes, setResumes] = useState([]);
  const [language, setLanguage] = useState('fa');

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get('https://takbon.biz:3402/getallcolaborate');
        const resumesWithStatus = response.data.value.map((resume) => ({
          ...resume,
          seen: false,
        }));
        setResumes(resumesWithStatus || []);
      } catch (error) {
        console.error('Error fetching resumes:', error);
        if (language === 'fa') {
          toast.error('مشکلی در دریافت داده‌ها پیش آمده است. لطفا دوباره تلاش کنید.');
        } else {
          toast.error('An error occurred while fetching the data. Please try again.');
        }
      }
    };

    fetchResumes();
  }, []);
  const handleMarkAsSeen = (index) => {
    const updatedResumes = [...resumes];
    updatedResumes[index].seen = !updatedResumes[index].seen;
    setResumes(updatedResumes);
    if (language === 'fa') {
      toast.success(`رزومه ${updatedResumes[index].name} ${updatedResumes[index].seen ? 'دیده شد' : 'بازنشانی شد'}`);
    } else {
      toast.success(`Resume ${updatedResumes[index].name} marked as ${updatedResumes[index].seen ? 'seen' : 'unseen'}`);
    }
  };

  const handleDownload = (fileName) => {
    const fileUrl = "https://takbon.biz/cvdownloads/" + fileName;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <Grid>
              <Typography variant="h3" align="center" style={{ margin: '20px 0', fontWeight: 'bold', color: '#2E3B55' }}>
              
              رزومه‌های ارسال‌شد  </Typography>
              <Grid className="resume-cards">
  {resumes.length > 0 ? (
    resumes.map((resume, index) => (
      <Grid className="resume-card" key={index} style={styles.card}>
        <Grid style={styles.cardContent}>
          <Grid style={styles.imageContainer}>
            {/* تغییر تصویر بر اساس جنسیت */}
            <img
              src={resume.sex === 'زن' ? '/Assests/Admin/collaborationAdmin/woman.png' : '/Assests/Admin/collaborationAdmin/man.png'}
              alt="profile"
              style={styles.image}
            />
          </Grid>
          <Grid style={styles.textContainer}>
            <Grid style={styles.row}>
              <Grid style={styles.column}>
                <p><strong>نام:</strong> {resume.name} {resume.family}</p>
                <p><strong>تاریخ تولد:</strong> {resume.birtday}</p>
                <p><strong>شماره تماس:</strong> {resume.phonenumber}</p>
              </Grid>
              <Grid style={styles.column}>
                <p><strong>وضعیت تاهل:</strong> {resume.marital_status}</p>
                <p><strong>جنسیت:</strong> {resume.sex}</p>
              </Grid>
              <Grid style={styles.column}>
                <p><strong>دانشگاه:</strong> {resume.university}</p>
                <p><strong>مقطع:</strong> {resume.field}</p>
                <p><strong>وضعیت تحصیلی:</strong> {resume.Educational_status}</p>
              </Grid>
              <Grid style={styles.column}>
                <p><strong>حوزه‌ی کاری مورد علاقه:</strong> {resume.favorits}</p>
                <p><strong>درس محل سکونت:</strong> {resume.address}</p>
              </Grid>
              <img
                src="/Assests/Admin/collaborationAdmin/1.png"
                alt="دانلود رزومه"
                style={{
                  width: '80px',
                  height: '80px', 
                  cursor: 'pointer'
                }}
                onClick={() => handleDownload(resume.upload_file)} 
              />
            </Grid>
            <button
              style={styles.eyeButton}
              onClick={() => handleMarkAsSeen(index)}
            >
              {resume.seen ? <FaEye color="green" /> : <FaEyeSlash color="gray" />}
            </button>
          </Grid>
        </Grid>
      </Grid>
    ))
  ) : (
    <p>هیچ رزومه‌ای یافت نشد.</p>
  )}
</Grid>


      <ToastContainer />
    </Grid>
  );
};

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '15px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    gap: '20px', // فاصله یکنواخت بین ستون‌های داخلی
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    gap: '15px', // فاصله بین تصویر و متن
  },
  imageContainer: {
    marginRight: '20px',
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  textContainer: {
    flex: 1,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px', // فاصله بین ستون‌ها در هر سطر
    marginBottom: '10px',
    flexWrap: 'wrap',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '5px', // فاصله بین پاراگراف‌ها
  },
  eyeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '24px',
    marginTop: '10px',
  },
  resumeCards: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px', // فاصله یکنواخت بین کارت‌ها
  },
};


export default CollaboratePage;
